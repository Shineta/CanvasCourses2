const axios = require('axios');
const puppeteer = require('puppeteer');
const readXlsxFile = require('read-excel-file/node');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
const courseId = '14706'; // Replace with the target course ID
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path

// Function to read the spreadsheet and convert it to JSON
async function convertSpreadsheetToJson(filePath) {
    try {
        const rows = await readXlsxFile(filePath);
        const headers = rows[0];
        const jsonData = rows.slice(1).map(row => {
            let rowData = {};
            row.forEach((value, index) => {
                rowData[headers[index]] = value;
            });
            return rowData;
        });
        return jsonData;
    } catch (error) {
        console.error('Error reading spreadsheet:', error);
        return [];
    }
}

// Use the function to convert and then filter and log the required data
convertSpreadsheetToJson(spreadsheetPath).then(jsonData => {
    const studentAssignments = jsonData.filter(row => row['Ed Audience/Role'] === 'Student')
        .map(row => {
            return {
                module: row['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'],
                assignmentTitle: row['DISPLAY TITLE for course build']
            };
        });
    console.log(studentAssignments);
});

// Function to create a new page in the course
async function createCoursePage(courseId, pageTitle, pageContent) {
    // Correctly format the page title to remove any dashes
    const formattedPageTitle = pageTitle.replace(/-/g, ' ');

    const url = `${canvasDomain}/api/v1/courses/${courseId}/pages`;
    const data = {
        wiki_page: {
            title: formattedPageTitle,
            body: pageContent,
            // Ensure the page is published if needed
            published: true
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log('Page created:', response.data);
        return response.data; // Returns the created page object
    } catch (error) {
        console.error('Error creating page:', error);
    }
}

// Function to find a module ID by its name
async function findModuleIdByName(courseId, moduleName) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            params: { per_page: 100 }
        });
        const modules = response.data;
        const foundModule = modules.find(module => module.name === moduleName);
        return foundModule ? foundModule.id : null;
    } catch (error) {
        console.error('Error finding module:', error);
        return null;
    }
}

// Function to add a page to a module
async function addPageToModule(courseId, moduleId, pageUrl, pageTitle) {
    // Use the correctly formatted pageTitle for the module item title
    const formattedPageTitle = pageTitle.replace(/-/g, ' ');

    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
    const data = {
        module_item: {
            title: formattedPageTitle,
            type: 'Page',
            page_url: pageUrl
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(`Page '${pageUrl}' added to module ID ${moduleId}`);
        return response.data;
    } catch (error) {
        console.error('Error adding page to module:', error);
    }
}

// // Function to check the checkbox on a newly created page
// async function checkCheckboxOnPage(pageUrl) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(pageUrl);

//     await page.evaluate(() => {
//         const checkbox = document.querySelector("#student_planner_checkbox");
//         if (checkbox) checkbox.checked = true;
//     });

//     await browser.close();
// }


// Main Execution
(async () => {
    // Convert the spreadsheet data to JSON
    const jsonData = await convertSpreadsheetToJson(spreadsheetPath);

    for (const item of jsonData) {
        // Check if 'Ed Audience/Role' is 'Student', the 'Category' is 'required',
        // and the 'Points' column is empty or not defined
        if (item['Ed Audience/Role'] === 'Student' &&
            item['Category'].toLowerCase() === 'required' &&
            (item['Points'] === '' || item['Points'] === null)) {

            const pageTitle = item['DISPLAY TITLE for course build'].replace(/-/g, ' ');
            const pageContent = `<h2>${pageTitle}</h2>`;

            const newPage = await createCoursePage(courseId, pageTitle, pageContent);
            if (newPage && item['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE']) {
                const moduleName = item['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'];
                const moduleId = await findModuleIdByName(courseId, moduleName);
                if (moduleId) {
                    await addPageToModule(courseId, moduleId, newPage.url, pageTitle);
                }
            }
        }
    }
})();

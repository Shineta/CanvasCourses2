const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
const courseId = '14706'; // Replace with the target course ID
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
const coursePrefix = 'G8_Unit 6:'; // Update this with the dynamic course prefix

// Function to read the spreadsheet and convert it to JSON
async function convertSpreadsheetToJson(filePath) {
    try {
        const rows = await readXlsxFile(filePath);
        const headers = rows[0];
        return rows.slice(1).map(row => headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
        }, {}));
    } catch (error) {
        console.error('Error reading spreadsheet:', error);
        return [];
    }
}

// Function to find a module ID by its name
async function findModuleIdByName(courseId, moduleName) {
    let url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;
    let moduleId = null;

    try {
        while (url) {
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                params: { per_page: 100 }
            });
            const modules = response.data;
            const foundModule = modules.find(module => module.name === moduleName);

            if (foundModule) {
                moduleId = foundModule.id;
                break;
            }

            // Pagination handling
            const linkHeader = response.headers.link;
            if (linkHeader) {
                const links = linkHeader.split(',');
                const nextLink = links.find(link => link.includes('rel="next"'));
                if (nextLink) {
                    const match = nextLink.match(/<(.*?)>/);
                    url = match ? match[1] : null;
                } else {
                    url = null;
                }
            } else {
                url = null;
            }
        }
    } catch (error) {
        console.error('Error finding module by name:', error);
    }

    return moduleId;
}


// Function to create a new page in the course
async function createCoursePage(courseId, pageTitle, pageContent) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/pages`;
    const data = {
        wiki_page: {
            title: pageTitle.replace(/-/g, ' '),
            body: pageContent
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log('Page created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating page:', error);
    }
}




async function addPageToModule(courseId, moduleId, pageUrl, pageTitle) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
    const data = {
        module_item: {
            title: pageTitle,
            type: 'Page',
            page_url: pageUrl
        }
    };

    console.log('Sending request with data:', data); // Log the data being sent

    try {
        const response = await axios.post(url, data, {
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`Page '${pageTitle}' added to module ID ${moduleId}`);
        return response.data;
    } catch (error) {
        console.error('Error adding page to module:', error);
        console.log('Request data that caused error:', data); // Log the problematic data
    }
}



// Main Execution
(async () => {
    const jsonData = await convertSpreadsheetToJson(spreadsheetPath);

    for (const item of jsonData) {
        if (item['External Tool or RTE'] === 'Module Note to teachers') {
            const pageTitle = item['DISPLAY TITLE for course build'].replace(/-/g, ' ');
            const moduleName = item['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'];
            const moduleId = await findModuleIdByName(courseId, moduleName);

            const pageContent = `<h2>TEACHER ACTION: Set up Online Assessment – <span class="module-name">${moduleName}</span> Selection Test</h2>
            <p><strong>[DO NOT PUBLISH THIS NOTE]</strong></p>
            
            <h2>TEACHER ACTION: Set up Online Assessment – <span class="module-name">${moduleName}</span> Selection Test</h2>
            <p><strong>[DO NOT PUBLISH THIS NOTE]</strong></p>
            
            <p class="p1"><strong>TEACHER ACTION: Set up Online Assessment &ndash; ${moduleName} Selection Test</strong><strong>&nbsp;[DO NOT PUBLISH THIS NOTE]</strong></p>
            <p class="p2"><strong>TEACHER NOTE:&nbsp;</strong> You will need to set up this assessment manually for each class using the Ed Linking Tool. This assessment cannot be copied to cross-listed courses.&nbsp; Need help?&nbsp; Follow directions here at your <a href="https://support.hmhco.com/s/article/ccsd"><span class="s2">HMH CCSD Support site </span></a></p>
            <p class="p3"><span class="s3"><a href="https://support.hmhco.com/s/article/ccsd">Links to an external site.</a></span><span class="s4"> or use <a href="https://s3.amazonaws.com/downloads.hmlt.hmco.com/CustomerExperience/CCSD/CCSD+HMH+Into+Reading+and+Into+Literature_Assessments.pdf"><span class="s2">this PDF document Links to an external site.</span></a> to learn how to create an assessment via Canvas.</span></p>
                        
            `; // Your HTML content


            if (moduleId) {
                const newPage = await createCoursePage(courseId, pageTitle, pageContent);
                if (newPage) {
                    await addPageToModule(courseId, moduleId, pageTitle);
                }
            }
        }
    }
})();

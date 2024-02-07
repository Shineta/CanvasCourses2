const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
const courseId = '14706'; // Replace with the target course ID
const spreadsheetPath = '/workspaces/CanvasCourses2/g7_IntoLiteratureG7U5CCSDContentsInput.xlsx'; // Update with your actual file path
const coursePrefix = 'G7_Unit 5:'; // Update this with the dynamic course prefix

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

// Function to add a module item
async function addModuleItem(courseId, moduleId, title, itemType) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
    const data = {
        module_item: {
            title: title,
            type: itemType
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`${itemType} '${title}' added to module ID ${moduleId}`);
        return response.data;
    } catch (error) {
        console.error(`Error adding ${itemType} to module:`, error);
    }
}

// Function to find a module ID by name
async function findModuleIdByName(courseId, moduleName) {
    let url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;

    try {
        while (url) {
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                params: { per_page: 100 } // Adjust this value as needed
            });

            const modules = response.data;
            const foundModule = modules.find(module => module.name === moduleName);
            if (foundModule) return foundModule.id;

            // Check for the 'next' link in the headers to handle pagination
            const linkHeader = response.headers.link;
            if (linkHeader) {
                const links = linkHeader.split(',');
                const nextLink = links.find(link => link.includes('rel="next"'));
                if (nextLink) {
                    const match = nextLink.match(/<(.*?)>/);
                    url = match ? match[1] : null;
                } else {
                    url = null; // No more pages
                }
            } else {
                url = null; // No pagination links, so no more pages
            }
        }
    } catch (error) {
        console.error('Error finding module by name:', error);
        return null;
    }
    return null; // Return null if the module is not found after checking all pages
}

// Function to process spreadsheet data and add items to modules
async function processSpreadsheetAndAddItems(courseId, filePath) {
    try {
        const jsonData = await convertSpreadsheetToJson(filePath);

        // Create a structured representation of modules and items
        const modules = {};
        for (const item of jsonData) {
            const moduleName = item['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'];
            if (!modules[moduleName]) {
                modules[moduleName] = [];
            }
            modules[moduleName].push({
                title: item['DISPLAY TITLE for course build'],
                type: item.Category === 'Header' ? 'SubHeader' : 'Assignment'
                // Add other necessary fields for assignments
            });
        }

        // Create modules and add items in order
        for (const [moduleName, items] of Object.entries(modules)) {
            const moduleId = await findModuleIdByName(courseId, moduleName);
            if (moduleId) {
                for (const item of items) {
                    await addModuleItem(courseId, moduleId, item.title, item.type);
                }
            } else {
                console.log(`Module named '${moduleName}' not found.`);
            }
        }

    } catch (error) {
        console.error('Error processing spreadsheet:', error);
    }
}

// Main Execution
(async () => {
    await processSpreadsheetAndAddItems(courseId, spreadsheetPath);

    // Additional processing or logging can be done here

})();
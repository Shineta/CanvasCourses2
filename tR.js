const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');

const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
const courseId = '14706';
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx';
const requiredCategories = ['Required', 'Teacher', 'TCC'];

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

// Function to find a module ID by name
async function findModuleIdByName(courseId, moduleName) {
    const response = await axios.get(`${canvasDomain}/api/v1/courses/${courseId}/modules`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
        params: { per_page: 100 }
    });

    const foundModule = response.data.find(module => module.name === moduleName);
    return foundModule ? foundModule.id : null;
}

// Function to get items from a module
async function getModuleItems(courseId, moduleId) {
    try {
        const response = await axios.get(`${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            params: { per_page: 100 }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching items from module ${moduleId}:`, error);
        return [];
    }
}

// Function to add an item to a module
async function addModuleItem(courseId, moduleId, item) {
    try {
        await axios.post(`${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`, {
            module_item: item
        }, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
    } catch (error) {
        console.error(`Error adding item to module ${moduleId}:`, error);
    }
}

(async () => {
    try {
        const jsonData = await convertSpreadsheetToJson(spreadsheetPath);
        const filteredData = jsonData.filter(row =>
            requiredCategories.includes(row['Category']) &&
            row['Ed Audience/Role'] === 'Teacher'
        );

        const gradeLevelResourceId = await findModuleIdByName(courseId, "Grade-Level Resources");
        const legacyAnneFrankModuleId = await findModuleIdByName(courseId, "Unit 6 : The Legacy of Anne Frank");
        const teacherResourceModuleId = await findModuleIdByName(courseId, "G8_Unit 6: Teacher Resources (DO NOT PUBLISH)");

        if (!gradeLevelResourceId || !legacyAnneFrankModuleId || !teacherResourceModuleId) {
            throw new Error("Required modules not found");
        }

        const gradeLevelItems = await getModuleItems(courseId, gradeLevelResourceId);
        const legacyAnneFrankItems = await getModuleItems(courseId, legacyAnneFrankModuleId);

        for (const rowData of filteredData) {
            const itemName = rowData['DISPLAY TITLE for course build'];
            const sourceItem = gradeLevelItems.concat(legacyAnneFrankItems).find(item => item.title.includes(itemName));

            if (sourceItem) {
                await addModuleItem(courseId, teacherResourceModuleId, {
                    title: sourceItem.title,
                    type: sourceItem.type,
                    content_id: sourceItem.content_id,
                    position: 1 // Position can be adjusted as needed
                });
            }
        }

        console.log('Items added to Teacher Resource Module successfully');
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();

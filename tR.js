const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');

const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
const courseId = '14706';
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx';
const requiredCategories = ['Required', 'Teacher', 'TCC'];

// Helper Functions
async function axiosGet(url, params) {
    try {
        const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${accessToken}` }, params });
        return response.data;
    } catch (error) {
        console.error(`Error in GET request: ${error}`);
        return null;
    }
}

async function axiosDelete(url) {
    try {
        await axios.delete(url, { headers: { 'Authorization': `Bearer ${accessToken}` } });
        return true;
    } catch (error) {
        console.error(`Error in DELETE request: ${error}`);
        return false;
    }
}

// Main Functions
async function getFilteredSpreadsheetData() {
    try {
        const rows = await readXlsxFile(spreadsheetPath);
        const headers = rows[0];
        return rows.slice(1).filter(row => {
            const rowData = headers.reduce((obj, header, index) => ({ ...obj, [header]: row[index] }), {});
            return rowData['Ed Audience/Role'] === 'Teacher' && requiredCategories.includes(rowData['Category']);
        });
    } catch (error) {
        console.error(`Error reading spreadsheet: ${error}`);
        return [];
    }
}

async function findModuleIdByName(moduleName) {
    const modules = await axiosGet(`${canvasDomain}/api/v1/courses/${courseId}/modules`, { per_page: 100 });
    const foundModule = modules?.find(module => module.name === moduleName);
    return foundModule ? foundModule.id : null;
}

async function getModuleItems(moduleId) {
    return await axiosGet(`${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`, { per_page: 100 });
}

async function removeExtraItemsFromModules(moduleIds, validTitles) {
    let removedItems = [];
    for (const moduleId of moduleIds) {
        const items = await getModuleItems(moduleId);
        for (const item of items) {
            if (!validTitles.some(title => item.title.includes(title))) {
                const success = await axiosDelete(`${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items/${item.id}`);
                if (success) removedItems.push(item.title);
            }
        }
    }
    return removedItems;
}

// Function to remove duplicate items in a module
async function removeDuplicateItems(moduleId) {
    const items = await getModuleItems(moduleId);
    const titles = new Set();
    let removedItems = [];

    for (const item of items) {
        if (titles.has(item.title)) {
            const success = await axiosDelete(`${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items/${item.id}`);
            if (success) removedItems.push(item.title);
        } else {
            titles.add(item.title);
        }
    }
    return removedItems;
}

// Execution
(async () => {
    try {
        const gradeLevelResourceId = await findModuleIdByName("Grade-Level Resources");
        const legacyAnneFrankModuleId = await findModuleIdByName("Unit 6 : The Legacy of Anne Frank");

        if (!gradeLevelResourceId || !legacyAnneFrankModuleId) {
            throw new Error("Required modules not found");
        }

        const removedFromGradeLevel = await removeDuplicateItems(gradeLevelResourceId);
        const removedFromLegacyAnneFrank = await removeDuplicateItems(legacyAnneFrankModuleId);

        console.log(`Removed duplicate items from 'Grade-Level Resources': ${removedFromGradeLevel.join(', ')}`);
        console.log(`Removed duplicate items from 'Unit 6 : The Legacy of Anne Frank': ${removedFromLegacyAnneFrank.join(', ')}`);
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
})();

// Execution
(async () => {
    try {
        const filteredData = await getFilteredSpreadsheetData();
        const validTitles = filteredData.map(row => row['DISPLAY TITLE for course build']);

        const gradeLevelResourceId = await findModuleIdByName("Grade-Level Resources");
        const legacyAnneFrankModuleId = await findModuleIdByName("Unit 6 : The Legacy of Anne Frank");

        if (!gradeLevelResourceId || !legacyAnneFrankModuleId) {
            throw new Error("Required modules not found");
        }

        const removedItems = await removeExtraItemsFromModules([gradeLevelResourceId, legacyAnneFrankModuleId], validTitles);
        console.log(`Removed items: ${removedItems.join(', ')}`);
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
})();

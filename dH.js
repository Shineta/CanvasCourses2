const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
const courseId = '14706'; // Replace with the target course ID
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
const coursePrefix = 'G8_Unit 6:'; // Update this with the dynamic course prefix


// Function to get all modules in a course
async function getAllModules(courseId) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            params: { per_page: 100 } // Adjust if needed
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching modules:', error);
        return [];
    }
}

// Function to get all items in a module
async function getModuleItems(courseId, moduleId) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            params: { per_page: 100 } // Adjust if needed
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching module items:', error);
        return [];
    }
}

// Function to delete a module item
async function deleteModuleItem(courseId, moduleId, itemId) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items/${itemId}`;
    try {
        await axios.delete(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(`Deleted module item with ID: ${itemId}`);
    } catch (error) {
        console.error('Error deleting module item:', error);
    }
}

// Main execution function
async function removeSubheaders() {
    const modules = await getAllModules(courseId);

    for (const module of modules) {
        const items = await getModuleItems(courseId, module.id);
        for (const item of items) {
            // Assuming subheaders have a specific identifiable property
            if (item.type === 'SubHeader') { // Adjust condition as per your course structure
                await deleteModuleItem(courseId, module.id, item.id);
            }
        }
    }
}

// Call the main function
removeSubheaders();
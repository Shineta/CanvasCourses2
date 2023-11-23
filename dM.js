const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
const courseId = '14706';
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx';
const coursePrefix = 'G8_Unit 6:';
const jsonFilePath = '/workspaces/JSON2.json'; // path to save the JSON file

// Function to delete all modules in a course
async function deleteAllModules(courseId) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;
    try {
        // Get all modules
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            params: { per_page: 100 } // Adjust per_page as needed
        });
        const modules = response.data;

        // Delete each module
        for (const module of modules) {
            const deleteUrl = `${url}/${module.id}`;
            await axios.delete(deleteUrl, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            console.log(`Module with ID ${module.id} has been deleted.`);
        }
    } catch (error) {
        console.error('Error deleting modules:', error);
    }
}

// Example usage
(async () => {
    await deleteAllModules(courseId);
})();

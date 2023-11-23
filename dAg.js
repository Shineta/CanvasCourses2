const axios = require('axios');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
const courseId = '14706';

// Function to get all assignment groups in a course
async function getAssignmentGroups(courseId) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignment_groups`;
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting assignment groups:', error);
        return [];
    }
}

// Function to delete an assignment group
async function deleteAssignmentGroup(courseId, groupId) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignment_groups/${groupId}`;
    try {
        await axios.delete(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(`Deleted assignment group with ID: ${groupId}`);
    } catch (error) {
        console.error(`Error deleting assignment group with ID ${groupId}:`, error);
    }
}

// Main function to delete all assignment groups in a course
async function deleteAllAssignmentGroups(courseId) {
    const groups = await getAssignmentGroups(courseId);
    for (const group of groups) {
        await deleteAssignmentGroup(courseId, group.id);
    }
}

// Execute the main function
deleteAllAssignmentGroups(courseId);

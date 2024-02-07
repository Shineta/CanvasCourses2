const axios = require('axios');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
const courseId = '14706';

// Function to get all assignments
async function getAllAssignments(courseId) {
    try {
        const response = await axios.get(`${canvasDomain}/api/v1/courses/${courseId}/assignments`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            params: { per_page: 100 }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return [];
    }
}

// Function to delete an assignment
async function deleteAssignment(courseId, assignmentId) {
    try {
        await axios.delete(`${canvasDomain}/api/v1/courses/${courseId}/assignments/${assignmentId}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(`Deleted assignment ID ${assignmentId}`);
    } catch (error) {
        console.error(`Error deleting assignment ID ${assignmentId}:`, error);
    }
}

// Main execution
(async () => {
    const assignments = await getAllAssignments(courseId);
    for (const assignment of assignments) {
        await deleteAssignment(courseId, assignment.id);
    }
})();


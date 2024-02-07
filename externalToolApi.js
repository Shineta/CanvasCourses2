const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const coursePrefix = 'G8_Unit 6:'; // dynamic course prefix

// Canvas API endpoint
const canvasBaseUrl = 'https://hmh.instructure.com';

// Canvas access token
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';

const canvasDomain = 'https://hmh.instructure.com/';

// Canvas course ID
const courseId = '14706';

async function listExternalTools(courseId, accessToken) {
    const canvasBaseUrl = canvasDomain; // Replace with your Canvas domain
    const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/external_tools`;

    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching external tools:', error);
        return null;
    }
}

listExternalTools(courseId, accessToken)
    .then(tools => {
        if (tools) {
            console.log('External Tools:', tools);
        }
    });


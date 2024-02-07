const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');

const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
const courseId = '14728';
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG6U5CCSDContentsInput.xlsx';

async function readSpreadsheet() {
    let spreadsheetData = [];
    try {
        const rows = await readXlsxFile(spreadsheetPath);
        spreadsheetData = rows.slice(1).filter(row => 
            (row[26] === 'Required' || row[26] === '[header]') && 
            row[25] === 'Student'
        ).map(row => ({
            module: row[27],
            assignmentTitle: row[30]
        }));
    } catch (error) {
        console.error('Error reading spreadsheet:', error);
    }
    console.log("Spreadsheet data:", spreadsheetData);
    return spreadsheetData;
    
}

async function getCanvasAssignments() {
    let assignments = [];
    try {
        let url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
        while (url) {
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                params: { per_page: 100 }
            });
            assignments = assignments.concat(response.data);
            url = getNextLink(response.headers.link);
        }
    } catch (error) {
        console.error('Error getting assignments from Canvas:', error);
    }
    console.log("Canvas assignments:", assignments);
    return assignments;
}

function getNextLink(linkHeader) {
    if (linkHeader) {
        const nextLink = linkHeader.split(',').find(link => link.includes('rel="next"'));
        if (nextLink) {
            const match = nextLink.match(/<(.*?)>/);
            return match ? match[1] : null;
        }
    }
    return null;
}












async function validateAssignmentsOrder() {
    const spreadsheetData = await readSpreadsheet();
    const canvasAssignments = await getCanvasAssignments();

    // Create a set of all assignment titles in Canvas for easy lookup
    const canvasAssignmentTitles = new Set(canvasAssignments.map(a => a.name));

    // Check for missing assignments
    const missingAssignments = spreadsheetData.filter(item => !canvasAssignmentTitles.has(item.assignmentTitle));
    if (missingAssignments.length > 0) {
        console.log("Missing assignments (in spreadsheet but not in Canvas):");
        missingAssignments.forEach(item => console.log(item.assignmentTitle));
    } else {
        console.log("No missing assignments.");
    }


    // Map assignment titles to their Canvas module names
    const canvasAssignmentMap = canvasAssignments.reduce((acc, assignment) => {
        acc[assignment.name] = assignment.assignment_group_id; // Assuming group ID is equivalent to module name
        return acc;
    }, {});

    // Compare and validate
    spreadsheetData.forEach((item, index) => {
        if (canvasAssignmentMap[item.assignmentTitle]) {
            if (canvasAssignmentMap[item.assignmentTitle] !== item.module) {
                console.log(`Mismatch found for "${item.assignmentTitle}". Expected module: ${item.module}, Found in Canvas module: ${canvasAssignmentMap[item.assignmentTitle]}`);
            }
        } else {
            console.log(`Assignment "${item.assignmentTitle}" not found in Canvas.`);
        }
    });

    if (spreadsheetData.length === 0) {
        console.log("No data found in spreadsheet.");
    }
    if (canvasAssignments.length === 0) {
        console.log("No assignments found in Canvas.");
    }

    let orderIssues = [];

    // Assuming spreadsheetData and canvasAssignments are arrays and have been populated correctly
    for (let i = 0; i < spreadsheetData.length; i++) {
        const expectedAssignment = spreadsheetData[i];
        const actualAssignment = canvasAssignments[i];

        if (!actualAssignment || actualAssignment.title !== expectedAssignment.assignmentTitle) {
            orderIssues.push(`Order issue at position ${i + 1}: Expected '${expectedAssignment.assignmentTitle}', found '${actualAssignment ? actualAssignment.title : "None"}'`);
            // Continue to next iteration without further checks
            continue;
        }

        // Additional checks can be performed here, such as verifying assignment groups
    }

    if (orderIssues.length > 0) {
        console.log("Order issues found:", orderIssues.join("\n"));
    } else {
        console.log("All assignments are in the correct order.");
    }
}

validateAssignmentsOrder();

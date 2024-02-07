// const axios = require('axios');
// const readXlsxFile = require('read-excel-file/node');
// const canvasDomain = 'https://hmh.instructure.com';
// const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // access token
// const courseId = '14706'; // Replace with the target course ID
// const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
// const coursePrefix = 'G8_Unit 6:'; // Update this with the dynamic course prefix
// const createAssignment = require('./assignmentTest.js');

// // Function to read the spreadsheet and convert it to JSON
// async function convertSpreadsheetToJson(filePath) {
//     try {
//         const rows = await readXlsxFile(filePath);
//         const headers = rows[0];
//         const jsonData = rows.slice(1).map(row => {
//             let rowData = {};
//             row.forEach((value, index) => {
//                 rowData[headers[index]] = value;
//             });
//             return rowData;
//         });
//         return jsonData;
//     } catch (error) {
//         console.error('Error reading spreadsheet:', error);
//         return [];
//     }
// }

// // Function to get iFrame URL from spreadsheet based on assignment title
// async function getIframeUrlForAssignment(assignmentTitle) {
//     const iframeSpreadsheetPath = '/workspaces/CanvasCourses2/module_items.xlsx';
//     try {
//         const rows = await readXlsxFile(iframeSpreadsheetPath);
//         const titleIndex = rows[0].indexOf('title');
//         const iframeIndex = rows[0].indexOf('iframe'); // Replace with the actual column index for iFrame URL

//         for (const row of rows.slice(1)) {
//             if (row[titleIndex] === `Student Edition - ${assignmentTitle}`) {
//                 return row[iframeIndex]; // Return the iFrame URL
//             }
//         }
//     } catch (error) {
//         console.error('Error reading iFrame spreadsheet:', error);
//     }
//     return null;
// }

// // Function to update an assignment with iFrame
// async function updateAssignmentWithIframe(courseId, assignmentId, iframeUrl) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments/${assignmentId}`;
//     const iframeHtml = `<iframe src="${iframeUrl}" width="100%" height="600px"></iframe>`; // Adjust iframe attributes as needed

//     const data = {
//         assignment: {
//             description: iframeHtml // Update the assignment description with the iFrame HTML
//         }
//     };

//     try {
//         await axios.put(url, data, {
//             headers: { 'Authorization': `Bearer ${accessToken}` }
//         });
//         console.log(`Assignment ID ${assignmentId} updated with iFrame.`);
//     } catch (error) {
//         console.error('Error updating assignment with iFrame:', error);
//     }
// }


// // Function to read module items data from the spreadsheet
// async function readModuleItemsFromSpreadsheet(filePath) {
//     try {
//         const rows = await readXlsxFile(filePath);
//         const headers = rows[0];
//         const jsonData = rows.slice(1).map(row => {
//             let rowData = {};
//             row.forEach((value, index) => {
//                 rowData[headers[index]] = value;
//             });
//             return rowData;
//         });
//         return jsonData;
//     } catch (error) {
//         console.error('Error reading module items spreadsheet:', error);
//         return [];
//     }
// }

// /// Function to find the iFrame address based on a partial match of the assignment title and role ('Student')
// function findIFrameAddress(moduleItemsData, assignmentTitle) {
//     const matchingModuleItems = moduleItemsData.filter(item => {
//         // Check if the assignment title includes 'Student' and if the 'decodedParams' is available
//         if (assignmentTitle.includes('Student') && item['decodedParams']) {
//             // Check if the title includes the assignment title (case-insensitive) and 'Student'
//             return item['title'].toLowerCase().includes(assignmentTitle.toLowerCase());
//         }
//         return false;
//     });
//     if (matchingModuleItems.length > 0) {
//         return matchingModuleItems[0]['decodedParams']; // Assuming you want the first match
//     }
//     return null;
// }


// // Main Execution
// (async () => {
//     // Step 1: Create Modules
//     // ... (Existing code for module creation) ...

//     // Step 2: Create Assignment Groups
//     // ... (Existing code for assignment group creation) ...

//     // Step 3: Convert the spreadsheet data to JSON
//     const jsonData = await convertSpreadsheetToJson(spreadsheetPath);

//     // Step 4: Filter and create assignments with points
//     const studentAssignments = jsonData.filter(row => row['Ed Audience/Role'] === 'Student')
//     .map(row => {
//         return {
//             module: row['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'],
//             assignmentTitle: row['DISPLAY TITLE for course build']
//         };
//     });


//     // Step 5: Read module items data from the spreadsheet
//     const moduleItemsData = await readModuleItemsFromSpreadsheet('/workspaces/CanvasCourses2/module_items.xlsx');

//     // Step 6: Create assignments in Canvas
//     for (let assignment of jsonData.filter(row => row['Ed Audience/Role'] === 'Student' && row['Category'].toLowerCase() === 'required')) {
//                         const createdAssignment = await createAssignment(courseId, {
//                             assignmentName: assignment['DISPLAY TITLE for course build'],
//                             points: parseFloat(assignment['Points'])
//                         });
                
//                         if (createdAssignment) {
//                             const iframeUrl = await getIframeUrlForAssignment(assignment['Display Title on Ed'], moduleItemsData);
//                             if (iframeUrl) {
//                                 await updateAssignmentWithIframe(courseId, createdAssignment.id, iframeUrl);
//                             } else {
//                                 console.log(`iFrame URL not found for assignment: ${assignment['Display Title on Ed']}`);
//                             }
//                         }
//                     }
                
//                     for (let assignment of jsonData.filter(row => row['Ed Audience/Role'] === 'Student' && row['Category'].toLowerCase() === 'required')) {
//                         const iframeUrl = findIFrameAddress(moduleItemsData, assignment['Display Title on Ed']);
//                         if (iframeUrl) {
//                             await createAssignmentWithIFrame(courseId, assignment['Display Title on Ed'], iframeUrl);
//                         } else {
//                             console.log(`iFrame URL not found for assignment: ${assignment['Display Title on Ed']}`);
//                         }
//                     }

//     // Step 9: Add all assignments as module items
//     await addAllAssignmentsAsModuleItems(courseId, jsonData);

//     // Step 10: Create a new page and add it to the module
//     const pageTitle = "Important Unit Design and Support Information";
//     const pageContent = `<iframe src="YOUR_IFRAME_URL_HERE" frameborder="0" allowfullscreen="true"></iframe>`;
//     const moduleName = "G8_Unit 6: Course Overview (DO NOT PUBLISH)";
//     const newPage = await createCoursePage(courseId, pageTitle, pageContent);

//     if (newPage) {
//         const moduleId = await findModuleIdByName(courseId, moduleName);
//         if (moduleId) {
//             await addPageToModule(courseId, moduleId, newPage.url, pageTitle);
//         } else {
//             console.log(`Module named '${moduleName}' not found.`);
//         }
//     }

//     // Optional: Delete a specific module and assignment group
//     await findAndDeleteModule(courseId, "NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE");
// })();



// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////+++++++++++++++++++New Test 12-19-23+++++++++++++++++++++++++++++++++++/////////////////////////////////

// const axios = require('axios');
// const readXlsxFile = require('read-excel-file/node');
// const canvasDomain = 'https://hmh.instructure.com';
// const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
// const courseId = '14706'; // Replace with the target course ID
// const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
// const coursePrefix = 'G8_Unit 6:'; // Update this with the dynamic course prefix
// const moduleItemsPath = '/workspaces/CanvasCourses2/module_items_updated.xlsx'; // Update with your actual file path
// // const convertSpreadsheetToJson = require('./assignmentTest.js'); 
// // const createAssignment = require('./assignmentTest.js');


// async function fetchAllAssignments(courseId) {
//     let url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     let allAssignments = [];

//     try {
//         while (url) {
//             const response = await axios.get(url, {
//                 headers: { 'Authorization': `Bearer ${accessToken}` },
//                 params: { per_page: 100 }
//             });
//             allAssignments = allAssignments.concat(response.data);

//             url = null; // Reset URL
//             const linkHeader = response.headers.link;
//             if (linkHeader) {
//                 const nextLink = linkHeader.split(',').find(link => link.includes('rel="next"'));
//                 if (nextLink) {
//                     const match = nextLink.match(/<(.*?)>/);
//                     url = match ? match[1] : null;
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error fetching all assignments:', error);
//     }
//     return allAssignments;
// }

// // function findIFrameAddress(moduleItemsData, displayTitleOnEd) {
// //     // Normalize the display title for comparison
// //     const normalizedDisplayTitle = displayTitleOnEd.toLowerCase().replace(/\s+/g, '');

// //     // Filter the moduleItemsData to find a matching title
// //     const matchingModuleItems = moduleItemsData.filter(item => {
// //         // Normalize the item title
// //         const normalizedItemTitle = item['Title After Hyphen'].toLowerCase().replace(/\s+/g, '');
// //         // Check if the normalized titles match
// //         return normalizedItemTitle.includes(normalizedDisplayTitle);
// //     });

// //     // If a match is found, return the iFrame URL from the 'decodedParams' field
// //     if (matchingModuleItems.length > 0) {
// //         return matchingModuleItems[0]['decodedParams'];
// //     } else {
// //         console.log(`iFrame URL not found for assignment with display title: ${displayTitleOnEd}`);
// //         return null;
// //     }
// // }


// // Function to find the iFrame address based on a partial match of the assignment title
// function findIFrameAddress(moduleItemsData, assignmentTitle) {
//     const moduleItem = moduleItemsData.find(item => assignmentTitle.includes(item['Title After Hyphen']));
//     if (moduleItem && moduleItem['decodedParams']) {
//         return moduleItem['decodedParams'];
//     }
//     return null;
// }



// // // Function to find the iFrame address based on a partial match of the assignment title and role ('Student')
// // function findIFrameAddress(moduleItemsData, assignmentTitle) {
// //     const matchingModuleItems = moduleItemsData.filter(item => {
// //         // Check if the assignment title includes 'Student' and if the 'decodedParams' is available
// //         if (assignmentTitle.includes('Student') && item['decodedParams']) {
// //             // Check if the title includes the assignment title (case-insensitive) and 'Student'
// //             return item['Title After Hyphen'].toLowerCase().includes(assignmentTitle.toLowerCase());
// //         }
// //         return false;
// //     });
// //     if (matchingModuleItems.length > 0) {
// //         return matchingModuleItems[0]['decodedParams']; // Assuming you want the first match
// //     }
// //     return null;
// // }

// // Function to read a specific column from a spreadsheet
// async function readColumnFromSpreadsheet(filePath, columnName) {
//     try {
//         const rows = await readXlsxFile(filePath);
//         const headerRow = rows[0];
//         const columnIndex = headerRow.findIndex(header => header === columnName);
//         if (columnIndex === -1) {
//             console.error(`Column '${columnName}' not found in the spreadsheet.`);
//             return [];
//         }
//         return rows.slice(1).map(row => row[columnIndex]);
//     } catch (error) {
//         console.error('Error reading spreadsheet:', error);
//         return [];
//     }
// }

// // Function to get assignments in the course
// async function getAssignmentsInCourse(courseId) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;

//     try {
//         const response = await axios.get(url, {
//             headers: { 'Authorization': `Bearer ${accessToken}` }
//         });

//         return response.data;
//     } catch (error) {
//         console.error('Error fetching assignments:', error);
//         return [];
//     }
// }

// // Function to find the iFrame address based on a partial match of assignment title
// async function findIFrameAddressByPartialMatch(moduleItems, partialTitle) {
//     const matchingItem = moduleItems.find(item => item.title.includes(partialTitle));
//     return matchingItem ? matchingItem.url : null;
// }

// // Main function to log assignment titles and iFrame addresses
// async function logAssignmentTitlesAndIFrameAddresses() {
//     const assignmentColumn = 'Display Title on Ed'; // Adjust to your column name
//     const moduleItemsColumn = 'Title After Hyphen'; // Adjust to your column name

//     // Read assignment titles from the first spreadsheet
//     const assignmentTitles = await readColumnFromSpreadsheet(spreadsheetPath, assignmentColumn);

//     // Read module items from the second spreadsheet
//     const moduleItems = await readColumnFromSpreadsheet(moduleItemsPath, moduleItemsColumn);

//     if (assignmentTitles.length === 0 || moduleItems.length === 0) {
//         console.error('No data found in one of the spreadsheets.');
//         return;
//     }

//     // Get assignments in the course
//     const assignments = await getAssignmentsInCourse(courseId);

//     // Iterate through assignments and find iFrame addresses
//     for (const assignment of assignments) {
//         if (assignment.submission_types.includes('online_upload')) {
//             // Check if the assignment role is 'Student'
//             if (assignment.education_level === 'student') {
//                 const assignmentTitle = assignment.title;

//                 // Find the iFrame address based on a partial match of the assignment title
//                 const iFrameAddress = await findIFrameAddressByPartialMatch(moduleItems, assignmentTitle);

//                 // Log assignment title and iFrame address
//                 console.log(`Assignment Title: ${assignmentTitle}`);
//                 console.log(`IFrame Address: ${iFrameAddress || 'Not found'}`);
//             }
//         }
//     }
// }

// logAssignmentTitlesAndIFrameAddresses().catch(error => {
//     console.error("An error occurred:", error);
// });






// async function updateAssignmentDescription(courseId, assignmentId, newDescription) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments/${assignmentId}`;

//     try {
//         await axios.put(url, {
//             assignment: {
//                 description: newDescription
//             }
//         }, {
//             headers: { 'Authorization': `Bearer ${accessToken}` }
//         });
//         console.log(`Updated assignment ID ${assignmentId} with new description.`);
//     } catch (error) {
//         console.error(`Error updating assignment ID ${assignmentId}:`, error);
//     }
// }

// // Function to read the "module_items.xlsx" spreadsheet and extract iFrame addresses
// async function readModuleItemsSpreadsheet(filePath) {
//     try {
//         const rows = await readXlsxFile(filePath);
//         const headers = rows[0];
//         const jsonData = rows.slice(1).map(row => {
//             let rowData = {};
//             row.forEach((value, index) => {
//                 rowData[headers[index]] = value;
//             });
//             return rowData;
//         });
//         return jsonData;
//     } catch (error) {
//         console.error('Error reading module_items spreadsheet:', error);
//         return [];
//     }
// }


// // (async () => {
// //     // Read module items data from the spreadsheet to get iFrame URLs
// //     const moduleItemsData = await readModuleItemsSpreadsheet(moduleItemsPath);

// //     // Fetch all assignments
// //     const assignments = await fetchAllAssignments(courseId);

// //     // Iterate over each assignment
// //     for (const assignment of assignments) {
// //         // Find the iFrame URL for the assignment
// //         const iFrameUrl = findIFrameAddress(moduleItemsData, assignment.name);

// //         // Check if the iFrame URL is found
// //         if (iFrameUrl) {
// //             // Update the assignment description with the iFrame
// //             const newDescription = `${assignment.description}\n\n<iframe src="${iFrameUrl}" width="100%" height="600px" frameborder="0" allowfullscreen="true"></iframe>`;
// //             await updateAssignmentDescription(courseId, assignment.id, newDescription);
// //         } else {
// //             console.log(`iFrame URL not found for assignment: ${assignment.name}`);
// //         }
// //     }
// // })()

// (async () => {
//     // Read module items data from the spreadsheet to get iFrame URLs
//     const moduleItemsData = await readModuleItemsSpreadsheet(moduleItemsPath);

//     // Fetch all assignments
//     const assignments = await fetchAllAssignments(courseId);

   

//     // Iterate over each assignment
//     for (const assignment of assignments) {
//         // Find the iFrame URL for the assignment
//         const iFrameUrl = findIFrameAddress(moduleItemsData, assignment.name);

//         // Check if the iFrame URL is found
//         if (iFrameUrl) {
//             // Update the assignment description with the iFrame
//             const newDescription = `${assignment.description}\n\n<iframe src="${iFrameUrl}" width="100%" height="600px" frameborder="0" allowfullscreen="true"></iframe>`;
//             await updateAssignmentDescription(courseId, assignment.id, newDescription);
//         } else {
//             console.log(`iFrame URL not found for assignment: ${assignment.name}`);
//         }
//     }
// })();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////+++++++++++++++++++New Test 12-20-23+++++++++++++++++++++++++++++++++++/////////////////////////////////
//*************This Code now updates all assignments and adds iFrames with urls, Not all urls are correct*************************************************** */
const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
const courseId = '14706'; // Replace with the target course ID
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
const coursePrefix = 'G8_Unit 6:'; // Update this with the dynamic course prefix
const moduleItemsPath = '/workspaces/CanvasCourses2/module_items_updated2.xlsx'; // Update with your actual file path



async function fetchAllAssignments(courseId) {
    let url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
    let allAssignments = [];

    try {
        while (url) {
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                params: { per_page: 100 }
            });
            allAssignments = allAssignments.concat(response.data);

            url = " "; // Reset URL
            const linkHeader = response.headers.link;
            if (linkHeader) {
                const nextLink = linkHeader.split(',').find(link => link.includes('rel="next"'));
                if (nextLink) {
                    const match = nextLink.match(/<(.*?)>/);
                    url = match ? match[1] : null;
                }
            }
        }
    } catch (error) {
        console.error('Error fetching all assignments:', error);
    }
    return allAssignments;
}



// Function to find the iFrame address based on a partial match of the assignment title
function findIFrameAddress(moduleItemsData, assignmentTitle) {
    const moduleItem = moduleItemsData.find(item => assignmentTitle.includes(item['Title After Hyphen']));
    if (moduleItem && moduleItem['decodedParams']) {
        return moduleItem['decodedParams'];
    }
    // return null;
}

// Function to read a specific column from a spreadsheet
async function readColumnFromSpreadsheet(filePath, columnName) {
    try {
        const rows = await readXlsxFile(filePath);
        const headerRow = rows[0];
        const columnIndex = headerRow.findIndex(header => header === columnName);
        if (columnIndex === -1) {
            console.error(`Column '${columnName}' not found in the spreadsheet.`);
            return [];
        }
        return rows.slice(1).map(row => row[columnIndex]);
    } catch (error) {
        console.error('Error reading spreadsheet:', error);
        return [];
    }
}

// Function to get assignments in the course
async function getAssignmentsInCourse(courseId) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;

    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return [];
    }
}

// Function to find the iFrame address based on a partial match of assignment title
async function findIFrameAddressByPartialMatch(moduleItems, partialTitle) {
    const matchingItem = moduleItems.find(item => item.title.includes(partialTitle));
    return matchingItem ? matchingItem.url : null;
}

// Main function to log assignment titles and iFrame addresses
async function logAssignmentTitlesAndIFrameAddresses() {
    const assignmentColumn = 'Display Title on Ed'; // Adjust to your column name
    const moduleItemsColumn = 'Title After Hyphen'; // Adjust to your column name

    // Read assignment titles from the first spreadsheet
    const assignmentTitles = await readColumnFromSpreadsheet(spreadsheetPath, assignmentColumn);

    // Read module items from the second spreadsheet
    const moduleItems = await readColumnFromSpreadsheet(moduleItemsPath, moduleItemsColumn);

    if (assignmentTitles.length === 0 || moduleItems.length === 0) {
        console.error('No data found in one of the spreadsheets.');
        return;
    }

    // Get assignments in the course
    const assignments = await getAssignmentsInCourse(courseId);

    // Iterate through assignments and find iFrame addresses
    for (const assignment of assignments) {
        if (assignment.submission_types.includes('online_upload')) {
            // Check if the assignment role is 'Student'
            if (assignment.education_level === 'student') {
                const assignmentTitle = assignment.title;

                // Find the iFrame address based on a partial match of the assignment title
                const iFrameAddress = await findIFrameAddressByPartialMatch(moduleItems, assignmentTitle);

                // Log assignment title and iFrame address
                console.log(`Assignment Title: ${assignmentTitle}`);
                console.log(`IFrame Address: ${iFrameAddress || 'Not found'}`);
            }
        }
    }
}

logAssignmentTitlesAndIFrameAddresses().catch(error => {
    console.error("An error occurred:", error);
});






async function updateAssignmentDescription(courseId, assignmentId, newDescription) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments/${assignmentId}`;

    try {
        await axios.put(url, {
            assignment: {
                description: newDescription
            }
        }, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(`Updated assignment ID ${assignmentId} with new description.`);
    } catch (error) {
        console.error(`Error updating assignment ID ${assignmentId}:`, error);
    }
}

// Function to read the "module_items.xlsx" spreadsheet and extract iFrame addresses
async function readModuleItemsSpreadsheet(filePath) {
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
        console.error('Error reading module_items spreadsheet:', error);
        return [];
    }
}


(async () => {
    // Read module items data from the spreadsheet to get iFrame URLs
    const moduleItemsData = await readModuleItemsSpreadsheet(moduleItemsPath);

    // Fetch all assignments
    const assignments = await fetchAllAssignments(courseId);

   

    // Iterate over each assignment
    for (const assignment of assignments) {
        // Find the iFrame URL for the assignment
        const iFrameUrl = findIFrameAddress(moduleItemsData, assignment.name);

        // Check if the iFrame URL is found
        if (iFrameUrl) {
            // Update the assignment description with the iFrame
            const newDescription = `${assignment.description}\n\n<iframe src="${iFrameUrl}" width="100%" height="600px" frameborder="0" allowfullscreen="true"></iframe>`;
            await updateAssignmentDescription(courseId, assignment.id, newDescription);
        } else {
            console.log(`iFrame URL not found for assignment: ${assignment.name}`);
        }
    }
})();
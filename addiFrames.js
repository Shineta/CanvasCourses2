const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
const courseId = '14706'; // Replace with the target course ID
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
const coursePrefix = 'G8_Unit 6:'; // Update this with the dynamic course prefix
const moduleItemsPath = '/workspaces/CanvasCourses2/module_items.xlsx'; // Update with your actual file path
// const convertSpreadsheetToJson = require('./assignmentTest.js'); 
// const createAssignment = require('./assignmentTest.js');


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

// function findIFrameAddress(moduleItemsData, displayTitleOnEd) {
//     // Normalize the display title for comparison
//     const normalizedDisplayTitle = displayTitleOnEd.toLowerCase().replace(/\s+/g, '');

//     // Filter the moduleItemsData to find a matching title
//     const matchingModuleItems = moduleItemsData.filter(item => {
//         // Normalize the item title
//         const normalizedItemTitle = item['title'].toLowerCase().replace(/\s+/g, '');
//         // Check if the normalized titles match
//         return normalizedItemTitle.includes(normalizedDisplayTitle);
//     });

//     // If a match is found, return the iFrame URL from the 'decodedParams' field
//     if (matchingModuleItems.length > 0) {
//         return matchingModuleItems[0]['decodedParams'];
//     } else {
//         console.log(`iFrame URL not found for assignment with display title: ${displayTitleOnEd}`);
//         return null;
//     }
// }






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


// ///////////////////////////////////////New Test 12-18-23////////////////////////////////////////////////////////////////////////
// const axios = require('axios');
// const readXlsxFile = require('read-excel-file/node');
// const coursePrefix = 'G8_Unit 6:'; // dynamic course prefix

// // Canvas API endpoint
// const canvasBaseUrl = 'https://hmh.instructure.com';

// // Canvas access token
// const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';

// const canvasDomain = 'https://hmh.instructure.com/';

// // Canvas course ID
// const courseId = '14706';

// const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
// const moduleItemsPath = '/workspaces/CanvasCourses2/module_items.xlsx'; // Update with your actual file path

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

// // Use the function to convert and then filter and log the required data
// convertSpreadsheetToJson(spreadsheetPath).then(jsonData => {
//     const studentAssignments = jsonData.filter(row => row['Ed Audience/Role'] === 'Student')
//         .map(row => {
//             return {
//                 module: row['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'],
//                 assignmentTitle: row['DISPLAY TITLE for course build']
//             };
//         });
//     console.log(studentAssignments);
// });

// // Function to read the spreadsheet and convert it to JSON
// async function convertSpreadsheetToJson(filePath) {
//     try {
//         const rows = await readXlsxFile(filePath);
//         // Assuming the first row contains the headers
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



// // Use the function
// convertSpreadsheetToJson(spreadsheetPath).then(jsonData => {
//     console.log(JSON.stringify(jsonData, null, 2));
// });


// // // Function to add assignments to their respective groups
// // async function addAssignmentsToGroups(courseId, assignmentsData) {
// //     for (const assignmentData of assignmentsData) {
// //         const groupId = await findAssignmentGroupIdByName(courseId, assignmentData.assignmentGroup);
// //         if (groupId) {
// //             assignmentData.assignment_group_id = groupId; // Set the group ID for the assignment
// //             await createAssignment(courseId, assignmentData);
// //         } else {
// //             console.log(`Assignment group '${assignmentData.assignmentGroup}' not found.`);
// //         }
// //     }
// // }

// // async function readUniqueModulesFromSpreadsheet(filePath, columnIndex = 27) {
// //     try {
// //         const rows = await readXlsxFile(filePath);
// //         const allItems = rows.map(row => row[columnIndex]).filter(Boolean); // Filter out empty or null values
// //         const uniqueItems = [...new Set(allItems)]; // Remove duplicates
// //         return uniqueItems;
// //     } catch (error) {
// //         console.error('Error reading spreadsheet:', error);
// //         return [];
// //     }
// // }




// // async function createModule(courseId, moduleName) {
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;
// //     const data = {
// //         module: {
// //             name: moduleName
// //             // Add other module attributes as needed
// //         }
// //     };


// //     try {
// //         const response = await axios.post(url, data, {
// //             headers: { 'Authorization': `Bearer ${accessToken}` }
// //         });
// //         return response.data; // Returns the created module object
// //     } catch (error) {
// //         console.error('Error creating module:', error);
// //     }
// // }


// // async function findModuleIdByName(courseId, moduleName) {
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;


// //     try {
// //         const response = await axios.get(url, {
// //             headers: { 'Authorization': `Bearer ${accessToken}` },
// //             params: {
// //                 per_page: 100 // Adjust depending on the number of modules
// //             }
// //         });


// //         const modules = response.data;
// //         const foundModule = modules.find(module => module.name === moduleName);
// //         return foundModule ? foundModule.id : null;
// //     } catch (error) {
// //         console.error('Error finding module:', error);
// //         return null;
// //     }
// // }


// // async function deleteModule(courseId, moduleId) {
// //     if (!moduleId) {
// //         console.log('Module ID not provided.');
// //         return;
// //     }


// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}`;


// //     try {
// //         await axios.delete(url, {
// //             headers: { 'Authorization': `Bearer ${accessToken}` }
// //         });
// //         console.log(`Module with ID ${moduleId} has been deleted.`);
// //     } catch (error) {
// //         console.error('Error deleting module:', error);
// //     }
// // }


// // async function automateModuleCreation() {
// //     let moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);


// //     // Filter out and prepend 'Teacher Resources' modules
// //     const teacherResourcesModules = moduleNames.filter(name => name.includes("Teacher Resources")).map(name => name + " (DO NOT PUBLISH)");
// //     const otherModules = moduleNames.filter(name => !name.includes("Teacher Resources"));


// //     // Add the custom course overview module
// //     const customOverviewModule = `${coursePrefix} Course Overview (DO NOT PUBLISH)`;
// //     moduleNames = [customOverviewModule, ...teacherResourcesModules, ...otherModules];


// //     for (const moduleName of moduleNames) {
// //         const newModule = await createModule(courseId, moduleName);
// //         console.log(`Created module: ${moduleName}`);
// //     }
// // }


// // async function findAndDeleteModule(courseId, moduleNameToDelete) {
// //     const moduleId = await findModuleIdByName(courseId, moduleNameToDelete);
// //     if (moduleId) {
// //         await deleteModule(courseId, moduleId);
// //     } else {
// //         console.log(`Module named "${moduleNameToDelete}" not found.`);
// //     }
// // }

// // // Function to add a module item
// // async function addModuleItem(courseId, moduleId, title, type = 'Assignment') {
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
// //     const data = {
// //       module_item: {
// //         title: title,
// //         type: type,
// //         // Additional fields like 'content_id' can be added here if needed
// //       }
// //     };
  
// //     try {
// //       const response = await axios.post(url, data, {
// //         headers: {
// //           'Authorization': `Bearer ${accessToken}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });
// //       console.log(`Module item '${title}' added to module ID ${moduleId}`);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error adding module item:', error);
// //     }
// //   }
  

// //   // Function to create an assignment group
// // async function createAssignmentGroup(courseId, groupName) {
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignment_groups`;
// //     const data = { name: groupName };
// //     try {
// //         const response = await axios.post(url, data, {
// //             headers: { 'Authorization': `Bearer ${accessToken}` }
// //         });
// //         console.log(`Created assignment group: ${groupName}`);
// //         return response.data;
// //     } catch (error) {
// //         console.error(`Error creating assignment group: ${groupName}`, error);
// //     }
// // }


// // // Function to automate module and assignment group creation
// // async function automateModuleAndAssignmentGroupCreation() {
// //     let moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);
// //     // ... existing module processing ...




// //     for (const moduleName of moduleNames) {
// //         if (!moduleName.includes("Teacher Resources") && !moduleName.includes("Course Overview")) {
// //             await createAssignmentGroup(courseId, moduleName);
// //         }
// //     }
// // }

// // // Function to find an assignment group ID by name
// // async function findAssignmentGroupIdByName(courseId, groupName) {
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignment_groups`;
// //     try {
// //         const response = await axios.get(url, {
// //             headers: { 'Authorization': `Bearer ${accessToken}` },
// //             params: {
// //                 per_page: 100
// //             }
// //         });
// //         const groups = response.data;
// //         const foundGroup = groups.find(group => group.name === groupName);
// //         return foundGroup ? foundGroup.id : null;
// //     } catch (error) {
// //         console.error('Error finding assignment group:', error);
// //         return null;
// //     }
// // }

// // // Function to read the spreadsheet and convert it to JSON
// // async function convertSpreadsheetToJson(filePath) {
// //     try {
// //         const rows = await readXlsxFile(filePath);
// //         const headers = rows[0];
// //         return rows.slice(1).map(row => headers.reduce((acc, header, index) => {
// //             acc[header] = row[index];
// //             return acc;
// //         }, {}));
// //     } catch (error) {
// //         console.error('Error reading spreadsheet:', error);
// //         return [];
// //     }
// // }

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

// // Function to create an assignment with an iFrame
// async function createAssignmentWithIFrame(courseId, assignmentTitle, iFrameAddress) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const data = {
//         assignment: {
//             name: assignmentTitle,
//             description: `<iframe src="${iFrameAddress}" frameborder="0" allowfullscreen="true"></iframe>`,
//             submission_types: ['external_tool'],
//             external_tool_tag_attributes: {
//                 url: iFrameAddress,
//                 new_tab: true
//             }
//         }
//     };

//     try {
//         const response = await axios.post(url, data, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log(`Assignment created with iFrame: ${assignmentTitle}`);
//     } catch (error) {
//         console.error('Error creating assignment with iFrame:', error);
//     }
// }

// function findIFrameAddress(moduleItemsData, assignmentTitle) {
//     const normalizedTitle = assignmentTitle.toLowerCase().replace(/\s+/g, '');
//     const matchingModuleItems = moduleItemsData.filter(item => {
//         const normalizedItemTitle = item['title'].toLowerCase().replace(/\s+/g, '');
//         return normalizedItemTitle.includes(normalizedTitle);
//     });

//     if (matchingModuleItems.length > 0) {
//         return matchingModuleItems[0]['decodedParams']; // Assuming 'decodedParams' contains the iFrame URL
//     } else {
//         console.log(`iFrame URL not found for assignment: ${assignmentTitle}`);
//         return null;
//     }
// }


// // Function to get iFrame URL from spreadsheet based on assignment title
// async function getIframeUrlForAssignment(assignmentTitle, moduleItemsData) {
//     const iframeUrl = findIFrameAddress(moduleItemsData, assignmentTitle);
//     if (!iframeUrl) {
//         console.error(`iFrame URL not found for assignment: ${assignmentTitle}`);
//         return null;
//     }
//     return iframeUrl;
// }

// async function createAssignmentWithIFrame(courseId, assignmentTitle, iFrameAddress) {
//     if (!iFrameAddress) {
//         console.log(`Skipping assignment creation for '${assignmentTitle}' due to missing iFrame URL.`);
//         return;
//     }

//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const data = {
//         assignment: {
//             name: assignmentTitle,
//             description: `<iframe src="${iFrameAddress}" frameborder="0" allowfullscreen="true"></iframe>`,
//             submission_types: ['external_tool'],
//             external_tool_tag_attributes: {
//                 url: iFrameAddress,
//                 new_tab: true
//             }
//         }
//     };

//     try {
//         const response = await axios.post(url, data, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log(`Assignment created with iFrame: ${assignmentTitle}`);
//     } catch (error) {
//         console.error(`Error creating assignment with iFrame for '${assignmentTitle}':`, error);
//     }
// }

// // // Function to create an assignment
async function createAssignment(courseId, assignmentData) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;

    // Prepare the data for the assignment creation request
    const data = {
        assignment: {
            name: assignmentData.assignmentName,
            points_possible: assignmentData.points,
            due_at: assignmentData.dueDate, // Optional, format as 'YYYY-MM-DDTHH:MM:SSZ'
            description: assignmentData.description, // Optional
            submission_types: assignmentData.submissionTypes || ['online_text_entry'],
            // Add any other required fields as per Canvas API documentation
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Assignment created:', response.data);
        return response.data; // Returns the created assignment object
    } catch (error) {
        console.error('Error creating assignment:', error);
        return null; // In case of an error, return null or handle it as per your needs
    }
}

// // Function to create an assignment with an iFrame
// async function createAssignmentWithIFrame(courseId, assignmentTitle, iFrameAddress) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const data = {
//         assignment: {
//             name: assignmentTitle,
//             description: `<iframe src="${iFrameAddress}" frameborder="0" allowfullscreen="true"></iframe>`,
//             submission_types: ['external_tool'],
//             external_tool_tag_attributes: {
//                 url: iFrameAddress,
//                 new_tab: true
//             }
//         }
//     };

//     try {
//         const response = await axios.post(url, data, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log(`Assignment created with iFrame: ${assignmentTitle}`);
//     } catch (error) {
//         console.error('Error creating assignment with iFrame:', error);
//     }
// }

// // Function to get iFrame URL from spreadsheet based on assignment title
// async function getIframeUrlForAssignment(assignmentTitle, moduleItemsData) {
//     const iframeUrl = findIFrameAddress(moduleItemsData, assignmentTitle);
//     return iframeUrl || null;
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

// async function findAssignmentIdByName(courseId, assignmentName) {
//     let url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;

//     try {
//         while (url) {
//             const response = await axios.get(url, {
//                 headers: { 'Authorization': `Bearer ${accessToken}` },
//                 params: { per_page: 100 }
//             });

//             const assignments = response.data;
//             const foundAssignment = assignments.find(assignment => assignment.name === assignmentName);
//             if (foundAssignment) return foundAssignment.id;

//             // Check for the 'next' link in the headers
//             url = null; // Reset URL to null initially
//             const linkHeader = response.headers['link'];
//             if (linkHeader) {
//                 const links = linkHeader.split(',');
//                 const nextLink = links.find(link => link.includes('rel="next"'));
//                 if (nextLink) {
//                     const match = nextLink.match(/<(.*?)>/);
//                     url = match ? match[1] : null;
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error finding assignment:', error);
//     }
//     return null;
// }

  
// // // Function to add a module item that is an assignment
// // async function addAssignmentModuleItem(courseId, moduleId, assignmentName) {
// //     const assignmentId = await findAssignmentIdByName(courseId, assignmentName);
// //     if (!assignmentId) {
// //       console.log(`Assignment named '${assignmentName}' not found.`);
// //       return;
// //     }
  
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
// //     const data = {
// //       module_item: {
// //         title: assignmentName,
// //         type: 'Assignment',
// //         content_id: assignmentId
// //       }
// //     };
  
// //     try {
// //       const response = await axios.post(url, data, {
// //         headers: {
// //           'Authorization': `Bearer ${accessToken}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });
// //       console.log(`Module item for assignment '${assignmentName}' added to module ID ${moduleId}`);
// //       return response.data;
// //     } catch (error) {
// //       console.error(`Error adding module item for assignment '${assignmentName}':`, error.response.data);
// //     }
// //   }
  
//   // Function to iterate over JSON data and add module items for each student assignment
//   async function addAllAssignmentsAsModuleItems(courseId, jsonData) {
//     for (const item of jsonData) {
//       if (item['Ed Audience/Role'] === 'Student') {
//         const moduleName = item['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'];
//         const assignmentName = item['DISPLAY TITLE for course build'];
//         const moduleId = await findModuleIdByName(courseId, moduleName);
//         if (moduleId) {
//           await addAssignmentModuleItem(courseId, moduleId, assignmentName);
//         } else {
//           console.log(`Module named '${moduleName}' not found.`);
//         }
//       }
//     }
//   }

// //   // Function to create a new page in the course
// // async function createCoursePage(courseId, pageTitle, pageContent) {
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/pages`;
// //     const data = {
// //         wiki_page: {
// //             title: pageTitle,
// //             body: pageContent
// //         }
// //     };

// //     try {
// //         const response = await axios.post(url, data, {
// //             headers: { 'Authorization': `Bearer ${accessToken}` }
// //         });
// //         console.log('Page created:', response.data);
// //         return response.data; // Returns the created page object
// //     } catch (error) {
// //         console.error('Error creating page:', error);
// //     }
// // }

// // // Function to add a page to a module
// // async function addPageToModule(courseId, moduleId, pageUrl, pageTitle) {
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
// //     const formattedPageTitle = pageTitle.replace(/-/g, ' '); // Assuming pageTitle is provided to the function
    
// //     const data = {
// //         module_item: {
// //             title: formattedPageTitle, // Use the formatted page title here
// //             type: 'Page',
// //             page_url: pageUrl
// //         }
// //     };

// //     try {
// //         const response = await axios.post(url, data, {
// //             headers: { 'Authorization': `Bearer ${accessToken}` }
// //         });
// //         console.log(`Page '${formattedPageTitle}' added to module ID ${moduleId}`);
// //         return response.data;
// //     } catch (error) {
// //         console.error('Error adding page to module:', error);
// //     }
// // }





// // Main execution
// (async () => {
//     // const jsonData = await convertSpreadsheetToJson(spreadsheetPath);
//     const moduleItemsData = await readModuleItemsSpreadsheet(moduleItemsPath);

//      // Step 1: Create Modules
//     //  await automateModuleCreation();


//      // Step 2: Create Assignment Groups
//     //  const moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);
//     //  for (const moduleName of moduleNames) {
//     //      if (!moduleName.includes("Teacher Resources") && !moduleName.includes("Course Overview")) {
//     //          await createAssignmentGroup(courseId, moduleName);
//     //      }
//     //  }

//      /// Step 1: Convert the spreadsheet data to JSON
// const jsonData = await convertSpreadsheetToJson(spreadsheetPath);

// // Step 2: Filter and create assignments with points
// const studentAssignments = jsonData.filter(row => row['Ed Audience/Role'] === 'Student' && row['Category'].toLowerCase() === 'required' && row['Points'])


//     .map(row => ({
//         module: row['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'],
//         assignmentName: row['DISPLAY TITLE for course build'],
//         points: parseFloat(row['Points']), // Parse the points value as a float
//         // due_at: row['Due Date'], // If you have a due date column, parse it appropriately
//     }));

// // Step 3: Create assignments in Canvas
// for (let assignment of studentAssignments) {
//     await createAssignment(courseId, assignment);
// }



// await addAllAssignmentsAsModuleItems(courseId, jsonData);



//  await addAllAssignmentsAsModuleItems(courseId, jsonData);

//  const pageTitle = "Important Unit Design and Support Information";
//     const pageContent = `<h2><strong>Working with course resource links</strong></h2>
//     <p><span>All links in this course have been tested and validated in Canvas. Be aware that for links to launch properly:</span></p>
//     <ol>
//         <li><span> Assignments or Teacher Resource items must be </span><span style="color: #ba372a;">PUBLISHED</span><span>.</span><span> Courses have been designed with all links intentionally Unpublished, leaving the choice to you as to when you want them to appear.</span></li>
//         <li><span> Links will only launch for users who have </span><span><span style="color: #ba372a;">ROSTERED roles</span> </span><span>in both Canvas and HMH Ed as either </span><span style="color: #ba372a;">Teacher or Student</span><span>.</span></li>
//         <li><span> Writable links will only function properly after you have done the </span><span style="color: #ba372a;">initial setup to Writable via HMH Ed.</span><span> For more information, see Writable Support below.</span></li>
//         <li><span> Under certain circumstances, Canvas does not copy all referenced information when you only copy a single Module instead of the entire course. Use your </span><span style="color: #ba372a;">Canvas Link Validator</span><span> to confirm that what you have copied is working in your course.</span></li>
//     </ol>
//     <p><span>If you have problems with links not related to the notes above, please refer to the Support section below.</span></p>
//     <p>&nbsp;</p>
//     <h2><strong>Course Design</strong></h2>
//     <ol>
//         <li><span>Module 1 contains the Course Overview for this Unit.</span></li>
//         <li aria-level="1"><span>Module 2 contains all Teacher Resources available for this Unit.</span></li>
//         <li aria-level="1"><span>The remaining Modules are all divided by text selection titles and subsections that match the instructional flow on HMH Ed and your print materials. The final module includes the Unit Tasks. These modules are all set to Unpublished.</span></li>
//         <li aria-level="1"><span>The final module includes the Unit Tasks.</span></li>
//         <li aria-level="1"><span>All modules are set to Unpublished.</span></li>
//         <li aria-level="1"><span>Into Literature assessments have been created as assignments with app links embedded in the text field of the assignment. This allows students to respond to assessments within Canvas.</span></li>
//         <li aria-level="1"><span>Selection assessments are all set to a point value of 10, Unit Tasks are all set to a point value of 100. Teachers can customize these point values, including setting selection assessments to 100 points if they are used summatively.</span></li>
//         <li aria-level="1"><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;"><span style="color: #ba372a;">Practice tests, selection tests, and unit tests must be</span> <a href="https://s3.amazonaws.com/downloads.hmlt.hmco.com/CustomerExperience/CCSD/CCSD+HMH+Into+Reading_Creating+Assignments.pdf">created for each class</a>. Use of Digital Assessments allows student scores to be available for your courses in both the HMH Ed and the Canvas platform. We have inserted placeholders in the recommended location within the Modules to prompt you to complete the setup. A link to directions is in the Note text, should you need help with the process.</span></li>
//     </ol>
//     <p>&nbsp;</p>
//     <h2><strong>Support</strong></h2>
//     <ul>
//         <li><span>If you need help with working with HMH Ed and Into Literature components of this course, go to </span><a href="https://support.hmhco.com/s/article/ccsd"><span>https://support.hmhco.com/s/article/ccsd</span></a><span> for more information.</span></li>
//         <li>For help with Writable components of this course, go to <a href="https://intercom.help/writable/en/articles/8302047-clark-county-canvas-set-up">https://intercom.help/writable/en/articles/8302047-clark-county-canvas-set-up</a> for information about initial set up and linking assignments between the platforms.</li>
//     </ul>`; //Page content
//     const moduleName = "G8_Unit 6: Course Overview (DO NOT PUBLISH)";

//     // Step 1: Create a new page
//     const newPage = await createCoursePage(courseId, pageTitle, pageContent);

//     if (newPage) {
//         // Step 2: Find the module ID for "Course Overview"
//         const moduleId = await findModuleIdByName(courseId, moduleName);
//         if (moduleId) {
//             // Step 3: Add the page to the "Course Overview" module
// await addPageToModule(courseId, moduleId, newPage.url, pageTitle);

//         } else {
//             console.log(`Module named '${moduleName}' not found.`);
//         }
//     }


//     // Optional: Delete a specific module and assignment group
//     await findAndDeleteModule(courseId, "NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE");
//     // await findAndDeleteSpecificAssignmentGroup(courseId, "NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE");

//     for (let assignment of jsonData.filter(row => row['Ed Audience/Role'] === 'Student' && row['Category'].toLowerCase() === 'required')) {
//         const createdAssignment = await createAssignment(courseId, {
//             assignmentName: assignment['DISPLAY TITLE for course build'],
//             points: parseFloat(assignment['Points'])
//         });

//         if (createdAssignment) {
//             const iframeUrl = await getIframeUrlForAssignment(assignment['Display Title on Ed'], moduleItemsData);
//             if (iframeUrl) {
//                 await updateAssignmentWithIframe(courseId, createdAssignment.id, iframeUrl);
//             } else {
//                 console.log(`iFrame URL not found for assignment: ${assignment['Display Title on Ed']}`);
//             }
//         }
//     }

//     for (let assignment of jsonData.filter(row => row['Ed Audience/Role'] === 'Student' && row['Category'].toLowerCase() === 'required')) {
//         const iframeUrl = findIFrameAddress(moduleItemsData, assignment['Display Title on Ed']);
//         if (iframeUrl) {
//             await createAssignmentWithIFrame(courseId, assignment['Display Title on Ed'], iframeUrl);
//         } else {
//             console.log(`iFrame URL not found for assignment: ${assignment['Display Title on Ed']}`);
//         }
//     }
// })();


/////////////////////////////////////New Test 12-19-23/////////////////////////////////////////
// const axios = require('axios');
// const readXlsxFile = require('read-excel-file/node');

// // Replace with your Canvas API endpoint
// const canvasBaseUrl = 'https://hmh.instructure.com';

// // Replace with your Canvas access token
// const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';

// const canvasDomain = 'https://hmh.instructure.com/';

// // Replace with your Canvas course ID
// const courseId = '14706';

// const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
// const moduleItemsPath = '/workspaces/CanvasCourses2/module_items.xlsx'; // Update with your actual file path

// Function to read the spreadsheet and convert it to JSON
async function convertSpreadsheetToJson(filePath) {
    try {
        const rows = await readXlsxFile(filePath);
        const headers = rows[0];
        return rows.slice(1).map(row => headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
        }, {}));
    } catch (error) {
        console.error('Error reading spreadsheet:', error);
        return [];
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

// Function to create an assignment with an iFrame
async function createAssignmentWithIFrame(courseId, assignmentTitle, iFrameAddress) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
    const data = {
        assignment: {
            name: assignmentTitle,
            description: `<iframe src="${iFrameAddress}" frameborder="0" allowfullscreen="true"></iframe>`,
            submission_types: ['external_tool'],
            external_tool_tag_attributes: {
                url: iFrameAddress,
                new_tab: true
            }
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(`Assignment created with iFrame: ${assignmentTitle}`);
    } catch (error) {
        console.error('Error creating assignment with iFrame:', error);
    }
}

// Function to get iFrame URL from spreadsheet based on assignment title
async function getIframeUrlForAssignment(assignmentTitle, moduleItemsData) {
    const normalizedTitle = assignmentTitle.toLowerCase().replace(' ', '');
    const matchingModuleItems = moduleItemsData.filter(item => {
        const normalizedItemTitle = item['title'].toLowerCase().replace(' ', '');
        return normalizedItemTitle.includes(normalizedTitle);
    });

    if (matchingModuleItems.length > 0) {
        return matchingModuleItems[0]['decodedParams'];
    }
    return null;
}

// Function to update an assignment with iFrame
async function updateAssignmentWithIframe(courseId, assignmentId, iframeUrl) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments/${assignmentId}`;
    const iframeHtml = `<iframe src="${iframeUrl}" width="100%" height="600px"></iframe>`; // Adjust iframe attributes as needed

    const data = {
        assignment: {
            description: iframeHtml // Update the assignment description with the iFrame HTML
        }
    };

    try {
        await axios.put(url, data, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(`Assignment ID ${assignmentId} updated with iFrame.`);
    } catch (error) {
        console.error('Error updating assignment with iFrame:', error);
    }
}

// Ensure createAssignment function is correctly defined
// async function createAssignment(courseId, assignmentData) {
//     // Implement the function to create an assignment in Canvas
//     // Return the created assignment object or ID
//     // Placeholder for your implementation
// }

// Main execution
(async () => {
    const jsonData = await convertSpreadsheetToJson(spreadsheetPath);
    const moduleItemsData = await readModuleItemsSpreadsheet(moduleItemsPath);

    for (let assignment of jsonData.filter(row => row['Ed Audience/Role'] === 'Student' && row['Category'].toLowerCase() === 'required')) {
        const createdAssignment = await createAssignment(courseId, {
            assignmentName: assignment['Display Title on Ed'],
            points: parseFloat(assignment['Points'])
        });

        if (createdAssignment) {
            const iframeUrl = await getIframeUrlForAssignment(assignment['Display Title on Ed'], moduleItemsData);
            if (iframeUrl) {
                await updateAssignmentWithIframe(courseId, createdAssignment.id, iframeUrl);
            } else {
                console.log(`iFrame URL not found for assignment: ${assignment['Display Title on Ed']}`);
            }
        }
    }
})();

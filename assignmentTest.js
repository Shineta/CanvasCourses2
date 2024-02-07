// const axios = require('axios');

// // Replace with your Canvas API endpoint
// const canvasBaseUrl = 'https://hmh.instructure.com';

// // Replace with your Canvas access token
// const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';

// const canvasDomain = 'https://hmh.instructure.com/';

// // Function to create an assignment with an iframe in the Rich Content Editor
// async function createAssignmentWithIframe(courseId, assignmentData, iframeUrl) {
//     // Additional check for point value
//     if (!assignmentData.points) {
//         console.log(`Skipping assignment creation for '${assignmentData.assignmentName}' because no point value is provided.`);
//         return;
//     }

//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const data = {
//         assignment: {
//             name: assignmentData.assignmentName,
//             id: assignmentData.id,
//             points_possible: assignmentData.points,
//             submission_types: ['external_tool'], // Set to 'online_upload' to enable file uploads

//             // Add other assignment fields as needed
//             description: `<iframe src="${iframeUrl}" width="100%" height="500" frameborder="0"></iframe>`,
//         }
//     };

//     try {
//         const response = await axios.post(url, data, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         // Assuming the assignment ID is in response.data.id
//         const createdAssignment = {
//             ...response.data, // Spread operator to copy all properties from response.data
//             id: response.data.id // Explicitly adding the ID for clarity
//         };

//         console.log('Assignment created:', createdAssignment);
//         return createdAssignment;
//     } catch (error) {
//         console.error('Error creating assignment:', error);
//     }
// }

// // Example usage:
// // const courseId = '14706';
// const assignmentData = {
//     assignmentName: 'Assignment Name',
//     id: 'assignment_id', // Replace with your assignment ID if needed
//     points: 100, // Replace with the desired point value
//     // Add other assignment data as needed
// };

// const iframeUrl = 'https://www.hmhco.com/content/literature/into_lit/g6_12/teacher/pdf/612le_13_lrsg_thingscarried_tg.pdf';

// // Call the createAssignmentWithIframe function
// createAssignmentWithIframe(courseId, assignmentData, iframeUrl);




///////////////////////////////////////New Test 12-18-23////////////////////////////////////////////////////////////////////////
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

const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
const moduleItemsPath = '/workspaces/CanvasCourses2/module_items.xlsx'; // Update with your actual file path


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

// Use the function to convert and then filter and log the required data
convertSpreadsheetToJson(spreadsheetPath).then(jsonData => {
    const studentAssignments = jsonData.filter(row => row['Ed Audience/Role'] === 'Student')
        .map(row => {
            return {
                module: row['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'],
                assignmentTitle: row['DISPLAY TITLE for course build']
            };
        });
    console.log(studentAssignments);
});

// Function to read the spreadsheet and convert it to JSON
async function convertSpreadsheetToJson(filePath) {
    try {
        const rows = await readXlsxFile(filePath);
        // Assuming the first row contains the headers
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



// Use the function
convertSpreadsheetToJson(spreadsheetPath).then(jsonData => {
    console.log(JSON.stringify(jsonData, null, 2));
});



// Modified Function to create an assignment with an external tool
async function createAssignment(courseId, externalToolUrl) {
    externalToolUrl = 'https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti';
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
    const data = {
        assignment: {
            name: 'EXT Tool Test 12', // Ensure this is correctly populated
            description:'This is a test',
            
            submission_types: ['external_tool'],
            points_possible: 10, // Ensure this is correctly populated
            external_tool_tag_attributes: {
                url: externalToolUrl,
                new_tab: false,
             resource_link_id: "24f9adb7-6395-4803-9702-1fb7c6264615",
                lti_context_id: "1f8ebb3c-27c0-41ba-9204-5bab7af0d4b9",
                custom_params:{  
                    title:"Cool Deep Linking Tool ",
                    scopes:[],
                    extensions:[  
                       {  
                          domain:"https://hmh.instructure.com",
                          tool_id:"deep-linky",
                          platform:"canvas.instructure.com",
                          settings:{  
                             text:"Cool Deep Linking Text",
                             icon_url:"https://some.icon.url",
                             placements:[                 
                                {  
                                   text:"Embed Tool Content in Canvas RCE",
                                   enabled:true,
                                   icon_url:"https://some.icon.url",
                                   placement:"editor_button",
                                   message_type:"LtiDeepLinkingRequest",
                                   target_link_uri:"https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti"
                                },
                                {  
                                   text:"Embed Tool Content as a Canvas Assignment",
                                   enabled:true,
                                   icon_url:"https://some.icon.url",
                                   placement:"assignment_selection",
                                   message_type:"LtiDeepLinkingRequest",
                                   target_link_uri:"https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti"
                                }
                             ]
                          }
                       }
                    ],
                    public_jwk:{  
                       kty:"RSA",
                       alg:"RS256",
                       e:"AQAB",
                       kid:"8f796169-0ac4-48a3-a202-fa4f3d814fcd",
                       n:"nZD7QWmIwj-3N_RZ1qJjX6CdibU87y2l02yMay4KunambalP9g0fU9yZLwLX9WYJINcXZDUf6QeZ-SSbblET-h8Q4OvfSQ7iuu0WqcvBGy8M0qoZ7I-NiChw8dyybMJHgpiP_AyxpCQnp3bQ6829kb3fopbb4cAkOilwVRBYPhRLboXma0cwcllJHPLvMp1oGa7Ad8osmmJhXhM9qdFFASg_OCQdPnYVzp8gOFeOGwlXfSFEgt5vgeU25E-ycUOREcnP7BnMUk7wpwYqlE537LWGOV5z_1Dqcqc9LmN-z4HmNV7b23QZW4_mzKIOY4IqjmnUGgLU9ycFj5YGDCts7Q",
                       use:"sig"
                    },
                    description:"1.3 Test Tool",
                    target_link_uri:"https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti",
                    // oidc_initiation_url:"https://your.oidc_initiation_url"
                 }
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
        console.log('Assignment created with external tool:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
    }
}
externalToolUrl = 'https://hmh.instructure.com/courses/14706/external_content/success/external_tool_dialog';
// externalToolUrl = 'https://www.hmhco.com/ui/#/picker/?otk=f193db08-86ee-4c16-8b50-3d1f5eef1132&isNarResponseBody=false';

createAssignment(courseId, externalToolUrl)

// Function to create an assignment with an external tool (Deep Linking)
async function createAssignmentWithDeepLinking(courseId, externalToolUrl) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
    
    // Update this object with your specific details
    const data = {
        assignment: {
            name: 'Deep Linking Assignment 14', // Name of the assignment
            description: 'This is a deep linking assignment.', // Description of the assignment
            submission_types: ['external_tool'], // Submission type
            points_possible: 10, // Points possible for this assignment
            external_tool_tag_attributes: {
                url: externalToolUrl, // The launch URL for the LTI tool
                new_tab: true, // Whether to open in a new tab
                resource_id: "l_6f490902-a7fb-481f-af0a-36a238bfbfde_787c18c2-9824-4ac3-afb8-c4cac9c8436d", // A unique identifier for the resource
                // Other necessary LTI parameters
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
        console.log('Assignment created with external tool:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
    }

    

}

// Function call
// Set the specific external tool URL here
const deepLinkingToolUrl = 'https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti';
createAssignmentWithDeepLinking(courseId, deepLinkingToolUrl);
// Function to create an assignment with an external tool (Deep Linking)
async function createAssignmentWithDeepLinking2(courseId, externalToolUrl) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;

    // Update this object with your specific details
    const data = {
        assignment: {
            name: 'Deep Linking Assignment 23', // Name of the assignment
            description: 'This is a deep linking assignment.', // Description of the assignment
            submission_types: ['external_tool'], // Submission type
            points_possible: 10, // Points possible for this assignment
            external_tool_tag_attributes: {
                url: externalToolUrl, // The launch URL for the LTI tool
                new_tab: false, // Whether to open in a new tab
                resource_id: "https://www.hmhco.com/content/literature/into_lit/g8/student/epub/ilnl21en_ese_g08u06_student/OPS/s9ml/cards/08le_13_ese_diaryannefrank_gra1.xhtml", // A unique identifier for the resource
                link_selection: {
                    enabled: true, // or false, depending on whether you want to enable this feature
                    placement: "link_selection",
                    resource_selection: 'https://www.hmhco.com/content/literature/into_lit/g8/student/epub/ilnl21en_ese_g08u06_student/OPS/s9ml/cards/08le_13_ese_diaryannefrank_gra1.xhtml',
                    message_type: "LtiDeepLinkingRequest",
                    label: "*HMH Ed Linking Tool (Prod)", // Assuming you have a name attribute in hmhEdLinkingTool
                    selection_width: 800,
                    selection_height: 400,
                    icon_url: "https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti"
                }
            }
        }
    }
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Assignment created with external tool:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
    }
}

// Function call
// Set the specific external tool URL here
// const deepLinkingToolUrl = 'https://www.hmhco.com/content/literature/into_lit/g8/student/epub/ilnl21en_ese_g08u06_student/OPS/s9ml/cards/08le_13_ese_diaryannefrank_gra1.xhtml';
createAssignmentWithDeepLinking2(courseId, deepLinkingToolUrl);

// // Function to read the spreadsheet
// async function readSpreadsheet(filePath) {
//     const rows = await readXlsxFile(filePath);
//     return rows.slice(1); // Skip header row
// }

// Function to get all assignments from Canvas
async function getCanvasAssignments() {
    const url = `${canvasBaseUrl}/courses/${courseId}/assignments`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };
    
    try {
        const response = await axios.get(url, { headers });
        return response.data; // Array of assignments
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return [];
    }
}

getCanvasAssignments()

// Function to create an assignment with an external tool (Deep Linking)
async function createAssignmentWithDeepLinking(courseId, externalToolDefinition) {
    const url = `${canvasBaseUrl}/courses/${courseId}/assignments`;
    
    // Destructure the necessary details from externalToolDefinition
    const { definition_id, url: toolUrl, name, placements } = externalToolDefinition;

    // Check if placements and assignment_selection are defined
    const placementDetails = placements && placements.assignment_selection ? placements.assignment_selection : null;
    if (!placementDetails) {
        console.error('placements or assignment_selection not defined in the external tool definition');
        return;
    }

    // Update this object with your specific details and the tool's launch details
    const data = {
        assignment: {
            name: name, // Name of the assignment
            description: `This is a deep linking assignment using ${name}.`, // Description of the assignment
            submission_types: ['external_tool'], // Submission type
            points_possible: 10, // Points possible for this assignment
            external_tool_tag_attributes: {
                url: placementDetails.url, // The launch URL for the LTI tool
                new_tab: true, // Whether to open in a new tab
                resource_link_id: definition_id, // A unique identifier for the resource
                message_type: placementDetails.message_type // LTI message type
                // Add any other necessary LTI parameters here
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
        console.log('Assignment created with external tool:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
    }
}

// Example function call
const writableToolDefinition = {
    definition_type: "ContextExternalTool",
    definition_id: 20828,
    url: "https://app.writable.com/ltia/AssignmentSelect",
    name: "Writable",
    placements: {
        assignment_selection: {
            message_type: "LtiDeepLinkingRequest",
            url: "https://app.writable.com/ltia/AssignmentSelect",
            title: "Writable",
            selection_width: 786,
            selection_height: 640
        }
    }
};

createAssignmentWithDeepLinking(courseId, writableToolDefinition);

async function getExternalToolConfig() {
//     // Canvas API endpoint
// const canvasBaseUrl = 'https://hmh.instructure.com';

// // Canvas access token
// const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';

// const canvasDomain = 'https://hmh.instructure.com/';
    const toolId = 'dHJ1ZSwiZXhwIjoxNzA3MDkxMDA0fQ.CdIPnMjwqzmkEs83KIhaXcgzrOsi-eI3LnOdHebBz9k';
    const url = `https://${canvasDomain}/api/v1/courses/${courseId}/external_tools/${toolId}`; // toolId should be replaced with the actual ID of the tool.

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const toolConfig = await response.json();
        console.log('External Tool Configuration:', toolConfig);

        // Check for placements or assignment_selection in the tool configuration
        if (toolConfig.placements) {
            console.log('Placements:', toolConfig.placements);
        } else {
            console.log('Placements are not defined for this tool.');
        }

        if (toolConfig.assignment_selection) {
            console.log('Assignment Selection:', toolConfig.assignment_selection);
        } else {
            console.log('Assignment Selection is not defined for this tool.');
        }

    } catch (error) {
        console.error('Error fetching external tool config:', error);
    }
}

getExternalToolConfig();


// Function to fetch and list LTI tools
async function listLTITools() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const ltiTools = await response.json();
        console.log('LTI Tools:', ltiTools);

        // Optionally, process and display the LTI tools as needed
        ltiTools.forEach(tool => {
            console.log(`Tool Name: ${tool.name}, Tool URL: ${tool.url}`);
        });

    } catch (error) {
        console.error('Error fetching LTI tools:', error);
    }
}

// Call the function to list LTI tools
listLTITools();

// // Handler function for LTI postMessage communication (typically for client-side use)
// const handler = (s, a, c, w) => n => {
//     let t;
//     try {
//       t = typeof n.data === 'string' ? JSON.parse(n.data) : n.data;
//     } catch (e) {
//       return false;
//     }
//     if (n.origin === s) {
//       const { sourceToolInfo: o, ...d } = t;
//       if (!o) return false;
//       var e = o?.origin;
//       const i = a[o?.windowId];
//       i?.postMessage(d, e);
//     } else {
//       let e = a.indexOf(n.source);
//       if (e === -1) {
//         a.push(n.source);
//         e = a.length - 1;
//       }
//       const r = { ...t, sourceToolInfo: { origin: n.origin, windowId: e } };
//       if (w) {
//         r.in_rce = true;
//       }
//       c?.postMessage(r, s);
//     }
//   };
  
//   // Function ready to execute once the DOM is fully loaded (client-side concept)
//   const ready = e => {
//     const n = typeof document === 'object' && document;
//     if (!n || /^loaded|^i|^c/.test(n.readyState)) {
//       e();
//     } else {
//       const t = () => {
//         e();
//         n.removeEventListener('DOMContentLoaded', t);
//       };
//       n.addEventListener('DOMContentLoaded', t);
//     }
//   };
  
//   // Initialization function to set up postMessage event listeners (client-side concept)
//   const init = () => {
//     ready(() => {
//       const { PARENT_ORIGIN: e, IN_RCE: n } = window.ENV;
//       const t = [];
//       if (n) {
//         n = window.parent.parent;
//         window.addEventListener('message', handler(window.origin, t, n, true));
//       } else {
//         window.addEventListener('message', handler(e, t, window.top));
//       }
//     });
//   };
  
//   // If you're using this code outside of testing (jest), call init to set up the handlers
//   if (typeof jest === 'undefined') {
//     init();
//   } else {
//     // For jest testing exports
//     module.exports = { handler, init };
//   }


// // Main function to process assignments
// async function processAssignments() {
//     try {
//         const spreadsheetData = await readSpreadsheet(spreadsheetPath);
//         const canvasAssignments = await getCanvasAssignments();
        
//         // Process data here
//         // For example, you can match spreadsheet data with Canvas assignments
//         // and update Canvas assignments based on the spreadsheet

//         console.log('Spreadsheet data:', spreadsheetData);
//         console.log('Canvas assignments:', canvasAssignments);

//         // Further processing...
//     } catch (error) {
//         console.error('Error in processAssignments:', error);
//     }
// }

// // Run the main function
// processAssignments();



// ... [rest of the code below]

// // Main Execution with try-catch for error handling
// (async () => {
   
//     //    
//     externalToolUrl = 'https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti';
//     createAssignment(courseId, externalToolUrl)
//     // const urlString = "https://hmh.instructure.com/courses/14706/external_tools/retrieve?display=in_rce&amp;resource_link_lookup_uuid=d472e824-5039-44fa-b4c3-cb5ad0214793";

// // Function to extract the 'resource_link_lookup_uuid' parameter from the URL
// // function extractResourceLinkLookupUuid(url) {
// //   const urlObj = new URL(url);
// //   const searchParams = new URLSearchParams(urlObj.search);

// //   // Replace '&amp;' with '&' to correctly parse the parameters
// //   const fixedParams = new URLSearchParams(searchParams.toString().replace(/&amp;/g, '&'));

// //   return fixedParams.get('resource_link_lookup_uuid');
// // }
    

// // const resourceLinkLookupUuid = extractResourceLinkLookupUuid(urlString);

// // console.log("Resource Link Lookup UUID:", resourceLinkLookupUuid);

// })();

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


// // Function to add assignments to their respective groups
// async function addAssignmentsToGroups(courseId, assignmentsData) {
//     for (const assignmentData of assignmentsData) {
//         const groupId = await findAssignmentGroupIdByName(courseId, assignmentData.assignmentGroup);
//         if (groupId) {
//             assignmentData.assignment_group_id = groupId; // Set the group ID for the assignment
//             await createAssignment(courseId, assignmentData);
//         } else {
//             console.log(`Assignment group '${assignmentData.assignmentGroup}' not found.`);
//         }
//     }
// }

// async function readUniqueModulesFromSpreadsheet(filePath, columnIndex = 27) {
//     try {
//         const rows = await readXlsxFile(filePath);
//         const allItems = rows.map(row => row[columnIndex]).filter(Boolean); // Filter out empty or null values
//         const uniqueItems = [...new Set(allItems)]; // Remove duplicates
//         return uniqueItems;
//     } catch (error) {
//         console.error('Error reading spreadsheet:', error);
//         return [];
//     }
// }




// async function createModule(courseId, moduleName) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;
//     const data = {
//         module: {
//             name: moduleName
//             // Add other module attributes as needed
//         }
//     };


//     try {
//         const response = await axios.post(url, data, {
//             headers: { 'Authorization': `Bearer ${accessToken}` }
//         });
//         return response.data; // Returns the created module object
//     } catch (error) {
//         console.error('Error creating module:', error);
//     }
// }


// async function findModuleIdByName(courseId, moduleName) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;


//     try {
//         const response = await axios.get(url, {
//             headers: { 'Authorization': `Bearer ${accessToken}` },
//             params: {
//                 per_page: 100 // Adjust depending on the number of modules
//             }
//         });


//         const modules = response.data;
//         const foundModule = modules.find(module => module.name === moduleName);
//         return foundModule ? foundModule.id : null;
//     } catch (error) {
//         console.error('Error finding module:', error);
//         return null;
//     }
// }


// async function deleteModule(courseId, moduleId) {
//     if (!moduleId) {
//         console.log('Module ID not provided.');
//         return;
//     }


//     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}`;


//     try {
//         await axios.delete(url, {
//             headers: { 'Authorization': `Bearer ${accessToken}` }
//         });
//         console.log(`Module with ID ${moduleId} has been deleted.`);
//     } catch (error) {
//         console.error('Error deleting module:', error);
//     }
// }


// async function automateModuleCreation() {
//     let moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);


//     // Filter out and prepend 'Teacher Resources' modules
//     const teacherResourcesModules = moduleNames.filter(name => name.includes("Teacher Resources")).map(name => name + " (DO NOT PUBLISH)");
//     const otherModules = moduleNames.filter(name => !name.includes("Teacher Resources"));


//     // Add the custom course overview module
//     const customOverviewModule = `${coursePrefix} Course Overview (DO NOT PUBLISH)`;
//     moduleNames = [customOverviewModule, ...teacherResourcesModules, ...otherModules];


//     for (const moduleName of moduleNames) {
//         const newModule = await createModule(courseId, moduleName);
//         console.log(`Created module: ${moduleName}`);
//     }
// }


// async function findAndDeleteModule(courseId, moduleNameToDelete) {
//     const moduleId = await findModuleIdByName(courseId, moduleNameToDelete);
//     if (moduleId) {
//         await deleteModule(courseId, moduleId);
//     } else {
//         console.log(`Module named "${moduleNameToDelete}" not found.`);
//     }
// }

// // Function to add a module item
// async function addModuleItem(courseId, moduleId, title, type = 'Assignment') {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
//     const data = {
//       module_item: {
//         title: title,
//         type: type,
//         // Additional fields like 'content_id' can be added here if needed
//       }
//     };
  
//     try {
//       const response = await axios.post(url, data, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log(`Module item '${title}' added to module ID ${moduleId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error adding module item:', error);
//     }
//   }
  

//   // Function to create an assignment group
// async function createAssignmentGroup(courseId, groupName) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignment_groups`;
//     const data = { name: groupName };
//     try {
//         const response = await axios.post(url, data, {
//             headers: { 'Authorization': `Bearer ${accessToken}` }
//         });
//         console.log(`Created assignment group: ${groupName}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Error creating assignment group: ${groupName}`, error);
//     }
// }


// // Function to automate module and assignment group creation
// async function automateModuleAndAssignmentGroupCreation() {
//     let moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);
//     // ... existing module processing ...




//     for (const moduleName of moduleNames) {
//         if (!moduleName.includes("Teacher Resources") && !moduleName.includes("Course Overview")) {
//             await createAssignmentGroup(courseId, moduleName);
//         }
//     }
// }

// // Function to find an assignment group ID by name
// async function findAssignmentGroupIdByName(courseId, groupName) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignment_groups`;
//     try {
//         const response = await axios.get(url, {
//             headers: { 'Authorization': `Bearer ${accessToken}` },
//             params: {
//                 per_page: 100
//             }
//         });
//         const groups = response.data;
//         const foundGroup = groups.find(group => group.name === groupName);
//         return foundGroup ? foundGroup.id : null;
//     } catch (error) {
//         console.error('Error finding assignment group:', error);
//         return null;
//     }
// }

// // Function to read the spreadsheet and convert it to JSON
// async function convertSpreadsheetToJson(filePath) {
//     try {
//         const rows = await readXlsxFile(filePath);
//         const headers = rows[0];
//         return rows.slice(1).map(row => headers.reduce((acc, header, index) => {
//             acc[header] = row[index];
//             return acc;
//         }, {}));
//     } catch (error) {
//         console.error('Error reading spreadsheet:', error);
//         return [];
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
// async function createAssignment(courseId, assignmentData) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;

//     // Prepare the data for the assignment creation request
//     const data = {
//         assignment: {
//             name: assignmentData.assignmentName,
//             points_possible: assignmentData.points,
//             due_at: assignmentData.dueDate, // Optional, format as 'YYYY-MM-DDTHH:MM:SSZ'
//             description: assignmentData.description, // Optional
//             submission_types: assignmentData.submissionTypes || ['online_text_entry'],
//             // Add any other required fields as per Canvas API documentation
//         }
//     };

//     try {
//         const response = await axios.post(url, data, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('Assignment created:', response.data);
//         return response.data; // Returns the created assignment object
//     } catch (error) {
//         console.error('Error creating assignment:', error);
//         return null; // In case of an error, return null or handle it as per your needs
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

  
// // Function to add a module item that is an assignment
// async function addAssignmentModuleItem(courseId, moduleId, assignmentName) {
//     const assignmentId = await findAssignmentIdByName(courseId, assignmentName);
//     if (!assignmentId) {
//       console.log(`Assignment named '${assignmentName}' not found.`);
//       return;
//     }
  
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
//     const data = {
//       module_item: {
//         title: assignmentName,
//         type: 'Assignment',
//         content_id: assignmentId
//       }
//     };
  
//     try {
//       const response = await axios.post(url, data, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log(`Module item for assignment '${assignmentName}' added to module ID ${moduleId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error adding module item for assignment '${assignmentName}':`, error.response.data);
//     }
//   }
  
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

//   // Function to create a new page in the course
// async function createCoursePage(courseId, pageTitle, pageContent) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/pages`;
//     const data = {
//         wiki_page: {
//             title: pageTitle,
//             body: pageContent
//         }
//     };

//     try {
//         const response = await axios.post(url, data, {
//             headers: { 'Authorization': `Bearer ${accessToken}` }
//         });
//         console.log('Page created:', response.data);
//         return response.data; // Returns the created page object
//     } catch (error) {
//         console.error('Error creating page:', error);
//     }
// }

// // Function to add a page to a module
// async function addPageToModule(courseId, moduleId, pageUrl, pageTitle) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
//     const formattedPageTitle = pageTitle.replace(/-/g, ' '); // Assuming pageTitle is provided to the function
    
//     const data = {
//         module_item: {
//             title: formattedPageTitle, // Use the formatted page title here
//             type: 'Page',
//             page_url: pageUrl
//         }
//     };

//     try {
//         const response = await axios.post(url, data, {
//             headers: { 'Authorization': `Bearer ${accessToken}` }
//         });
//         console.log(`Page '${formattedPageTitle}' added to module ID ${moduleId}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error adding page to module:', error);
//     }
// }





// // Main execution
// (async () => {
//     // const jsonData = await convertSpreadsheetToJson(spreadsheetPath);
//     const moduleItemsData = await readModuleItemsSpreadsheet(moduleItemsPath);

//      // Step 1: Create Modules
//      await automateModuleCreation();


//      // Step 2: Create Assignment Groups
//      const moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);
//      for (const moduleName of moduleNames) {
//          if (!moduleName.includes("Teacher Resources") && !moduleName.includes("Course Overview")) {
//              await createAssignmentGroup(courseId, moduleName);
//          }
//      }

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




// ////////////////////////New Test 12-13-23///////////////////////////////////


// // const axios = require('axios');
// // const readXlsxFile = require('read-excel-file/node');
// // const canvasDomain = 'https://hmh.instructure.com';
// // const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
// // const courseId = '14706'; // Replace with the target course ID
// // const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
// // const coursePrefix = 'G8_Unit 6:'; // Update this with the dynamic course prefix

// // // Function to read the spreadsheet and convert it to JSON
// // async function convertSpreadsheetToJson(filePath) {
// //     try {
// //         const rows = await readXlsxFile(filePath);
// //         const headers = rows[0];
// //         const jsonData = rows.slice(1).map(row => {
// //             let rowData = {};
// //             row.forEach((value, index) => {
// //                 rowData[headers[index]] = value;
// //             });
// //             return rowData;
// //         });
// //         return jsonData;
// //     } catch (error) {
// //         console.error('Error reading spreadsheet:', error);
// //         return [];
// //     }
// // }

// // // Use the function to convert and then filter and log the required data
// // convertSpreadsheetToJson(spreadsheetPath).then(jsonData => {
// //     const studentAssignments = jsonData.filter(row => row['Ed Audience/Role'] === 'Student')
// //         .map(row => {
// //             return {
// //                 module: row['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'],
// //                 assignmentTitle: row['DISPLAY TITLE for course build']
// //             };
// //         });
// //     console.log(studentAssignments);
// // });




// // // Function to read the spreadsheet and convert it to JSON
// // async function convertSpreadsheetToJson(filePath) {
// //     try {
// //         const rows = await readXlsxFile(filePath);
// //         // Assuming the first row contains the headers
// //         const headers = rows[0];
// //         const jsonData = rows.slice(1).map(row => {
// //             let rowData = {};
// //             row.forEach((value, index) => {
// //                 rowData[headers[index]] = value;
// //             });
// //             return rowData;
// //         });
// //         return jsonData;
// //     } catch (error) {
// //         console.error('Error reading spreadsheet:', error);
// //         return [];
// //     }
// // }



// // // Use the function
// // convertSpreadsheetToJson(spreadsheetPath).then(jsonData => {
// //     console.log(JSON.stringify(jsonData, null, 2));
// // });


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
  


// // // Function to create an assignment group
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



// // // Function to create an assignment
// // async function createAssignment(courseId, assignmentData) {
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
// //     const data = {
// //         assignment: {
// //             name: assignmentData.assignmentName,
// //             id: assignmentData.id,
// //             points_possible: assignmentData.points,
// //             due_at: assignmentData.dueDate,

// //             // Add other assignment fields as needed
// //         }
// //     };

// //     try {
// //         const response = await axios.post(url, data, {
// //             headers: {
// //                 'Authorization': `Bearer ${accessToken}`,
// //                 'Content-Type': 'application/json'
// //             }
// //         });

// //         // Assuming the assignment ID is in response.data.id
// //         const createdAssignment = {
// //             ...response.data, // Spread operator to copy all properties from response.data
// //             id: response.data.id // Explicitly adding the ID for clarity
// //         };

// //         console.log('Assignment created:', createdAssignment);
// //         return createdAssignment;
// //     } catch (error) {
// //         console.error('Error creating assignment:', error);
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

// // // Function to create an assignment
// // async function createAssignment(courseId, assignmentName, moduleName) {
// //     const groupId = await findAssignmentGroupIdByName(courseId, moduleName);
// //     if (!groupId) {
// //         console.log(`Assignment group named '${moduleName}' not found.`);
// //         return;
// //     }
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
// //     const data = {
// //         assignment: {
// //             name: assignmentName,
// //             assignment_group_id: groupId,
// //             // Other assignment details can be added here
// //         }
// //     };
// //     try {
// //         const response = await axios.post(url, data, {
// //             headers: {
// //                 'Authorization': `Bearer ${accessToken}`,
// //                 'Content-Type': 'application/json'
// //             }
// //         });
// //         console.log(`Assignment '${assignmentName}' created in module '${moduleName}' with ID ${groupId}`);
// //         return response.data;
// //     } catch (error) {
// //         console.error('Error creating assignment:', error);
// //     }
// // }

// // async function findAssignmentIdByName(courseId, assignmentName) {
// //     let url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;

// //     try {
// //         while (url) {
// //             const response = await axios.get(url, {
// //                 headers: { 'Authorization': `Bearer ${accessToken}` },
// //                 params: { per_page: 100 }
// //             });

// //             const assignments = response.data;
// //             const foundAssignment = assignments.find(assignment => assignment.name === assignmentName);
// //             if (foundAssignment) return foundAssignment.id;

// //             // Check for the 'next' link in the headers
// //             url = null; // Reset URL to null initially
// //             const linkHeader = response.headers['link'];
// //             if (linkHeader) {
// //                 const links = linkHeader.split(',');
// //                 const nextLink = links.find(link => link.includes('rel="next"'));
// //                 if (nextLink) {
// //                     const match = nextLink.match(/<(.*?)>/);
// //                     url = match ? match[1] : null;
// //                 }
// //             }
// //         }
// //     } catch (error) {
// //         console.error('Error finding assignment:', error);
// //     }
// //     return null;
// // }

  
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
  
// //   // Function to iterate over JSON data and add module items for each student assignment
// //   async function addAllAssignmentsAsModuleItems(courseId, jsonData) {
// //     for (const item of jsonData) {
// //       if (item['Ed Audience/Role'] === 'Student') {
// //         const moduleName = item['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'];
// //         const assignmentName = item['DISPLAY TITLE for course build'];
// //         const moduleId = await findModuleIdByName(courseId, moduleName);
// //         if (moduleId) {
// //           await addAssignmentModuleItem(courseId, moduleId, assignmentName);
// //         } else {
// //           console.log(`Module named '${moduleName}' not found.`);
// //         }
// //       }
// //     }
// //   }

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
// // async function addPageToModule(courseId, moduleId, pageUrl) {
// //     const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
// //     const data = {
// //         module_item: {
// //             title: pageUrl,
// //             type: 'Page',
// //             page_url: pageUrl
// //         }
// //     };

// //     try {
// //         const response = await axios.post(url, data, {
// //             headers: { 'Authorization': `Bearer ${accessToken}` }
// //         });
// //         console.log(`Page '${pageUrl}' added to module ID ${moduleId}`);
// //         return response.data;
// //     } catch (error) {
// //         console.error('Error adding page to module:', error);
// //     }
// // }
  



// // // Main Execution
// // (async () => {
// //     // Step 1: Create Modules
// //     await automateModuleCreation();


// //     // Step 2: Create Assignment Groups
// //     const moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);
// //     for (const moduleName of moduleNames) {
// //         if (!moduleName.includes("Teacher Resources") && !moduleName.includes("Course Overview")) {
// //             await createAssignmentGroup(courseId, moduleName);
// //         }
// //     }



// // //Step 4: Create Assignments based on the DISPLAY TITLE for course build
// // const jsonData = await convertSpreadsheetToJson(spreadsheetPath);
// // const studentAssignments = jsonData.filter(row => row['Ed Audience/Role'] === 'Student')
// //     .map(row => {
// //         return {
// //             module: row['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'],
// //             assignmentTitle: row['DISPLAY TITLE for course build'],
// //             category: row['Category'] // Adding the 'Category' column
// //         };
// //     });


// // for (let assignment of studentAssignments) {
// //     if (assignment.category && assignment.category.toLowerCase() === 'required') {
// //         await createAssignment(courseId, assignment.assignmentTitle, assignment.module);
// //     }
// // }



// // await addAllAssignmentsAsModuleItems(courseId, jsonData);



// //  await addAllAssignmentsAsModuleItems(courseId, jsonData);

// //  const pageTitle = "Important Unit Design and Support Information";
// //     const pageContent = `<h2><strong>Working with course resource links</strong></h2>
// //     <p><span>All links in this course have been tested and validated in Canvas. Be aware that for links to launch properly:</span></p>
// //     <ol>
// //         <li><span> Assignments or Teacher Resource items must be </span><span style="color: #ba372a;">PUBLISHED</span><span>.</span><span> Courses have been designed with all links intentionally Unpublished, leaving the choice to you as to when you want them to appear.</span></li>
// //         <li><span> Links will only launch for users who have </span><span><span style="color: #ba372a;">ROSTERED roles</span> </span><span>in both Canvas and HMH Ed as either </span><span style="color: #ba372a;">Teacher or Student</span><span>.</span></li>
// //         <li><span> Writable links will only function properly after you have done the </span><span style="color: #ba372a;">initial setup to Writable via HMH Ed.</span><span> For more information, see Writable Support below.</span></li>
// //         <li><span> Under certain circumstances, Canvas does not copy all referenced information when you only copy a single Module instead of the entire course. Use your </span><span style="color: #ba372a;">Canvas Link Validator</span><span> to confirm that what you have copied is working in your course.</span></li>
// //     </ol>
// //     <p><span>If you have problems with links not related to the notes above, please refer to the Support section below.</span></p>
// //     <p>&nbsp;</p>
// //     <h2><strong>Course Design</strong></h2>
// //     <ol>
// //         <li><span>Module 1 contains the Course Overview for this Unit.</span></li>
// //         <li aria-level="1"><span>Module 2 contains all Teacher Resources available for this Unit.</span></li>
// //         <li aria-level="1"><span>The remaining Modules are all divided by text selection titles and subsections that match the instructional flow on HMH Ed and your print materials. The final module includes the Unit Tasks. These modules are all set to Unpublished.</span></li>
// //         <li aria-level="1"><span>The final module includes the Unit Tasks.</span></li>
// //         <li aria-level="1"><span>All modules are set to Unpublished.</span></li>
// //         <li aria-level="1"><span>Into Literature assessments have been created as assignments with app links embedded in the text field of the assignment. This allows students to respond to assessments within Canvas.</span></li>
// //         <li aria-level="1"><span>Selection assessments are all set to a point value of 10, Unit Tasks are all set to a point value of 100. Teachers can customize these point values, including setting selection assessments to 100 points if they are used summatively.</span></li>
// //         <li aria-level="1"><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;"><span style="color: #ba372a;">Practice tests, selection tests, and unit tests must be</span> <a href="https://s3.amazonaws.com/downloads.hmlt.hmco.com/CustomerExperience/CCSD/CCSD+HMH+Into+Reading_Creating+Assignments.pdf">created for each class</a>. Use of Digital Assessments allows student scores to be available for your courses in both the HMH Ed and the Canvas platform. We have inserted placeholders in the recommended location within the Modules to prompt you to complete the setup. A link to directions is in the Note text, should you need help with the process.</span></li>
// //     </ol>
// //     <p>&nbsp;</p>
// //     <h2><strong>Support</strong></h2>
// //     <ul>
// //         <li><span>If you need help with working with HMH Ed and Into Literature components of this course, go to </span><a href="https://support.hmhco.com/s/article/ccsd"><span>https://support.hmhco.com/s/article/ccsd</span></a><span> for more information.</span></li>
// //         <li>For help with Writable components of this course, go to <a href="https://intercom.help/writable/en/articles/8302047-clark-county-canvas-set-up">https://intercom.help/writable/en/articles/8302047-clark-county-canvas-set-up</a> for information about initial set up and linking assignments between the platforms.</li>
// //     </ul>`; //Page content
// //     const moduleName = "G8_Unit 6: Course Overview (DO NOT PUBLISH)";

// //     // Step 1: Create a new page
// //     const newPage = await createCoursePage(courseId, pageTitle, pageContent);

// //     if (newPage) {
// //         // Step 2: Find the module ID for "Course Overview"
// //         const moduleId = await findModuleIdByName(courseId, moduleName);
// //         if (moduleId) {
// //             // Step 3: Add the page to the "Course Overview" module
// //             await addPageToModule(courseId, moduleId, newPage.url);
// //         } else {
// //             console.log(`Module named '${moduleName}' not found.`);
// //         }
// //     }


// //     // Optional: Delete a specific module and assignment group
// //     await findAndDeleteModule(courseId, "NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE");
// //     // await findAndDeleteSpecificAssignmentGroup(courseId, "NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE");

// //     for (let assignment of jsonData.filter(row => row['Ed Audience/Role'] === 'Student' && row['Category'].toLowerCase() === 'required')) {
// //                 const createdAssignment = await createAssignment(courseId, {
// //                     assignmentName: assignment['DISPLAY TITLE for course build'],
// //                     points: parseFloat(assignment['Points'])
// //                 });
        
// //                 if (createdAssignment) {
// //                     const iframeUrl = await getIframeUrlForAssignment(assignment['Display Title on Ed'], moduleItemsData);
// //                     if (iframeUrl) {
// //                         await updateAssignmentWithIframe(courseId, createdAssignment.id, iframeUrl);
// //                     } else {
// //                         console.log(`iFrame URL not found for assignment: ${assignment['Display Title on Ed']}`);
// //                     }
// //                 }
// //             }
        
// //             for (let assignment of jsonData.filter(row => row['Ed Audience/Role'] === 'Student' && row['Category'].toLowerCase() === 'required')) {
// //                 const iframeUrl = findIFrameAddress(moduleItemsData, assignment['Display Title on Ed']);
// //                 if (iframeUrl) {
// //                     await createAssignmentWithIFrame(courseId, assignment['Display Title on Ed'], iframeUrl);
// //                 } else {
// //                     console.log(`iFrame URL not found for assignment: ${assignment['Display Title on Ed']}`);
// //                 }
// //             }
// // })();

// // module.exports = {
// //     convertSpreadsheetToJson,
// //     createAssignment,

// // };

// // module.exports = createAssignment;
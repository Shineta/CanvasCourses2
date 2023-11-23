const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
const courseId = '14706'; // Replace with the target course ID
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
const coursePrefix = 'G8_Unit 6:'; // Update this with the dynamic course prefix

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
// // Function to read and process data from a spreadsheet
// async function readSpreadsheetData(filePath) {
//     try {
//         const rows = await readXlsxFile(filePath);
//         // Map and filter the rows as needed. The following is an example based on your provided structure:
//         return rows.map(row => ({
//             edAudienceRole: row[26], // Assuming Column AA
//             associatedModule: row[27], // Assuming Column AB
//             assignmentTitle: row[30] // Assuming Column AE
//         })).filter(row => row.edAudienceRole === 'Student' && row.associatedModule && row.assignmentTitle);
//     } catch (error) {
//         console.error('Error reading spreadsheet:', error);
//         return [];
//     }
// }



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


// Function to add assignments to their respective groups
async function addAssignmentsToGroups(courseId, assignmentsData) {
    for (const assignmentData of assignmentsData) {
        const groupId = await findAssignmentGroupIdByName(courseId, assignmentData.assignmentGroup);
        if (groupId) {
            assignmentData.assignment_group_id = groupId; // Set the group ID for the assignment
            await createAssignment(courseId, assignmentData);
        } else {
            console.log(`Assignment group '${assignmentData.assignmentGroup}' not found.`);
        }
    }
}

async function readUniqueModulesFromSpreadsheet(filePath, columnIndex = 27) {
    try {
        const rows = await readXlsxFile(filePath);
        const allItems = rows.map(row => row[columnIndex]).filter(Boolean); // Filter out empty or null values
        const uniqueItems = [...new Set(allItems)]; // Remove duplicates
        return uniqueItems;
    } catch (error) {
        console.error('Error reading spreadsheet:', error);
        return [];
    }
}




async function createModule(courseId, moduleName) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;
    const data = {
        module: {
            name: moduleName
            // Add other module attributes as needed
        }
    };


    try {
        const response = await axios.post(url, data, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data; // Returns the created module object
    } catch (error) {
        console.error('Error creating module:', error);
    }
}


async function findModuleIdByName(courseId, moduleName) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules`;


    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            params: {
                per_page: 100 // Adjust depending on the number of modules
            }
        });


        const modules = response.data;
        const foundModule = modules.find(module => module.name === moduleName);
        return foundModule ? foundModule.id : null;
    } catch (error) {
        console.error('Error finding module:', error);
        return null;
    }
}


async function deleteModule(courseId, moduleId) {
    if (!moduleId) {
        console.log('Module ID not provided.');
        return;
    }


    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}`;


    try {
        await axios.delete(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(`Module with ID ${moduleId} has been deleted.`);
    } catch (error) {
        console.error('Error deleting module:', error);
    }
}


async function automateModuleCreation() {
    let moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);


    // Filter out and prepend 'Teacher Resources' modules
    const teacherResourcesModules = moduleNames.filter(name => name.includes("Teacher Resources")).map(name => name + " (DO NOT PUBLISH)");
    const otherModules = moduleNames.filter(name => !name.includes("Teacher Resources"));


    // Add the custom course overview module
    const customOverviewModule = `${coursePrefix} Course Overview (DO NOT PUBLISH)`;
    moduleNames = [customOverviewModule, ...teacherResourcesModules, ...otherModules];


    for (const moduleName of moduleNames) {
        const newModule = await createModule(courseId, moduleName);
        console.log(`Created module: ${moduleName}`);
    }
}


async function findAndDeleteModule(courseId, moduleNameToDelete) {
    const moduleId = await findModuleIdByName(courseId, moduleNameToDelete);
    if (moduleId) {
        await deleteModule(courseId, moduleId);
    } else {
        console.log(`Module named "${moduleNameToDelete}" not found.`);
    }
}

// Function to add a module item
async function addModuleItem(courseId, moduleId, title, type = 'Assignment') {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
    const data = {
      module_item: {
        title: title,
        type: type,
        // Additional fields like 'content_id' can be added here if needed
      }
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`Module item '${title}' added to module ID ${moduleId}`);
      return response.data;
    } catch (error) {
      console.error('Error adding module item:', error);
    }
  }
  
  // Function to add module items based on the spreadsheet data
  async function addModuleItemsFromSpreadsheet(courseId, jsonData) {
    for (const item of jsonData) {
      if (item['Ed Audience/Role'] === 'Student') {
        const moduleName = item['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'];
        const moduleItemId = item['DISPLAY TITLE for course build'];
        const moduleId = await findModuleIdByName(courseId, moduleName);
  
        if (moduleId) {
          await addModuleItem(courseId, moduleId, moduleItemId);
        } else {
          console.log(`Module '${moduleName}' not found.`);
        }
      }
    }
  }



// Function to create an assignment group
async function createAssignmentGroup(courseId, groupName) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignment_groups`;
    const data = { name: groupName };
    try {
        const response = await axios.post(url, data, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(`Created assignment group: ${groupName}`);
        return response.data;
    } catch (error) {
        console.error(`Error creating assignment group: ${groupName}`, error);
    }
}

// // Function to create an assignment
// async function createAssignment(courseId, assignmentData) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const data = {
//         assignment: {
//             name: assignmentData.assignmentName,
//             points_possible: assignmentData.points,
//             due_at: assignmentData.dueDate,
//             // Add other assignment fields as needed
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
//         return response.data;
//     } catch (error) {
//         console.error('Error creating assignment:', error);
//     }
// }

// Function to create an assignment
async function createAssignment(courseId, assignmentData) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
    const data = {
        assignment: {
            name: assignmentData.assignmentName,
            id: assignmentData.id,
            points_possible: assignmentData.points,
            due_at: assignmentData.dueDate,

            // Add other assignment fields as needed
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Assuming the assignment ID is in response.data.id
        const createdAssignment = {
            ...response.data, // Spread operator to copy all properties from response.data
            id: response.data.id // Explicitly adding the ID for clarity
        };

        console.log('Assignment created:', createdAssignment);
        return createdAssignment;
    } catch (error) {
        console.error('Error creating assignment:', error);
    }
}



// Function to automate module and assignment group creation
async function automateModuleAndAssignmentGroupCreation() {
    let moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);
    // ... existing module processing ...




    for (const moduleName of moduleNames) {
        if (!moduleName.includes("Teacher Resources") && !moduleName.includes("Course Overview")) {
            await createAssignmentGroup(courseId, moduleName);
        }
    }
}

// Function to find an assignment group ID by name
async function findAssignmentGroupIdByName(courseId, groupName) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignment_groups`;
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            params: {
                per_page: 100
            }
        });
        const groups = response.data;
        const foundGroup = groups.find(group => group.name === groupName);
        return foundGroup ? foundGroup.id : null;
    } catch (error) {
        console.error('Error finding assignment group:', error);
        return null;
    }
}

// Function to create an assignment
async function createAssignment(courseId, assignmentName, moduleName) {
    const groupId = await findAssignmentGroupIdByName(courseId, moduleName);
    if (!groupId) {
        console.log(`Assignment group named '${moduleName}' not found.`);
        return;
    }
    const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
    const data = {
        assignment: {
            name: assignmentName,
            assignment_group_id: groupId,
            // Other assignment details can be added here
        }
    };
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`Assignment '${assignmentName}' created in module '${moduleName}' with ID ${groupId}`);
        return response.data;
    } catch (error) {
        console.error('Error creating assignment:', error);
    }
}

async function findAssignmentIdByName(courseId, assignmentName) {
    let url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;

    try {
        while (url) {
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                params: { per_page: 100 }
            });

            const assignments = response.data;
            const foundAssignment = assignments.find(assignment => assignment.name === assignmentName);
            if (foundAssignment) return foundAssignment.id;

            // Check for the 'next' link in the headers
            url = null; // Reset URL to null initially
            const linkHeader = response.headers['link'];
            if (linkHeader) {
                const links = linkHeader.split(',');
                const nextLink = links.find(link => link.includes('rel="next"'));
                if (nextLink) {
                    const match = nextLink.match(/<(.*?)>/);
                    url = match ? match[1] : null;
                }
            }
        }
    } catch (error) {
        console.error('Error finding assignment:', error);
    }
    return null;
}

  
// Function to add a module item that is an assignment
async function addAssignmentModuleItem(courseId, moduleId, assignmentName) {
    const assignmentId = await findAssignmentIdByName(courseId, assignmentName);
    if (!assignmentId) {
      console.log(`Assignment named '${assignmentName}' not found.`);
      return;
    }
  
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
    const data = {
      module_item: {
        title: assignmentName,
        type: 'Assignment',
        content_id: assignmentId
      }
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`Module item for assignment '${assignmentName}' added to module ID ${moduleId}`);
      return response.data;
    } catch (error) {
      console.error(`Error adding module item for assignment '${assignmentName}':`, error.response.data);
    }
  }
  
  // Function to iterate over JSON data and add module items for each student assignment
  async function addAllAssignmentsAsModuleItems(courseId, jsonData) {
    for (const item of jsonData) {
      if (item['Ed Audience/Role'] === 'Student') {
        const moduleName = item['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'];
        const assignmentName = item['DISPLAY TITLE for course build'];
        const moduleId = await findModuleIdByName(courseId, moduleName);
        if (moduleId) {
          await addAssignmentModuleItem(courseId, moduleId, assignmentName);
        } else {
          console.log(`Module named '${moduleName}' not found.`);
        }
      }
    }
  }
  



// Main Execution
(async () => {
    // Step 1: Create Modules
    await automateModuleCreation();


    // Step 2: Create Assignment Groups
    const moduleNames = await readUniqueModulesFromSpreadsheet(spreadsheetPath);
    for (const moduleName of moduleNames) {
        if (!moduleName.includes("Teacher Resources") && !moduleName.includes("Course Overview")) {
            await createAssignmentGroup(courseId, moduleName);
        }
    }


    // // Step 3: Add Module Items
    // const spreadsheetData = await readSpreadsheetData(spreadsheetPath);
    // await addAssignmentsToModules(courseId, spreadsheetData);


// // Step 4: Create Assignments in their respective groups
// const assignmentsData = await readAssignmentsData(spreadsheetPath);
// await addAssignmentsToGroups(courseId, assignmentsData);

 // Step 4: Create Assignments based on the DISPLAY TITLE for course build
 const jsonData = await convertSpreadsheetToJson(spreadsheetPath); // Ensure this function is defined and works correctly
 const studentAssignments = jsonData.filter(row => row['Ed Audience/Role'] === 'Student')
     .map(row => {
         return {
             module: row['NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE'],
             assignmentTitle: row['DISPLAY TITLE for course build']
         };
     });
 for (let assignment of studentAssignments) {
     await createAssignment(courseId, assignment.assignmentTitle, assignment.module);
 }


 await addAllAssignmentsAsModuleItems(courseId, jsonData);


 


    // Optional: Delete a specific module and assignment group
    await findAndDeleteModule(courseId, "NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE");
    // await findAndDeleteSpecificAssignmentGroup(courseId, "NAME OF CANVAS ASSIGNMENT GROUP & ASSOCIATED MODULE");
})();
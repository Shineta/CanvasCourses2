const axios = require('axios');
const XLSX = require('xlsx'); 

// Replace with your Canvas API endpoint
const canvasBaseUrl = 'https://hmh.instructure.com';

// Replace with your Canvas access token
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';

const canvasDomain = 'https://hmh.instructure.com/';

// Replace with your Canvas course ID
const courseId = '14735';




// Function to fetch module items
async function fetchModuleItems(courseId) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules?include=items`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Check if the response contains data
        if (response.data) {
            const modules = response.data;
            const resources = [];

            // Iterate through modules and items to find resources
            for (const module of modules) {
                // Check if 'items' property exists and is an array
                if (Array.isArray(module.items)) {
                    for (const item of module.items) {
                        if (item.type === 'ExternalUrl') {
                            // Log the resource and URL capture
                            console.log(`Captured resource: ${item.title}`);
                            console.log(`URL: ${item.external_url}`);
                            resources.push({
                                title: item.title,
                                url: item.external_url
                            });
                        }
                    }
                }
            }

            // You can now use the 'resources' array as needed, e.g., to write to an XLSX file.
            createAndPopulateXLSX(resources);
        } else {
            console.log('No data found in the response.');
        }
    } catch (error) {
        console.error('Error fetching module items:', error);
    }
}

// Function to fetch module items with pagination
async function getModuleItems(courseId, moduleId) {
    const perPage = 100; // Adjust the number of items per page as needed
    let page = 1;
    let allModuleItems = [];

    while (true) {
        const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/modules/${moduleId}/items?per_page=${perPage}&page=${page}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const moduleItems = response.data;
            if (moduleItems.length === 0) {
                // No more items, break the loop
                break;
            }

            allModuleItems = allModuleItems.concat(moduleItems);
            page++;
        } catch (error) {
            console.error('Error fetching module items:', error);
            throw error;
        }
    }

    return allModuleItems;
}


// Example usage:

const moduleId = '43649'; // Replace with the ID of the "Grade level resources" module

async function captureModuleItems() {
    try {
        const moduleItems = await getModuleItems(courseId, moduleId);

        for (const item of moduleItems) {
            console.log('Captured resource:', item.title);
            console.log('URL:', item.external_url);

            // Push the module item to the resources array
            resources.push({
                title: item.title,
                url: item.external_url
            });
        }

        console.log('All module items captured.');

        // Call the function to create and populate the XLSX file
        createAndPopulateXLSX(resources);
    } catch (error) {
        console.error('Error capturing module items:', error);
    }
}

// Call the captureModuleItems function
captureModuleItems();


// Call the fetchModuleItems function
fetchModuleItems(courseId);

// Initialize an empty array to store module items
const resources = [];

// Function to decode URL parameters into an object
function decodeURLParams(url) {
    const searchParams = new URL(url).searchParams;
    const params = {};
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    return params;
}

// Function to create and populate an XLSX file
function createAndPopulateXLSX(resources) {
    const workbook = XLSX.utils.book_new();

    // Loop through the rows and add a new column for the URL address
    for (let i = 0; i < resources.length; i++) {
        const url = resources[i].url;
        const decodedParams = decodeURLParams(url);
        const address = decodedParams.custom_resource_url || ''; // Extract the URL address
        resources[i].decodedParams = address; // Store the URL address directly in the last column
    }

    const worksheet = XLSX.utils.json_to_sheet(resources);

    // Append the modified worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ModuleItems');

    // Write the workbook to a file
    XLSX.writeFile(workbook, 'g6_module_items2.xlsx');

    console.log('XLSX file created and populated with module items and URL addresses.');
}



// Create and populate an XLSX file with the captured resources
createAndPopulateXLSX(resources);


///////////////////////////////////////////////////////////////////////////////////////////////////////
//****************************New Test 12-20-23 9:15************************************************ */
///////////////////////////////////////////////////////////////////////////////////////////////////////

// const XLSX = require('xlsx');
// const fs = require('fs');

// // Load and filter the "IntoLiteratureG6U5CCSDContentsInput.xlsx" spreadsheet
// const contentsInputWorkbook = XLSX.readFile('/workspaces/CanvasCourses2/g6IntoLiteratureG6U5CCSDContentsInput.xlsx');
// const contentsInputSheet = contentsInputWorkbook.Sheets[contentsInputWorkbook.SheetNames[0]];

// // Extract list of items from the "Display Title on Ed" column
// const filteredData = XLSX.utils.sheet_to_json(contentsInputSheet, { header: 1 })
//   .filter(row => (row[25] === 'required' || row[26] === 'student' || row[26] === 'Teacher/student') && row[30]);

// // const displayTitles = filteredData.map(row => row[30]);
// const displayTitles = XLSX.utils.sheet_to_json(contentsInputSheet, { header: 'Display Title on Ed' }).map(item => item['Display Title on Ed']);

// console.log('List of "Display Title on Ed" items:');
// console.log(displayTitles);

// // Load the "module_items.xlsx" spreadsheet
// const moduleItemsWorkbook = XLSX.readFile('/workspaces/CanvasCourses2/module_items.xlsx');
// const moduleItemsSheet = moduleItemsWorkbook.Sheets[moduleItemsWorkbook.SheetNames[0]];

// // Match titles and add a 4th column
// const moduleItemsData = XLSX.utils.sheet_to_json(moduleItemsSheet, { header: 1 });

// for (let i = 0; i < moduleItemsData.length; i++) {
//   const title = moduleItemsData[i]['title'];
//   if (title) {
//     const titleParts = title.split('-');
//     const secondHalfTitle = titleParts.length > 1 ? titleParts[1].trim() : '';

//     // Find the matching "Display Title on Ed" item
//     const matchingDisplayTitle = displayTitles.find(displayTitle => {
//       const match = secondHalfTitle === displayTitle;
//       if (match) {
//         console.log(`Match found: "${secondHalfTitle}" in module_items.xlsx matches "${displayTitle}" in IntoLiteratureG8U6CCSDContentsInput.xlsx`);
//       }
//       return match;
//     });

//     // Add the matching "Display Title on Ed" to the module item
//     moduleItemsData[i]['Display Title on Ed'] = matchingDisplayTitle || '';
//   }
// }

// // Create a new worksheet with the updated data
// const updatedModuleItemsSheet = XLSX.utils.json_to_sheet(moduleItemsData);

// // Create a new workbook with the updated module items
// const updatedModuleItemsWorkbook = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(updatedModuleItemsWorkbook, updatedModuleItemsSheet, 'ModuleItems');

// // Save the updated workbook to a new Excel file
// const outputFilePath = '/workspaces/CanvasCourses2/module_items_updated.xlsx';
// XLSX.writeFile(updatedModuleItemsWorkbook, outputFilePath);

// console.log('Module items updated and saved to module_items_updated.xlsx.');





// // Load the moduleItemsSheet
// // const moduleItemsWorkbook = XLSX.readFile('/workspaces/CanvasCourses2/module_items.xlsx');
// const moduleItemsSheetName = moduleItemsWorkbook.SheetNames[0];


// // Create a list of "Display Title on Ed" items from the contentsInputSheet
// // const displayTitles = XLSX.utils.sheet_to_json(contentsInputSheet, { header: 'Display Title on Ed' }).map(item => item['Display Title on Ed']);

// // Initialize an empty array to store the updated module items
// const updatedModuleItems = [];

// // Iterate through the moduleItemsSheet and add the "Display Title on Ed" items to each row
// for (const row of XLSX.utils.sheet_to_json(moduleItemsSheet, { header: 1 })) {
//     if (row.length >= 3) {
//         const title = row[2]; // Assuming the title column is in the 3rd position (index 2)
//         const matchingDisplayTitle = displayTitles.find(displayTitle => title.includes(displayTitle));
//         row.push(matchingDisplayTitle || ''); // Add the matching display title or an empty string
//     }
//     updatedModuleItems.push(row);
// }

// // Create a new workbook with the updated module items
// const updatedWorkbook = XLSX.utils.book_new();
// const updatedSheet = XLSX.utils.aoa_to_sheet(updatedModuleItems);

// // Append the updated worksheet to the new workbook
// XLSX.utils.book_append_sheet(updatedWorkbook, updatedSheet, moduleItemsSheetName);

// // Save the updated workbook to a new Excel file
// XLSX.writeFile(updatedWorkbook, '/workspaces/CanvasCourses2/module_items_updated.xlsx');

// console.log('Module items updated and saved to module_items_updated.xlsx.');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////****************The following code creates a spreadsheet that contains assignment titles and URLs *************************/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const XLSX = require('xlsx');
// const fs = require('fs');

// // Load the "module_items.xlsx" spreadsheet
// const moduleItemsWorkbook = XLSX.readFile('/workspaces/CanvasCourses2/module_items.xlsx');
// const moduleItemsSheet = moduleItemsWorkbook.Sheets[moduleItemsWorkbook.SheetNames[0]];

// // Extract module items data
// const moduleItemsData = XLSX.utils.sheet_to_json(moduleItemsSheet, { header: 1 });

// // Create new headers for the split columns
// moduleItemsData[0].splice(1, 0, 'Title Before Hyphen', 'Title After Hyphen');

// // Iterate through the module items and split column A
// for (let i = 1; i < moduleItemsData.length; i++) {
//   const title = moduleItemsData[i][0]; // Assuming the title is in the 1st position (index 0) of column A
//   if (title) {
//     const titleParts = title.split('-');
//     if (titleParts.length >= 2) {
//       // Separate the title into two parts
//       const firstPart = titleParts[0].trim();
//       const secondPart = titleParts.slice(1).join('-').trim();
      
//       // Update the module item with two new columns
//       moduleItemsData[i].splice(1, 0, firstPart, secondPart);
//     } else {
//       // If there is no "-", keep the title as is in both columns
//       moduleItemsData[i].splice(1, 0, title, '');
//     }
//   } else {
//     // If there is no title, add empty values in both columns
//     moduleItemsData[i].splice(1, 0, '', '');
//   }
// }

// // Create a new worksheet with the updated data
// const updatedModuleItemsSheet = XLSX.utils.aoa_to_sheet(moduleItemsData);

// // Create a new workbook with the updated module items
// const updatedModuleItemsWorkbook = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(updatedModuleItemsWorkbook, updatedModuleItemsSheet, 'ModuleItems');

// // Save the updated workbook to a new Excel file
// const outputFilePath = '/workspaces/CanvasCourses2/module_items_updated2.xlsx';
// XLSX.writeFile(updatedModuleItemsWorkbook, outputFilePath);

// console.log('Module items updated with separate columns and saved to module_items_updated.xlsx.');

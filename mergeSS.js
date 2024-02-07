const XLSX = require('xlsx');
const fs = require('fs');

try {
    // Load the two spreadsheets
    const moduleItemsWorkbook = XLSX.readFile('/workspaces/CanvasCourses2/module_items.xlsx');
    const contentsInputWorkbook = XLSX.readFile('/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx');

    // Get the first sheet from each workbook
    const moduleItemsSheet = moduleItemsWorkbook.Sheets[moduleItemsWorkbook.SheetNames[0]];
    const contentsInputSheet = contentsInputWorkbook.Sheets[contentsInputWorkbook.SheetNames[0]];

    // Convert sheets to JSON objects
    const moduleItemsData = XLSX.utils.sheet_to_json(moduleItemsSheet);
    const contentsInputData = XLSX.utils.sheet_to_json(contentsInputSheet);

    // Create a map for 'decodedParams' from 'moduleItemsData'
    const decodedParamsMap = {};
    for (const row of moduleItemsData) {
        decodedParamsMap[row.title] = row.decodedParams;
    }

    // Add a new column with 'decodedParams' to 'contentsInputData'
    for (const row of contentsInputData) {
        // Extract the 'Display Title on Ed' from the row
        const displayTitle = `Student Edition - ${row['Display Title on Ed']}`;
        // Get the corresponding 'decodedParams' from the map, or an empty string if not found
        const decodedParams = decodedParamsMap[displayTitle] || '';
        row['decodedParams'] = decodedParams;
    }

    // Create a new workbook and add the updated data
    const updatedContentsInputWorkbook = XLSX.utils.book_new();
    const updatedContentsInputSheet = XLSX.utils.json_to_sheet(contentsInputData);
    XLSX.utils.book_append_sheet(updatedContentsInputWorkbook, updatedContentsInputSheet, 'Sheet1');

    // Create a new file and save the updated workbook to it
    const outputFilePath = '/workspaces/CanvasCourses2/Updated_Contents_Input.xlsx';
    XLSX.writeFile(updatedContentsInputWorkbook, outputFilePath);

    console.log(`Updated file saved to: ${outputFilePath}`);
} catch (error) {
    console.error(`An error occurred: ${error.message}`);
}

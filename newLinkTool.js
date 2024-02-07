const fs = require('fs');
const XLSX = require('xlsx');

// Define your base URL
const baseURL = 'https://www.hmhco.com/content/literature/into_lit/g6/student/epub/ilnl21en_ese_g06u05_student/#cards--'; // Replace with your base URL

// Define your access token and ID token
const accessToken = 'SIF_HMACSHA256%20ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVGN3TWpRNE1qTXlNU3dpYzNWaUlqb2lZMjVjZFRBd00yUk1UMVZKVXlCVFNVNUhURVZVVDA0Z0tGUXdNVEFwTEhWcFpGeDFNREF6WkV4TlV5MVVNREV3TFRreU1ESXhOVGd4TEhWdWFYRjFaVWxrWlc1MGFXWnBaWEpjZFRBd00yUmtOemRoTlRKaVl5MDFaR1JoTFRRNU16Y3RPRGN4TnkwMFptUmlPV0ZpWmpZMFptVXNiMXgxTURBelpEa3lNREl4TlRneExHUmpYSFV3TUROa09USXdNakUxT0RBaUxDSm9kSFJ3T2k4dmQzZDNMbWx0YzJkc2IySmhiQzV2Y21jdmFXMXpjSFZ5YkM5c2FYTXZkakV2ZG05allXSXZjR1Z5YzI5dUlqcGJJa2x1YzNSeWRXTjBiM0lpWFN3aVpHbHpkRjlwWkNJNkltVXhPR1V3WkRkaUxUTTBObVF0TkRnek1pMDROalEzTFRjelptTXpPV1ptWldZME1TSXNJbk5qYUc5dmJGOXBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0luTmphRzl2YkY5eVpXWnBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0lsQnNZWFJtYjNKdFNXUWlPaUpKUkZNaUxDSmthWE4wWDNKbFptbGtJam9pWlRFNFpUQmtOMkl0TXpRMlpDMDBPRE15TFRnMk5EY3ROek5tWXpNNVptWmxaalF4SWl3aWRYTmxjbEpsWmtsa0lqb2laRGMzWVRVeVltTXROV1JrWVMwME9UTTNMVGczTVRjdE5HWmtZamxoWW1ZMk5HWmxJaXdpWTJ4cFpXNTBYMmxrSWpvaU1UVXlZMlZrTlRBdE1UTTJPUzAwWWpFNUxUaGlNall0T0dZelpEVmtPV0ptWkRaaExtaHRhR052TG1OdmJTSXNJbUZ1YjI1NWJXOTFjeUk2SW1aaGJITmxJaXdpWlhod0lqb3hOekF5TlRZNE56SXhmUS5DRm1vYklfWlNKSWFkSmlzLUw3Y3B2RHJhVURyUW4yalc0Rmlocy1VMWY0Om5zYVNZckVmeG5DcVZDL0JpWk5YOWw4WEVXSmE0ZXpSbFg3U0Qwc0ptNTA9Cg=='; // Replace with your access token
const idToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LmFwaS5obWhjby5jb20iLCJhdWQiOiJodHRwOi8vd3d3LmhtaGNvLmNvbSIsImlhdCI6MTcwMjc1MDUxOCwic3ViIjoiY25cdTAwM2RMT1VJUyBTSU5HTEVUT04gKFQwMTApLHVpZFx1MDAzZExNUy1UMDEwLTkyMDIxNTgxLHVuaXF1ZUlkZW50aWZpZXJcdTAwM2RkNzdhNTJiYy01ZGRhLTQ5MzctODcxNy00ZmRiOWFiZjY0ZmUsb1x1MDAzZDkyMDIxNTgxLGRjXHUwMDNkOTIwMjE1ODAiLCJodHRwOi8vd3d3Lmltc2dsb2JhbC5vcmcvaW1zcHVybC9saXMvdjEvdm9jYWIvcGVyc29uIjpbIkluc3RydWN0b3IiXSwiZGlzdF9pZCI6ImUxOGUwZDdiLTM0NmQtNDgzMi04NjQ3LTczZmMzOWZmZWY0MSIsInNjaG9vbF9pZCI6IjM2M2NiN2ZiLTNjYjMtNDQ0Mi1iMWNiLTZhMzA0YTcyZWQ5ZiIsInNjaG9vbF9yZWZpZCI6IjM2M2NiN2ZiLTNjYjMtNDQ0Mi1iMWNiLTZhMzA0YTcyZWQ5ZiIsIlBsYXRmb3JtSWQiOiJJRFMiLCJkaXN0X3JlZmlkIjoiZTE4ZTBkN2ItMzQ2ZC00ODMyLTg2NDctNzNmYzM5ZmZlZjQxIiwidXNlclJlZklkIjoiZDc3YTUyYmMtNWRkYS00OTM3LTg3MTctNGZkYjlhYmY2NGZlIiwiY2xpZW50X2lkIjoiMTUyY2VkNTAtMTM2OS00YjE5LThiMjYtOGYzZDVkOWJmZDZhLmhtaGNvLmNvbSIsImFub255bW91cyI6ImZhbHNlIiwiZXhwIjoxNzAyODM2OTE4fQ.SAc0v2s8C9c8OYZTBU1ZldzzSejD9AsnW5SWOAUTtyI:d4mL6rKGirkVBq4Ccg0MJN3j/FasOBaiVo4sBboUaNE='; // Replace with your ID token

(async () => {
  try {
    const workbook = XLSX.readFile('/workspaces/CanvasCourses2/newIntoLiteratureG8U6CCSDContentsInput2.xlsx'); // Replace with your spreadsheet file
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const filteredData = data.filter(row =>
      row['Category'] === 'Required' &&
      row['Ed Audience/Role'].toLowerCase().includes('student')
    );

    for (const row of filteredData) {
        const title = row['Display Title on Ed'];
        const linkToObject = row['Link To Object'];
        let url = `${baseURL}${linkToObject}/`; // Append the Link To Object to the base URL
  
   

      console.log(`Processing title: ${row['Display Title on Ed']}`);
      console.log(`URL: ${url}`);

      // Append the link data to a text file
      fs.appendFile('testlinks.txt', `${title}: ${linkHref}`, (err) => {
        if (err) {
          console.error('Error appending to file:', err);
        } else {
          console.log('Data appended to file.');
        }
      });

      console.log('Data appended to file.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

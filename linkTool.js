const puppeteer = require('puppeteer');
const fs = require('fs');
const XLSX = require('xlsx');
// const pageLinks = require('./pageLinks');

(async () => {
  // Load the XLSX file 
  const workbook = XLSX.readFile('IntoLiteratureG8U6CCSDContentsInput.xlsx');
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert XLSX data to an array of objects
  const data = XLSX.utils.sheet_to_json(worksheet);

  // Filter the rows that meet your criteria
  const filteredData = data.filter(row =>
    row['Category'] === 'Required' &&
    row['Ed Audience/Role'].toLowerCase().includes('student')
  );

  // Extract the display titles
  const displayTitles = filteredData.map(row => row['Display Title on Ed']);

  // Print the list of display titles
  console.log('Display Titles:');
  console.log(displayTitles);

  // Initialize Puppeteer
  const browser = await puppeteer.launch();

  for (const title of displayTitles) {
    const encodedTitle = encodeURIComponent(title);


    // Construct the URL
    const url = `https://www.hmhco.com/ui/logged-in/#!#access_token=SIF_HMACSHA256%20ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVGN3TVRNd05qazNOeXdpYzNWaUlqb2lZMjVjZFRBd00yUk1UMVZKVXlCVFNVNUhURVZVVDA0Z0tGUXdNVEFwTEhWcFpGeDFNREF6WkV4TlV5MVVNREV3TFRreU1ESXhOVGd4TEhWdWFYRjFaVWxrWlc1MGFXWnBaWEpjZFRBd00yUmtOemRoTlRKaVl5MDFaR1JoTFRRNU16Y3RPRGN4TnkwMFptUmlPV0ZpWmpZMFptVXNiMXgxTURBelpEa3lNREl4TlRneExHUmpYSFV3TUROa09USXdNakUxT0RBaUxDSm9kSFJ3T2k4dmQzZDNMbWx0YzJkc2IySmhiQzV2Y21jdmFXMXpjSFZ5YkM5c2FYTXZkakV2ZG05allXSXZjR1Z5YzI5dUlqcGJJa2x1YzNSeWRXTjBiM0lpWFN3aVpHbHpkRjlwWkNJNkltVXhPR1V3WkRkaUxUTTBObVF0TkRnek1pMDROalEzTFRjelptTXpPV1ptWldZME1TSXNJbk5qYUc5dmJGOXBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0luTmphRzl2YkY5eVpXWnBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0lsQnNZWFJtYjNKdFNXUWlPaUpKUkZNaUxDSmthWE4wWDNKbFptbGtJam9pWlRFNFpUQmtOMkl0TXpRMlpDMDBPRE15TFRnMk5EY3ROek5tWXpNNVptWmxaalF4SWl3aWRYTmxjbEpsWmtsa0lqb2laRGMzWVRVeVltTXROV1JrWVMwME9UTTNMVGczTVRjdE5HWmtZamxoWW1ZMk5HWmxJaXdpWTJ4cFpXNTBYMmxrSWpvaU1UVXlZMlZrTlRBdE1UTTJPUzAwWWpFNUxUaGlNall0T0dZelpEVmtPV0ptWkRaaExtaHRhR052TG1OdmJTSXNJbUZ1YjI1NWJXOTFjeUk2SW1aaGJITmxJaXdpWlhod0lqb3hOekF4TXprek16YzNmUS5IdU4xQVc0ODZtZTNlZjh6WTFDZE9KdjNkVnBhZDlZQ3htR1I4ZlNBWWJJOkpudFdiZ1pRcERTMEUrVW82Rk9kdHdlZWdya09oaFk5OEVHZjBBSmYvdHM9Cg==&id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LmFwaS5obWhjby5jb20iLCJhdWQiOiJodHRwOi8vd3d3LmhtaGNvLmNvbSIsImlhdCI6MTcwMTMwNjk3Nywic3ViIjoiY25cdTAwM2RMT1VJUyBTSU5HTEVUT04gKFQwMTApLHVpZFx1MDAzZExNUy1UMDEwLTkyMDIxNTgxLHVuaXF1ZUlkZW50aWZpZXJcdTAwM2RkNzdhNTJiYy01ZGRhLTQ5MzctODcxNy00ZmRiOWFiZjY0ZmUsb1x1MDAzZDkyMDIxNTgxLGRjXHUwMDNkOTIwMjE1ODAiLCJodHRwOi8vd3d3Lmltc2dsb2JhbC5vcmcvaW1zcHVybC9saXMvdjEvdm9jYWIvcGVyc29uIjpbIkluc3RydWN0b3IiXSwiZGlzdF9pZCI6ImUxOGUwZDdiLTM0NmQtNDgzMi04NjQ3LTczZmMzOWZmZWY0MSIsInNjaG9vbF9pZCI6IjM2M2NiN2ZiLTNjYjMtNDQ0Mi1iMWNiLTZhMzA0YTcyZWQ5ZiIsInNjaG9vbF9yZWZpZCI6IjM2M2NiN2ZiLTNjYjMtNDQ0Mi1iMWNiLTZhMzA0YTcyZWQ5ZiIsIlBsYXRmb3JtSWQiOiJJRFMiLCJkaXN0X3JlZmlkIjoiZTE4ZTBkN2ItMzQ2ZC00ODMyLTg2NDctNzNmYzM5ZmZlZjQxIiwidXNlclJlZklkIjoiZDc3YTUyYmMtNWRkYS00OTM3LTg3MTctNGZkYjlhYmY2NGZlIiwiY2xpZW50X2lkIjoiMTUyY2VkNTAtMTM2OS00YjE5LThiMjYtOGYzZDVkOWJmZDZhLmhtaGNvLmNvbSIsImFub255bW91cyI6ImZhbHNlIiwiZXhwIjoxNzAxMzkzMzc3fQ.HuN1AW486me3ef8zY1CdOJv3dVpad9YCxmGR8fSAYbI:JntWbgZQpDS0E+Uo6FOdtweegrkOhhY98EGf0AJf/ts=&state=https://www.hmhco.com/ui/#/allResources/ELA_NGL2_G8_NA/all?q=${encodedTitle}`;

    // Log a message for each title and URL
    console.log(`Processing title: ${title}`);
    console.log(`URL: ${url}`);

    // Create a new page and navigate to the URL
    const page = await browser.newPage();
    await page.goto(url);

    // Select the first link on the page
    const firstLink = await page.$('a'); // Modify this selector as needed

    if (firstLink) {
        const linkHref = await page.evaluate(link => link.href, firstLink);
  
        // Log the link address
        console.log(`Link Address: ${linkHref}`);
  
        // Append the link data to a text file
        fs.appendFile('links.txt', `${title}: ${linkHref}`, (err) => {
          if (err) {
            console.error('Error appending to file:', err);
          } else {
            console.log('Data appended to file.');
          }
        });
      }
    // Close the current page
    await page.close();
  }

  // Close the browser
  await browser.close();
})();

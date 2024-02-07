const token = '95034f41-1704-4722-8b3a-dc0e3246ca4a'; // Replace with your actual token
const fetch = require('node-fetch');
const http = require('http');
const https = require('https');

const url = 'https://du11hjcvx0uqb.cloudfront.net/dist/javascripts/lti_post_message_forwarding-59677caad5.js';

const axios = require('axios');

// Define the first URL for the GET request
const firstUrl = 'https://du11hjcvx0uqb.cloudfront.net/dist/javascripts/lti_post_message_forwarding-59677caad5.js';

const firstRequestOptions = {
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    // Add any other headers here if needed for the first URL
  },
};

fetch(firstUrl, firstRequestOptions)
  .then(response => {
    if (response.status === 200) {
      return response.text();
    } else {
      console.error('First request failed with status:', response.status);
    }
  })
  .then(responseText => {
    // You can process the response text here for the first URL
    console.log('First URL Response Text:', responseText);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Define the second URL for the GET request
const secondUrl = 'https://hmh.instructure.com/api/v1/courses/14706/lti_apps/launch_definitions?per_page=100&placements%5B%5D=assignment_selection&placements%5B%5D=resource_selection';

const secondHeaders = {
  'Accept': 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01',
  // Add other headers here if needed for the second URL
};

axios.get(secondUrl, { headers: secondHeaders })
  .then(response => {
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Second request failed with status:', response.status);
    }
  })
  .then(responseData => {
    // You can process the response data here for the second URL
    console.log('Second URL Response Data:', responseData);
  })
  .catch(error => {
    console.error('Error:', error);
  });









  const requestInfo = {
    url: "https://hmh.instructure.com/api/v1/courses/14706/lti_apps/launch_definitions?placements%5B%5D=similarity_detection",
    method: "GET",
    statusCode: 304,
    remoteAddress: "54.85.234.60:443",
    referrerPolicy: "no-referrer-when-downgrade",
    cacheControl: "max-age=600, private",
    date: "Mon, 05 Feb 2024 20:33:22 GMT",
    etag: 'W/"8f232f16b9bc1f898de5efcc5aeb529d"',
    server: "Apache",
    cookies: [
      "_csrf_token=OyQpgOQJybrbYNcUqyR6yqxBcq7Ow4ymis%2F8z1ATky5zbHOyvGWs1aFTjl%2FpdRSrwwtZmbn26OKyqJm4GWPXdg%3D%3D; path=/; secure",
      "log_session_id=df4b47ec926c19c4637c6fec54c73332; path=/; secure; HttpOnly"
    ],
    vary: "Accept-Encoding",
    authority: "hmh.instructure.com",
    scheme: "https",
    accept: "*/*",
    acceptEncoding: "gzip, deflate, br",
    acceptLanguage: "en-US,en;q=0.9",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    secChUa: "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
    secChUaMobile: "?0",
    secChUaPlatform: "\"Windows\"",
    secFetchDest: "empty",
    secFetchMode: "cors",
    secFetchSite: "same-origin",
    sentryTrace: "3cee8292921e4ab69199a175039fbd92-86638db6f09a22f0-0",
    xCsrfToken: "lWAZZeu1NT/GemYBdOICgI9DoxNkdbh25i5sbGVm8zjdKENXs9lQULxJP0o2s2zh4AmIJBNA3DLeSQkbLBa3YA==",
    xRequestedWith: "XMLHttpRequest"
  };
  
  // Print the request information
  console.log("Request URL:", requestInfo.url);
  console.log("Request Method:", requestInfo.method);
  console.log("Status Code:", requestInfo.statusCode, "Not Modified");
  console.log("Remote Address:", requestInfo.remoteAddress);
  console.log("Referrer Policy:", requestInfo.referrerPolicy);
  console.log("Cache-Control:", requestInfo.cacheControl);
  console.log("Date:", requestInfo.date);
  console.log("Etag:", requestInfo.etag);
  console.log("Server:", requestInfo.server);
  console.log("Cookies:", requestInfo.cookies);
  console.log("Vary:", requestInfo.vary);
  console.log("Authority:", requestInfo.authority);
  console.log("Scheme:", requestInfo.scheme);
  console.log("Accept:", requestInfo.accept);
  console.log("Accept-Encoding:", requestInfo.acceptEncoding);
  console.log("Accept-Language:", requestInfo.acceptLanguage);
  console.log("User-Agent:", requestInfo.userAgent);
  console.log("Sec-Ch-Ua:", requestInfo.secChUa);
  console.log("Sec-Ch-Ua-Mobile:", requestInfo.secChUaMobile);
  console.log("Sec-Ch-Ua-Platform:", requestInfo.secChUaPlatform);
  console.log("Sec-Fetch-Dest:", requestInfo.secFetchDest);
  console.log("Sec-Fetch-Mode:", requestInfo.secFetchMode);
  console.log("Sec-Fetch-Site:", requestInfo.secFetchSite);
  console.log("Sentry-Trace:", requestInfo.sentryTrace);
  console.log("X-Csrf-Token:", requestInfo.xCsrfToken);
  console.log("X-Requested-With:", requestInfo.xRequestedWith);
  
//   const url = 'https://hmh.instructure.com/api/v1/courses/14706/lti_apps/launch_definitions?placements%5B%5D=assignment_edit';

  // Define the request options object
const requestOptions = {
    headers: {
      Accept: 'application/json+canvas-string-ids, application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      Cookie: '_mkto_trk=id:449-BVJ-543&token:_mch-instructure.com-1694465074754-65934; cb_user_id=null; cb_group_id=null; cb_anonymous_id=%227169d42f-afe9-4f54-8692-5dd420a4416e%22; _ga_KYXTX6MY9T=GS1.2.1702870579.1.0.1702870579.60.0.0; _ga=GA1.1.1288292327.1694465098; rce.htmleditor=PRETTY; _ga_XXN50SC2TH=GS1.1.1706887075.63.0.1706887075.0.0.0; _gcl_au=1.1.1199659307.1706905691; __utmzz=utmcsr=google|utmcmd=organic|utmccn=(not set)|utmctr=(not provided); __utmzzses=1; _fbp=fb.1.1706905691719.1343449334; lo-uid=ed70c3d3-1706905691664-4e894fb984ce8d0c; _clck=1k63eh8%7C2%7Cfix%7C0%7C1349; _ga_75H5134F9J=GS1.1.1706907854.3.1.1706907855.59.0.0; _hp2_props.3295960117=%7B%22Region%22%3A%22Americas-North%20America%22%2C%22Page%20Node%22%3A%2216116%22%2C%22Page%20Group%22%3A%22Panda%20Pros%22%2C%22Page%20Type%22%3A%22Overview%22%7D; _hp2_id.3295960117=%7B%22userId%22%3A%226003128539108856%22%2C%22pageviewId%22%3A%222590996243376192%22%2C%22sessionId%22%3A%225029727821584165%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _uetvid=09ba17b050e411eea258b563da3cab42; lo-visits=2; log_session_id=df4b47ec926c19c4637c6fec54c73332; _legacy_normandy_session=4YAzrLIvdvTYAcYoQ-2w9w+YzPdlmuMSSMbpsG2tSpy7Do7jyrTxRwLkrD1e0IBlwKKAq5bUQYLRRGqVRwPpWTZweq9gBmRiBgvKDG7jNAtAOQaXnsKnOuk5IGIJSd5xZwKoGMUk1IzBfYHQMECPKCwqc-UYdht0GM-i_oXQvcOHk3ZadBmRistQPIrsJmntNTbMwPV-g6XPcQcTcHICFvWuRKHYenHZVI52MsRT03eHju-d0-8yEUq_StNTDDisIuImBt0a-JYXENOq9YfS9ElM-J44YQNCrS8AI_k-6Yal9gd3SnYaGTXOoqtacw2Di2RRTb1MpiE-OmcqwKAqdmHxjFcX6HaqHXJyuw8qYoEOvYEP1P2kzYzgflKAwCS0h8Irts-MUwzXCIbrJ9oDrcrVYmqxJ0ObZZPtyhTofJ-mH-U1rP29eFMXgFEIwKR02M.gMKkfHmSUWhNcLnWmsIrKM4Stlk.ZcFFGA; canvas_session=4YAzrLIvdvTYAcYoQ-2w9w+YzPdlmuMSSMbpsG2tSpy7Do7jyrTxRwLkrD1e0IBlwKKAq5bUQYLRRGqVRwPpWTZweq9gBmRiBgvKDG7jNAtAOQaXnsKnOuk5IGIJSd5xZwKoGMUk1IzBfYHQMECPKCwqc-UYdht0GM-i_oXQvcOHk3ZadBmRistQPIrsJmntNTbMwPV-g6XPcQcTcHICFvWuRKHYenHZVI52MsRT03eHju-d0-8yEUq_StNTDDisIuImBt0a-JYXENOq9YfS9ElM-J44YQNCrS8AI_k-6Yal9gd3SnYaGTXOoqtacw2Di2RRTb1MpiE-OmcqwKAqdmHxjFcX6HaqHXJyuw8qYoEOvYEP1P2kzYzgflKAwCS0h8Irts-MUwzXCIbrJ9oDrcrVYmqxJ0ObZZPtyhTofJ-mH-U1rP29eFMXgFEIwKR02M.gMKkfHmSUWhNcLnWmsIrKM4Stlk.ZcFFGA; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%22430810756557470%22%2C%22pageviewId%22%3A%225912305816004663%22%2C%22sessionId%22%3A%228845189723424987%22%2C%22identity%22%3A%22uu-2-4db841b3bc3ebe182a65b4ab8a71434598331af59a0e3eb218c98529b3664811-56hUMhhIckDGjwjQtI73QvaaUbf0JicxQAe9BgZt%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1',
        'trackerVersion': '4.0'
  }
};

// // Define request options if needed (e.g., headers, query parameters)
// const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       // Add other headers as needed
//     },
//     // Add other options like query parameters or authentication here
//   };
  
//   // Determine whether to use the 'http' or 'https' module based on the URL protocol
//   const requester = url.startsWith('https://') ? https : http;
  
//   // Make a GET request
//   const request = requester.request(url, requestOptions, (response) => {
//     let data = '';
  
//     // Handle the response data
//     response.on('data', (chunk) => {
//       data += chunk;
//     });
  
//     // Handle the end of the response
//     response.on('end', () => {
//       // Parse and use the response data here
//       console.log('Response:', data);
//     });
//   });
  
//   // Handle any errors during the request
//   request.on('error', (error) => {
//     console.error('Error:', error);
//   });
  
//   // Send the request
//   request.end();

 
  
//   axios.get(url, requestOptions)
//     .then(response => {
//       if (response.status === 200) {
//         return response.data;
//       } else {
//         console.error('Request failed with status:', response.status);
//       }
//     })
//     .then(responseData => {
//       // You can process the response data here
//       console.log('Response Data:', responseData);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
  
  const ltiAppUrl = 'https://hmh.instructure.com/api/v1/courses/14706/lti_apps/launch_definitions?per_page=100&placements%5B%5D=assignment_selection&placements%5B%5D=resource_selection';
  
  const ltiAppHeaders = {
    'Accept': 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cookie': '_mkto_trk=id:449-BVJ-543&token:_mch-instructure.com-1694465074754-65934; cb_user_id=null; cb_group_id=null; cb_anonymous_id=%227169d42f-afe9-4f54-8692-5dd420a4416e%22; _ga_KYXTX6MY9T=GS1.2.1702870579.1.0.1702870579.60.0.0; _ga=GA1.1.1288292327.1694465098; rce.htmleditor=PRETTY; _ga_XXN50SC2TH=GS1.1.1706887075.63.0.1706887075.0.0.0; _gcl_au=1.1.1199659307.1706905691; __utmzz=utmcsr=google|utmcmd=organic|utmccn=(not set)|utmctr=(not provided); __utmzzses=1; _fbp=fb.1.1706905691719.1343449334; lo-uid=ed70c3d3-1706905691664-4e894fb984ce8d0c; _clck=1k63eh8%7C2%7Cfix%7C0%7C1349; _ga_75H5134F9J=GS1.1.1706907854.3.1.1706907855.59.0.0; _hp2_props.3295960117=%7B%22Region%22%3A%22Americas-North%20America%22%2C%22Page%20Node%22%3A%2216116%22%2C%22Page%20Group%22%3A%22Panda%20Pros%22%2C%22Page%20Type%22%3A%22Overview%22%7D; _hp2_id.3295960117=%7B%22userId%22%3A%226003128539108856%22%2C%22pageviewId%22%3A%222590996243376192%22%2C%22sessionId%22%3A%225029727821584165%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _uetvid=09ba17b050e411eea258b563da3cab42; lo-visits=2; log_session_id=df4b47ec926c19c4637c6fec54c73332; _legacy_normandy_session=4YAzrLIvdvTYAcYoQ-2w9w+YzPdlmuMSSMbpsG2tSpy7Do7jyrTxRwLkrD1e0IBlwKKAq5bUQYLRRGqVRwPpWTZweq9gBmRiBgvKDG7jNAtAOQaXnsKnOuk5IGIJSd5xZwKoGMUk1IzBfYHQMECPKCwqc-UYdht0GM-i_oXQvcOHk3ZadBmRistQPIrsJmntNTbMwPV-g6XPcQcTcHICFvWuRKHYenHZVI52MsRT03eHju-d0-8yEUq_StNTDDisIuImBt0a-JYXENOq9YfS9ElM-J44YQNCrS8AI_k-6Yal9gd3SnYaGTXOoqtacw2Di2RRTb1MpiE-OmcqwKAqdmHxjFcX6HaqHXJyuw8qYoEOvYEP1P2kzYzgflKAwCS0h8Irts-MUwzXCIbrJ9oDrcrVYmqxJ0ObZZPtyhTofJ-mH-U1rP29eFMXgFEIwKR02M.gMKkfHmSUWhNcLnWmsIrKM4Stlk.ZcFFGA; canvas_session=4YAzrLIvdvTYAcYoQ-2w9w+YzPdlmuMSSMbpsG2tSpy7Do7jyrTxRwLkrD1e0IBlwKKAq5bUQYLRRGqVRwPpWTZweq9gBmRiBgvKDG7jNAtAOQaXnsKnOuk5IGIJSd5xZwKoGMUk1IzBfYHQMECPKCwqc-UYdht0GM-i_oXQvcOHk3ZadBmRistQPIrsJmntNTbMwPV-g6XPcQcTcHICFvWuRKHYenHZVI52MsRT03eHju-d0-8yEUq_StNTDDisIuImBt0a-JYXENOq9YfS9ElM-J44YQNCrS8AI_k-6Yal9gd3SnYaGTXOoqtacw2Di2RRTb1MpiE-OmcqwKAqdmHxjFcX6HaqHXJyuw8qYoEOvYEP1P2kzYzgflKAwCS0h8Irts-MUwzXCIbrJ9oDrcrVYmqxJ0ObZZPtyhTofJ-mH-U1rP29eFMXgFEIwKR02M.gMKkfHmSUWhNcLnWmsIrKM4Stlk.ZcFFGA; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%22430810756557470%22%2C%22pageviewId%22%3A%225912305816004663%22%2C%22sessionId%22%3A%228845189723424987%22%2C%22identity%22%3A%22uu-2-4db841b3bc3ebe182a65b4ab8a71434598331af59a0e3eb218c98529b3664811-56hUMhhIckDGjwjQtI73QvaaUbf0JicxQAe9BgZt%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1',
    'If-None-Match': 'W/"9e810a9342d2caa7c04ff8ac6f4e89a1"',
    'Referer': 'https://hmh.instructure.com/courses/14706/assignments/652888/edit?return_to=https%3A%2F%2Fhmh.instructure.com%2Fcourses%2F14706%2Fassignments%2F652888',
    'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Sentry-Trace': '3cee8292921e4ab69199a175039fbd92-8a347c4b608e98b7-0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'X-Csrf-Token': '47gWx2Gib95WR2AQG82ImmOOPlXb6fl9JDYK2e2CZ0Sr8Ez1Oc4KsSx0OVtZnOb7DMQVYqzcnTkcUW+upPIjHA==',
    'X-Requested-With': 'XMLHttpRequest',
};
axios.get(ltiAppUrl, { headers: ltiAppHeaders })
  .then(response => {
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Request failed with status:', response.status);
    }
  })
  .then(responseData => {
    // You can process the response data here
    console.log('LTI App Response Data:', responseData);
  })
  .catch(error => {
    console.error('Error:', error);
  });


//   const https = require('https');

// Define the request options
const requestOptions2 = {
  method: 'POST',
  hostname: 'api.eng.hmhco.com',
  path: '/token-service/api/v2/lti/deep_linking/initializeLogin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': 0,
    // Add other headers as needed
  },
};

// Create an HTTP request
const request = https.request(requestOptions2, (response) => {
  // Handle the response
  if (response.statusCode === 302) {
    // If the response status code is 302 (Found), you can access the 'Location' header
    const locationHeader = response.headers['location'];
    console.log('Redirect Location:', locationHeader);
  }

  response.on('data', (data) => {
    // Handle the response data here if needed
    console.log('Response Data:', data.toString());
  });
});

// Handle any errors during the request
request.on('error', (error) => {
  console.error('Error:', error);
});

// Send the POST request (with an empty body since 'Content-Length' is set to 0)
request.end();

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




// // Function to get all assignments from a course
// async function getAllAssignmentsFromCourse(courseId) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const config = {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         params: {
//             per_page: 100 // Adjust as needed
//         }
//     };

//     try {
//         const response = await axios.get(url, config);
//         return response.data; // Array of assignment objects
//     } catch (error) {
//         console.error('Error fetching assignments:', error);
//         return [];
//     }
// }

// // Main execution
// (async () => {
//     const assignments = await getAllAssignmentsFromCourse(courseId);
//     console.log(assignments);
// })();

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

// // Function to get all assignments from a course
// async function getAllAssignmentsFromCourse(courseId) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const config = {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         params: {
//             per_page: 100 // Adjust as needed
//         }
//     };

//     try {
//         const response = await axios.get(url, config);
//         return response.data; // Array of assignment objects
//     } catch (error) {
//         console.error('Error fetching assignments:', error);
//         return [];
//     }
// }

// // Function to get all LTI tools from a course
// async function getAllLTIToolsFromCourse(courseId) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/external_tools`;
//     const config = {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         params: {
//             per_page: 100 // Adjust as needed
//         }
//     };

//     try {
//         const response = await axios.get(url, config);
//         return response.data; // Array of LTI tool objects
//     } catch (error) {
//         console.error('Error fetching LTI tools:', error);
//         return [];
//     }
// }

// // Function to create or update an LTI assignment in a course
// async function createOrUpdateLTIAssignment(courseId, assignmentData) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const config = {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         data: assignmentData, // Data for the new assignment
//     };

//     try {
//         // POST request to create a new assignment or PUT to update an existing one
//         const response = await axios.post(url, config);
//         return response.data; // The newly created or updated assignment object
//     } catch (error) {
//         console.error('Error creating/updating LTI assignment:', error);
//         return null;
//     }
// }


// // Main execution
// (async () => {
//     const assignments = await getAllAssignmentsFromCourse(courseId);
//     console.log('Assignments:', assignments);

//     const ltiTools = await getAllLTIToolsFromCourse(courseId);
//     console.log('LTI Tools:', ltiTools);

//     // Example assignment data for LTI wrapper
//     const ltiAssignmentData = {
//         name: "LTI Assignment Example",
//         submission_types: ["external_tool"],
//         points_possible: 10,
//         external_tool_tag_attributes: {
//             url: "https://your-lti-tool-launch-url.com", // LTI launch URL
//             new_tab: true, // Open in a new tab
//             // resource_link_id: "your-resource-link-id", // Should be unique per course
//             custom_fields: { // Custom parameters for the LTI launch
//                 state: "eyJraWQiOiJlZjdjZWY3Mi03ZWRmLTMxNjUtOWZhYi1mMmQ4OTEwNGNhYWIiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2NhbnZhcy5pbnN0cnVjdHVyZS5jb20iLCJzdWIiOiIzMjk5MDAwMDAwMDAwMDE2NCIsImxvZ2luX2hpbnQiOiJiOTczM2EwN2VlODc3YjIzNzRmNTY5ODk3ZmQ4NWJjZGI3NjYyY2UwIiwibHRpX21lc3NhZ2VfaGludCI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUoyWlhKcFptbGxjaUk2SWpobFpEYzVZV1UwWkdJME4yWTBOVEF6WldKaE1qWXdaRFZsTmpsak1qY3lOV1UxWmpZM05HWmxaV1E1T1dKa1lqTTROREZoTmpFME5EUmlaVEEyWkRRME1tRTJNekUxWWpkbE5UUTVNVGhqWmpZNVlUaGlZMll3T1RnNVkySXlaV05pWWpVMU5XUmhNR1pqWW1JME4yUmxZak16T1Rka05qRXpaV1UzTVRVNUlpd2lZMkZ1ZG1GelgyUnZiV0ZwYmlJNkltaHRhQzVwYm5OMGNuVmpkSFZ5WlM1amIyMGlMQ0pqYjI1MFpYaDBYM1I1Y0dVaU9pSkRiM1Z5YzJVaUxDSmpiMjUwWlhoMFgybGtJam96TWprNU1EQXdNREF3TURBeE5EY3dOaXdpWTJGdWRtRnpYMnh2WTJGc1pTSTZJbVZ1SWl3aWFXNWpiSFZrWlY5emRHOXlZV2RsWDNSaGNtZGxkQ0k2ZEhKMVpTd2laWGh3SWpveE56QTJOak0zTlRJemZRLm14LXIwbWROZy1nMkZkRHBZUXRGeUpRb1NJOHJMV2ZYS0hYRERsRWNzQ1EiLCJ0YXJnZXRfbGlua191cmkiOiJodHRwczovL2FwaS5lbmcuaG1oY28uY29tL2x0aS1kZWVwLWxpbmtpbmcvYXBpLzEuMy4wL2x0aSIsImlzcyI6Imh0dHBzOi8vd3d3LmhtaGNvLmNvbSIsImV4cCI6MTcwNjYzNzI0NDk4OCwiaWF0IjoxNzA2NjM3MjI0OTg4LCJqdGkiOiJNR0V3WW1WbE56a3ROMkZrWlMwelpUVTJMV0UzTXpZdFl6WmpaV1l6T1RkaVpqY3oifQ.hs8qb4PTL0hcDYoW1ns2ycHZdAgmOadQPa-MwoHta25ZH33le6EDQWsSPu_eiuq-hr-VR0a5hsT82ZYOFVRO36oJmfJUuYq8En2nq-068w1fa-_ac5zYK_UougdPi_orb5wctl7JaIP40hQzs0-R09DVoqeAB9OxQg9Efa1A8KVtA-wcFJvRdiTqMAwOJW0zW6GzXgNyVsg5b0yNa1DS_f-tvjAe5IT4lTS4WkFPQTMEvMDXrHmxhMOAmgGW7zTkJK937x2iNWg7c2mRoJzbIG2flUXyia3_NvsBZBBwJLo4jfpbz3xWUdVSBYA3TJDhwgUCySB3riFY2SDERPPUeQ",
//                 lti_storage_target: "post_message_forwarding"
//         },
//         // ... add other necessary assignment fields as per your requirements
//     };

//     const ltiAssignment = await createOrUpdateLTIAssignment(courseId, ltiAssignmentData);
//     console.log('LTI Assignment:', ltiAssignment);
// })();


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


const lti = require('ltijs').Provider

lti.onDeepLinking(async (token, req, res) => {
  try {
    const items = [{
      type: 'ltiResourceLink',
      title: 'The Diary of Anne Frank: Opener',
      url: 'https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti', // The launch URL for the LTI tool
      custom: {
        resource_id: 'l_9b975254-a774-4e65-89b6-bf461e178cd8_787c18c2-9824-4ac3-afb8-c4cac9c8436d',
        type: 'StaticResource'
      }
    }]

    // Sending back the deep linking response
    await lti.DeepLinking.createDeepLinkingForm(token, items, { message: 'Custom message', log: 'Custom log message', errlog: 'Custom error log message' })
    .then(form => res.send(form))
    .catch(e => { throw new Error(e) })
  } catch (err) {
    console.log(err.message)
  }
})

// Function to get all LTI tools from a Canvas course
async function getCourseLtiTools(courseId) {
  const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/external_tools`;
  const headers = {
      'Authorization': `Bearer ${accessToken}`
  };

  try {
      const response = await axios.get(url, { headers });
      console.log('LTI Tools:', response.data);
      return response.data; // Array of LTI tools
  } catch (error) {
      console.error('Error fetching LTI tools:', error.response ? error.response.data : error);
      return [];
  }
}

// Call the function to get LTI tools
getCourseLtiTools(courseId).then(ltiTools => {
  console.log('Retrieved LTI Tools:', ltiTools);
});

// Function to get LTI tools from Canvas
async function getLTITools(courseId) {
  const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/external_tools`;
  const headers = {
      'Authorization': `Bearer ${accessToken}`
  };

  try {
      const response = await axios.get(url, { headers });
      return response.data; // Array of LTI tools
  } catch (error) {
      console.error('Error fetching LTI tools:', error.response ? error.response.data : error);
      return [];
  }
}

// Example function call
getLTITools(courseId)
  .then(ltiTools => {
      if (ltiTools.length === 0) {
          console.log('No LTI tools found. Please ensure the course ID is correct and the access token has the necessary permissions.');
      } else {
          console.log('Retrieved LTI Tools:', ltiTools);
      }
  })
  .catch(error => {
      console.error('An error occurred:', error);
  });

  // Function to get all LTI tools for a specific course
async function getLTITools(courseId) {
  const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/external_tools`;
  const headers = {
      'Authorization': `Bearer ${accessToken}`
  };

  try {
      const response = await axios.get(url, { headers });
      console.log('Retrieved LTI Tools:', response.data);
      return response.data; // Array of LTI tools
  } catch (error) {
      console.error('Error fetching LTI tools:', error.response ? error.response.data : error);
      return [];
  }
}

// Function to create an assignment with an external tool (Deep Linking)
// ... (The rest of your code for createAssignmentWithDeepLinking)

// Example usage
(async () => {
  const courseId = '14706'; // Your course ID here

  // Fetch LTI tools for the course
  const ltiTools = await getLTITools(courseId);
  if (ltiTools.length === 0) {
      console.error('No LTI Tools found for the course.');
      return;
  }

  // Find your desired LTI tool based on some criteria, e.g., name
  const writableTool = ltiTools.find(tool => tool.name === 'Writable');
  if (!writableTool) {
      console.error('Writable LTI tool not found.');
      return;
  }

  // Function to get all LTI tools from a Canvas course
async function getCourseLTITools(courseId) {
  const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/external_tools`;
  const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
  };

  try {
      const response = await axios.get(url, { headers });
      return response.data; // Array of LTI tools
  } catch (error) {
      console.error('Error fetching LTI tools:', error.response ? error.response.data : error);
      return [];
  }
}

// Function call to get LTI tools
getCourseLTITools(courseId)
  .then(ltiTools => {
      console.log('Retrieved LTI Tools:', ltiTools);
  })
  .catch(error => {
      console.error('Failed to retrieve LTI Tools:', error);
  });

  // Now you can create an assignment with the LTI tool
  await createAssignmentWithDeepLinking(courseId, writableTool);
})();



const jwt = require('jsonwebtoken');

// const canvasDomain = 'https://hmh.instructure.com';
const clientId = '3299000000000164'; // Replace with your actual client ID
const publicKey = `-----BEGIN PUBLIC KEY-----
YOUR_ACTUAL_PUBLIC_KEY_HERE
-----END PUBLIC KEY-----`; // Replace with your actual public key

// Function to validate and handle the LTI launch
async function handleLTILaunch(idToken, state) {
    try {
        // 1. Validate the ID Token
        const decoded = jwt.verify(idToken, publicKey);

        // 2. Extract Claims
        const {
            'https://purl.imsglobal.org/spec/lti/claim/message_type': messageType,
            'https://purl.imsglobal.org/spec/lti/claim/version': version,
            // ... extract other claims as needed
        } = decoded;

        // 3. Perform the Required Action based on the messageType and other claims
        if (messageType === 'LtiDeepLinkingRequest') {
            // Sample function to handle Deep Linking Request
async function handleDeepLinkingRequest(decodedIdToken, canvasDomain) {
  // Extract necessary information from the decoded ID token
  const {
      'https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings': deepLinkingSettings,
      // ... other claims
  } = decodedIdToken;

  if (!deepLinkingSettings) {
      throw new Error('Deep linking settings not found in ID token');
  }

  const { deep_link_return_url, accept_types, accept_presentation_document_targets } = deepLinkingSettings;

  // Check if the LMS accepts the type of items your tool provides
  // For example, if your tool provides LTI links, check if 'ltiResourceLink' is in the accept_types
  if (!accept_types.includes('ltiResourceLink')) {
      throw new Error('LMS does not accept LTI resource links');
  }

  // Prepare the items (links, resources, etc.) you want to send back to the LMS
  const items = [
      // Each item should be structured according to the LTI Deep Linking Response specification
      {
          type: 'ltiResourceLink',
          title: 'Resource Title',
          url: 'https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti/resource/l_ba14a382-e7ac-4832-b325-c1d903438458_787c18c2-9824-4ac3-afb8-c4cac9c8436d',
          // ... other properties as needed
      },
      // ... add more items as needed
  ];

  // Construct the Deep Linking Response
  const deepLinkingResponse = {
      type: 'LtiDeepLinkingResponse',
      data: deepLinkingSettings.data, // Echo back the data received in the request
      content_items: items,
      // ... other properties as needed
  };

  // Send the Deep Linking Response back to the LMS
  try {
      const response = await axios.post(deep_link_return_url, deepLinkingResponse, {
          headers: {
              'Content-Type': 'application/json',
              // Include other headers as required by the LMS
          }
      });
      console.log('Deep Linking Response sent:', response.data);
  } catch (error) {
      console.error('Error sending Deep Linking Response:', error);
  }
}

// Assuming you have the decoded ID token and canvas domain
handleDeepLinkingRequest(decodedIdToken, canvasDomain);

        }
        // ... handle other message types as needed

        // 4. Return a Response if needed (e.g., for deep linking)
        if (messageType === 'LtiDeepLinkingRequest') {
            const response = {
                // Construct your Deep Linking Response
            };
            // Send the response back to Canvas
            await axios.post(`${canvasDomain}/path/to/lti/response/endpoint`, response, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (error) {
        console.error('Error handling LTI launch:', error);
    }
}

// Example usage
const idToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjIwMjQtMDEtMDFUMDA6MDA6MDFaXzgzMTc1YzAxLTQ3M2YtNDRkMi05MjY4LTcxOTRkYzk2MDliOCJ9.eyJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS9tZXNzYWdlX3R5cGUiOiJMdGlEZWVwTGlua2luZ1JlcXVlc3QiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS92ZXJzaW9uIjoiMS4zLjAiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS1kbC9jbGFpbS9kZWVwX2xpbmtpbmdfc2V0dGluZ3MiOnsiZGVlcF9saW5rX3JldHVybl91cmwiOiJodHRwczovL2htaC5pbnN0cnVjdHVyZS5jb20vY291cnNlcy8xNDcwNi9kZWVwX2xpbmtpbmdfcmVzcG9uc2U_ZGF0YT1leUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdWIyNWpaU0k2SWpSaE0yTTFORGhoTFdSbFlUWXRORGM0TWkxaVlUSmtMVE01TVRNd05EQmhZemRrTXlJc0ltMXZaR0ZzSWpwMGNuVmxMQ0p3YkdGalpXMWxiblFpT2lKaGMzTnBaMjV0Wlc1MFgzTmxiR1ZqZEdsdmJpSXNJbUZ6YzJsbmJtMWxiblJmYVdRaU9qWTFNams1TjMwLnl6TUl2Ml9UWmZoaEhZY2NjLThzNlB4YUJMZ3RNNW5lcGMzTmZ0Wms0emMiLCJhY2NlcHRfdHlwZXMiOlsibHRpUmVzb3VyY2VMaW5rIl0sImFjY2VwdF9wcmVzZW50YXRpb25fZG9jdW1lbnRfdGFyZ2V0cyI6WyJpZnJhbWUiLCJ3aW5kb3ciXSwiYWNjZXB0X21lZGlhX3R5cGVzIjoiYXBwbGljYXRpb24vdm5kLmltcy5sdGkudjEubHRpbGluayIsImF1dG9fY3JlYXRlIjpmYWxzZSwiYWNjZXB0X211bHRpcGxlIjpmYWxzZSwidmFsaWRhdGlvbl9jb250ZXh0IjpudWxsLCJlcnJvcnMiOnsiZXJyb3JzIjp7fX19LCJhdWQiOiIzMjk5MDAwMDAwMDAwMDE2NCIsImF6cCI6IjMyOTkwMDAwMDAwMDAwMTY0IiwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGkvY2xhaW0vZGVwbG95bWVudF9pZCI6IjIwODEwOjdkYjQzODA3MTM3NWMwMjM3MzcxM2MxMmM3Mzg2OWZmMmY0NzBiNjgiLCJleHAiOjE3MDcwMTc3MjQsImlhdCI6MTcwNzAxNDEyNCwiaXNzIjoiaHR0cHM6Ly9jYW52YXMuaW5zdHJ1Y3R1cmUuY29tIiwibm9uY2UiOiI5NjQxNmU2ZS05MDhiLTNmYzctOGVmNS02YjlhYmVhNWU3NGIiLCJzdWIiOiI3YjU1N2EyMy00NGUyLTRmMTYtOWE4ZC1lZGFiNmQ3Njg5ZGYiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS90YXJnZXRfbGlua191cmkiOiJodHRwczovL2FwaS5lbmcuaG1oY28uY29tL2x0aS1kZWVwLWxpbmtpbmcvYXBpLzEuMy4wL2x0aSIsInBpY3R1cmUiOiJodHRwczovL2NhbnZhcy5pbnN0cnVjdHVyZS5jb20vaW1hZ2VzL21lc3NhZ2VzL2F2YXRhci01MC5wbmciLCJlbWFpbCI6IkxNUy1UMDEwLTkyMDIxNTgxQGV4YW1wbGUuY29tIiwibmFtZSI6IkxPVUlTIFNJTkdMRVRPTiAoVDAxMCkiLCJnaXZlbl9uYW1lIjoiTE9VSVMiLCJmYW1pbHlfbmFtZSI6IlNJTkdMRVRPTiAoVDAxMCkiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS9saXMiOnsicGVyc29uX3NvdXJjZWRpZCI6Imxtc190XzAxMCIsImNvdXJzZV9vZmZlcmluZ19zb3VyY2VkaWQiOm51bGwsInZhbGlkYXRpb25fY29udGV4dCI6bnVsbCwiZXJyb3JzIjp7ImVycm9ycyI6e319fSwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGkvY2xhaW0vY29udGV4dCI6eyJpZCI6IjFkYTIzMTFhYjhkMjNjNTg0NGVkY2NlOTYxNmI2MmVmZWE2ZDUwMGQiLCJsYWJlbCI6IkF1dG9tYXRpb24iLCJ0aXRsZSI6IkF1dG9tYXRpb24gdGVzdHMiLCJ0eXBlIjpbImh0dHA6Ly9wdXJsLmltc2dsb2JhbC5vcmcvdm9jYWIvbGlzL3YyL2NvdXJzZSNDb3Vyc2VPZmZlcmluZyJdLCJ2YWxpZGF0aW9uX2NvbnRleHQiOm51bGwsImVycm9ycyI6eyJlcnJvcnMiOnt9fX0sImh0dHBzOi8vcHVybC5pbXNnbG9iYWwub3JnL3NwZWMvbHRpL2NsYWltL3Rvb2xfcGxhdGZvcm0iOnsiZ3VpZCI6IjU2aFVNaGhJY2tER2p3alF0STczUXZhYVViZjBKaWN4UUFlOUJnWnQiLCJuYW1lIjoiSG91Z2h0b24gTWlmZmxpbiBIYXJjb3VydCBTYW5kYm94IiwidmVyc2lvbiI6ImNsb3VkIiwicHJvZHVjdF9mYW1pbHlfY29kZSI6ImNhbnZhcyIsInZhbGlkYXRpb25fY29udGV4dCI6bnVsbCwiZXJyb3JzIjp7ImVycm9ycyI6e319fSwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGkvY2xhaW0vbGF1bmNoX3ByZXNlbnRhdGlvbiI6eyJkb2N1bWVudF90YXJnZXQiOiJpZnJhbWUiLCJyZXR1cm5fdXJsIjoiaHR0cHM6Ly9obWguaW5zdHJ1Y3R1cmUuY29tL2NvdXJzZXMvMTQ3MDYvZXh0ZXJuYWxfY29udGVudC9zdWNjZXNzL2V4dGVybmFsX3Rvb2xfZGlhbG9nIiwibG9jYWxlIjoiZW4iLCJ2YWxpZGF0aW9uX2NvbnRleHQiOm51bGwsImVycm9ycyI6eyJlcnJvcnMiOnt9fSwiaGVpZ2h0Ijo0MDAsIndpZHRoIjo4MDB9LCJsb2NhbGUiOiJlbiIsImh0dHBzOi8vcHVybC5pbXNnbG9iYWwub3JnL3NwZWMvbHRpL2NsYWltL3JvbGVzIjpbImh0dHA6Ly9wdXJsLmltc2dsb2JhbC5vcmcvdm9jYWIvbGlzL3YyL2luc3RpdHV0aW9uL3BlcnNvbiNJbnN0cnVjdG9yIiwiaHR0cDovL3B1cmwuaW1zZ2xvYmFsLm9yZy92b2NhYi9saXMvdjIvbWVtYmVyc2hpcCNJbnN0cnVjdG9yIiwiaHR0cDovL3B1cmwuaW1zZ2xvYmFsLm9yZy92b2NhYi9saXMvdjIvc3lzdGVtL3BlcnNvbiNVc2VyIl0sImh0dHBzOi8vcHVybC5pbXNnbG9iYWwub3JnL3NwZWMvbHRpL2NsYWltL2N1c3RvbSI6eyJwZXJzb25fc291cmNlZGlkIjoiTE1TLVQwMTAtOTIwMjE1ODEiLCJ1c2VyX3Jlc29sdXRpb25fc3RyYXRlZ3kiOiJ1c2VybmFtZSJ9LCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS1hZ3MvY2xhaW0vZW5kcG9pbnQiOnsic2NvcGUiOlsiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGktYWdzL3Njb3BlL2xpbmVpdGVtIiwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGktYWdzL3Njb3BlL2xpbmVpdGVtLnJlYWRvbmx5IiwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGktYWdzL3Njb3BlL3Njb3JlIl0sImxpbmVpdGVtcyI6Imh0dHBzOi8vaG1oLmluc3RydWN0dXJlLmNvbS9hcGkvbHRpL2NvdXJzZXMvMTQ3MDYvbGluZV9pdGVtcyIsInZhbGlkYXRpb25fY29udGV4dCI6bnVsbCwiZXJyb3JzIjp7ImVycm9ycyI6e319fSwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGktbnJwcy9jbGFpbS9uYW1lc3JvbGVzZXJ2aWNlIjp7ImNvbnRleHRfbWVtYmVyc2hpcHNfdXJsIjoiaHR0cHM6Ly9obWguaW5zdHJ1Y3R1cmUuY29tL2FwaS9sdGkvY291cnNlcy8xNDcwNi9uYW1lc19hbmRfcm9sZXMiLCJzZXJ2aWNlX3ZlcnNpb25zIjpbIjIuMCJdLCJ2YWxpZGF0aW9uX2NvbnRleHQiOm51bGwsImVycm9ycyI6eyJlcnJvcnMiOnt9fX0sImh0dHBzOi8vcHVybC5pbXNnbG9iYWwub3JnL3NwZWMvbHRpL2NsYWltL2x0aTExX2xlZ2FjeV91c2VyX2lkIjoiYjk3MzNhMDdlZTg3N2IyMzc0ZjU2OTg5N2ZkODViY2RiNzY2MmNlMCIsImh0dHBzOi8vcHVybC5pbXNnbG9iYWwub3JnL3NwZWMvbHRpL2NsYWltL2x0aTFwMSI6eyJ1c2VyX2lkIjoiYjk3MzNhMDdlZTg3N2IyMzc0ZjU2OTg5N2ZkODViY2RiNzY2MmNlMCIsInZhbGlkYXRpb25fY29udGV4dCI6bnVsbCwiZXJyb3JzIjp7ImVycm9ycyI6e319fSwiZXJyb3JzIjp7ImVycm9ycyI6e319LCJodHRwczovL3d3dy5pbnN0cnVjdHVyZS5jb20vcGxhY2VtZW50IjoiYXNzaWdubWVudF9zZWxlY3Rpb24ifQ.PM-bXu59inM6lg1FMUokPcuU3gVMcr18vS8db1AOGkMGG1JGhLEyxpwywvl4GIKRlP-FZ6l9irRAfo26zI0jw1FpgeAw8VUCQCX5r6a5i38lDMXt0Uzg3nkIQ4zACRGdrYVu9gsxaxweTgZyJmwOPPkEDTa4NzJGyYWPakK6dV9qd0ustmHdiM2JwGGgt5nEXiAVjbl8FHhqdjv_PFQZ08eGpEXXDZph6--PyGsJ_L6HHRMdKPf3VqzoXVPigRsvpwVHdpAANsm9EeP6pNn9z59ysP7D02y_K-Lc1HDXqe9aepedh9UvMG8pSFZkVMOpRklCU5wTE9Eem5dZTsTHrg'; // Replace with the actual ID token received during LTI launch
const state = 'eyJraWQiOiJlZjdjZWY3Mi03ZWRmLTMxNjUtOWZhYi1mMmQ4OTEwNGNhYWIiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2NhbnZhcy5pbnN0cnVjdHVyZS5jb20iLCJzdWIiOiIzMjk5MDAwMDAwMDAwMDE2NCIsImxvZ2luX2hpbnQiOiJiOTczM2EwN2VlODc3YjIzNzRmNTY5ODk3ZmQ4NWJjZGI3NjYyY2UwIiwibHRpX21lc3NhZ2VfaGludCI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUoyWlhKcFptbGxjaUk2SWpFNE9XVTRNalV5Tm1RME1XWTVObVkyTkdRM01tUTRPR1UyTkdOalpUQTBNMlV6T0RWa1lXUmpNR1l4TldabFlXSXdaVEUzTWpreFpUaGtZemd6T0dKbU1EUmxOVEJsWW1JMk1HWXdaalV5T1RObVkyTXhZVGMxTkdaaVptTmpZVGczTW1GaE5qUmpaV0U1TVRnd09UaGlNVFF4WVRNek4yRmhaVFV6T1RReklpd2lZMkZ1ZG1GelgyUnZiV0ZwYmlJNkltaHRhQzVwYm5OMGNuVmpkSFZ5WlM1amIyMGlMQ0pqYjI1MFpYaDBYM1I1Y0dVaU9pSkRiM1Z5YzJVaUxDSmpiMjUwWlhoMFgybGtJam96TWprNU1EQXdNREF3TURBeE5EY3dOaXdpWTJGdWRtRnpYMnh2WTJGc1pTSTZJbVZ1SWl3aWFXNWpiSFZrWlY5emRHOXlZV2RsWDNSaGNtZGxkQ0k2ZEhKMVpTd2laWGh3SWpveE56QTNNREUwTkRJMGZRLjdJVkJXQWFhd3I1MDNzcGhzcUthdW5nbm5PczhUNVI1SGYxbko5QkJoLVUiLCJ0YXJnZXRfbGlua191cmkiOiJodHRwczovL2FwaS5lbmcuaG1oY28uY29tL2x0aS1kZWVwLWxpbmtpbmcvYXBpLzEuMy4wL2x0aSIsImlzcyI6Imh0dHBzOi8vd3d3LmhtaGNvLmNvbSIsImV4cCI6MTcwNzAxNDE0NjQ4OCwiaWF0IjoxNzA3MDE0MTI2NDg4LCJqdGkiOiJZamMxWkRsa09XSXRPRFl5WWkwelpUTXpMV0kyWmpRdFkySTRZamd6WVRkaE5USTAifQ.F1fsBP23D_RYpmXJtsKxjG5AiT3V5s7SP93Rb-v8Ygh7enivgJpVCpUgClK28S0wJAredeCdN_6jJjebRulT5OtGdo5pEM2VU7eTvYHmijx1hzsY6KNrAkwmcUQx70VlQ2anq2W2TUKI2vdg6oJTJXqKdi-ySXi5cRbh5Tu1Vip-0N0mNFsI_Byl7jKN5nz4FcH_dDidA0lj04rpvNOi5ywSFZ1dJ2NLOtul4njdUdabDEXsu3PGVDs0XO5hafRZ5ICtDeeOXWxoS7jwj_jyyVYx9-3x5umRbdtCpXbtAX7nODAPJcKpci5kah5xCuB61szS7_WnZALxLMZ8IVPpbw'; // Replace with the actual state received during LTI launch
handleLTILaunch(idToken, state);

// // Function to get all assignments from a course
// async function getAllAssignmentsFromCourse(courseId) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const config = {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         params: {
//             per_page: 100 // Adjust as needed
//         }
//     };

//     try {
//         const response = await axios.get(url, config);
//         return response.data; // Array of assignment objects
//     } catch (error) {
//         console.error('Error fetching assignments:', error);
//         return [];
//     }
// }

// // Function to get all LTI tools from a course
// async function getAllLTIToolsFromCourse(courseId) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/external_tools`;
//     const config = {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         params: {
//             per_page: 100 // Adjust as needed
//         }
//     };

//     try {
//         const response = await axios.get(url, config);
//         return response.data; // Array of LTI tool objects
//     } catch (error) {
//         console.error('Error fetching LTI tools:', error);
//         return [];
//     }
// }

// // Function to create or update an LTI assignment in a course
// async function createOrUpdateLTIAssignment(courseId, assignmentData) {
//     const url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
//     const headers = {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/x-www-form-urlencoded', // as per your headers
//         // Include other headers if necessary
//     };
//     const config = {
//         headers: headers,
//         data: assignmentData, // Data for the new assignment
//     };

//     try {
//         // POST request to create a new assignment or PUT to update an existing one
//         const response = await axios.post(url, config);
//         return response.data; // The newly created or updated assignment object
//     } catch (error) {
//         console.error('Error creating/updating LTI assignment:', error);
//         return null;
//     }
// }

// // Main execution
// (async () => {
//     const assignments = await getAllAssignmentsFromCourse(courseId);
//     console.log('Assignments:', assignments);

//     const ltiTools = await getAllLTIToolsFromCourse(courseId);
//     console.log('LTI Tools:', ltiTools);

//     // Example assignment data for LTI wrapper
//     const ltiAssignmentData = {
//         name: "LTI Assignment Example",
//         submission_types: ["external_tool"],
//         points_possible: 10,
//         external_tool_tag_attributes: {
//             url: "https://hmh.instructure.com/courses/14706/external_tools/20810/resource_selection?placement=assignment_selection&secure_params=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsdGlfYXNzaWdubWVudF9pZCI6IjgwNGE4NTA2LWIyYmEtNDhlMi1iZTM4LTM5YWRmZDk3OWVlYSJ9.MB7b_hWt7m_PZJtrqwE74-Wtke4hAKvqu0Gjb2rnHwo", // LTI launch URL
//             new_tab: true, // Open in a new tab
//             resource_link_id: "onecms/787c18c2-9824-4ac3-afb8-c4cac9c8436d/prod/1697832839902-421/oneCmsIdToAssetsMapping.json", // Should be unique per course
//             custom_fields: { // Custom parameters for the LTI launch
//                 state: "eyJraWQiOiJlZjdjZWY3Mi03ZWRmLTMxNjUtOWZhYi1mMmQ4OTEwNGNhYWIiLCJ0eXA...",
//                 lti_storage_target: "post_message_forwarding",
//                 scope: "openid",
//                 response_type: "id_token",
//                 client_id: "32990000000000164",
//                 redirect_uri: "https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti",
//                 login_hint: "b9733a07ee877b2374f569897fd85bcdb7662ce0",
//                 response_mode: "form_post",
//                 nonce: "6be93c34-7956-3cc8-9d24-7889bcedaf17",
//                 prompt: "none",
//                 lti_message_hint: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJpZmllciI6IjhlZDc5YWU0ZGI0N2Y0NTAzZWJhMjYwZDVlNjljMjcyNWU1ZjY3NGZlZWQ5OWJkYjM4NDFhNjE0NDRiZTA2ZDQ0MmE2MzE1YjdlNTQ5MThjZjY5YThiY2YwOTg5Y2IyZWNiYjU1NWRhMGZjYmI0N2RlYjMzOTdkNjEzZWU3MTU5IiwiY2FudmFzX2RvbWFpbiI6ImhtaC5pbnN0cnVjdHVyZS5jb20iLCJjb250ZXh0X3R5cGUiOiJDb3Vyc2UiLCJjb250ZXh0X2lkIjozMjk5MDAwMDAwMDAxNDcwNiwiY2FudmFzX2xvY2FsZSI6ImVuIiwiaW5jbHVkZV9zdG9yYWdlX3RhcmdldCI6dHJ1ZSwiZXhwIjoxNzA2NjM3NTIzfQ.mx-r0mdNg-g2FdDpYQtFyJQoSI8rLWfXKHXDDlEcsCQ",
//                 iss: "https://canvas.instructure.com",
//                 login_hint: "b9733a07ee877b2374f569897fd85bcdb7662ce0",
//                 client_id: "32990000000000164",
//                 deployment_id: "20810:7db438071375c02373713c12c73869ff2f470b68",
//                 target_link_uri: "https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti",
//                 lti_message_hint: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJpZmllciI6IjhlZDc5...",
//                 canvas_environment: "prod",
//                 canvas_region: "us-east-1",
//                 lti_storage_target: "post_message_forwarding"
                
//             }
//         }, resources: [
//             {
//                 id: "l_9b975254-a774-4e65-89b6-bf461e178cd8_787c18c2-9824-4ac3-afb8-c4cac9c8436d",
//                 title: "The Diary of Anne Frank: Opener",
//                 type: "StaticResource",
//                 url: "https://hmh.instructure.com/courses/14706/external_tools/20810/resource_selection?placement=assignment_selection&secure_params=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsdGlfYXNzaWdubWVudF9pZCI6IjgwNGE4NTA2LWIyYmEtNDhlMi1iZTM4LTM5YWRmZDk3OWVlYSJ9.MB7b_hWt7m_PZJtrqwE74-Wtke4hAKvqu0Gjb2rnHwo" // URL to the resource, if applicable
//             }
//         ]
//         // ... add other necessary assignment fields as per your requirements
//     };

//     const ltiAssignment = await createOrUpdateLTIAssignment(courseId, ltiAssignmentData);
//     console.log('LTI Assignment:', ltiAssignment);
// })();

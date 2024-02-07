// const axios = require('axios');
// const readXlsxFile = require('read-excel-file/node');

// const canvasBaseUrl = 'https://hmh.instructure.com';
// const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
// const courseId = '14706';

// // Function to create an assignment with an external tool (Deep Linking)
// async function createAssignmentWithDeepLinking(courseId, externalToolUrl) {
//     const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/assignments`;
    
//     const data = {
//         assignment: {
//             name: 'Deep Linking Assignment 2', // Update with your specific details
//             description: 'This is a deep linking assignment.',
//             submission_types: ['external_tool'],
//             points_possible: 10,
//             external_tool_tag_attributes: {
//                 url: externalToolUrl,
//                 new_tab: false,
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
//         console.log('Assignment created with external tool:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
//     }
// }

// const deepLinkingToolUrl = 'https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti';
// createAssignmentWithDeepLinking(courseId, deepLinkingToolUrl);

// // Function to fetch and list LTI tools
// async function listLTITools(courseId) {
//     const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/external_tools`;
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });
//         const ltiTools = response.data;
//         console.log('LTI Tools:', ltiTools);

//         // Optionally, process and display the LTI tools as needed
//         ltiTools.forEach(tool => {
//             console.log(`Tool Name: ${tool.name}, Tool URL: ${tool.url}`);
//         });

//     } catch (error) {
//         console.error('Error fetching LTI tools:', error);
//     }
// }

// // Call the function to list LTI tools for a specific course
// listLTITools(courseId);

// // HMH Ed Linking Tool Details
// // const externalToolUrl = 'https://www.hmhco.com/content/literature/into_lit/g6/student/epub/ilnl21en_ese_g06u05_student/index.html';

// const externalToolUrl = 'https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti';

// const toolId = 'l_24f9adb7-6395-4803-9702-1fb7c6264615_787c18c2-9824-4ac3-afb8-c4cac9c8436d'; // Replace with the actual ID of the HMH Ed Linking Tool

// // Assignment details
// const assignment = {
//     name: 'New Assignment with HMH Ed Linking Tool',
//     description: 'This is an assignment using the HMH Ed Linking Tool.',
//     points_possible: 10,
//     submission_types: ['external_tool'],
//     external_tool_tag_attributes: {
//         url: externalToolUrl,
//         new_tab: true,
//         content_id: toolId, // Some external tools might require a content ID or resource ID
//         resource_link_id: 'https://www.hmhco.com/content/literature/into_lit/g6/student/epub/ilnl21en_ese_g06u05_student/index.html' // A unique identifier for the resource or the assignment
//     }
// };

// // Function to create an assignment
// async function createAssignmentWithExternalTool(courseId, assignment) {
//     const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/assignments`;

//     try {
//         const response = await axios.post(url, { assignment }, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('Assignment created successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
//     }
// }

// // Create the assignment
// createAssignmentWithExternalTool(courseId, assignment);


// const axios = require('axios');

// const canvasBaseUrl = 'https://hmh.instructure.com';
// const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
// const courseId = '14706';

// // Function to create an assignment with an external tool (Deep Linking)
// async function createAssignmentWithDeepLinking(courseId, externalToolUrl) {
//     const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/assignments`;
    
//     const data = {
//         assignment: {
//             name: 'Deep Linking Assignment 2', // Update with your specific details
//             description: 'This is a deep linking assignment.',
//             submission_types: ['external_tool'],
//             points_possible: 10,
//             external_tool_tag_attributes: {
//                 url: externalToolUrl,
//                 new_tab: false,
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
//         console.log('Assignment created with external tool:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
//     }
// }

// const deepLinkingToolUrl = 'https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti';
// createAssignmentWithDeepLinking(courseId, deepLinkingToolUrl);

// // Function to fetch and list LTI tools
// async function listLTITools(courseId) {
//     const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/external_tools`;
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });
//         const ltiTools = response.data;
//         console.log('LTI Tools:', ltiTools);

//         // Optionally, process and display the LTI tools as needed
//         ltiTools.forEach(tool => {
//             console.log(`Tool Name: ${tool.name}, Tool URL: ${tool.url}`);
//         });

//     } catch (error) {
//         console.error('Error fetching LTI tools:', error);
//     }
// }

// // Call the function to list LTI tools for a specific course
// listLTITools(courseId);

// // HMH Ed Linking Tool Details
// const externalToolUrl = 'https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti';
// const toolId = 'l_24f9adb7-6395-4803-9702-1fb7c6264615_787c18c2-9824-4ac3-afb8-c4cac9c8436d'; // Replace with the actual ID of the HMH Ed Linking Tool

// // Assignment details
// const assignment = {
//     name: 'New Assignment with HMH Ed Linking Tool',
//     description: 'This is an assignment using the HMH Ed Linking Tool.',
//     points_possible: 10,
//     submission_types: ['external_tool'],
//     external_tool_tag_attributes: {
//         url: externalToolUrl,
//         new_tab: true,
//         content_id: toolId,
//         resource_link_id: 'https://www.hmhco.com/content/literature/into_lit/g8/student/epub/ilnl21en_ese_g08u06_student/index.html?custom_correlation_id=84246d4d-11b3-4c73-a865-e0b4a10b8ec7&page=/cards/08le_13_ese_diaryannefrank_gre.xhtml' // A unique identifier for the resource or the assignment
//     },
//         // Additional attributes from the provided information
//         ags_lineitem: 'https://hmh.instructure.com/api/lti/courses/14706/line_items/20569',
//         ags_lineitems: 'https://hmh.instructure.com/api/lti/courses/14706/line_items',
//         custom_resource_url: 'https://www.hmhco.com/content/literature/into_lit/g8/student/epub/ilnl21en_ese_g08u06_student/index.html?custom_correlation_id=84246d4d-11b3-4c73-a865-e0b4a10b8ec7&page=/cards/08le_13_ese_diaryannefrank_gre.xhtml',
//         custom_sif_token: 'SIF_HMACSHA256 ...', // truncated for brevity
//         custom_person_sourcedid: 'LMS-T010-92021581',
// };

// // Function to create an assignment
// async function createAssignmentWithExternalTool(courseId, assignment) {
//     const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/assignments`;

//     try {
//         const response = await axios.post(url, { assignment }, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('Assignment created successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
//     }
// }

// // Create the assignment
// createAssignmentWithExternalTool(courseId, assignment);


const axios = require('axios');

const canvasBaseUrl = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
const courseId = '14706';

// // HMH Ed Linking Tool configuration
// const hmhEdLinkingTool = {
//     id: "92021580",
//     url: "https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti",
//     iconUrl: "https://s3.amazonaws.com/downloads.hmlt.hmco.com/Communications/Ed_Logo_Black.png",
//     label: "*HMH Ed Linking Tool (Prod)",
//     placement: "assignment_selection",
//     selectionHeight: 400,
//     selectionWidth: 800,
//     deploymentId: "20810:7db438071375c02373713c12c73869ff2f470b68",
//     description: "Points to PROD 92021580",
//     privacyLevel: "public",
// };

// // Function to create an assignment
// async function createAssignmentWithExternalTool(courseId, assignment) {
//     const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/assignments`;

//     try {
//         const response = await axios.post(url, { assignment }, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('Assignment created successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
//     }
// }

// // Assignment details using the HMH Ed Linking Tool
// const assignment = {
//     name: 'New Assignment with HMH Ed Linking Tool',
//     description: 'This is an assignment using the HMH Ed Linking Tool.',
//     points_possible: 10,
//     submission_types: ['external_tool'],
//     external_tool_tag_attributes: {
//         url: hmhEdLinkingTool.url,
//         new_tab: true,
//         content_id: hmhEdLinkingTool.id,
//         resource_link_id: '5518135e-6a39-4650-8839-740e8615efa3', // A unique identifier for the resource or the assignment
//         // Include other attributes from hmhEdLinkingTool as needed
//     }
// };

// // Create the assignment
// createAssignmentWithExternalTool(courseId, assignment);


const express = require('express');
const { Provider } = require('ltijs');
const Database = require('ltijs-sequelize');
// const axios = require('axios');
const app = express();

// // Setup LTIjs provider
// const lti = new Provider('LTIKEY', {
//     url: 'sqlite://database.sqlite',
//     logging: false
// }, {
//     appUrl: '/',
//     loginUrl: '/login',
//     sessionTimeoutUrl: '/sessiontimeout',
//     invalidTokenUrl: '/invalidtoken'
// });

// // Setup routes
// app.use(lti.app); // Add LTIjs routes to express

// // Deploy LTIjs
// lti.deploy();

// Register platform
// lti.registerPlatform({
//     url: 'https://canvas.instructure.com',
//     name: 'Canvas LMS',
//     clientId: '32990000000000164',
//     authenticationEndpoint: 'https://canvas.instructure.com/api/lti/authorize_redirect',
//     accesstokenEndpoint: 'https://canvas.instructure.com/login/oauth2/token',
//     authConfig: { 
//         method: 'JWK_SET', 
//         key: 'https://canvas.instructure.com/api/lti/security/jwks' 
//     },
//     deploymentId: '20810:7db438071375c02373713c12c73869ff2f470b68' // The Deployment ID you got from Canvas

// }).catch((err) => {
//     console.error(err);
// });

// Start express server
const server = app.listen(3000, () => console.log(`Express server running on port 3000`));



// HMH Ed Linking Tool configuration
const hmhEdLinkingTool = {
    id: "92021580",
    url: "https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti",
    // url: "https://www.hmhco.com/ui/logged-in/#!#access_token=SIF_HMACSHA256%20ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVGN3TVRJd05ESTVNeXdpYzNWaUlqb2lZMjVjZFRBd00yUk1UMVZKVXlCVFNVNUhURVZVVDA0Z0tGUXdNVEFwTEhWcFpGeDFNREF6WkV4TlV5MVVNREV3TFRreU1ESXhOVGd4TEhWdWFYRjFaVWxrWlc1MGFXWnBaWEpjZFRBd00yUmtOemRoTlRKaVl5MDFaR1JoTFRRNU16Y3RPRGN4TnkwMFptUmlPV0ZpWmpZMFptVXNiMXgxTURBelpEa3lNREl4TlRneExHUmpYSFV3TUROa09USXdNakUxT0RBaUxDSm9kSFJ3T2k4dmQzZDNMbWx0YzJkc2IySmhiQzV2Y21jdmFXMXpjSFZ5YkM5c2FYTXZkakV2ZG05allXSXZjR1Z5YzI5dUlqcGJJa2x1YzNSeWRXTjBiM0lpWFN3aVpHbHpkRjlwWkNJNkltVXhPR1V3WkRkaUxUTTBObVF0TkRnek1pMDROalEzTFRjelptTXpPV1ptWldZME1TSXNJbk5qYUc5dmJGOXBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0luTmphRzl2YkY5eVpXWnBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0lsQnNZWFJtYjNKdFNXUWlPaUpKUkZNaUxDSmthWE4wWDNKbFptbGtJam9pWlRFNFpUQmtOMkl0TXpRMlpDMDBPRE15TFRnMk5EY3ROek5tWXpNNVptWmxaalF4SWl3aWRYTmxjbEpsWmtsa0lqb2laRGMzWVRVeVltTXROV1JrWVMwME9UTTNMVGczTVRjdE5HWmtZamxoWW1ZMk5HWmxJaXdpWTJ4cFpXNTBYMmxrSWpvaU1UVXlZMlZrTlRBdE1UTTJPUzAwWWpFNUxUaGlNall0T0dZelpEVmtPV0ptWkRaaExtaHRhR052TG1OdmJTSXNJbUZ1YjI1NWJXOTFjeUk2SW1aaGJITmxJaXdpWlhod0lqb3hOekF4TWprd05qa3pmUS53UF9PVzNZYW9QQXZIdzRmQmRwZ2VnMlEtSUtMUlQyWGh4U2J3b2Z4UUE4Okx0aWp0UW84bytUOE1lV0k3ZGVxZ3RtTjdhQnljTEtZSEpNejdUMHIvWTg9Cg==&id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LmFwaS5obWhjby5jb20iLCJhdWQiOiJodHRwOi8vd3d3LmhtaGNvLmNvbSIsImlhdCI6MTcwMTIwNDI5Mywic3ViIjoiY25cdTAwM2RMT1VJUyBTSU5HTEVUT04gKFQwMTApLHVpZFx1MDAzZExNUy1UMDEwLTkyMDIxNTgxLHVuaXF1ZUlkZW50aWZpZXJcdTAwM2RkNzdhNTJiYy01ZGRhLTQ5MzctODcxNy00ZmRiOWFiZjY0ZmUsb1x1MDAzZDkyMDIxNTgxLGRjXHUwMDNkOTIwMjE1ODAiLCJodHRwOi8vd3d3Lmltc2dsb2JhbC5vcmcvaW1zcHVybC9saXMvdjEvdm9jYWIvcGVyc29uIjpbIkluc3RydWN0b3IiXSwiZGlzdF9pZCI6ImUxOGUwZDdiLTM0NmQtNDgzMi04NjQ3LTczZmMzOWZmZWY0MSIsInNjaG9vbF9pZCI6IjM2M2NiN2ZiLTNjYjMtNDQ0Mi1iMWNiLTZhMzA0YTcyZWQ5ZiIsInNjaG9vbF9yZWZpZCI6IjM2M2NiN2ZiLTNjYjMtNDQ0Mi1iMWNiLTZhMzA0YTcyZWQ5ZiIsIlBsYXRmb3JtSWQiOiJJRFMiLCJkaXN0X3JlZmlkIjoiZTE4ZTBkN2ItMzQ2ZC00ODMyLTg2NDctNzNmYzM5ZmZlZjQxIiwidXNlclJlZklkIjoiZDc3YTUyYmMtNWRkYS00OTM3LTg3MTctNGZkYjlhYmY2NGZlIiwiY2xpZW50X2lkIjoiMTUyY2VkNTAtMTM2OS00YjE5LThiMjYtOGYzZDVkOWJmZDZhLmhtaGNvLmNvbSIsImFub255bW91cyI6ImZhbHNlIiwiZXhwIjoxNzAxMjkwNjkzfQ.wP_OW3YaoPAvHw4fBdpgeg2Q-IKLRT2XhxSbwofxQA8:LtijtQo8o+T8MeWI7deqgtmN7aBycLKYHJMz7T0r/Y8=&state=https://www.hmhco.com/content/literature/into_lit/g7/student/epub/ilnl21en_ese_g07u05_student/index.html?page=/cards/07le_13_ese_gameon_rl.xhtml",
    iconUrl: "https://s3.amazonaws.com/downloads.hmlt.hmco.com/Communications/Ed_Logo_Black.png",
    label: "*HMH Ed Linking Tool (Prod)",
    placement: "assignment_selection",
    selectionHeight: 400,
    selectionWidth: 800,
    deploymentId: "20810:7db438071375c02373713c12c73869ff2f470b68",
    description: "Points to PROD 92021580",
    privacyLevel: "public",
};

// Function to create an assignment
async function createAssignmentWithExternalTool(courseId, assignment) {
    const url = `${canvasBaseUrl}/api/v1/courses/${courseId}/assignments`;

    try {
        const response = await axios.post(url, { assignment }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Assignment created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating assignment with external tool:', error.response ? error.response.data : error);
    }
}

// Assignment details using the HMH Ed Linking Tool
const assignment = {
    name: 'New Assignment with HMH Ed Linking Tool22',
    description: 'This is an assignment using the HMH Ed Linking Tool.',
    points_possible: 10,
    submission_types: ['external_tool'],
    external_tool_tag_attributes: {
        url: hmhEdLinkingTool.url,
        new_tab: false,
        content_id: hmhEdLinkingTool.id,
        resource_link_id: 'https://www.hmhco.com/ui/logged-in/#!#access_token=SIF_HMACSHA256%20ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVGN3TVRJd05ESTVNeXdpYzNWaUlqb2lZMjVjZFRBd00yUk1UMVZKVXlCVFNVNUhURVZVVDA0Z0tGUXdNVEFwTEhWcFpGeDFNREF6WkV4TlV5MVVNREV3TFRreU1ESXhOVGd4TEhWdWFYRjFaVWxrWlc1MGFXWnBaWEpjZFRBd00yUmtOemRoTlRKaVl5MDFaR1JoTFRRNU16Y3RPRGN4TnkwMFptUmlPV0ZpWmpZMFptVXNiMXgxTURBelpEa3lNREl4TlRneExHUmpYSFV3TUROa09USXdNakUxT0RBaUxDSm9kSFJ3T2k4dmQzZDNMbWx0YzJkc2IySmhiQzV2Y21jdmFXMXpjSFZ5YkM5c2FYTXZkakV2ZG05allXSXZjR1Z5YzI5dUlqcGJJa2x1YzNSeWRXTjBiM0lpWFN3aVpHbHpkRjlwWkNJNkltVXhPR1V3WkRkaUxUTTBObVF0TkRnek1pMDROalEzTFRjelptTXpPV1ptWldZME1TSXNJbk5qYUc5dmJGOXBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0luTmphRzl2YkY5eVpXWnBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0lsQnNZWFJtYjNKdFNXUWlPaUpKUkFZPHRLTjNkWU4wOUxxaHRYMndqR0RRdkZ0U01yT0Q5TXZBVXk0WmtRUm02aVN5QjhLWHlBczZGZE14TU5UUm5aWDJoWVhVUW0wMk5KSG5RaUJueFhhQkZpMUpCNzR4YVNtMHp6Rzd5bVUwYjFXMlJoVUhWVVhXaENzVUhUbkt6TlQwWmxydGFITnZkaTJ4UjhpY1NoMnh1TzIxQ3VsTWF5NEt1bmFtYmFsUDlnMGZVOXlaTHdMWDlXWUpJTmNYWkRVZjZRYVlaU3NicmxFVC1oOFE0T3ZmU1E3aXV1V3FjdkJHeThNMHFvWjdJLU5pQ2h3OGR5eWJNSkhncGkQhdOolQNqXV6ABnUWMv3PtbfA8-hU9LUZkzCzGt9I2OHfuak3ShwGllsAniWREkhUzzosmmJhXhM9qdFFASg_OCQdPnYVzp8gOFeOGwlXfSFEgt5vgeU25E-ycUOREcnP7BnMUk7wpwYqlE537LWGOV5z_1Dqcqc9LmN-z4HmNV7b23QZW4_mzKIOY4IqjmnUGgLU9ycFj5YGDCts7Q',
        // Include other attributes from hmhEdLinkingTool as needed
        lti_context_id: "1f8ebb3c-27c0-41ba-9204-5bab7af0d4b9",
        custom_params: [
            {
                title: "Cool Deep Linking Tool",
                scopes: [],
                extensions: [
                    {
                        domain: "https://hmh.instructure.com",
                        tool_id: "deep-linky",
                        platform: "canvas.instructure.com",
                        settings: {
                            text: "Cool Deep Linking Text",
                            placements: [
                                {
                                    text: "Embed Tool Content in Canvas RCE",
                                    enabled: true,
                                    placement: "editor_button",
                                    message_type: "LtiDeepLinkingRequest",
                                    target_link_uri: "https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti"
                                },
                                {
                                    text: "Embed Tool Content as a Canvas Assignment",
                                    enabled: true,
                                    icon_url: "https://some.icon.url",
                                    placement: "assignment_selection",
                                    message_type: "LtiDeepLinkingRequest",
                                    target_link_uri: "https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti"
                                }
                            ]
                        }
                    }
                ],
                public_jwk: {
                    kty: "RSA",
                    alg: "RS256",
                    e: "AQAB",
                    kid: "8f796169-0ac4-48a3-a202-fa4f3d814fcd",
                },
                description: "1.3 Test Tool",
                target_link_uri: "https://www.hmhco.com/ui/logged-in/#!#access_token=SIF_HMACSHA256%20ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVGN3TVRJd05ESTVNeXdpYzNWaUlqb2lZMjVjZFRBd00yUk1UMVZKVXlCVFNVNUhURVZVVDA4Z0tGUXdNVEFwTEhWcFpGeDFNREF6WkV4TlV5MVVNREV3TFRreU1ESXhOVGd4TEhWdWFYRjFaVWxrWlc1MGFXWnBaWEpjZFRBd00yRmtOemRoTlRKaVl5MDFaR1JoTFRRNU16Y3RPRGN4TnkwMFptUmlPV0ZpWmpZMFptVXNiMXgxTURBelpEa3lNREl4TlRneExHUmpYSFV3TUROa09USXdNakUxT0RBaUxDSm9kSFJ3T2k4dmQzZDNMbWx0YzJkc2IySmhiQzV2Y21jdmFXMXpjSFZ5YkM5c2FYTXZkakV2ZG05allXSXZjR1Z5YzI5dUlqcGJJa2x1YzNSeWRXTjBiM0lpWFN3aVpHbHpkRjlwWkNJNkltVXhPR1V3WkRkaUxUTTBObVF0TkRnek1pMDROalEzTFRjelptTXpPV1ptWldZME1TSXNJbk5qYUc5dmJGOXBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0luTmphRzl2YkY5eVpXWnBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0lsQnNZWFJtYjNKdFNXUWlPaUpKUkZNaUxDSmthWE4wWDNKbFptbGtJam9pWlRFNFpUQmtOMkl0TXpRMlpDMDBPRE15TFRnMk5EY3ROek5tWXpNNVptWmxaalF4SWl3aWRYTmxjbEpsWmtsa0lqb2laRGMzWVRVeVltTXROV1JrWVMwME9UTTNMVGczTVRjdE5HWmtZamxoWW1ZMk5HWmxJaXdpWTJ4cFpXNTBYMmxrSWpvaU1UVXlZMlZrTlRBdE1UTTJPUzAwWWpFNUxUaGlNall0T0dZelpEVmtPV0ptWkRaaExtaHRhR052TG1OdmJTSXNJbUZ1YjI1NWJXOTFjeUk2SW1aaGJITmxJaXdpWlhod0lqb3hOekF4TWprd05qa3pmUS53UF9PVzNZYW9QQXZIdz4fBmDpgeg2Q-IKLRT2XhxSbwofxQA8:LtijtQo8o+T8MeWI7deqgtmN7aBycLKYHJMz7T0r/Y8=&state=https://www.hmhco.com/content/literature/into_lit/g7/student/epub/ilnl21en_ese_g07u05_student/index.html?page=/cards/07le_13_ese_gameon_rl.xhtml",
            }
            
        ]
    
    }
};


    //     custom_params:[ {
    //         title:"Cool Deep Linking Tool ",
    //         scopes:[],
    //         extensions:[  
    //            {  
    //               domain:"https://hmh.instructure.com",
    //               tool_id:"deep-linky",
    //               platform:"canvas.instructure.com",
    //               settings:{  
    //                  text:"Cool Deep Linking Text",
    //                  placements:[                 
    //                     {  
    //                        text:"Embed Tool Content in Canvas RCE",
    //                        enabled:true,
    //                        placement:"editor_button",
    //                        message_type:"LtiDeepLinkingRequest",
    //                        target_link_uri:"https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti"
    //                     },
    //                     {  
    //                        text:"Embed Tool Content as a Canvas Assignment",
    //                        enabled:true,
    //                        icon_url:"https://some.icon.url",
    //                        placement:"assignment_selection",
    //                        message_type:"LtiDeepLinkingRequest",
    //                        target_link_uri:"https://api.eng.hmhco.com/lti-deep-linking/api/1.3.0/lti"
    //                     }
    //                  ]
    //               }
    //            }
    //         ],
    //         public_jwk:{  
    //            kty:"RSA",
    //            alg:"RS256",
    //            e:"AQAB",
    //            kid:"8f796169-0ac4-48a3-a202-fa4f3d814fcd",
    //            n:"nZD7QWmIwj-3N_RZ1qJjX6CdibU87y2l02yMay4KunambalP9g0fU9yZLwLX9WYJINcXZDUf6QeZ-SSbblET-h8Q4OvfSQ7iuu0WqcvBGy8M0qoZ7I-NiChw8dyybMJHgpiP_AyxpCQnp3bQ6829kb3fopbb4cAkOilwVRBYPhRLboXma0cwcllJHPLvMp1oGa7Ad8osmmJhXhM9qdFFASg_OCQdPnYVzp8gOFeOGwlXfSFEgt5vgeU25E-ycUOREcnP7BnMUk7wpwYqlE537LWGOV5z_1Dqcqc9LmN-z4HmNV7b23QZW4_mzKIOY4IqjmnUGgLU9ycFj5YGDCts7Q",
    //            use:"sig"
    //         },
    //         description:"1.3 Test Tool",
    //         target_link_uri:"https://www.hmhco.com/ui/logged-in/#!#access_token=SIF_HMACSHA256%20ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVGN3TVRJd05ESTVNeXdpYzNWaUlqb2lZMjVjZFRBd00yUk1UMVZKVXlCVFNVNUhURVZVVDA0Z0tGUXdNVEFwTEhWcFpGeDFNREF6WkV4TlV5MVVNREV3TFRreU1ESXhOVGd4TEhWdWFYRjFaVWxrWlc1MGFXWnBaWEpjZFRBd00yUmtOemRoTlRKaVl5MDFaR1JoTFRRNU16Y3RPRGN4TnkwMFptUmlPV0ZpWmpZMFptVXNiMXgxTURBelpEa3lNREl4TlRneExHUmpYSFV3TUROa09USXdNakUxT0RBaUxDSm9kSFJ3T2k4dmQzZDNMbWx0YzJkc2IySmhiQzV2Y21jdmFXMXpjSFZ5YkM5c2FYTXZkakV2ZG05allXSXZjR1Z5YzI5dUlqcGJJa2x1YzNSeWRXTjBiM0lpWFN3aVpHbHpkRjlwWkNJNkltVXhPR1V3WkRkaUxUTTBObVF0TkRnek1pMDROalEzTFRjelptTXpPV1ptWldZME1TSXNJbk5qYUc5dmJGOXBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0luTmphRzl2YkY5eVpXWnBaQ0k2SWpNMk0yTmlOMlppTFROallqTXRORFEwTWkxaU1XTmlMVFpoTXpBMFlUY3laV1E1WmlJc0lsQnNZWFJtYjNKdFNXUWlPaUpKUkZNaUxDSmthWE4wWDNKbFptbGtJam9pWlRFNFpUQmtOMkl0TXpRMlpDMDBPRE15TFRnMk5EY3ROek5tWXpNNVptWmxaalF4SWl3aWRYTmxjbEpsWmtsa0lqb2laRGMzWVRVeVltTXROV1JrWVMwME9UTTNMVGczTVRjdE5HWmtZamxoWW1ZMk5HWmxJaXdpWTJ4cFpXNTBYMmxrSWpvaU1UVXlZMlZrTlRBdE1UTTJPUzAwWWpFNUxUaGlNall0T0dZelpEVmtPV0ptWkRaaExtaHRhR052TG1OdmJTSXNJbUZ1YjI1NWJXOTFjeUk2SW1aaGJITmxJaXdpWlhod0lqb3hOekF4TWprd05qa3pmUS53UF9PVzNZYW9QQXZIdzRmQmRwZ2VnMlEtSUtMUlQyWGh4U2J3b2Z4UUE4Okx0aWp0UW84bytUOE1lV0k3ZGVxZ3RtTjdhQnljTEtZSEpNejdUMHIvWTg9Cg==&id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LmFwaS5obWhjby5jb20iLCJhdWQiOiJodHRwOi8vd3d3LmhtaGNvLmNvbSIsImlhdCI6MTcwMTIwNDI5Mywic3ViIjoiY25cdTAwM2RMT1VJUyBTSU5HTEVUT04gKFQwMTApLHVpZFx1MDAzZExNUy1UMDEwLTkyMDIxNTgxLHVuaXF1ZUlkZW50aWZpZXJcdTAwM2RkNzdhNTJiYy01ZGRhLTQ5MzctODcxNy00ZmRiOWFiZjY0ZmUsb1x1MDAzZDkyMDIxNTgxLGRjXHUwMDNkOTIwMjE1ODAiLCJodHRwOi8vd3d3Lmltc2dsb2JhbC5vcmcvaW1zcHVybC9saXMvdjEvdm9jYWIvcGVyc29uIjpbIkluc3RydWN0b3IiXSwiZGlzdF9pZCI6ImUxOGUwZDdiLTM0NmQtNDgzMi04NjQ3LTczZmMzOWZmZWY0MSIsInNjaG9vbF9pZCI6IjM2M2NiN2ZiLTNjYjMtNDQ0Mi1iMWNiLTZhMzA0YTcyZWQ5ZiIsInNjaG9vbF9yZWZpZCI6IjM2M2NiN2ZiLTNjYjMtNDQ0Mi1iMWNiLTZhMzA0YTcyZWQ5ZiIsIlBsYXRmb3JtSWQiOiJJRFMiLCJkaXN0X3JlZmlkIjoiZTE4ZTBkN2ItMzQ2ZC00ODMyLTg2NDctNzNmYzM5ZmZlZjQxIiwidXNlclJlZklkIjoiZDc3YTUyYmMtNWRkYS00OTM3LTg3MTctNGZkYjlhYmY2NGZlIiwiY2xpZW50X2lkIjoiMTUyY2VkNTAtMTM2OS00YjE5LThiMjYtOGYzZDVkOWJmZDZhLmhtaGNvLmNvbSIsImFub255bW91cyI6ImZhbHNlIiwiZXhwIjoxNzAxMjkwNjkzfQ.wP_OW3YaoPAvHw4fBdpgeg2Q-IKLRT2XhxSbwofxQA8:LtijtQo8o+T8MeWI7deqgtmN7aBycLKYHJMz7T0r/Y8=&state=https://www.hmhco.com/content/literature/into_lit/g7/student/epub/ilnl21en_ese_g07u05_student/index.html?page=/cards/07le_13_ese_gameon_rl.xhtml",
    //         // oidc_initiation_url:"https://your.oidc_initiation_url"
    // }]
        // custom_resource_id: "l_24f9adb7-6395-4803-9702-1fb7c6264615_787c18c2-9824-4ac3-afb8-c4cac9c8436d",
        // custom_resource_url: "https://www.hmhco.com/content/literature/into_lit/g8/student/epub/ilnl21en_ese_g08u06_student/index.html?custom_correlation_id=84246d4d-11b3-4c73-a865-e0b4a10b8ec7&page=/cards/08le_13_ese_diaryannefrank_gre.xhtml"

    


// Create the assignment
createAssignmentWithExternalTool(courseId, assignment);

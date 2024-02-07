const axios = require('axios');

const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // access token
const courseId = ''; // the target course ID
const searchText = "TEACHER ACTION: Set up Online Assessment"; // Text to search in page titles
const newPageContent = "<b>TEACHER NOTE: </b> You will need to set up this assessment manually for each class using the Ed Linking Tool. This assessment cannot be copied to cross-listed courses.  Need help?  Follow directions here at the <a href='https://s3.amazonaws.com/downloads.hmlt.hmco.com/CustomerExperience/CCSD/CCSD+HMH+Into+Reading+and+Into+Literature_Assessments.pdf'>Add HMH Digital Assessment PDF</a> to learn how to create an assessment via Canvas."; // Update with your new content

const token = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Canvas API token

// Function to get all pages in a Canvas course
async function getAllPages(courseId) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/pages?per_page=100`; //adjust per_page as needed

    try {
        console.log('Getting a list of all pages in the course...');
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        console.log('List of pages retrieved successfully.');
        return response.data;
    } catch (error) {
        console.error('Error getting pages:', error);
        return [];
    }
}

// Function to update the body of a Canvas page
async function updatePage(courseId, pageId, pageContent) {
    try {
        const url = `${canvasDomain}/api/v1/courses/${courseId}/pages/${pageId}`;

        const response = await axios.put(url, {
            wiki_page: {
                body: pageContent,
            },
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        console.log(`Page updated successfully: ${pageId}`);
    } catch (error) {
        console.error(`Error updating page: ${error}`);
    }
}

// Example usage:
async function main() {
    try {
        const pages = await getAllPages(courseId);

        const matchingPages = pages.filter(page => page.title.includes(searchText));

        if (matchingPages.length === 0) {
            console.log('No pages found containing the specified text in the title.');
        } else {
            console.log('Found pages:');
            for (const page of matchingPages) {
                console.log(`- ${page.title}`);
                await updatePage(courseId, page.url, newPageContent);
                console.log(`Page updated successfully: ${page.title}`);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
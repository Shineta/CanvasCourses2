const axios = require('axios');
const cors = require('cors');


const express = re

const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
const courseId = '';


app.use(cors());
async function searchInCourseContent(courseId, searchText) {
    let isTextFound = false; // Flag to track if text is found

    try {
        let allPages = await getAllCoursePages(courseId);
        for (let page of allPages) {
            console.log(`Searching in page: ${page.title}`); // Log each page being searched
            if (page.body && page.body.includes(searchText)) {
                console.log(`Found text in page: ${page.title}, URL: ${page.html_url}`);
                isTextFound = true;
            }
        }

        let allAssignments = await getAllCourseAssignments(courseId);
        for (let assignment of allAssignments) {
            console.log(`Searching in assignment: ${assignment.name}`); // Log each assignment being searched
            if (assignment.description && assignment.description.includes(searchText)) {
                console.log(`Found text in assignment: ${assignment.name}, URL: ${assignment.html_url}`);
                isTextFound = true;
            }
        }

        // Print message if text is not found
        if (!isTextFound) {
            console.log("Text not found in any course pages or assignments.");
        }

    } catch (error) {
        console.error('Error searching in course content:', error);
    }
}


// Function to list all pages in a course
async function listAllPages(courseId) {
    let url = `${canvasDomain}/api/v1/courses/${courseId}/pages`;
    let allPages = [];

    try {
        while (url) {
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                params: { per_page: 100 } // Adjust this value as needed
            });
            allPages = allPages.concat(response.data);

            // Handle pagination
            const linkHeader = response.headers.link;
            url = getNextLink(linkHeader);
        }
    } catch (error) {
        console.error('Error listing pages:', error);
    }

    return allPages;
}

// Function to extract 'next' link for pagination
function getNextLink(linkHeader) {
    if (linkHeader) {
        const links = linkHeader.split(',');
        const nextLink = links.find(link => link.includes('rel="next"'));
        if (nextLink) {
            const match = nextLink.match(/<(.*?)>/);
            return match ? match[1] : null;
        }
    }
    return null;
}

// Function to search for a specific text in all pages
async function searchForTextInPages(courseId, searchText) {
    const pages = await listAllPages(courseId);
    const foundPages = [];

    pages.forEach(page => {
        if (page.body && page.body.includes(searchText)) {
            foundPages.push({ pageId: page.page_id, title: page.title });
            console.log(`Found in: ${page.title}`);
        }
    });

    if (foundPages.length === 0) {
        console.log('No pages found with the specified text.');
    }

    return foundPages;
}

// Function to list all assignments in a course
async function listAllAssignments(courseId) {
    let url = `${canvasDomain}/api/v1/courses/${courseId}/assignments`;
    let allAssignments = [];

    try {
        while (url) {
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                params: { per_page: 100 } // Adjust this value as needed
            });
            allAssignments = allAssignments.concat(response.data);

            // Handle pagination
            const linkHeader = response.headers.link;
            url = getNextLink(linkHeader);
        }
    } catch (error) {
        console.error('Error listing assignments:', error);
    }

    return allAssignments;
}

// Function to extract 'next' link for pagination
function getNextLink(linkHeader) {
    if (linkHeader) {
        const links = linkHeader.split(',');
        const nextLink = links.find(link => link.includes('rel="next"'));
        if (nextLink) {
            const match = nextLink.match(/<(.*?)>/);
            return match ? match[1] : null;
        }
    }
    return null;
}

// Function to search for a specific text in all assignments
async function searchForTextInAssignments(courseId, searchText) {
    const assignments = await listAllAssignments(courseId);
    let found = false;

    assignments.forEach(assignment => {
        // Log the assignment name and description for debugging
        console.log(`Checking assignment: ${assignment.name}`);
        console.log(`Description: ${assignment.description}`);

        if (assignment.description && assignment.description.includes(searchText)) {
            console.log(`Found in: ${assignment.name}`);
            found = true;
        }
    });

    if (!found) {
        console.log('No assignments found with the specified text.');
    }
}


// Function to search for a specific text in all pages of a course
async function searchForTextInPages(courseId, searchText) {
    const pages = await listAllPages(courseId);
    let found = false;

    for (const page of pages) {
        // Fetch the detailed page information
        const pageDetails = await getPageDetails(courseId, page.url);

        // Log the page title for debugging
        console.log(`Checking page: ${pageDetails.title}`);

        if (pageDetails.body && pageDetails.body.includes(searchText)) {
            console.log(`Found in: %c${pageDetails.title}`, 'color: red;');
            console.log(`Page URL: %c${canvasDomain}/courses/${courseId}/pages/${encodeURIComponent(page.url)}`, 'color: red;');
            found = true;
            break; // Remove this line if you want to search all pages even after finding the text

        }
    }

    if (!found) {
        console.log('No pages found with the specified text.');
    }
}

// Function to get detailed information about a specific page
async function getPageDetails(courseId, pageUrl) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/pages/${pageUrl}`;
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching page details:', error);
    }
}

// Function to get detailed information about a specific page
async function getPageDetails(courseId, pageUrl) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/pages/${pageUrl}`;
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching page details:', error);
    }
}

async function searchInCourseContent(courseId, searchText) {
    let isTextFoundInPages = false;
    let isTextFoundInAssignments = false;
    let results = { pages: [], assignments: [] };

    try {
        let allPages = await getAllCoursePages(courseId);
        for (let page of allPages) {
            if (page.body && page.body.includes(searchText)) {
                results.pages.push({ title: page.title, url: page.html_url });
                isTextFoundInPages = true;
            }
        }

        if (!isTextFoundInPages) {
            results.pages.push("Text not found in any course pages.");
        }

        let allAssignments = await getAllCourseAssignments(courseId);
        for (let assignment of allAssignments) {
            if (assignment.description && assignment.description.includes(searchText)) {
                results.assignments.push({ name: assignment.name, url: assignment.html_url });
                isTextFoundInAssignments = true;
            }
        }

        if (!isTextFoundInAssignments) {
            results.assignments.push("Text not found in any course assignments.");
        }
    } catch (error) {
        console.error('Error searching in course content:', error);
    }

    return results;
}

// Assuming you have an Express route to handle the search request
app.post('/search', async (req, res) => {
    const { courseId, searchText } = req.body;
    const results = await searchInCourseContent(courseId, searchText);
    res.json(results);
});



// Main execution
(async () => {
    const searchText = [
        // "Katie will provide feedback",
        // "Katie will fix later",
        "Later",
        // "Note",
        // "Builder",
        // "Delete",
    ];
    await searchForTextInAssignments(courseId, searchText);
    await searchForTextInPages(courseId, searchText);
})();


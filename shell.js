const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const canvasDomain = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH'; // Replace with your actual access token
const courseId = '14706'; // Replace with the target course ID
const spreadsheetPath = '/workspaces/CanvasCourses2/IntoLiteratureG8U6CCSDContentsInput.xlsx'; // Update with your actual file path
const coursePrefix = 'G8_Unit 6:'; // Update this with the dynamic course prefix


// Function to create a new page in the course
async function createCoursePage(courseId, pageTitle, pageContent) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/pages`;
    const data = {
        wiki_page: {
            title: pageTitle,
            body: pageContent
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log('Page created:', response.data);
        return response.data; // Returns the created page object
    } catch (error) {
        console.error('Error creating page:', error);
    }
}

// Function to add a page to a module
async function addPageToModule(courseId, moduleId, pageUrl) {
    const url = `${canvasDomain}/api/v1/courses/${courseId}/modules/${moduleId}/items`;
    const data = {
        module_item: {
            title: pageUrl,
            type: 'Page',
            page_url: pageUrl
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(`Page '${pageUrl}' added to module ID ${moduleId}`);
        return response.data;
    } catch (error) {
        console.error('Error adding page to module:', error);
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


// Main execution
(async () => {
    const pageTitle = "Course Page Title Here";
    const pageContent = `Working with course resource links
    All links in this course have been tested and validated in Canvas. Be aware that for links to launch properly:
    Assignments or Teacher Resource items must be PUBLISHED. Courses have been designed with all links intentionally Unpublished, leaving the choice to you as to when you want them to appear.
    Links will only launch for users who have ROSTERED roles in both Canvas and HMH Ed as either Teacher or Student.
    Writable links will only function properly after you have done the initial setup to Writable via HMH Ed. For more information, see Writable Support below.
    Under certain circumstances, Canvas does not copy all referenced information when you only copy a single Module instead of the entire course. Use your Canvas Link Validator to confirm that what you have copied is working in your course.
    If you have problems with links not related to the notes above, please refer to the Support section below.
     
    Course Design
    Module 1 contains the Course Overview for this Unit.
    Module 2 contains all Teacher Resources available for this Unit.
    The remaining Modules are all divided by text selection titles and subsections that match the instructional flow on HMH Ed and your print materials. The final module includes the Unit Tasks. These modules are all set to Unpublished.
    The final module includes the Unit Tasks.
    All modules are set to Unpublished.
    Into Literature assessments have been created as assignments with app links embedded in the text field of the assignment. This allows students to respond to assessments within Canvas.
    Selection assessments are all set to a point value of 10, Unit Tasks are all set to a point value of 100. Teachers can customize these point values, including setting selection assessments to 100 points if they are used summatively.
    Practice tests, selection tests, and unit tests must be created for each class. Use of Digital Assessments allows student scores to be available for your courses in both the HMH Ed and the Canvas platform. We have inserted placeholders in the recommended location within the Modules to prompt you to complete the setup. A link to directions is in the Note text, should you need help with the process.
     
    Support
    If you need help with working with HMH Ed and Into Literature components of this course, go to https://support.hmhco.com/s/article/ccsd for more information.
    For help with Writable components of this course, go to https://intercom.help/writable/en/articles/8302047-clark-county-canvas-set-up for information about initial set up and linking assignments between the platforms.`; //Page content
    const moduleName = "Course Overview";

    // Step 1: Create a new page
    const newPage = await createCoursePage(courseId, pageTitle, pageContent);

    if (newPage) {
        // Step 2: Find the module ID for "Course Overview"
        const moduleId = await findModuleIdByName(courseId, moduleName);
        if (moduleId) {
            // Step 3: Add the page to the "Course Overview" module
            await addPageToModule(courseId, moduleId, newPage.url);
        } else {
            console.log(`Module named '${moduleName}' not found.`);
        }
    }
})();
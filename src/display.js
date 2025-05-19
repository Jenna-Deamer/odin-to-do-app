import { listOfProjects } from "./projects";
import { project } from "./projects"

const displayProjectsAndTasks = (function () {
    const createProjectDialog = document.querySelector('#create-project-modal');
    const formInfoLabel = document.querySelector('.info-label');
    const projectNameField = document.querySelector('#project-name');

    // Form event listeners
    document.querySelector('#create-project-modal form').addEventListener("submit", function (event) {
        event.preventDefault();

        // verify form data
        if (!projectNameField.value) {
            formInfoLabel.textContent = "Please enter a name";
        }
        else {
            // create project
            let name = projectNameField.value;
            const newProject = project.createProject(name);
            // add project
            project.addProjectToListOfProjects(newProject);
            // re-render project list
            displayProjects(listOfProjects);
            // attach event-listeners to projects in list
            attachProjectButtonEventLIsteners(activeButton);
            // close modal
            createProjectDialog.close();
            // clear input for next time
            projectNameField.value = "";
        }

    });
    // Modal controls
    document.querySelector('#create-project-btn').addEventListener('click', () => {
        createProjectDialog.showModal();
    });
    document.querySelector('#close-project-modal-btn').addEventListener('click', () => {
        createProjectDialog.close();
    })

    const initialDisplay = () => {
        // pull projects & their tasks from local storage

        // populate project list
        displayProjects(listOfProjects);

        // Set first project in list to active (DefaultProject called All)
        const activeButton = setFirstProjectInListToActive();

        // Attach event listeners
        let selectedProject = attachProjectButtonEventLIsteners(activeButton);

        // populate task container
        displayTasks(selectedProject);

        // Attach event listeners
    }

    const displayProjects = (listOfProjects) => {

        const projectContainer = document.querySelector('#projects-list');
        // Reset to avoid duplication of content
        projectContainer.textContent = "";
        listOfProjects.forEach(project => {

            // create new li & button
            const li = document.createElement('li');
            li.setAttribute('id', project.id);
            const button = document.createElement('button');
            button.classList.add('project-button');
            li.appendChild(button);
            button.textContent = project.name;
            // append to container
            projectContainer.appendChild(li);
        });
    };

    const displayTasks = (selectedProject) => {
        const taskContainer = document.querySelector('#task-container');
        const projectDisplayName = document.querySelector("#current-project-label");
        if (!selectedProject) {
            selectedProject = listOfProjects[0];
        }
        let taskList = selectedProject.getTaskList();
        console.log(taskList)

        projectDisplayName.textContent = selectedProject.name;
    };

    const attachProjectButtonEventLIsteners = (activeButton) => {
        const projectButtons = document.querySelectorAll('.project-button');
        projectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.parentNode.id;
                // Switch Active class 
                if (activeButton) {
                    activeButton.classList.remove('active');
                }
                button.classList.add('active');
                activeButton = button;
                // Find project with id in list & set selectedProject
                const index = listOfProjects.findIndex((button) => button.id === id);
                const selectedProject = listOfProjects[index];
                console.log(selectedProject);
                // Update task display with selectedProject
                displayTasks(selectedProject);

            })
        });
    };

    const setFirstProjectInListToActive = () => {
        const projectButtons = document.querySelectorAll('.project-button');
        projectButtons[0].classList.add('active');
        let activeButton = projectButtons[0];
        console.log(activeButton);
        return activeButton;

    };


    // displayProjects(listOfProjects);
    // const activeButton = setFirstProjectInListToActive();
    // console.log(activeButton)
    // let selectedProject = attachProjectButtonEventLIsteners(activeButton);
    // displayTasks(selectedProject);

    let activeButton = initialDisplay();
})();

export { displayProjectsAndTasks };
import { listOfProjects } from "./projects";
import {project} from "./projects"

const displayProjectsAndTasks = (function () {
    const createProjectDialog = document.querySelector('#create-project-modal');
    const formInfoLabel = document.querySelector('.info-label');
    const projectNameField = document.querySelector('#project-name');
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
            // close modal
            createProjectDialog.close();
        }

    });
    document.querySelector('#create-project-btn').addEventListener('click', () => {
        createProjectDialog.showModal();
    });
    document.querySelector('#close-project-modal-btn').addEventListener('click', () => {
        createProjectDialog.close();
    })

    const displayProjects = (listOfProjects)  => {

        const projectContainer = document.querySelector('#projects-list');
        // Reset to avoid duplication of content
        projectContainer.textContent = "";
        listOfProjects.forEach(project => {

            // create new li & button
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('project-button');
            li.appendChild(button);
            button.textContent = project.name;
            // append to container
            projectContainer.appendChild(li);
        });
    }



    displayProjects(listOfProjects);
})();

export { displayProjectsAndTasks };
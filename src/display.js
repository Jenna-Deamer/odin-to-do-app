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
            // attach event-listeners
            attachProjectButtonEventLIsteners();
            // close modal
            createProjectDialog.close();
            // clear input for next time
            projectNameField.value = "";
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
            li.setAttribute('id', project.id);
            const button = document.createElement('button');
            button.classList.add('project-button');
            li.appendChild(button);
            button.textContent = project.name;
            // append to container
            projectContainer.appendChild(li);
        });
    }

    const attachProjectButtonEventLIsteners = () => {
        const projectButtons = document.querySelectorAll('.project-button');
        projectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id= button.parentNode.id;
                // Find project with id in list & set selectedProject
                const index = listOfProjects.findIndex((button) => button.id === id);
                const selectedProject = listOfProjects[index];
                console.log(selectedProject);
               
            })
        });
    }

    const displayTasks = (selectedProject) => {
        const taskContainer = document.querySelector('#task-container');
        
        selectedProject.forEach(task => {
            
        });
    }

    displayProjects(listOfProjects);
    attachProjectButtonEventLIsteners();
  
})();

export { displayProjectsAndTasks };
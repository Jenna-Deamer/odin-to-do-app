import { listOfProjects } from "./projects";


const displayProjectsAndTasks = (function(){
    const addProjectButton = document.querySelector('#create-project-btn').addEventListener('click', () =>{
        createProjectDialog.showModal();
    });
    const closeProjectDialog = document.querySelector('#close-project-modal-btn').addEventListener('click', () =>{
        createProjectDialog.close();
    })
    
    const createProjectDialog = document.querySelector('#create-project-modal');

    const displayProjects = function(listOfProjects){
   
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

export {displayProjectsAndTasks};
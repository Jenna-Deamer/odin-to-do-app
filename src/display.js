import { listOfProjects } from "./projects";


const displayProjectsAndTasks = (function(){

    const displayProjects = function(listOfProjects){
   
        const projectContainer = document.querySelector('#projects-list');
        // Reset to avoid duplication of content
        projectContainer.textContent = "";
        listOfProjects.forEach(project => {

            // create new li & button
            const li = document.createElement('li');
            const button = document.createElement('button');
            li.appendChild(button);
            button.textContent = project.name;
            // append to container
            projectContainer.appendChild(li);
     
        });
    }
    displayProjects(listOfProjects);
})();

export {displayProjectsAndTasks};
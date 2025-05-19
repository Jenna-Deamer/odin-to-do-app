import { listOfProjects } from "./projects";
import { project } from "./projects";

const displayProjectsAndTasks = (function () {
  const createProjectDialog = document.querySelector("#create-project-modal");
  const createTaskDialog = document.querySelector("#create-task-modal");
  const formInfoLabel = document.querySelector(".info-label");
  // Project form field
  const projectNameField = document.querySelector("#project-name");
  // Task form fields
  const taskNameFIeld = document.querySelector("#task-name");
  const taskDueDateField = document.querySelector("#task-due-date");
  const taskPrioryField = document.querySelector("#task-priority");
  const taskDescriptionField = document.querySelector("#task-description");
  const taskProjectNameField = document.querySelector("#task-project-name");

  // Form event listeners
  document
    .querySelector("#create-project-modal form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // verify form data
      if (!projectNameField.value) {
        formInfoLabel.textContent = "Please enter a name";
      } else {
        // create project
        let name = projectNameField.value;
        const newProject = project.createProject(name);
        // add project
        project.addProjectToListOfProjects(newProject);
        // re-render project list
        displayProjects(listOfProjects);
        // Man set the active state to newProject
        const projectButtons = document.querySelectorAll(".project-button");
        let button = projectButtons[projectButtons.length - 1];
        activeButton = button;

        switchActiveProject(button);
        // attach event-listeners to projects in list
        attachProjectButtonEventListeners(activeButton);
        // close modal
        createProjectDialog.close();
        // clear input for next time
        projectNameField.value = "";
      }
    });

  document
    .querySelector("#create-task-modal form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });
  // Modal controls
  document
    .querySelector("#create-project-btn")
    .addEventListener("click", () => {
      createProjectDialog.showModal();
    });
  document
    .querySelector("#close-project-modal-btn")
    .addEventListener("click", () => {
      createProjectDialog.close();
    });

  document.querySelector("#create-task-btn").addEventListener("click", () => {
    // reset select to avoid duplication of items
    taskProjectNameField.textContent = "";
    // populate project dropdown with list of projects
    for (let i = 0; i < listOfProjects.length; i++) {
      let projectIndex = listOfProjects[i];
      // Create option for each item in list
      let option = document.createElement("option");
      option.text = projectIndex.name;
      option.value = projectIndex.name;
      // append to select
      taskProjectNameField.appendChild(option);
    }
    // show modal
    createTaskDialog.showModal();
  });
  document
    .querySelector("#close-task-modal-btn")
    .addEventListener("click", () => {
      createTaskDialog.close();
    });

  const initialDisplay = () => {
    // pull projects & their tasks from local storage

    // populate project list
    displayProjects(listOfProjects);

    // Set first project in list to active (DefaultProject called All)
    const activeButton = setFirstProjectInListToActive();

    // Attach event listeners
    attachProjectButtonEventListeners(activeButton);

    // // populate task container
    // displayTasks(selectedProject);

    // Attach event listeners
  };

  const displayProjects = (listOfProjects) => {
    const projectContainer = document.querySelector("#projects-list");
    // Reset to avoid duplication of content
    projectContainer.textContent = "";
    listOfProjects.forEach((project) => {
      // create new li & button
      const li = document.createElement("li");
      li.setAttribute("id", project.id);
      const button = document.createElement("button");
      button.classList.add("project-button");
      li.appendChild(button);
      button.textContent = project.name;
      // append to container
      projectContainer.appendChild(li);
    });
  };

  const displayTasks = (selectedProject) => {
    const taskContainer = document.querySelector("#task-container");
    const projectDisplayName = document.querySelector("#current-project-label");
    if (!selectedProject) {
      selectedProject = listOfProjects[0];
    }
    let taskList = selectedProject.getTaskList();
    console.log(taskList);
    // Update title
    projectDisplayName.textContent = selectedProject.name;
    // Create container for incomplete tasks & populate

    // Create container for completed tasks & populate
  };

  const switchActiveProject = (button, activeButton) => {
    const id = button.parentNode.id;
    // Switch Active class
    if (activeButton) {
      activeButton.classList.remove("active");
    }
    button.classList.add("active");
    activeButton = button;
    console.log(activeButton);

    // Find project with id in list & set selectedProject
    const index = listOfProjects.findIndex((button) => button.id === id);
    const selectedProject = listOfProjects[index];
    // Update task display with selectedProject
    displayTasks(selectedProject);
  };

  const attachProjectButtonEventListeners = () => {
    const projectButtons = document.querySelectorAll(".project-button");
    projectButtons.forEach((button) => {
      button.addEventListener("click", () => {
        switchActiveProject(button, activeButton);
      });
    });
  };

  const setFirstProjectInListToActive = () => {
    const projectButtons = document.querySelectorAll(".project-button");
    projectButtons[0].classList.add("active");
    let activeButton = projectButtons[0];
    console.log(activeButton);
    return activeButton;
  };

  // displayProjects(listOfProjects);
  // const activeButton = setFirstProjectInListToActive();
  // console.log(activeButton)
  // let selectedProject = attachProjectButtonEventListeners(activeButton);
  // displayTasks(selectedProject);

  let activeButton = initialDisplay();
})();

export { displayProjectsAndTasks };

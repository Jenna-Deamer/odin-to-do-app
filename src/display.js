import { ta } from "date-fns/locale";
import { listOfProjects } from "./projects";
import { project } from "./projects";
import { task } from "./task";

const displayProjectsAndTasks = (function () {
  let activeButton;
  let selectedProject;
  // Dialog html items
  const createProjectDialog = document.querySelector("#create-project-modal");
  const createTaskDialog = document.querySelector("#create-task-modal");
  const projectFormInfoLabel = document.querySelector("#info-label-project");
  const taskFormInfoLabel = document.querySelector("#info-label-task");
  // Project form field
  const projectNameField = document.querySelector("#project-name");
  // Task form fields
  const taskNameFIeld = document.querySelector("#task-name");
  const taskDueDateField = document.querySelector("#task-due-date");
  const taskPrioryField = document.querySelector("#task-priority");
  const taskDescriptionField = document.querySelector("#task-description");
  const taskProjectNameField = document.querySelector("#task-project-name");
  // Task container
  const taskContainer = document.querySelector("#task-container");
  const projectDisplayName = document.querySelector("#current-project-label");
  const incompleteTaskList = document.createElement("ul");
  taskContainer.appendChild(incompleteTaskList);

  // Form event listeners
  document
    .querySelector("#create-project-modal form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // verify form data
      if (!projectNameField.value) {
        projectFormInfoLabel.textContent = "Please enter a name";
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
        // clear input & label for next time
        projectNameField.value = "";
        projectFormInfoLabel.textContent = "";
      }
    });

  document
    .querySelector("#create-task-modal form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // validate form (if any are empty display error)
      if (
        !taskNameFIeld.value ||
        !taskProjectNameField.value ||
        !taskDueDateField.value ||
        !taskPrioryField.value ||
        !taskDescriptionField.value
      ) {
        taskFormInfoLabel.textContent = "Please fill out all fields!";
      } else {
        // Create the task with status set to false (incomplete task)
        let newTask = task.createTask(
          taskProjectNameField.value,
          taskNameFIeld.value,
          taskDescriptionField.value,
          taskDueDateField.value,
          taskPrioryField.value,
          false
        );
        console.log(newTask);
        // Add task to the project's taskList
        newTask.addTaskToProject(newTask);
        // Display updated task container
        displayTasks(selectedProject);
        // Close modal
        createTaskDialog.close();
        // Clear inputs & label for next time
        taskFormInfoLabel.textContent = "";
        taskDueDateField.value = "";
        taskDescriptionField.value = "";
      }
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

    // Populate project list
    displayProjects(listOfProjects);

    // Set first project in list to active (DefaultProject called All)
    setFirstProjectInListToActive();

    // Attach event listeners
    attachProjectButtonEventListeners(activeButton);

    // Populate task container
    displayTasks(selectedProject);

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
    // If no selected project, set to first one in list ('All')
    if (!selectedProject) {
      selectedProject = listOfProjects[0];
    }
    // Get current project's taskList
    let taskList = selectedProject.getTaskList();

    // Update title
    projectDisplayName.textContent = selectedProject.name;

    // Reset to avoid duplication
    incompleteTaskList.innerHTML = "";

    // Create task list item
    taskList.forEach((task) => {
      const taskProjectName = task.getProjectName();
      const taskName = task.getTitle();
      const taskDescription = task.getDescription();
      const taskDueDate = task.getDueDate();
      const taskPriory = task.getPriority();
      const taskID = task.id;
      const descriptionID = +1; // ID to determine which description to open on click

      const taskItem = `<li class='task-list-item'>
            <div class='task-main-section' id='${taskID}'><div class='task-name-group'><button class='toggle-task-status-btn'></button><p>${taskName}</p></div><p>${taskDueDate}</p><button class='details-btn'>Details</button></div>
             <div class='task-sub-section' id='${descriptionID}'><p class='task-description'>${taskDescription}</p>
             <ul>
             <li>Project: ${taskProjectName}</li>
               <li>Priority: ${taskPriory}</li>
                 <li>Due: ${taskDueDate}</li>
             </ul></div>
           </li>`;
      incompleteTaskList.innerHTML += taskItem;
    });

    setCompletedStyleOnCompleteTasks(taskList);
    handleShowTaskDescriptionClick();
    handleTaskStatusClick(taskList);
    // Create container for completed tasks & populate
  };

  const handleShowTaskDescriptionClick = () => {
    const detailButtons = document.querySelectorAll(".details-btn");
    const descriptionDivs = document.querySelectorAll(".task-sub-section");

    detailButtons.forEach((button, descriptionID) => {
      button.addEventListener("click", () => {
        const selectedDescription = descriptionDivs[descriptionID];
        if (selectedDescription.style.display === "flex") {
          selectedDescription.style.display = "none";
        } else {
          selectedDescription.style.display = "flex";
        }
      });
    });
  };

  const handleTaskStatusClick = (taskList) => {
    const statusButtons = document.querySelectorAll(".toggle-task-status-btn");

    statusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Get id of btn clicked & toggle checked class
        const id = button.parentNode.parentNode.id;
        console.log("Status Button Clicked: " + id);
        button.classList.toggle('checked');

        // Find the task with the matching id to change it's status
        const taskIndex = taskList.findIndex((button) => button.id === id);
        const selectedTask = taskList[taskIndex];
        console.log(selectedTask)
      
        // Toggle the status
        selectedTask.toggleStatus();
      });
    });
  };

  const setCompletedStyleOnCompleteTasks = (taskList) => {
    // Get all tasks & check which ones are completed 

    // Apply checked class to all completed tasks
 
  }

  const switchActiveProject = (button) => {
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
    selectedProject = listOfProjects[index];
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
    activeButton = projectButtons[0];
    console.log(activeButton);
    // Set selected project (Display's this projects tasks)
    selectedProject = listOfProjects[0];
    console.log(selectedProject);
  };

  initialDisplay();
})();

export { displayProjectsAndTasks };

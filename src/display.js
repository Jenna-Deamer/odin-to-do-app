import { listOfProjects } from "./projects";
import { project } from "./projects";
import { task } from "./task";
import { localStorageHelper } from "./storage";
import { formatDate } from "./dateFormatHelper";

const displayProjectsAndTasks = (function () {
    let activeButton;
    let selectedProject;
    // Dialog html items
    const createProjectDialog = document.querySelector("#create-project-modal");
    const createTaskDialog = document.querySelector("#create-task-modal");
    const editTaskDialog = document.querySelector("#edit-task-modal");
    const projectFormInfoLabel = document.querySelector("#info-label-project");
    const taskFormInfoLabel = document.querySelector("#info-label-task");
    const taskEditFormInfoLabel = document.querySelector(
        "#info-label-edit-task"
    );
    document
        .querySelector("#close-edit-task-modal-btn")
        .addEventListener("click", () => {
            editTaskDialog.close();
        });
    // Project form field
    const projectNameField = document.querySelector("#project-name");
    // Task form fields
    const taskNameField = document.querySelector("#task-name");
    const taskDueDateField = document.querySelector("#task-due-date");
    const taskPrioryField = document.querySelector("#task-priority");
    const taskDescriptionField = document.querySelector("#task-description");
    const taskProjectNameField = document.querySelector("#task-project-name");
    const taskEditNameField = document.querySelector("#edit-task-name");
    const taskEditDueDateField = document.querySelector("#edit-task-due-date");
    const taskEditPrioryField = document.querySelector("#edit-task-priority");
    const taskEditDescriptionField = document.querySelector(
        "#edit-task-description"
    );
    const taskEditProjectNameField = document.querySelector(
        "#edit-task-project-name"
    );
    // Task container
    const taskContainer = document.querySelector("#task-container");
    const projectDisplayName = document.querySelector("#current-project-label");
    const incompleteTaskList = document.querySelector("#incomplete-task-list");
    const completeTaskList = document.querySelector("#complete-task-list");

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
                const projectButtons =
                    document.querySelectorAll(".project-button");
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
                !taskNameField.value ||
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
                    taskNameField.value,
                    taskDescriptionField.value,
                    taskDueDateField.value,
                    taskPrioryField.value,
                    false
                );

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
            if (projectIndex.name != "All") {
                // Create option for each item in list
                let option = document.createElement("option");
                option.text = projectIndex.name;
                option.value = projectIndex.name;
                // append to select
                taskProjectNameField.appendChild(option);
            }
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
        localStorageHelper.retrieveDataFromLocalStorage();

        // Populate project list
        displayProjects(listOfProjects);

        // Set first project in list to active (DefaultProject called All)
        setFirstProjectInListToActive();

        // Attach event listeners
        attachProjectButtonEventListeners(activeButton);

        // Populate task container
        displayTasks(selectedProject);
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
        let descriptionID = 0; // ID to determine which description to open on click

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
        completeTaskList.innerHTML = "";

        // Create task list item
        taskList.forEach((task) => {
            const taskProjectName = task.getProjectName();
            const taskName = task.getTitle();
            const taskDescription = task.getDescription();
            const taskDueDate = formatDate(task.getDueDate());

            const taskPriory = task.getPriority();
            const taskID = task.id;
            descriptionID++; // Increase id so each div has a unq one.

            const taskItem = `<li class='task-list-item' id='${taskID}'>
            <div class='task-main-section' id='${taskID}'><div class='task-name-group'><button class='toggle-task-status-btn'></button><p>${taskName}</p></div><p>${taskDueDate}</p><button class='details-btn'>Details</button></div>
             <div class='task-sub-section' id='${descriptionID}'><p class='task-description'>${taskDescription}</p>
             <ul>
             <li>Project: ${taskProjectName}</li>
               <li>Priority: ${taskPriory}</li>
                 <li>Due: ${taskDueDate}</li>
             </ul>
                        <div class='button-container'><button class='edit-task-btn'>Edit</button><button class='delete-task-btn'>Delete</button></div>
             </div>
           </li>`;

            // Filter tasks into complete or incomplete containers
            if (task.getStatus()) {
                completeTaskList.innerHTML += taskItem;
            } else {
                incompleteTaskList.innerHTML += taskItem;
            }
        });

        setCompletedStyleOnCompleteTasks(taskList);
        setPriorityColorOnTask(taskList);
        handleShowTaskDescriptionClick();
        handleTaskStatusClick(taskList);
        handleDeleteTask();
        handleEditTask();
    };

    const handleEditTask = () => {
        const editTaskButtons = document.querySelectorAll(".edit-task-btn");
        editTaskButtons.forEach((button) => {
            button.addEventListener("click", () => {
                // Get id for task item clicked
                const id = button.parentNode.parentNode.parentNode.id;
                // Get the task obj & index by searching default project
                const defaultProject = listOfProjects[0];
                const taskList = defaultProject.getTaskList();
                const taskIndex = taskList.findIndex((task) => task.id === id);
                const selectedTask = taskList[taskIndex];

                // Populate edit form with task details
                taskEditNameField.value = selectedTask.getTitle();
                taskEditDueDateField.value = selectedTask.getDueDate();
                taskEditPrioryField.value = selectedTask.getPriority();
                taskEditDescriptionField.value = selectedTask.getDescription();

                // Set first option to current project's name
                let firstOption = document.createElement("option");
                firstOption.text = selectedTask.getProjectName();
                firstOption.value = selectedTask.getProjectName();
                taskEditProjectNameField.appendChild(firstOption);

                // Loop through the rest of the projects & populate the select
                for (let i = 0; i < listOfProjects.length; i++) {
                    let projectIndex = listOfProjects[i];
                    if (
                        projectIndex.name != selectedTask.getProjectName() &&
                        projectIndex.name != "All"
                    ) {
                        // Create option for each item in list
                        let option = document.createElement("option");
                        option.text = projectIndex.name;
                        option.value = projectIndex.name;
                        // append to select
                        taskEditProjectNameField.appendChild(option);
                    }
                }
                // Show form
                editTaskDialog.showModal();

                // Handle submit
                document
                    .querySelector("#edit-task-modal form")
                    .addEventListener("submit", function (event) {
                        event.preventDefault();
                        // Handle blank fields
                        if (
                            !taskEditNameField.value ||
                            !taskEditProjectNameField.value ||
                            !taskEditDueDateField.value ||
                            !taskEditPrioryField.value ||
                            !taskEditDescriptionField.value
                        ) {
                            taskEditFormInfoLabel.textContent =
                                "Please fill out all fields!";
                        } else {
                            // Update task details
                            selectedTask.setTitle(taskEditNameField.value);
                            selectedTask.setProjectName(
                                taskEditProjectNameField.value
                            );
                            selectedTask.setDueDate(taskEditDueDateField.value);
                            selectedTask.setPriority(taskEditPrioryField.value);
                            selectedTask.setDescription(
                                taskEditDescriptionField.value
                            );
                            // Close & update display
                            editTaskDialog.close();
                            displayTasks();
                        }
                    });
            });
        });
    };

    const handleDeleteTask = () => {
        const deleteTaskButtons = document.querySelectorAll(".delete-task-btn");

        deleteTaskButtons.forEach((button) => {
            button.addEventListener("click", () => {
                // Get id for task item clicked
                const id = button.parentNode.parentNode.parentNode.id;

                // Get the task by searching default project
                const defaultProject = listOfProjects[0];
                let taskList = defaultProject.getTaskList();

                // Get the index of task to remove
                let taskIndex = taskList.findIndex((task) => task.id === id);

                // Get the task obj & get the project's name
                let taskToRemove = taskList[taskIndex];
                let projectName = taskToRemove.getProjectName();

                taskList.splice(taskIndex, 1);

                // Find the project the task is associated to
                let projectToRemoveTaskFromIndex = listOfProjects.findIndex(
                    (project) => project.name === projectName
                );
                // remove task
                let projectToRemoveTaskFrom =
                    listOfProjects[projectToRemoveTaskFromIndex];
                taskList = projectToRemoveTaskFrom.getTaskList();

                taskIndex = taskList.findIndex((task) => task.id === id);
                taskList.splice(taskIndex, 1);
                // Update task container display
                displayTasks();
            });
        });
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
        const statusButtons = document.querySelectorAll(
            ".toggle-task-status-btn"
        );

        statusButtons.forEach((button) => {
            button.addEventListener("click", () => {
                // Get id of btn clicked & toggle checked class
                const id = button.parentNode.parentNode.id;
                button.classList.toggle("checked");

                // Find the task with the matching id to change it's status
                const taskIndex = taskList.findIndex(
                    (button) => button.id === id
                );
                const selectedTask = taskList[taskIndex];

                // Toggle the status
                selectedTask.toggleStatus();

                // Update task container display
                displayTasks();
            });
        });
    };

    const setPriorityColorOnTask = (taskList) => {
        // Get all task list items
        const taskContainers = document.querySelectorAll(".task-list-item");

        taskContainers.forEach((taskContainer) => {
            // Find task in list
            const id = taskContainer.firstElementChild.id;

            const taskIndex = taskList.findIndex(
                (taskContainer) => taskContainer.id === id
            );
            const selectedTask = taskList[taskIndex];
            // check priotry & set color
            if (selectedTask.getPriority() === "High") {
                taskContainer.style.borderColor = "#f23535";
            } else if (selectedTask.getPriority() === "Medium") {
                taskContainer.style.borderColor = "#e66735";
            } else {
                taskContainer.style.borderColor = "#f0ab35";
            }
        });
    };

    const setCompletedStyleOnCompleteTasks = (taskList) => {
        const statusButtons = document.querySelectorAll(
            ".toggle-task-status-btn"
        );
        // Get all statusButtons to apply style to
        statusButtons.forEach((button) => {
            const id = button.parentNode.parentNode.id;
            // Get task from button's index
            const taskIndex = taskList.findIndex((button) => button.id === id);
            const taskToCheck = taskList[taskIndex];

            // Check if that task status is true
            if (taskToCheck.getStatus()) {
                // Apply class if true
                button.classList.add("checked");
            }
        });
    };

    const switchActiveProject = (button) => {
        const id = button.parentNode.id;
        // Switch Active class
        if (activeButton) {
            activeButton.classList.remove("active");
        }
        button.classList.add("active");
        activeButton = button;

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
        // Set selected project (Display's this projects tasks)
        selectedProject = listOfProjects[0];
    };

    initialDisplay();
})();

export { displayProjectsAndTasks };

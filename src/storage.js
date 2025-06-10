import { project } from "./projects";
import { listOfProjects } from "./projects";
import { task } from "./task";

const localStorageHelper = (function () {
    const saveToLocalStorage = () => {
        // Get all tasks from default project
        let defaultProject = listOfProjects[0];
        // Get all current tasks from default project (All)
        let taskList = defaultProject.getTaskList();
        // Create a master list to store tasks & their details
        let listOfAllTasks = [];
        // For each task get all their details & push it into the master list
        // Storing the task itself will only store it's ID as everything else is private.
        taskList.forEach((todo) => {
            listOfAllTasks.push(todo.getTaskDetails());
        });

        // Save listOfTasks to storage
        localStorage.setItem("tasks", JSON.stringify(listOfAllTasks));
    };

    const retrieveDataFromLocalStorage = () => {
        // Get data from localStorage
        let storageData = JSON.parse(localStorage.getItem("tasks"));
        // if anything in storage re-set projects & their tasks
        if (storageData) {
            setTasksAndProjectsFromLocalStorage(storageData);
        }

        return storageData;
    };

    const setTasksAndProjectsFromLocalStorage = (storageData) => {
        // For each task, re-create task
        storageData.forEach((todo) => {
            let newTodo = task.createTask(
                todo.projectName,
                todo.title,
                todo.description,
                todo.dueDate,
                todo.priority,
                todo.isComplete
            );

            // If task's project does not arealdy exist create it
            if (!listOfProjects.includes(newTodo.getProjectName())) {
                let newProject = project.createProject(todo.projectName);
                //add project to listOfProjects
                project.addProjectToListOfProjects(newProject);
            }

            // Add task to project
            newTodo.addTaskToProject(newTodo);
        });
    };

    return {
        saveToLocalStorage,
        retrieveDataFromLocalStorage,
    };
})();

export { localStorageHelper };

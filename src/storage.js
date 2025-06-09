import { project } from "./projects";
import { listOfProjects } from "./projects";
import { task } from "./task";

const localStorageHelper = (function () {
    const saveToLocalStorage = () => {
        console.log(...listOfProjects);
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
        console.log("Retrived:");
        // if anything in storage re-set projects & their tasks
        if (storageData) {
            console.log(...storageData);
            setTasksAndProjectsFromLocalStorage(storageData);
        }

        return storageData;
    };

    const setTasksAndProjectsFromLocalStorage = (storageData) => {
        // For each task, create task & project if it does not exist
        storageData.forEach((todo) => {
            let newTodo = task.createTask(
                todo.projectName,
                todo.title,
                todo.description,
                todo.dueDate,
                todo.priorty,
                todo.isComplete
            );
            console.log("Created Task");
            console.log(newTodo);
            console.log(newTodo.getPriority());

            // Recreate the project (To reinstate functions)
            let newProject = project.createProject(todo.projectName);
            //add project to listOfProjects
            project.addProjectToListOfProjects(newProject);
            console.log(newProject);
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

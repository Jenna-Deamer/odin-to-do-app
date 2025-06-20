import { listOfProjects } from "./projects";
import { localStorageHelper } from "./storage";

const task = (function () {
    const createTask = (
        projectName,
        title,
        description,
        dueDate,
        priority,
        isComplete
    ) => {
        const id = crypto.randomUUID();

        const getProjectName = () => projectName;
        const getTitle = () => title;
        const getDescription = () => description;
        const getDueDate = () => dueDate;
        const getPriority = () => priority;
        const getStatus = () => isComplete;

        const setTitle = (newTitle) => {
            title = newTitle;
        };
        const setProjectName = (newProjectName) => {
            projectName = newProjectName;
        };
        const setDueDate = (newDueDate) => {
            dueDate = newDueDate;
        };
        const setPriority = (newPriority) => {
            priority = newPriority;
        };

        const setDescription = (newDescription) => {
            description = newDescription;
        };
        const addTaskToProject = (task) => {
            // find project using projectName
            const projectIndex = listOfProjects.findIndex(
                (project) => project.name == projectName
            );
            let selectedProject = listOfProjects[projectIndex];
            // Get taskList
            let taskList = selectedProject.getTaskList();
            // Push task into taskList
            taskList.push(task);

            // Always add task to default project (All)
            selectedProject = listOfProjects[0];
            taskList = selectedProject.getTaskList();
            taskList.push(task);

            // Save updated list of all tasks
            localStorageHelper.saveToLocalStorage();
        };

        const toggleStatus = () => {
            if (isComplete) {
                isComplete = false;
            } else {
                isComplete = true;
            }
        };

        const getTaskDetails = () => {
            return {
                projectName,
                title,
                description,
                dueDate,
                priority,
                isComplete,
            };
        };

        return {
            id,
            setTitle,
            setProjectName,
            setDescription,
            getProjectName,
            getTitle,
            getDescription,
            getDueDate,
            getPriority,
            getStatus,
            setDueDate,
            setPriority,
            toggleStatus,
            addTaskToProject,
            getTaskDetails,
        };
    };

    return { createTask };
})();

export { task };

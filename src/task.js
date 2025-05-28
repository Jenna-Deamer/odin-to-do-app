import { project } from "./projects";
import { listOfProjects } from "./projects";

const task = (function () {

    const createTask = (projectName, title, description, dueDate, priority, isComplete) => {
        const id = crypto.randomUUID();

        const getProjectName = () => projectName;
        const getTitle = () => title;
        const getDescription = () => description;
        const getDueDate = () => dueDate;
        const getPriority = () => priority;
        const getStatus = () => isComplete;

        const setDueDate = (newDueDate) => {
            dueDate = newDueDate;
        }
        const setPriority = (newPriority) => {
            priority = newPriority;
        }

        const addTaskToProject = (task) => {
            // find project using projectName
            const projectIndex = listOfProjects.findIndex((project) => project.name == projectName)
            let selectedProject = listOfProjects[projectIndex];
            // Get taskList
            let taskList = selectedProject.getTaskList();
            // Push task into taskList 
            taskList.push(task);

            // Always add task to default project (All)
            selectedProject = listOfProjects[0];
            taskList = selectedProject.getTaskList();
            taskList.push(task);
        }

        const toggleStatus = () => {
            if (isComplete) {
                isComplete = false;
            }
            else {
                isComplete = true;
            }
        }

        return { id, getProjectName, getTitle, getDescription, getDueDate, getPriority, getStatus, setDueDate, setPriority, toggleStatus, addTaskToProject };
    }

    // Testing
    let newTask = createTask("Work", "Code Again", "some cool desc", "20-10-2025", "High", false)
    let newTask2 = createTask("Garden", "Plant Some Stuff", "some cool desc some cool desc some cool desc some cool descsome cool descsome cool desc", "20-10-2025", "Medium", false)
    let newTask3 = createTask("Work", "Code Again Again!", "some cool desc", "20-10-2025", "Low", false)
    
    newTask.addTaskToProject(newTask);
    newTask2.addTaskToProject(newTask2);
    newTask3.addTaskToProject(newTask3);

    return{createTask}
})()

export { task }
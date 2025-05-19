import { project } from "./projects";

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

        const toggleStatus = () => {
            if (isComplete) {
                isComplete = false;
            }
            else {
                isComplete = true;
            }
        }
        return { id, getProjectName, getTitle, getDescription, getDueDate, getPriority, getStatus, setDueDate, setPriority, toggleStatus };
    }

    // Testing
    let newTask = createTask("All", "Clean Again", "some cool desc", "20-10-2022", "high", false)
    console.log(newTask)
    console.log(newTask.getDueDate())
    newTask.setDueDate("5/19/2025")
    console.log(newTask.getDueDate())



    console.log(newTask.getStatus())
    newTask.getStatus()
    newTask.toggleStatus()
    console.log(newTask.getStatus())

})()

export { task }
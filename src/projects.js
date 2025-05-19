export const listOfProjects = [];

const project = (function () {

    const createProject = (name) => {
        const taskList = [];
        const id = crypto.randomUUID();

        const getTaskList = () => taskList;
     
        const addTask = (task) => {
            taskList.push(task);
        }
        return { name, id, getTaskList, addTask }
    };

    const addProjectToListOfProjects = (newProject) => {
        listOfProjects.push(newProject);
    };
    // Create default project for all tasks.
    const defaultProject = createProject("All");
    addProjectToListOfProjects(defaultProject);
    
    // Testing
    const testProject2 = createProject("Work");
    defaultProject.addTask("Code");
    addProjectToListOfProjects(testProject2)
    console.log(...listOfProjects);

    return { createProject, addProjectToListOfProjects }
})();


export { project };
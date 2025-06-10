export let listOfProjects = [];

const project = (function () {
    const createProject = (name) => {
        const taskList = [];
        const id = crypto.randomUUID();

        const getTaskList = () => taskList;

        return { name, id, getTaskList };
    };

    const addProjectToListOfProjects = (newProject) => {
        listOfProjects.push(newProject);
    };

    // Create default project for all tasks.
    const defaultProject = createProject("All");
    addProjectToListOfProjects(defaultProject);

    return { createProject, addProjectToListOfProjects };
})();

export { project };

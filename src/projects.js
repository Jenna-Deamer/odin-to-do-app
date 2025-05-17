export const listOfProjects = [];

const project = (function () {

    const createProject = (name) => {
        const taskList = [];

        const getTaskList = () => taskList;
        const addTask = (task) => {
            taskList.push(task);
        }
        return { name, getTaskList, addTask }
    };

    const addProjectToListOfProjects = (newProject) => {
        listOfProjects.push(newProject);
    };

    // Testing
    const testProject = createProject("Home");
    const testProject2 = createProject("Work");
    console.log(testProject.name)
    testProject.addTask('Clean');
    testProject.addTask('Eat');
    // console.log(testProject.getTaskList());

    addProjectToListOfProjects(testProject)
    addProjectToListOfProjects(testProject2)
    // console.log(...listOfProjects);

    return { createProject, addProjectToListOfProjects }
})();


export { project };
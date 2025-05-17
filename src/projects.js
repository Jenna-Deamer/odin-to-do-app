export const listOfProjects = [];

const project = (function(){
   
    const createProject = function (name) {
        const taskList = [];
     
        const getTaskList = () => taskList;
        const addTask = (task) => {
            taskList.push(task);
        }
        return { name, getTaskList, addTask }
    };

    const addProjectToListOfProjects = function(newProject){
        listOfProjects.push(newProject);
    }

    const testProject = createProject("Home");
    const testProject2 = createProject("Work");
    console.log(testProject.name)
    testProject.addTask('Clean');
    testProject.addTask('Eat');
    console.log(testProject.getTaskList());
    
    addProjectToListOfProjects(testProject)
    addProjectToListOfProjects(testProject2)
    console.log(...listOfProjects);
  
})();


export {project};
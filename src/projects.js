export let listOfProjects = [];
import { localStorageHelper } from "./storage";


const project = (function () {
  const createProject = (name) => {
    const taskList = [];
    const id = crypto.randomUUID();

    const getTaskList = () => taskList;

    return { name, id, getTaskList };
  };

  const addProjectToListOfProjects = (newProject) => {
    listOfProjects.push(newProject);
    // localStorageHelper.saveToLocalStorage(listOfProjects);
 
  };

  // Create default project for all tasks.
  const defaultProject = createProject("All");
  addProjectToListOfProjects(defaultProject);

  // Testing
  const testProject2 = createProject("Work");

  const testProject3 = createProject("Garden");

  addProjectToListOfProjects(testProject2);
  addProjectToListOfProjects(testProject3);
  console.log(...listOfProjects);

  return { createProject, addProjectToListOfProjects, defaultProject };
})();

export { project };

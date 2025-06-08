import { project } from "./projects";
import { listOfProjects } from "./projects";

const localStorageHelper = (function () {
    const saveToLocalStorage = () => {
        console.log(...listOfProjects);
        // Get all tasks from default project
        let defaultProject = listOfProjects[0];
        let listOfAllTasks = defaultProject.getTaskList();
        console.log(...listOfAllTasks);

        // Save listOfTasks to storage use their project name to rebuild projects
        // // Save current listOfProjects to storage

        localStorage.setItem("projects", JSON.stringify(listOfProjects));
    };

    const retrieveDataFromLocalStorage = () => {
        // Get data from localStorage
        let storageData = JSON.parse(localStorage.getItem("projects"));
        console.log("Retrived:");
        // if anything re-set projects
        if (storageData) {
            console.log(...storageData);
            setProjectsFromLocalStorage(storageData);
        }

        return storageData;
    };

    const setProjectsFromLocalStorage = (storageData) => {
        // re-create projects to re-assign functions
        storageData.forEach((projectToAdd) => {
            // Skip adding All project. It's manually created
            if (!listOfProjects.filter((project) => project.name == "All")) {
                project.createProject(projectToAdd);
                project.addProjectToListOfProjects(projectToAdd);
                console.log(
                    "Set Projects From Storage:" + { ...listOfProjects }
                );
            }
        });
    };
    return {
        saveToLocalStorage,
        retrieveDataFromLocalStorage,
        setProjectsFromLocalStorage,
    };
})();

export { localStorageHelper };

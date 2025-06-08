import { project } from "./projects";
import { listOfProjects } from "./projects";

const localStorageHelper = (function () {
    const saveToLocalStorage = (listOfProjects) => {
        // Save current listOfProjects to storage
        listOfProjects = localStorage.setItem(
            "projects",
            JSON.stringify(listOfProjects)
        );
    };

    const retrieveDataFromLocalStorage = () => {
        // Get data from localStorage
        let storageData = JSON.parse(localStorage.getItem("projects"));
        console.log("Retrived:");
        console.log(...storageData);
        setProjectsFromLocalStorage(storageData);
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

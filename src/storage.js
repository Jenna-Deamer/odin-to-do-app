const localStorageHelper = () => {

  const saveToLocalStorage = (listOfProjects) => {
    // Save current listOfProjects to storage
    localStorage.setItem("projects", JSON.stringify(listOfProjects));
  };

  const retrieveDataFromLocalStorage = () => {
    // Get data from localStorage 
    let storageData = JSON.parse(localStorage.getItem("projects"));
    console.log(storageData);
   
    // re-create projects to re-assign functions
  };
  return{saveToLocalStorage, retrieveDataFromLocalStorage}
};

export { localStorageHelper };

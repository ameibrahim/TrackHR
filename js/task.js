//TODO: Dependency Injection?
let people = [];
let addedCollaborators = [];

function clearForm(coreElement) {
    people = [];
    addedCollaborators = [];
    refreshCollaboratorCount(coreElement);
}

async function loadCollaborators(element){

    let coreElement = element.parentElement.parentElement
    .parentElement.parentElement;

    console.log("refreColab2 : ",coreElement);

    let collaboratorFilterListContainer = coreElement.querySelector(".collaborator-filter-list");
    collaboratorFilterListContainer.innerHTML = "";

    //TODO: Only have available people to add. Show if someone has been added
    // You shouldn't be able to add someone twice.

    let givenInput = element.value //TODO: Clean value using regexes, SQL Injection Issue
    let result = (givenInput != null) ? await fetchUserNames(givenInput) : [] ;
    people = result ?? [];

    // people = (givenInput != null) ? result.map( person => `${person.firstname} ${person.lastname}`) : [] ;

    //TODO: Should you be able to add yourself??

    if(people.length > 0){
        people.forEach( person => {

            let fullname = `${person.firstname} ${person.lastname}`;
    
            let collaboratorItem = document.createElement("div");
            collaboratorItem.textContent = fullname;
    
            let names = (addedCollaborators.length > 0) ? 
            addedCollaborators.map( collaborator => `${collaborator.firstname} ${collaborator.lastname}`) : [] ;
    
            if(!names.includes(fullname)){
                collaboratorItem.className = "collaborator-item";
                collaboratorItem.addEventListener("click", () => {
                    addedCollaborators.push(person);
                    clearCollaboratorsInput(coreElement);
                    refreshCollaboratorCount(coreElement);
                });
            }
            else{
                collaboratorItem.className = "collaborator-item disabled-item";
            }
    
            collaboratorFilterListContainer.appendChild(collaboratorItem);
        });
    }
    else{

        let collaboratorItem = document.createElement("div");
        collaboratorItem.textContent = `No Results For ' ${givenInput} '`;
        collaboratorItem.className = "collaborator-item disabled-item no-result";
        collaboratorFilterListContainer.appendChild(collaboratorItem);

    }
}

async function fetchUserNames(givenInput){

    let params = `givenInput=${givenInput}`;

    return await AJAXCall({
        phpFilePath : "include/user-names.fetch.php",
        rejectMessage: "Users Not Fetched",
        params,
        type: "fetch"
    });

}

function clearCollaboratorsInput(coreElement) {
    let collaboratorInput = coreElement.querySelector(".add-collaborator-input");
    collaboratorInput.value = "";
}

function refreshCollaboratorCount(coreElement) {

    console.log("colCount1: ", coreElement);
    let circularBadge = coreElement.querySelector(".input-side-tag .circular-badge");
    let collaboratorPopupTitle = coreElement.querySelector
    (".collaborators-slide-popup > .popup-header > .pop-up-title");

    // console.log("85:", coreElement);


    let collaboratorCount = addedCollaborators.length;
    circularBadge.textContent = collaboratorCount;
    collaboratorPopupTitle.textContent = `Collaborators ( ${ collaboratorCount } )`

}

function loadLocalCollaboratorListView(coreElement){

    console.log("94: ",coreElement);

    let collaboratorListContainer = coreElement.querySelector
    (".collaborators-slide-popup > .popup-body > .collaborator-list");
    collaboratorListContainer.innerHTML = "";

    if( addedCollaborators.length > 0 ){
        addedCollaborators.forEach( ( person, index ) => {
    
            let collaboratorRow = document.createElement("li");
            collaboratorRow.className = "collaborator-row";
    
            let collaboratorRowInnerHTML = 
            `   <p>${ person.firstname + " " + person.lastname }</p>
                <span onclick="removePersonFromList(this, ${ index })">
                    <img src="images/icons/fi-rr-cross-small.svg" alt="">   
                </span>
            `;
            
            collaboratorRow.innerHTML = collaboratorRowInnerHTML;
    
            collaboratorListContainer.appendChild(collaboratorRow);
    
        });
    }
    else{
        collaboratorListContainer.innerHTML =
        `<p class='span-height-width'>
            <b>No</b> 
            <b>Collaborators</b>
            <b>Added</b>
        </p>`
    }

}

function removePersonFromList(element, index){
    addedCollaborators.splice(index,1);
    let coreElement = element.parentElement.parentElement
    .parentElement.parentElement.parentElement;
    
    console.log("gg: ",coreElement);
    refreshCollaboratorCount(coreElement);
    loadLocalCollaboratorListView(coreElement);
}

function showTaskLoader(coreElement) {
    let loaderView = coreElement.querySelector(".loader-view");
    loaderView.style.display = "grid";
}

function hideTaskLoader(coreElement) {
    let loaderView = coreElement.querySelector(".loader-view");
    loaderView.style.display = "none";
}

function addNewTask() {

    let valuesFromInputs = collectValuesForAddingProject();

    let projectDetails = { 
        taskId: uniqueID(),
        supertaskId: "0", 
        startDate: valuesFromInputs.projectStartDate, 
        endDate: valuesFromInputs.projectEndDate, 
        name: valuesFromInputs.projectName, 
        description: valuesFromInputs.projectDescription, 
        creatorId: "abcdefghi"  //TODO: Get Proper ID
    };

    let coreElement = document.querySelector(".task-overlay");

    let taskConfig = {
        toastSuccessMessage: "Project Added Successsfully",
        toastFailMessage: "Failed To Add Project",
        projectDetails
    }

    processNewTaskRequest(taskConfig, coreElement);

}


function addNewSubTask() {

    let valuesFromInputs = collectValuesForAddingSubTask();

    let projectDetails = { 
        taskId: uniqueID(),
        supertaskId: valuesFromInputs.subtaskSupertaskID, 
        startDate: valuesFromInputs.subtaskStartDate, 
        endDate: valuesFromInputs.subtaskEndDate, 
        name: valuesFromInputs.subtaskName, 
        description: valuesFromInputs.subtaskDescription, 
        creatorId: "abcdefghi"  //TODO: Get Proper ID
    };

    let coreElement = document.querySelector(".subtask-overlay");

    let taskConfig = {
        toastSuccessMessage: "Subtask Added Successsfully",
        toastFailMessage: "Failed To Add Subtask",
        projectDetails
    }

    processNewTaskRequest(taskConfig, coreElement);

}

async function processNewTaskRequest(taskConfig, coreElement){

    let {
        toastSuccessMessage,
        toastFailMessage,
        projectDetails
    } = taskConfig;

    if(checkInputFieldsFor(form = "")){
        showTaskLoader(coreElement);
        try {

            let projectCollaboratorIDs = addedCollaborators.map( person => person.user_id );

            await insertCollaboratorDetails(projectDetails, projectCollaboratorIDs);
            await insertProjectDetails(projectDetails);

            setTimeout(() => {
                hideTaskLoader(coreElement);
                resetTaskForm(); // Make Modular
                hideAddTaskForm();
                showToast(toastSuccessMessage);
            }, 3000);
        }
        catch(error) {
            console.log(error);

            setTimeout(() => {

                showToast(toastFailMessage);
               // Figure out how to display and error and perhaps retry?
            }, 3000);
        }

    }
}

function checkInputFieldsFor(form){
    // Check input fields and bubble required inputs.
    return true;
}

function resetTaskForm() {
    // reset all input fields and styles.
}

//TODO: add collaborators
async function insertCollaboratorDetails(projectDetails, projectCollaboratorIDs) {

    let {
        taskId
    } = projectDetails;

    projectCollaboratorIDs.forEach( async (userId, index) => {

        let params = `taskId=${taskId}&&`+
        `userId=${userId}`

        console.log(`task ${index} started`);

        try {
            await AJAXCall({
                phpFilePath : "include/add-collaborator.post.php",
                rejectMessage: "Collaborator Not Added",
                params,
                type : "post",
            });
    
            console.log(`task ${index} complete`);
        }
        catch(error){
            console.log(`something went wrond adding a collaborator`);
        }

    })
}

async function insertProjectDetails(projectDetails) {

    let {
        taskId, 
        supertaskId, 
        startDate, //TODO: These need to be more
        endDate, //TODO: These need to be more
        name, 
        description, 
        creatorId 
    } = projectDetails;

    let params = `taskId=${taskId}&&`+
        `supertaskId=${supertaskId}&&`+
        `startDate=${startDate}&&`+
        `endDate=${endDate}&&`+
        `name=${name}&&`+
        `description=${description}&&`+
        `creatorId=${creatorId}`;
        
    await AJAXCall({
            phpFilePath : "include/add-new-task.post.php",
            rejectMessage: "Project Not Added",
            params,
            type : "post",
    });

}

function AJAXCall(callObject){

    let {
        phpFilePath,
        rejectMessage,
        params,
        type,
    } = callObject;

    return new Promise((resolve,reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open("POST", phpFilePath, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function(){
            if( this.status == 200 ){

                let result = type == "fetch" ? 
                JSON.parse(this.responseText) : this.responseText ;

                //TODO: Take a look one more time
                if(result != "success" && type != "fetch") reject(rejectMessage || "SQLError");
                else { resolve(result) }
            }
            else{
                reject("Error With PHP Script");
            }
        }

        xhr.send(params);

    });
}

function showToast(message){

    //TODO: Have an option for errors
    let body = document.querySelector("body");
    let toastView = document.createElement("div");
    toastView.className = "toast";
    toastView.textContent = message;

    body.append(toastView);

    setTimeout(() => {
        toastView.style.top = "20px";
        setTimeout(() => {
            toastView.style.top = "-100px";
            setTimeout(() => toastView.remove(), 1000)
        }, 3000);
    },1000);

}

function collectValuesForAddingProject(){

    //TODO: Input Error Bubbling
    let addProjectForm = document.querySelector(".add-project-form");

    //TODO: Clean Values, SQL Injection Issues
    let projectName = addProjectForm.querySelector(".project-name-input").value;
    let projectStartDate = addProjectForm.querySelector(".project-start-date").value;
    let projectEndDate = addProjectForm.querySelector(".project-end-date").value;
    let projectDescription = addProjectForm.querySelector(".task-description-input").value;


    return {
        projectName,
        projectStartDate,
        projectEndDate,
        projectDescription
    }
}

function collectValuesForAddingSubTask(){

    //TODO: Input Error Bubbling
    let addSubTaskForm = document.querySelector(".add-subtask-form");

    //TODO: Clean Values, SQL Injection Issues
    let subtaskSupertaskID = addSubTaskForm.querySelector(".subtask-id-input").getAttribute("data-id");
    let subtaskName = addSubTaskForm.querySelector(".subtask-name-input").value;
    let subtaskStartDate = addSubTaskForm.querySelector(".subtask-start-date").value;
    let subtaskEndDate = addSubTaskForm.querySelector(".subtask-end-date").value;
    let subtaskDescription = addSubTaskForm.querySelector(".subtask-description-input").value;


    return {
        subtaskSupertaskID,
        subtaskName,
        subtaskStartDate,
        subtaskEndDate,
        subtaskDescription
    }
}

function uniqueID(){
    const date = Date.now();
    const dateReversed = parseInt(String(date).split("").reverse().join(""));

    const base36 = number => (number).toString(36);

    return base36(dateReversed) + base36(date);
}
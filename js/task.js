//TODO: Dependency Injection? [ NO ]
let people = [];
let addedCollaborators = [];

console.log("creatorID: ", userID);

function clearForm(coreElement) {
    people = [];
    addedCollaborators = [];
    refreshCollaboratorCount(coreElement);
}

async function loadCollaborators(element){

    let coreElement = element.parentElement.parentElement
    .parentElement.parentElement;

    let collaboratorFilterListContainer = coreElement.querySelector(".filter-list");
    collaboratorFilterListContainer.innerHTML = "";

    let givenInput = element.value //TODO: Clean value using regexes, SQL Injection Issue
    let result = (givenInput != null) ? await fetchUserNames(givenInput) : [] ;
    people = result ?? [];

    //TODO: Should you be able to add yourself?? [ YES ]

    if(people.length > 0){
        people.forEach( person => {

            // let fullname = `${person.firstname} ${person.lastname}`;
            let fullname = person.username;
            let title = person.role_title;
    
            let collaboratorItem = document.createElement("div");
            collaboratorItem.textContent = `${fullname} ( ${title} )`;
    
            let names = (addedCollaborators.length > 0) ? 
            // addedCollaborators.map( collaborator => `${collaborator.firstname} ${collaborator.lastname}`) : [] ;
            addedCollaborators.map( collaborator => collaborator.username ) : [] ;
    
            if(!names.includes(fullname)){
                collaboratorItem.className = "filter-item";
                collaboratorItem.addEventListener("click", () => {
                    addedCollaborators.push(person);
                    clearCollaboratorsInput(coreElement);
                    refreshCollaboratorCount(coreElement);
                });
            }
            else{
                collaboratorItem.className = "filter-item disabled-item";
            }
    
            collaboratorFilterListContainer.appendChild(collaboratorItem);
        });
    }
    else{

        let collaboratorItem = document.createElement("div");
        collaboratorItem.textContent = `No Results For ' ${givenInput} '`;
        collaboratorItem.className = "filter-item disabled-item no-result";
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

    let circularBadge = coreElement.querySelector(".input-side-tag .circular-badge");
    let collaboratorPopupTitle = coreElement.querySelector
    (".collaborators-slide-popup > .popup-header > .pop-up-title");

    let collaboratorCount = addedCollaborators.length;
    circularBadge.textContent = collaboratorCount;
    collaboratorPopupTitle.textContent = `Collaborators ( ${ collaboratorCount } )`

}

function loadLocalCollaboratorListView(coreElement){

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
    
    refreshCollaboratorCount(coreElement);
    loadLocalCollaboratorListView(coreElement);
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
        creatorId: userID  // globalUserID
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
        creatorId: userID  //TODO: Global user ID
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

async function insertCollaboratorDetails(projectDetails, projectCollaboratorIDs) {

    let {
        taskId,
        creatorId
    } = projectDetails;

    projectCollaboratorIDs.forEach( async (userId, index) => {

        let params = `taskId=${taskId}&&`+
        `userId=${userId}&&`+
        `headId=${creatorId}`

        try {
            await AJAXCall({
                phpFilePath : "include/add-collaborator.post.php",
                rejectMessage: "Collaborator Not Added",
                params,
                type : "post",
            });
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
        startDate, //TODO: These need to be more ...
        endDate, //TODO: These need to be more ...
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
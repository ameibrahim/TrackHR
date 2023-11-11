/* TASK */
let addTaskOverlay = document.querySelector(".task-overlay");
let popup = addTaskOverlay.querySelector(".popup");

function showAddTaskForm(){
    addTaskOverlay.style.display = "grid";
    // popup.style.transform = "scale(1)";
    clearForm(addTaskOverlay);
}

function hideAddTaskForm(){
    addTaskOverlay.style.display = "none"
}

/* SUBTASK */
let addSubtaskOverlay = document.querySelector(".subtask-overlay");

function showAddSubtaskForm(){
    addSubtaskOverlay.style.display = "grid";
    clearForm(addSubtaskOverlay);
}

function hideAddSubtaskForm(){
    addSubtaskOverlay.style.display = "none";
}

function slideCollaboratorPopupUp(element){
    let coreElement = element.parentElement.parentElement.parentElement.parentElement;
    let collaboratorPopup = coreElement.querySelector(".collaborators-slide-popup");
    collaboratorPopup.style.top = "30%"

    loadLocalCollaboratorListView(coreElement);
}

function slideCollaboratorPopupDown(element){
    let coreElement = element.parentElement.parentElement.parentElement.parentElement;
    let collaboratorPopup = coreElement.querySelector(".collaborators-slide-popup");
    collaboratorPopup.style.top = "100%"
}
/* TASK */
let addTaskOverlay = document.querySelector(".task-overlay");
let popup = addTaskOverlay.querySelector(".popup");

function showAddTaskForm(){
    addTaskOverlay.style.display = "grid";
    // popup.style.transform = "scale(1)";
}

function hideAddTaskForm(element){
    addTaskOverlay.style.display = "none"
    // addTaskOverlay.style.transform = "scale(0)";

    let coreElement = element.parentElement.parentElement;
    clearForm(coreElement);
}

/* SUBTASK */
let addSubtaskOverlay = document.querySelector(".subtask-overlay");

function showAddSubtaskForm(){
    addSubtaskOverlay.style.display = "grid";
}

function hideAddSubtaskForm(element){
    addSubtaskOverlay.style.display = "none";

    let coreElement = element.parentElement.parentElement;
    clearForm(coreElement);

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
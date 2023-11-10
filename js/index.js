/* TASK */
let addTaskOverlay = document.querySelector(".task-overlay");
let popup = addTaskOverlay.querySelector(".popup");

function showAddTaskForm(){
    addTaskOverlay.style.display = "grid";
    // popup.style.transform = "scale(1)";
}

function hideAddTaskForm(){
    addTaskOverlay.style.display = "none"
    // addTaskOverlay.style.transform = "scale(0)";
}

/* SUBTASK */
let addSubtaskOverlay = document.querySelector(".subtask-overlay");

function showAddSubtaskForm(){
    addSubtaskOverlay.style.display = "grid"
}

function hideAddSubtaskForm(){
    addSubtaskOverlay.style.display = "none"
}

/* Collaborator View */
let collaboratorPopup = document.querySelector(".collaborators-slide-popup");

function slideCollaboratorPopupUp(){
    collaboratorPopup.style.top = "30%"
    loadLocalCollaboratorListView();
}

function slideCollaboratorPopupDown(){
    collaboratorPopup.style.top = "100%"
}
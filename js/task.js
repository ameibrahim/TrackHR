let people = ["AbdulMunim", "Ibrahim", "Mahmoud" ];
let addedCollaborators = [];

function loadCollaborators(element){

    let collaboratorFilterListContainer = document.querySelector(".collaborator-filter-list");
    collaboratorFilterListContainer.innerHTML = "";

    //TODO: Only have available people to add. Show if someone has been added
    // You shouldn't be able to add someone twice.

    people.forEach( person => {

        let collaboratorItem = document.createElement("div");
        collaboratorItem.textContent = person;

        if(!addedCollaborators.includes(person)){
            collaboratorItem.className = "collaborator-item";
            collaboratorItem.addEventListener("click", () => {
                addedCollaborators.push(person);
                clearCollaboratorsInput();
                refreshCollaboratorCount();
            });
        }
        else{
            collaboratorItem.className = "collaborator-item disabled-item";
        }

        collaboratorFilterListContainer.appendChild(collaboratorItem);
    });
}

function clearCollaboratorsInput() {
    let collaboratorInput = document.querySelector(".add-collaborator-input");
    collaboratorInput.value = "";
}

function refreshCollaboratorCount() {
    let circularBadge = document.querySelector(".input-side-tag .circular-badge");
    let collaboratorPopupTitle = document.querySelector
    (".collaborators-slide-popup > .popup-header > .pop-up-title");

    let collaboratorCount = addedCollaborators.length;
    circularBadge.textContent = collaboratorCount;
    collaboratorPopupTitle.textContent = `Collaborators ( ${ collaboratorCount } )`

}

function loadLocalCollaboratorListView(){

    let collaboratorListContainer = document.querySelector
    (".collaborators-slide-popup > .popup-body > .collaborator-list");
    collaboratorListContainer.innerHTML = "";

    if( addedCollaborators.length > 0 ){
        addedCollaborators.forEach( ( person, index ) => {

            console.log(addedCollaborators);
    
            let collaboratorRow = document.createElement("li");
            collaboratorRow.className = "collaborator-row";
    
            let collaboratorRowInnerHTML = 
            `   <p>${ person }</p>
                <span onclick="removePersonFromList(${ index })">
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

function removePersonFromList(index){
    addedCollaborators.splice(index,1);
    console.log("gg: ",addedCollaborators)
    refreshCollaboratorCount();
    loadLocalCollaboratorListView();
}

function showTaskLoader() {
    let loaderView = document.querySelector(".loader-view");
    loaderView.style.display = "grid";
}

function hideTaskLoader() {
    let loaderView = document.querySelector(".loader-view");
    loaderView.style.display = "none";
}

async function addNewTask() {

    if(checkInputFields()){
        showTaskLoader();
        try {
            await sendTaskDetailsToDatabase();

            setTimeout(() => {
                hideTaskLoader();
                resetTaskForm();
                hideAddTaskForm();
                showToast("Project Added Successsfully");
            }, 3000);
        }
        catch(error) {
            console.log(error);

            setTimeout(() => {
               // Figure out how to display and error and perhaps retry?
            }, 3000);
        }

    }

}

function checkInputFields(){
    // Check input fields and bubble required inputs.
    return true;
}

function resetTaskForm() {
    // reset all input fields and styles.
    hideTaskLoader();
}

function sendTaskDetailsToDatabase(){

    // add collaborators
    // add project
    // return success or error

    return new Promise((resolve, reject) => {
        resolve();
    })
}

function showToast(message){
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
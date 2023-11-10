let people = [];
let addedCollaborators = [];

async function loadCollaborators(element){

    let collaboratorFilterListContainer = document.querySelector(".collaborator-filter-list");
    collaboratorFilterListContainer.innerHTML = "";

    //TODO: Only have available people to add. Show if someone has been added
    // You shouldn't be able to add someone twice.

    let givenInput = element.value //TODO: Clean value using regexes
    let result = (givenInput != null) ? await fetchUserNames(givenInput) : [] ;
    people = result;

    // people = (givenInput != null) ? result.map( person => `${person.firstname} ${person.lastname}`) : [] ;

    //TODO: Should you be able to add yourself??

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

function fetchUserNames(givenInput){

    let params = `givenInput=${givenInput}`;

    return new Promise((resolve,reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "include/user-names.fetch.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function(){
            if( this.status == 200 ){
                let users = JSON.parse(this.responseText);
                console.log("users: ", users);
                resolve(users)
            }
            else{
                reject("Error With PHP Script");
            }
        }

        xhr.send(params);

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
    
            let collaboratorRow = document.createElement("li");
            collaboratorRow.className = "collaborator-row";
    
            let collaboratorRowInnerHTML = 
            `   <p>${ person.firstname + " " + person.lastname }</p>
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
    function insertCollaboratorDetails() {
        return new Promise((resolve, reject) => {  
            resolve();
        })
    }

    //TODO:  add project
    function insertProjectDetails(projectDetails) {

        let { 
            supertaskId, 
            startDate, 
            endDate, 
            name, 
            description, 
            creatorId 
        } = projectDetails;

        let params = `supertaskId=${supertaskId}&&`+
            `startDate=${startDate}&&`+
            `endDate=${endDate}&&`+
            `name=${name}&&`+
            `description=${description}&&`+
            `creatorId=${creatorId}`;

        return new Promise((resolve,reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "include/add-new-task.post.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.onload = function(){
                if( this.status == 200 ){
                    let result = this.responseText;
                    console.log(result);

                    if(result != "success") reject("Project Not Added");
                    else { resolve(result) }
                }
                else{
                    reject("Error With PHP Script");
                }
            }

            xhr.send(params);

        });

    }

    //TODO:  return success or error
    return new Promise( async (resolve, reject) => {
        try {
            // await insertCollaboratorDetails();
            // await insertProjectDetails();
            let result = addedCollaborators.map( person => person.user_id );
            console.log("addedColaborator: ", addedCollaborators);
            console.log("addedColaboratorIds: ", result);

            resolve();
        }
        catch(error) {
            reject();
        }
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
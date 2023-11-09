let people = ["AbdulMunim", "Ibrahim", "Mahmoud" ];
let addedCollaborators = [];

function loadCollaborators(element){

    let collaboratorFilterListContainer = document.querySelector(".collaborator-filter-list");
    collaboratorFilterListContainer.innerHTML = "";

    //TODO: Only have available people to add. Show if someone has been added
    // You shouldn't be able to add someone twice.

    people.forEach( person => {

        let collaboratorItem = document.createElement("div");
        collaboratorItem.className = "collaborator-item";

        collaboratorItem.textContent = person;

        collaboratorItem.addEventListener("click", () => {
            addedCollaborators.push(person);
            clearCollaboratorsInput();
            refreshCollaboratorCount();
        });

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
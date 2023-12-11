let deleteEmployeePopup = document.querySelector(".delete-employee-overlay");

function showDeleteEmployeePopupFor(recordID){
    deleteEmployeePopup.style.display = "grid";

    let confirmButton = deleteEmployeePopup.querySelector(".confirm-button");

    confirmButton.addEventListener('click', () => {
        confirmDelete(recordID);
    });

    // clearForm(addTaskOverlay);
}

async function confirmDelete(recordID){

    showTaskLoader(deleteEmployeePopup);
    let params = `id=${recordID}`
    
    try {
        let result = await AJAXCall({
            phpFilePath : "include/employee.delete.php",
            rejectMessage: "Employee not deleted",
            params,
            type : "post",
        });

        console.log(result)

        setTimeout(() => {
            hideDeleteEmployeePopup();
            buildEmployeesLayout();
            hideTaskLoader(deleteEmployeePopup);
        }, 1800);

        showToast("Employee Record Deleted");
    }
    catch(error){
        console.log(error);
    }
}

function showEmployeeDetailsFor(recordID){

}

function hideDeleteEmployeePopup(){
    deleteEmployeePopup.style.display = "none";
}

buildEmployeesLayout();

async function buildEmployeesLayout(){

    let result = await AJAXCall({
        phpFilePath : "include/employees.fetch.php",
        rejectMessage: "Employees not fetched",
        params: "",
        type : "fetch",
    });

    // console.log(result)

    let employeeTable = document.querySelector(".employee-grid-table");

    let header = `
            <ul class="grid-header" data-title="header">
                <li>#</li>
                <li>Name</li>
                <li>Phone Number</li>
                <li>Email</li>
                <li>Web URL</li>
                <li>Options</li>
            </ul>
    `;

    let innerHTML = header

    let rows = result.map( row => 
        `<ul class="grid-row" data-recordid=${row.id}>
            <li class="itemization-badge"></li>
            <li>${row.employee_name}</li>
            <li>${row.phone_number}</li>
            <li>${row.email}</li>
            <li class="current-task-badge">${row.web_url}</li>
            <li class="small-tc-grid">
                <div class="small-icon edit" onclick="showEmployeeDetailsFor(${row.id})">
                    <img src="images/icons/fi-rr-eye.svg" alt="">
                </div>
                <div class="small-icon delete" onclick="showDeleteEmployeePopupFor(${row.id})">
                    <img src="images/icons/fi-rr-trash-xmark.svg" alt="">
                </div>
            </li>
        </ul>`  
    ).join("");

    innerHTML += rows;
    
    employeeTable.innerHTML = innerHTML;

}
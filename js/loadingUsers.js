async function buildUsersLayout(roleID){

    let totalPlaceholder = document.querySelector(".grid-slider-total");

    let params = `roleID=${roleID}`

    let result = await AJAXCall({
        phpFilePath : "include/users.fetch.php",
        rejectMessage: "Users not fetched",
        params,
        type : "fetch",
    });

    // console.log(result)

    let usersTable = document.querySelector(".users-grid-table");

    let header = `
        <ul class="grid-header" data-title="header">
            <li>#</li>
            <li>Name</li>
            <li>Title</li>
            <li>Email</li>
            <li>Current Task ...</li>
            <li>Options</li>
        </ul>
    `;

    let innerHTML = header;

    totalPlaceholder.textContent = `Total (${result.length})`;

    let rows = result.map( row => 

        `<ul class="grid-row" data-recordid=${row.id}>
            <li class="itemization-badge"></li>
            <li>${row.username}</li>
            <li>${row.role_title}</li>
            <li>${row.email}</li>
            <li>Current Task ...</li>
            <li>
                <div class="small-icon edit" onclick="showEmployeeDetailsFor(${row.id})">
                    <img src="images/icons/fi-rr-eye.svg" alt="">
                </div>
            </li>
        </ul>`  
    ).join("");

    innerHTML += rows;
    
    usersTable.innerHTML = innerHTML;

}
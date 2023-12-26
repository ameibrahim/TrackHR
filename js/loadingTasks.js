buildTasksLayout();

async function buildTasksLayout(){

    let totalPlaceholder = document.querySelector(".grid-slider-total");

    let params = `creatorId=${userID}`

    let result = await AJAXCall({
        phpFilePath : "include/tasks.fetch.php",
        rejectMessage: "Tasks not fetched",
        params,
        type : "fetch",
    });

    // console.log(result)

    let tasksTable = document.querySelector(".tasks-grid-table");

    let header = `
        <ul class="grid-header" data-title="header">
            <li>#</li>
            <li>Task Name</li>
            <li>Start Date</li>
            <li>End Date</li>
            <li>Status</li>
            <li>Options</li>
        </ul>
    `;

    let innerHTML = header;

    totalPlaceholder.textContent = `Total Tasks (${result.length})`;

    let rows = result.map( row => 

        `<ul class="grid-row" data-recordid=${row.id}>
            <li class="itemization-badge"></li>
            <li>${row.name}</li>
            <li>${row.start_date}</li>
            <li>${row.end_date}</li>
            <li>${row.completed}</li>
            <li>
                <div class="small-icon delete" onclick="showDeleteTaskPopupFor(${row.id})">
                <img src="images/icons/fi-rr-trash-xmark.svg" alt="">
                </div>
            </li>
        </ul>`  
    ).join("");

    innerHTML += rows;
    
    tasksTable.innerHTML = innerHTML;

}
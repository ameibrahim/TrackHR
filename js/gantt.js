let ganttContainer = document.querySelector(".gantt-container");


function createGanttRow(rowData, rowPlacement){

    let ganttRow = document.createElement("li");
    ganttRow.className = "gantt-row";
    ganttRow.style.width = rowPlacement.width;
    ganttRow.style.left = rowPlacement.left;
    ganttRow.setAttribute("data-complete",rowData.complete);

    let ganttDates= document.createElement("div");
    ganttDates.className = "gantt-dates";

    let startDate= document.createElement("span");
    startDate.className = "start-date";
    startDate.textContent = rowData.date_created

    let endDate= document.createElement("span");
    endDate.className = "end-date";
    endDate.textContent = rowData.deadline;


    let ganttBar = document.createElement("div");
    ganttBar.className = "gantt-bar";
    ganttBar.textContent = rowData.task;

    let ganttProgress = document.createElement("span");
    ganttProgress.className = "progress";
    ganttProgress.style.width = rowData.progress;
    ganttProgress.setAttribute("data-show", "true");

    let ganttBadge = document.createElement("span");
    ganttBadge.className = "badge";
    ganttBadge.textContent = rowData.childrenTasks;
    ganttBadge.setAttribute("data-show", "true");

    ganttBar.appendChild(ganttProgress);
    ganttBar.appendChild(ganttBadge);

    ganttDates.appendChild(startDate);
    ganttDates.appendChild(endDate);
    
    ganttRow.appendChild(ganttDates);
    ganttRow.appendChild(ganttBar);

    return ganttRow;

}

function createDivider(){
    let divider = document.createElement("div");
    divider.className = "divider";

    return divider;
}

let gantt100 = {
    startTime: "12:00",
    endTime: "13:00",
};

let data = [
    {
        task: "Task 1",
        date_created: "12:00",
        deadline: "13:00",
        childrenTasks: "5",
        progress: "50%",
        complete: "false",
    },
    {
        task: "Task 2",
        date_created: "12:30",
        deadline: "12:40",
        childrenTasks: "2",
        progress: "16%",
        complete: "false",
    },
    {
        task: "Task 3",
        date_created: "12:50",
        deadline: "13:00",
        childrenTasks: "1",
        progress: "100%",
        complete: "true",
    },
    {
        task: "Task 4",
        date_created: "12:00",
        deadline: "12:30",
        childrenTasks: "1",
        progress: "10%",
        complete: "overdeadline",
    }, 

    {
        task: "Task 5",
        date_created: "12:15",
        deadline: "12:45",
        childrenTasks: "1",
        progress: "20%",
        complete: "false",
    }, 
]

data.forEach( rowData => {
    let rowPlacement = calculateRowPlacement(rowData);
    let divider = createDivider();
    ganttContainer.appendChild(createGanttRow(rowData, rowPlacement))
    ganttContainer.appendChild(divider);
});

function calculateRowPlacement(rowData){

    let PersonalMinutes = subtractToMinutes(rowData.date_created, rowData.deadline);
    let gantt100Minutes = subtractToMinutes(gantt100.startTime, gantt100.endTime);
    let startDifference = subtractToMinutes(gantt100.startTime, rowData.date_created);

    // console.log(gantt100Minutes)
    // console.log(PersonalMinutes)
    console.log("std:", startDifference)

    let left = Math.floor(startDifference/gantt100Minutes * 100);
    let width = Math.ceil(PersonalMinutes/gantt100Minutes * 100);
    console.log({
        width: `${width}%`,
        left: `${left}%`,
    })


    return {
        width: `${width}%`,
        left: `${left}%`,
    };
}

function subtractToMinutes(givenStartTime, givenEndTime){

    let startTime = givenStartTime.split(":")
    let startHour = Number(startTime[0]);
    let startMinutes = Number(startTime[1]);

    let endTime = givenEndTime.split(":")
    let endHour = Number(endTime[0]);
    let endMinutes = Number(endTime[1]);

    let differenceHours = endHour - startHour;
    let differenceMinutes = endMinutes - startMinutes;

    return differenceHours * 60 + differenceMinutes;
}

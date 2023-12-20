let ganttContainer = document.querySelector(".gantt-container");

function createGanttRow(rowData, rowPlacement){

    let {rowTimeOptions, width, left } = rowPlacement;
    let { 
        startDate,
        endDate,
        startHour,
        endHour,
    } = rowTimeOptions

    let ganttRow = document.createElement("li");
    ganttRow.className = "gantt-row";
    ganttRow.style.width = width;
    ganttRow.style.left = left;
    ganttRow.setAttribute("data-complete",rowData.complete);

    let ganttDates= document.createElement("div");
    ganttDates.className = "gantt-dates";

    let startDateElement= document.createElement("span");
    startDateElement.className = "start-date";
    startDateElement.textContent = `${startDate} ${startHour}`

    let endDateElement = document.createElement("span");
    endDateElement.className = "end-date";
    endDateElement.textContent = `${endDate} ${endHour}`;


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

    ganttDates.appendChild(startDateElement);
    ganttDates.appendChild(endDateElement);
    
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
    startTime: "2023-12-13T13:46:00.000Z",
    endTime: "2023-12-31T13:46:00.000Z",
};

let data = [
    {
        task: "Task 1",
        date_created: "2023-12-13T13:46:00.000Z",
        deadline: "2023-12-31T13:46:00.000Z",
        childrenTasks: "5",
        progress: "50%",
        complete: "false",
    },
    {
        task: "Task 2",
        date_created: "2023-12-13T13:46:00.000Z",
        deadline: "2023-12-19T00:00:00.000Z",
        childrenTasks: "2",
        progress: "16%",
        complete: "false",
    },
    {
        task: "I want to go shopping next week so that I can buy shoes, onions and macha. It's gonna be swell.",
        date_created: "2023-12-17T11:06:00.000Z",
        deadline: "2023-12-23T00:00:00.000Z",
        childrenTasks: "1",
        progress: "100%",
        complete: "true",
    },
    {
        task: "Task 4",
        date_created: "2023-12-20T03:18:00.000Z",
        deadline: "2023-12-31T13:06:00.000Z",
        childrenTasks: "1",
        progress: "10%",
        complete: "overdeadline",
    }, 

    {
        task: "Task 5",
        date_created: "2023-12-22T12:46:00.000Z",
        deadline: "2023-12-28T13:06:00.000Z",
        childrenTasks: "1",
        progress: "20%",
        complete: "false",
    }, 

    {
        task: "Task 6",
        date_created: "2023-12-25T12:46:00.000Z",
        deadline: "2023-12-31T13:06:00.000Z",
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

    let rowTimeOptions = timeOptionsFromDateRange(rowData.date_created, rowData.deadline);
    let PersonalMinutes = rowTimeOptions.minutes;
    let gantt100Minutes = timeOptionsFromDateRange(gantt100.startTime, gantt100.endTime).minutes;
    let startDifference = timeOptionsFromDateRange(gantt100.startTime, rowData.date_created).minutes;

    console.log(gantt100Minutes)
    console.log(PersonalMinutes)
    console.log("std:", startDifference)

    let left = Math.floor(startDifference/gantt100Minutes * 100);
    let width = Math.ceil(PersonalMinutes/gantt100Minutes * 100);

    console.log({
        width: `${width}%`,
        left: `${left}%`,
    })


    return {
        rowTimeOptions,
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

// Need a function that calculates how many minutes a date range 
// is from its beginning to its ending point.

function timeOptionsFromDateRange(start,end){
    
    let startDate = new Date(start);
    let endDate = new Date(end);
    let milliseconds = endDate - startDate;
    let seconds = milliseconds / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24 ;
    let weeks = days / 7;

    let [ _startDate, _startHour ] = startDate.toISOString().split("T");
    let [ _endDate, _endHour ] = endDate.toISOString().split("T");

    let [__startHours, __startMinutes] = _startHour.split(".")[0].split(":");
    let [__endHours, __endMinutes] = _endHour.split(".")[0].split(":");


    let startHour = `${__startHours}:${__startMinutes}`;
    let endHour = `${__endHours}:${__endMinutes}`;

    return {
        startDate: _startDate,
        endDate: _endDate,
        startHour,
        endHour,
        milliseconds,
        seconds, 
        minutes,
        hours,
        days,
        weeks
    }
}

function returnBestOption( timeoptions ){

    let {
        milliseconds,
        seconds, 
        minutes,
        hours,
        days,
        weeks
    } = timeOptions;

    if( weeks >= 1 ) return { weeks }
    if( days >= 1 ) return { days }
    if( hours >= 1 ) return { hours }
    if( minutes >= 1 ) return { minutes }
    if( seconds >= 1 ) return { seconds }
    return { milliseconds }

}

function displayWDHM(timeOptions) {

    let { minutes } = returnBestOption(timeOptions)

    // let weeksText = weeks != 1 ? "weeks" : "week"
    // let daysText = days != 1 ? "days" : "day"
    // let hoursText = weeks != 1 ? "hours" : "hour"
    // let minutesText = minutes != 1 ? "minutes" : "minute"
    // let millisecondsText = milliseconds != 1 ? "milliseconds" : "millisecond"

    // if(weeks > 1) return `${weeks} ${weeksText}, ${days} ${daysText}, ${hours} ${hoursText}, ${minutes} ${minutesText}`
    // if(days > 1) return `${days} ${daysText}, ${hours} ${hoursText}, ${minutes} ${minutesText}`
    // if(hours > 1) return `${hours} ${hoursText}, ${minutes} ${minutesText}`
    // if(minutes > 1) return `${minutes} ${minutesText}`
    // return `${milliseconds} ${millisecondsText}`

}

//Format We Are Using "2023-12-13T13:06:00.000Z"

let dates = { 
    givenA : "2023-12-31T12:46:00.000Z",
    givenB :"2023-12-31T13:06:00.000Z"
}

let { givenA, givenB } = dates

let timeOptions = timeOptionsFromDateRange(givenA, givenB);
console.log(timeOptions);
console.log(returnBestOption(timeOptions));

let isDateWithinRange = (date, dateRange) => 
    date >= dateRange.A && 
    date <= dateRange.B ? 
    true : false

let isDateRangeWithinRange = (dateRangeSubset, dateRangeSuperset) => 
    isDateWithinRange( dateRangeSubset.A ,dateRangeSuperset) &&
    isDateWithinRange( dateRangeSubset.B ,dateRangeSuperset) ?
    true : false

let dateRange = {
    A: new Date("2023-12-13T12:46:00.000Z"),
    B: new Date("2023-12-31T12:46:00.000Z")
}

let dateRangeB = {
    A: new Date("2023-12-12T12:46:00.000Z"),
    B: new Date("2023-12-27T12:46:00.000Z")
}

console.log("Date Range Check: ", isDateWithinRange(new Date("2023-12-31T12:06:01.000Z"),dateRange))
console.log("Date Range by Range Check: ", isDateRangeWithinRange(dateRangeB ,dateRange))
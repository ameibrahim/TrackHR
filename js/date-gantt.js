class Gantt {

    backButtonList = [];
    userID = "";
    ganttContainer = "";

    constructor(ganttOptions){

        let {
            ganttContainerSelector,
            userID,
        } = ganttOptions;

        this.ganttContainer = document.querySelector(ganttContainerSelector);
        this.userID = userID;

        this.getTasks("0");
        this.backButtonList.push("0");
    }

    goBack(){
        if(this.backButtonList.length > 1){
            this.backButtonList.pop();
            this.getTasks(
                this.backButtonList[this.backButtonList.length - 1]
            );
        }
    }

    async getTasks(supertaskID){
        let params = `creatorId=${this.userID}&&supertaskId=${supertaskID}`;

        let gantt100;
    
        this.ganttContainer.innerHTML = ""

        try {
    
            let tasks = await AJAXCall({
                phpFilePath : "include/gantt.tasks.fetch.php",
                rejectMessage: "Tasks Not Fetched",
                params,
                type : "fetch",
            });

            console.log(tasks)
    
            if(supertaskID != "0"){
                let parentTask = await AJAXCall({
                    phpFilePath : "include/task.fetch.php",
                    rejectMessage: "Task Not Fetched",
                    params: `supertaskId=${supertaskID}`,
                    type : "fetch",
                });
    
                gantt100 = {
                    start_date: parentTask[0].start_date,
                    end_date: parentTask[0].end_date
                }
    
                let rowPlacement = this.calculateRowPlacement(parentTask[0], gantt100);
                let divider = this.createDivider();
                this.ganttContainer.appendChild(this.createGanttRow(parentTask[0], rowPlacement, "static"))
                this.ganttContainer.appendChild(divider);
    
                console.log(supertaskID, {
                    start_date: parentTask[0].start_date,
                    end_date: parentTask[0].end_date
                })
            }
    
    
            if(tasks.length > 0){
    
                if (supertaskID == "0") {
                    gantt100 = this.getSpanOfDatesFrom(tasks)
                }
        
                tasks.forEach( rowData => {
                    let rowPlacement = this.calculateRowPlacement(rowData, gantt100);
                    let divider = this.createDivider();
                    this.ganttContainer.appendChild(this.createGanttRow(rowData, rowPlacement))
                    this.ganttContainer.appendChild(divider);
                });
            }
        }
        catch(error){
            console.log(error);
        }
    }

    createGanttRow(rowData, rowPlacement, type = "clickable"){

        let {
            rowTimeOptions, 
            width, 
            left 
        } = rowPlacement;
        
        let { 
            startDate,
            endDate,
            startHour,
            endHour,
            progress,
            expired
        } = rowTimeOptions

        let completeness = "false";

        if( rowData.completed == "true" ){
            completeness = "true";
        }else if ( expired == "true" ){
            completeness = "overdeadline";
        }

        if(progress > 100) progress = 100;
    
        let ganttRow = document.createElement("li");
        ganttRow.className = "gantt-row";
        ganttRow.style.width = width;
        ganttRow.style.left = left;
        ganttRow.setAttribute("data-complete", completeness);
    
        let ganttBar = document.createElement("div");
        ganttBar.className = "gantt-bar";
        ganttBar.textContent = rowData.name;
    
        if(type == "clickable"){
            ganttRow.addEventListener("click", () => { 
                this.getTasks(rowData.task_id); 
                this.backButtonList.push(rowData.task_id);
            })
    
        }else{
            ganttRow.style.cursor = "default";
            ganttBar.style.borderStyle = "dashed";
        }
    
        let ganttDates= document.createElement("div");
        ganttDates.className = "gantt-dates";
    
        let startDateElement= document.createElement("span");
        startDateElement.className = "start-date";
        startDateElement.textContent = `${startDate} ${startHour}`
    
        let endDateElement = document.createElement("span");
        endDateElement.className = "end-date";
        endDateElement.textContent = `${endDate} ${endHour}`;
    
        let ganttProgress = document.createElement("span");
        ganttProgress.className = "progress";
        ganttProgress.style.left = progress + "%";
        // if(progress > 100) ganttProgress.style.width = progress + "%";
        ganttProgress.setAttribute("data-show", "true");
    
        let ganttBadge = document.createElement("span");
        ganttBadge.className = "badge";
        ganttBadge.textContent = rowData.children;
        ganttBadge.setAttribute("data-show", "true");
    
        ganttBar.appendChild(ganttProgress);
        ganttBar.appendChild(ganttBadge);
    
        ganttDates.appendChild(startDateElement);
        ganttDates.appendChild(endDateElement);
        
        ganttRow.appendChild(ganttDates);
        ganttRow.appendChild(ganttBar);
    
        return ganttRow;
    
    }

    createDivider(){
        let divider = document.createElement("div");
        divider.className = "divider";
        return divider;
    }    

    calculateRowPlacement(rowData, gantt100){

        let rowTimeOptions = this.timeOptionsFromDateRange(rowData.start_date, rowData.end_date);
        let PersonalMinutes = rowTimeOptions.minutes;
        let gantt100Minutes = this.timeOptionsFromDateRange(gantt100.start_date, gantt100.end_date).minutes;
        let startDifference = this.timeOptionsFromDateRange(gantt100.start_date, rowData.start_date).minutes;
    
        let left = Math.floor(startDifference/gantt100Minutes * 100);
        let width = Math.ceil(PersonalMinutes/gantt100Minutes * 100);
    
        // console.log({
        //     width: `${width}%`,
        //     left: `${left}%`,
        // })
    
    
        return {
            rowTimeOptions,
            width: `${width}%`,
            left: `${left}%`,
        };
    }

    timeOptionsFromDateRange(start, end){
    
        let startDate = new Date(start);
        let endDate = new Date(end);
        let today = new Date();
        let milliseconds = endDate - startDate;
        let seconds = milliseconds / 1000;
        let minutes = seconds / 60;
        let hours = minutes / 60;
        let days = hours / 24 ;
        let weeks = days / 7;

        let progress = Math.round((today - startDate) / (milliseconds) * 100);
        let expired = progress > 100 ? "true" : "false";
        console.log(`${startDate} -- ${endDate}`, "p: ", progress, "ex: ", expired);

        let [ _startDate, _startHour ] = startDate.toJSON().split("T");
        let [ _endDate, _endHour ] = endDate.toJSON().split("T");
    
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
            weeks,
            progress,
            expired
        }
    }

    getSpanOfDatesFrom(result){

        let start_date = "2050-12-12T00:00:00.000Z";
        let end_date = "1990-12-12T00:00:00.000Z";
    
        result.forEach( object => {
    
            if(object.start_date < start_date)
                start_date = object.start_date
    
            if(object.end_date > end_date)
            end_date = object.end_date
    
        });
    
        // console.log("date logic: ",{
        //     start_date,
        //     end_date
        // })
    
        return {
            start_date,
            end_date
        }
    
    }

}

let gantt = new Gantt({
    ganttContainerSelector: ".gantt-container",
    userID: "abcdefghi" //TODO: Needs to be dynamic
});

// Need a function that calculates how many minutes a date range 
// is from its beginning to its ending point.

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

// //Format We Are Using "2023-12-13T13:06:00.000Z"

// let dates = { 
//     givenA : "2023-12-31T12:46:00.000Z",
//     givenB :"2023-12-31T13:06:00.000Z"
// }

// let { givenA, givenB } = dates

// let timeOptions = timeOptionsFromDateRange(givenA, givenB);
// console.log(timeOptions);
// console.log(returnBestOption(timeOptions));

// let isDateWithinRange = (date, dateRange) => 
//     date >= dateRange.A && 
//     date <= dateRange.B ? 
//     true : false

// let isDateRangeWithinRange = (dateRangeSubset, dateRangeSuperset) => 
//     isDateWithinRange( dateRangeSubset.A ,dateRangeSuperset) &&
//     isDateWithinRange( dateRangeSubset.B ,dateRangeSuperset) ?
//     true : false

// let dateRange = {
//     A: new Date("2023-12-13T12:46:00.000Z"),
//     B: new Date("2023-12-31T12:46:00.000Z")
// }

// let dateRangeB = {
//     A: new Date("2023-12-12T12:46:00.000Z"),
//     B: new Date("2023-12-27T12:46:00.000Z")
// }

// console.log("Date Range Check: ", isDateWithinRange(new Date("2023-12-31T12:06:01.000Z"),dateRange))
// console.log("Date Range by Range Check: ", isDateRangeWithinRange(dateRangeB ,dateRange))
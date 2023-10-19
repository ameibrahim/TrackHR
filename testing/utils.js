function formattedTime(){
    let date = new Date();
    var time = String(date.getHours()).padStart(2,"0") + ":" + String(date.getMinutes()).padStart(2,"0");
    return time;
}

console.log(formattedTime());
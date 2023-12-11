function AJAXCall(callObject){

    let {
        phpFilePath,
        rejectMessage,
        params,
        type,
    } = callObject;

    return new Promise((resolve,reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open("POST", phpFilePath, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function(){
            if( this.status == 200 ){

                let result = type == "fetch" ? 
                JSON.parse(this.responseText) : this.responseText ;

                //TODO: Take a look one more time
                if(result != "success" && type != "fetch") reject(rejectMessage || "SQLError");
                else { resolve(result) }
            }
            else{
                reject("Error With PHP Script");
            }
        }

        xhr.send(params);

    });
}

function showToast(message){

    //TODO: Have an option for errors
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

function showTaskLoader(coreElement) {
    let loaderView = coreElement.querySelector(".loader-view");
    loaderView.style.display = "grid";
}

function hideTaskLoader(coreElement) {
    let loaderView = coreElement.querySelector(".loader-view");
    loaderView.style.display = "none";
}
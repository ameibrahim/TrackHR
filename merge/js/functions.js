function AJAXCall(callObject){

    let {
        phpFilePath,
        params,
    } = callObject;

    return new Promise((resolve,reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open("POST", phpFilePath, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function(){
            if( this.status == 200 )
                resolve(JSON.parse(this.responseText)) 
            else 
                reject("Error With PHP Script");     
        }

        xhr.send(params);

    });
}
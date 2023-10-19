let names = ["Ibrahim", "George", "Ibrahim", "Lucy", "Ibrahim", "Lucy", "George", "George"];
let transactions = ["1", "2", "3", "4", "5", "6", "7", "8"];
let uploads = ["jkp", "ybd", "tsv", "xcd", "3da", "cs4", "009", "bse"];

function createObjectByMatchingArrays(baseArray,objectOfArrays){

    let structuredObject = {
    };

    let filteredBaseArray = [...new Set(baseArray.sort())];

    filteredBaseArray.forEach( element => {
        Object.keys(objectOfArrays).forEach( key => {
            structuredObject[element] = { [key] : [], ...structuredObject[element] };
        })
    });

    filteredBaseArray.forEach((element,index) => {
        Object.keys(objectOfArrays).forEach( key => {
            structuredObject[element][String(key)].push(objectOfArrays[String(key)][index]);
        });
    });

    return structuredObject;

}

let namesObject = createObjectByMatchingArrays(names,{transactions,uploads});

console.log(namesObject);
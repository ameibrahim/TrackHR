// const base36 = text => parseInt(text, 36);
// const backToEmail = number => (number).toString(36);

// console.log(base36("ame.ibrahim @yahoo.com"))
// console.log(backToEmail(13766))

let pdfName = "Covid-Report@2ah3og1wllh7w108u.pdf";
let result = pdfName.split("@")[1].split(".")[0];
console.log(result);
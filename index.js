var Export = require("./export");
var Import = require("./import");
var Info = require("./info");
var Utils = require("./utils");


var utils = new Utils();
var args = process.argv;

var funcType = args[2];
var apiUrl = args[3];
var domainKey = args[4];
var apiKey = args[5];
var path = args[6];

console.log("For developer documentation: https://developer.boodskap.io")
if(!apiUrl){
    utils.log("API URL argument is mandatory!")
    return;
}
if(!domainKey){
    utils.log("Domain Key argument is mandatory!")
    return;
}
if(!apiKey){
    utils.log("API Key argument is mandatory!")
    return;
}


if(funcType && funcType.toLowerCase() === 'export'){
    utils.log("Export data process started...")
    let exportData = new Export(args);

}
else if(funcType && funcType.toLowerCase() === 'import'){
    utils.log("Import data process started...")
    let importData = new Import(args);

}
else if(funcType && funcType.toLowerCase() === 'info'){
    utils.log("Fetching info process started...")
    let info = new Info(args);
    info.fetch();

}
else{
    utils.log("Invalid arguments / no arguments passed.")
}
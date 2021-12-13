var Export = require("./export");
var Import = require("./import");
var Populate = require("./populate");
var Info = require("./info");
var Utils = require("./utils");



var utils = new Utils();
var args = process.argv;

var funcType = args[2];
var apiUrl = args[3];
var domainKey = args[4];
var apiKey = args[5];
var path = args[6];
var iType = args[7];
var protocol = args[8];

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

console.log("API URL=> "+apiUrl)
console.log("Domain Key=> "+domainKey)
console.log("API Key=> "+apiKey)

if(funcType && funcType.toLowerCase() === 'export'){
    if(path) {
        utils.log("Export data process started...")
        let exportData = new Export(args);
        exportData.export();
    }else{
        utils.log("Export path argument is mandatory!")
        return;
    }
}
else if(funcType && funcType.toLowerCase() === 'import'){
    if(path) {
        utils.log("Import data process started...")
        let importData = new Import(args);
        importData.import();
    }else{
        utils.log("Import path argument is mandatory!")
        return;
    }

}
else if(funcType && funcType.toLowerCase() === 'info'){
    utils.log("Fetching info process started...")
    let info = new Info(args);
    info.fetch();

}
else if(funcType && funcType.toLowerCase() === 'populate'){
    if(!path){
        utils.log("Populate data path argument is mandatory!")
        return;
    }
    if(!iType){
        utils.log("Populate data type (Message/Record) argument is mandatory!")
        return;
    }

    if(iType.toLowerCase() === 'message') {
        utils.log("Populate process started...")
        let populate = new Populate(args);
        if(protocol && protocol.toLowerCase() === 'mqtt'){
            utils.log("MQTT Push not implemented!")
        }else{
            populate.populateMessage();
        }

    }
    if(iType.toLowerCase() === 'record') {
        utils.log("Populate process started...")
        let populate = new Populate(args);
        populate.populateRecord();
    }

}
else{
    utils.log("Invalid arguments / no arguments passed.")
}

var request = require("request");
var Utils = require("./utils");

var API = function(args){
    this.apiUrl = args[3];
    this.domainKey = args[4];
    this.apiKey = args[5];
    this.token = this.domainKey+":"+this.apiKey;
    this.utils = new Utils();
}
module.exports = API;

API.prototype.domainRuleList=function (){

}
API.prototype.messageRuleList=function (cbk) {

    let self = this;

    request.get({
        uri: self.apiUrl+'/rules/list/'+self.token+"/1000",
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in fetching message rules list")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in fetching message rules list")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
}


API.prototype.namedRuleList=function (){}
API.prototype.scheduleRuleList=function (){}
API.prototype.binaryRuleList=function (){}
API.prototype.jobRuleList=function (){}
API.prototype.fileRuleList=function (){}
API.prototype.processRuleList=function (){}
API.prototype.sftpRuleList=function (){}
API.prototype.mqttRuleList=function (){}
API.prototype.udpRuleList=function (){}
API.prototype.tcpRuleList=function (){}
API.prototype.emailRuleList=function (){}
API.prototype.microApiRuleList=function (){}

API.prototype.domainRuleInsert=function (){}
API.prototype.messageRuleInsert=function (){}
API.prototype.namedRuleInsert=function (){}
API.prototype.scheduleRuleInsert=function (){}
API.prototype.binaryRuleInsert=function (){}
API.prototype.jobRuleInsert=function (){}
API.prototype.fileRuleInsert=function (){}
API.prototype.processRuleInsert=function (){}
API.prototype.sftpRuleInsert=function (){}
API.prototype.mqttRuleInsert=function (){}
API.prototype.udpRuleInsert=function (){}
API.prototype.tcpRuleInsert=function (){}
API.prototype.emailRuleInsert=function (){}
API.prototype.microApiRuleInsert=function (){}

API.prototype.domainRuleCount=function (){}
API.prototype.messageRuleCount=function (){}
API.prototype.namedRuleCount=function (){}
API.prototype.scheduleRuleCount=function (){}
API.prototype.binaryRuleCount=function (){}
API.prototype.jobRuleCount=function (){}
API.prototype.fileRuleCount=function (){}
API.prototype.processRuleCount=function (){}
API.prototype.sftpRuleCount=function (){}
API.prototype.mqttRuleCount=function (){}
API.prototype.udpRuleCount=function (){}
API.prototype.tcpRuleCount=function (){}
API.prototype.emailRuleCount=function (){}
API.prototype.microApiRuleCount=function (){}
const request = require("request");

var API = require("./api");
var Utils = require("./utils");

var Info = function (args){
    this.apiUrl = args[3];
    this.domainKey = args[4];
    this.apiKey = args[5];
    this.api = new API(args);
    this.utils = new Utils();
}
module.exports = Info;

Info.prototype.fetch=function (){

    async.series({
        domainRule:function (dCbk){
            dCbk(null,null);
        },
        messageRule:function (mCbk){
            mCbk(null,null);
        },
        namedRule:function (nCbk){
            nCbk(null,null);
        },
        scheduleRule:function (sCbk){
            sCbk(null,null);
        },
        binaryRule:function (bCbk){
            bCbk(null,null);
        },
        jobRule:function (jCbk){
            jCbk(null,null);
        },
        fileRule:function (fCbk){
            fCbk(null,null);
        },
        processRule:function (pCbk){
            pCbk(null,null);
        },
        sftpRule:function (sfCbk){
            sfCbk(null,null);
        },
        mqttRule:function (mqCbk){
            mqCbk(null,null);
        },
        udpRule:function (uCbk){
            uCbk(null,null);
        },
        tcpRule:function (tCbk){
            tCbk(null,null);
        },
        emailRule:function (eCbk){
            eCbk(null,null);
        },
        microAPIRule:function (maCbk){
            maCbk(null,null);
        },
    })
}
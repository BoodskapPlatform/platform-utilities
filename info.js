const request = require("request");
const async = require("async");

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
    let self = this;

    async.series({
        domainRule:function (dCbk){
            self.api.domainRuleList(function (status,result){
                if(status){
                    self.utils.log("Domain rule Found!");
                }else{
                    self.utils.log("No domain rule found!");
                }
                dCbk(null,null);
            })
        },
        messageRule:function (mCbk){
            self.api.messageRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" message rule's Found!");
                }else{
                    self.utils.log("No message rule found!");
                }
                mCbk(null,null);
            })
        },
        namedRule:function (nCbk){
            self.api.namedRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" named rule's Found!");
                }else{
                    self.utils.log("No named rule found!");
                }
                nCbk(null,null);
            })
        },
        scheduleRule:function (sCbk){
            self.api.scheduleRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" schedule rule's Found!");
                }else{
                    self.utils.log("No named rule found!");
                }
                sCbk(null,null);
            })
        },
        binaryRule:function (bCbk){
            self.api.binaryRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" binary rule's Found!");
                }else{
                    self.utils.log("No binary rule found!");
                }
                bCbk(null,null);
            })
        },
        jobRule:function (jCbk){
            self.api.jobRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" job rule's Found!");
                }else{
                    self.utils.log("No job rule found!");
                }
                jCbk(null,null);
            })
        },
        fileRule:function (fCbk){
            self.api.fileRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" file rule's Found!");
                }else{
                    self.utils.log("No file rule found!");
                }
                fCbk(null,null);
            })
        },
        processRule:function (pCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:0
            }

            self.api.elasticSearch('PROCESS',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" process rule's Found!");
                }else{
                    self.utils.log("No process rule found!");
                }
                pCbk(null,null);
            })
        },
        sftpRule:function (sfCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:0
            }

            self.api.elasticSearch('SFTP_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" sftp rule's Found!");
                }else{
                    self.utils.log("No sftp rule found!");
                }
                sfCbk(null,null);
            })
        },
        mqttRule:function (mqCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:0
            }

            self.api.elasticSearch('MQTT_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" mqtt rule's Found!");
                }else{
                    self.utils.log("No mqtt rule found!");
                }
                mqCbk(null,null);
            })
        },
        udpRule:function (uCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:0
            }

            self.api.elasticSearch('UDP_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" udp rule's Found!");
                }else{
                    self.utils.log("No udp rule found!");
                }
                uCbk(null,null);
            })
        },
        tcpRule:function (tCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:0
            }

            self.api.elasticSearch('TCP_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" tcp rule's Found!");
                }else{
                    self.utils.log("No tcp rule found!");
                }
                tCbk(null,null);
            })
        },
        emailRule:function (eCbk){
            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:0
            }

            self.api.elasticSearch('EMAIL_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" email rule's Found!");
                }else{
                    self.utils.log("No email rule found!");
                }
                eCbk(null,null);
            })
        },
        microAPIRule:function (maCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:0
            }

            self.api.elasticSearch('MICRO_API',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" mico api's Found!");
                }else{
                    self.utils.log("No micro api found!");
                }
                maCbk(null,null);
            })
        },
    },function (err, results){
        self.utils.log("*** Process Ended ****")
    })
}
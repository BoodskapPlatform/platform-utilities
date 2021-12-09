const async = require("async");
const fs = require('fs');

var API = require("./api");
var Utils = require("./utils");

var Export = function (args){
    this.apiUrl = args[3];
    this.domainKey = args[4];
    this.apiKey = args[5];
    this.exportPath = args[6];
    this.api = new API(args);
    this.utils = new Utils();
}
module.exports = Export;

Export.prototype.export=function (){
    let self = this;

    self.utils.log("Export folder => "+ self.exportPath)

    async.series({
        messageDefinition:function (mdCbk) {
            self.api.messageDefList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" message definition's Found!");

                    fs.writeFile(self.exportPath+"/messages.json", JSON.stringify(result), function (err){
                        if (err) {
                            self.utils.log('Error in writing message definition in the folder path')
                        }else{
                            self.utils.log('Message definition exported successfully')
                        }
                        mdCbk(null,null);
                    })
                }else{
                    self.utils.log("No message definition found!");
                    mdCbk(null,null);
                }

            })
        },
        recordDefinition:function (rdCbk) {
            self.api.recordDefList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" record definition's Found!");

                    fs.writeFile(self.exportPath+"/records.json", JSON.stringify(result), function (err){
                        if (err) {
                            self.utils.log('Error in writing record definition in the folder path')
                        }else{
                            self.utils.log('Record definition exported successfully')
                        }
                        rdCbk(null,null);
                    })
                }else{
                    self.utils.log("No record definition found!");
                    rdCbk(null,null);
                }

            })
        },
        domainRule:function (dCbk){
            self.api.domainRuleList(function (status,result){
                if(status){
                    self.utils.log("Domain rule Found!");

                    fs.writeFile(self.exportPath+"/domain_rule.json", JSON.stringify(result), function (err){
                        if (err) {
                            self.utils.log('Error in writing domain rule in the folder path')
                        }else{
                            self.utils.log('Domain rule exported successfully')
                        }
                        dCbk(null,null);
                    })
                }else{
                    self.utils.log("No domain rule found!");
                    dCbk(null,null);
                }

            })
        },
        messageRule:function (mCbk){
            self.api.messageRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" message rule's Found!");

                    fs.writeFile(self.exportPath+"/message_rule.json", JSON.stringify(result), function (err){
                        if (err) {
                            self.utils.log('Error in writing message rule in the folder path')
                        }else{
                            self.utils.log('Message rule exported successfully')
                        }
                        mCbk(null,null);
                    })
                }else{
                    self.utils.log("No message rule found!");
                    mCbk(null,null);
                }

            })
        },
        namedRule:function (nCbk){
            self.api.namedRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" named rule's Found!");

                    fs.writeFile(self.exportPath+"/named_rule.json", JSON.stringify(result), function (err){
                        if (err) {
                            self.utils.log('Error in writing named rule in the folder path')
                        }else{
                            self.utils.log('Named rule exported successfully')
                        }
                        nCbk(null,null);
                    })
                }else{
                    self.utils.log("No named rule found!");
                    nCbk(null,null);
                }

            })
        },
        scheduleRule:function (sCbk){
            self.api.scheduleRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" schedule rule's Found!");

                    fs.writeFile(self.exportPath+"/schedule_rule.json", JSON.stringify(result), function (err){
                        if (err) {
                            self.utils.log('Error in writing schedule rule in the folder path')
                        }else{
                            self.utils.log('Schedule rule exported successfully')
                        }
                        sCbk(null,null);
                    })

                }else{
                    self.utils.log("No named rule found!");
                    sCbk(null,null);
                }

            })
        },
        binaryRule:function (bCbk){
            self.api.binaryRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" binary rule's Found!");

                    fs.writeFile(self.exportPath+"/binary_rule.json", JSON.stringify(result), function (err){
                        if (err) {
                            self.utils.log('Error in writing binary rule in the folder path')
                        }else{
                            self.utils.log('Binary rule exported successfully')
                        }
                        bCbk(null,null);
                    })

                }else{
                    self.utils.log("No binary rule found!");
                    bCbk(null,null);
                }

            })
        },
        jobRule:function (jCbk){
            self.api.jobRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" job rule's Found!");

                    fs.writeFile(self.exportPath+"/job_rule.json", JSON.stringify(result), function (err){
                        if (err) {
                            self.utils.log('Error in writing job rule in the folder path')
                        }else{
                            self.utils.log('Job rule exported successfully')
                        }
                        jCbk(null,null);
                    })

                }else{
                    self.utils.log("No job rule found!");
                    jCbk(null,null);
                }

            })
        },
        fileRule:function (fCbk){
            self.api.fileRuleList(function (status,result){
                if(status && result.length>0){
                    self.utils.log(result.length+" file rule's Found!");

                    fs.writeFile(self.exportPath+"/file_rule.json", JSON.stringify(result), function (err){
                        if (err) {
                            self.utils.log('Error in writing file rule in the folder path')
                        }else{
                            self.utils.log('File rule exported successfully')
                        }
                        fCbk(null,null);
                    })

                }else{
                    self.utils.log("No file rule found!");
                    fCbk(null,null);
                }

            })
        },
        processRule:function (pCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:5000
            }

            self.api.elasticSearch('PROCESS',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" process rule's Found!");

                    fs.writeFile(self.exportPath+"/process_rule.json", JSON.stringify(result.data), function (err){
                        if (err) {
                            self.utils.log('Error in writing process rule in the folder path')
                        }else{
                            self.utils.log('Process rule exported successfully')

                        }
                        pCbk(null,null);
                    })
                }else{
                    self.utils.log("No process rule found!");
                    pCbk(null,null);
                }

            })
        },
        sftpRule:function (sfCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:5000
            }

            self.api.elasticSearch('SFTP_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" sftp rule's Found!");

                    fs.writeFile(self.exportPath+"/sftp_rule.json", JSON.stringify(result.data), function (err){
                        if (err) {
                            self.utils.log('Error in writing sftp rule in the folder path')
                        }else{
                            self.utils.log('SFTP rule exported successfully')
                        }
                        sfCbk(null,null);
                    })

                }else{
                    self.utils.log("No sftp rule found!");
                    sfCbk(null,null);
                }
            })
        },
        mqttRule:function (mqCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:5000
            }

            self.api.elasticSearch('MQTT_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" mqtt rule's Found!");

                    fs.writeFile(self.exportPath+"/mqtt_rule.json", JSON.stringify(result.data), function (err){
                        if (err) {
                            self.utils.log('Error in writing mqtt rule in the folder path')
                        }else{
                            self.utils.log('MQTT rule exported successfully')
                        }
                        mqCbk(null,null);
                    })

                }else{
                    self.utils.log("No mqtt rule found!");
                    mqCbk(null,null);
                }

            })
        },
        udpRule:function (uCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:5000
            }

            self.api.elasticSearch('UDP_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" udp rule's Found!");

                    fs.writeFile(self.exportPath+"/udp_rule.json", JSON.stringify(result.data), function (err){
                        if (err) {
                            self.utils.log('Error in writing udp rule in the folder path')
                        }else{
                            self.utils.log('UDP rule exported successfully')
                        }
                        uCbk(null,null);
                    })

                }else{
                    self.utils.log("No udp rule found!");
                    uCbk(null,null);
                }

            })
        },
        tcpRule:function (tCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:5000
            }

            self.api.elasticSearch('TCP_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" tcp rule's Found!");

                    fs.writeFile(self.exportPath+"/tcp_rule.json", JSON.stringify(result.data), function (err){
                        if (err) {
                            self.utils.log('Error in writing tcp rule in the folder path')
                        }else{
                            self.utils.log('TCP rule exported successfully')
                        }
                        tCbk(null,null);
                    })

                }else{
                    self.utils.log("No tcp rule found!");
                    tCbk(null,null);
                }

            })
        },
        emailRule:function (eCbk){
            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:5000
            }

            self.api.elasticSearch('EMAIL_INPUT',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" email rule's Found!");

                    fs.writeFile(self.exportPath+"/email_rule.json", JSON.stringify(result.data), function (err){
                        if (err) {
                            self.utils.log('Error in writing email rule in the folder path')
                        }else{
                            self.utils.log('Email rule exported successfully')
                        }
                        eCbk(null,null);
                    })

                }else{
                    self.utils.log("No email rule found!");
                    eCbk(null,null);
                }

            })
        },
        microAPIRule:function (maCbk){

            var query = {
                query:{
                    bool : {
                        must:[{match:{domainKey:self.domainKey}}],
                    }
                },
                size:5000
            }

            self.api.elasticSearch('MICRO_API',query,function (status,result){
                if(status && result.total>0){
                    self.utils.log(result.total+" mico api's Found!");

                    fs.writeFile(self.exportPath+"/micro_api_rule.json", JSON.stringify(result.data), function (err){
                        if (err) {
                            self.utils.log('Error in writing micro api rule in the folder path')
                        }else{
                            self.utils.log('Mirco API rule exported successfully')
                        }
                        maCbk(null,null);
                    })
                }else{
                    self.utils.log("No micro api found!");
                    maCbk(null,null);
                }

            })
        },
    },function (err, results){
        self.utils.log("*** Process Ended ****")
    })
}
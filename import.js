const async = require("async");
const fs = require('fs');

var API = require("./api");
var Utils = require("./utils");

var Import = function (args){
    this.apiUrl = args[3];
    this.domainKey = args[4];
    this.apiKey = args[5];
    this.importPath = args[6];
    this.api = new API(args);
    this.utils = new Utils();
}
module.exports = Import;

Import.prototype.import=function (){
    let self = this;

    self.utils.log("Import folder => "+ self.importPath)

    async.series({
        //Definition
        messageDefinition:function (mdCbk){

            fs.readFile(self.importPath+"/messages.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading message definition / not found')
                    mdCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total Message Definition: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.messageDefInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('Message definition updated successfully')
                            }else{
                                self.utils.log('Error in inserting message definition')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        mdCbk(null, null)
                    })
                }
            });
        },
        recordDefinition:function (rdCbk){

            fs.readFile(self.importPath+"/records.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading record definition / not found')
                    rdCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total Record Definition: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.recordDefInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('Record definition updated successfully')
                            }else{
                                self.utils.log('Error in inserting record definition')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        rdCbk(null, null)
                    })
                }
            });
        },
        //Rules
        domainRule:function (dCbk){

            fs.readFile(self.importPath+"/domain_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading domain rule / not found')
                    dCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.api.domainRuleInsert(obj,function (status,result){
                        if(status){
                            self.utils.log('Domain rule updated successfully')
                        }else{
                            self.utils.log('Error in inserting domain rule')
                        }
                        dCbk(null, null)
                    })
                }
            });
        },
        messageRule:function (mCbk){

            fs.readFile(self.importPath+"/message_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading message rule / not found')
                    mCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total Message Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.messageRuleInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('Message rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting message rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        mCbk(null, null)
                    })
                }
            });
        },
        namedRule:function (nCbk){
            fs.readFile(self.importPath+"/named_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading named rule / not found')
                    nCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total Named Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.namedRuleInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('Named rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting named rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        nCbk(null, null)
                    })
                }
            });
        },
        scheduleRule:function (sCbk){
            fs.readFile(self.importPath+"/schedule_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading schedule rule / not found')
                    sCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total Scheduled Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.scheduleRuleInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('Schedule rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting schedule rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        sCbk(null, null)
                    })
                }
            });
        },
        binaryRule:function (bCbk){
            fs.readFile(self.importPath+"/binary_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading binary rule / not found')
                    bCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total Binary Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.binaryRuleInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('Binary rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting binary rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        bCbk(null, null)
                    })
                }
            });
        },
        jobRule:function (jCbk){
            fs.readFile(self.importPath+"/job_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading job rule / not found')
                    jCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total Job Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.jobRuleInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('Job rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting named job')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        jCbk(null, null)
                    })
                }
            });
        },
        fileRule:function (frCbk){
            fs.readFile(self.importPath+"/file_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading file rule / not found')
                    frCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total File Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.fileRuleInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('File rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting file rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        frCbk(null, null)
                    })
                }
            });
        },
        processRule:function (pCbk){

            fs.readFile(self.importPath+"/process_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading process rule / not found')
                    pCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total Process Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.processRuleInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('Process rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting process rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        pCbk(null, null)
                    })
                }
            });
        },
        sftpRule:function (sfCbk){

            fs.readFile(self.importPath+"/sftp_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading SFTP rule / not found')
                    sfCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total SFTP Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.inputRuleInsert('SFTP',dat, function (status, result) {
                            if(status){
                                self.utils.log('SFTP rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting sftp rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        sfCbk(null, null)
                    })
                }
            });
        },
        mqttRule:function (mqCbk){

            fs.readFile(self.importPath+"/mqtt_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading MQTT rule / not found')
                    mqCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total MQTT Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.inputRuleInsert('MQTT',dat, function (status, result) {
                            if(status){
                                self.utils.log('MQTT rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting mqtt rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        mqCbk(null, null)
                    })
                }
            });
        },
        udpRule:function (uCbk){

            fs.readFile(self.importPath+"/udp_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading UDP rule / not found')
                    uCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total UDP Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.inputRuleInsert('UDP',dat, function (status, result) {
                            if(status){
                                self.utils.log('UDP rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting udp rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        uCbk(null, null)
                    })
                }
            });
        },
        tcpRule:function (tCbk){

            fs.readFile(self.importPath+"/tcp_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading TCP rule / not found')
                    tCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total TCP Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.inputRuleInsert('TCP',dat, function (status, result) {
                            if(status){
                                self.utils.log('TCP rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting tcp rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        tCbk(null, null)
                    })
                }
            });
        },
        emailRule:function (eCbk){

            fs.readFile(self.importPath+"/email_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading EMAIL rule / not found')
                    eCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total EMAIL Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.inputRuleInsert('EMAIL',dat, function (status, result) {
                            if(status){
                                self.utils.log('EMAIL rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting email rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        eCbk(null, null)
                    })
                }
            });
        },
        microAPIRule:function (maCbk){

            fs.readFile(self.importPath+"/micro_api_rule.json", function (err, data) {
                if (err) {
                    self.utils.log('Error in reading micro api rule / not found')
                    maCbk(null, null)
                } else {
                    var str = data.toString();
                    var obj = JSON.parse(str);
                    self.utils.log('Total Micro API Rules: ',obj.length);

                    async.filter(obj,function (dat, fCbk) {
                        self.api.microApiRuleInsert(dat, function (status, result) {
                            if(status){
                                self.utils.log('Micro API rule updated successfully')
                            }else{
                                self.utils.log('Error in inserting micro api rule')
                            }
                            fCbk(null, null)
                        })
                    },function (er, res) {
                        maCbk(null, null)
                    })
                }
            });
        },
    },function (err, results){
        self.utils.log("*** Process Ended ****")
    })
}
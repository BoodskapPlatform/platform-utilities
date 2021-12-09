const async = require("async");
const fs = require('fs');

var API = require("./api");
var Utils = require("./utils");

var Populate = function (args){
    this.apiUrl = args[3];
    this.domainKey = args[4];
    this.apiKey = args[5];
    this.path = args[6];
    this.api = new API(args);
    this.utils = new Utils();
}
module.exports = Populate;


Populate.prototype.populateMessage=function (){
    let self = this;

    self.utils.log("Populate folder => "+ self.path)

    fs.readdir(self.path, function(err, files){
        if(err){
            self.utils.log('Error in reading message definition folder / not found')
        }else{
            if(files.length == 0){
                self.utils.log('No files found!')
                return;
            }
            async.mapSeries(files,function (file,fdCbk){

                self.utils.log("Process =>"+self.path+"/"+file)

                fs.readFile(self.path+"/"+file, function (err, data) {
                    if (err) {
                        self.utils.log('Error in reading message definition / not found')
                        fdCbk(null, null)
                    } else {
                        var str = data.toString();
                        var obj = JSON.parse(str);
                        self.utils.log('Total Message Count: ',obj.length);

                        async.filter(obj,function (dat, fCbk) {
                            self.api.messagePush(file.replace(".json",""),dat, function (status, result) {
                                if(status){
                                    self.utils.log('Messages pushed successfully')
                                }else{
                                    self.utils.log('Error in pushing message')
                                }
                                fCbk(null, null)
                            })
                        },function (er, res) {
                            self.utils.log("Process =>"+self.path+"/"+file+" has been processed")
                            fdCbk(null, null)
                        })
                    }
                });

            },function (err,results){
                self.utils.log("*** Process Ended ****")
            });
        }
    });


}

Populate.prototype.populateRecord=function (){
    let self = this;

    self.utils.log("Populate folder => "+ self.path)

    fs.readdir(self.path, function(err, files){
        if(err){
            self.utils.log('Error in reading record definition folder / not found')
        }else{
            if(files.length == 0){
                self.utils.log('No files found!')
                return;
            }
            async.mapSeries(files,function (file,fdCbk){

                self.utils.log("Process =>"+self.path+"/"+file)

                fs.readFile(self.path+"/"+file, function (err, data) {
                    if (err) {
                        self.utils.log('Error in reading record definition / not found')
                        fdCbk(null, null)
                    } else {
                        var str = data.toString();
                        var obj = JSON.parse(str);
                        self.utils.log('Total Records Count: ',obj.length);

                        async.filter(file.replace(".json",""),obj,function (dat, fCbk) {
                            self.api.recordInsert(dat, function (status, result) {
                                if(status){
                                    self.utils.log('Record inserted successfully')
                                }else{
                                    self.utils.log('Error in record insert')
                                }
                                fCbk(null, null)
                            })
                        },function (er, res) {
                            self.utils.log("Process =>"+self.path+"/"+file+" has been processed")
                            fdCbk(null, null)
                        })
                    }
                });

            },function (err,results){
                self.utils.log("*** Process Ended ****")
            });
        }
    });


}
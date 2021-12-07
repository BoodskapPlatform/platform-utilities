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

API.prototype.domainRuleList=function (cbk){
    let self = this;

    request.get({
        uri: self.apiUrl+'/drules/get/'+self.token,
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in fetching domain rules")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in fetching domain rules")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
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

API.prototype.namedRuleList=function (cbk){
    let self = this;

    request.get({
        uri: self.apiUrl+'/nrules/list/'+self.token+"/1000",
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in fetching named rules list")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in fetching named rules list")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
}

API.prototype.scheduleRuleList=function (cbk){
    let self = this;

    request.get({
        uri: self.apiUrl+'/srules/list/'+self.token+"/1000",
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in fetching schedule rules list")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in fetching schedule rules list")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
}

API.prototype.binaryRuleList=function (cbk){
    let self = this;

    request.get({
        uri: self.apiUrl+'/brules/list/'+self.token+"/1000",
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in fetching binary rules list")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in fetching binary rules list")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
}

API.prototype.jobRuleList=function (cbk){
    let self = this;

    request.get({
        uri: self.apiUrl+'/jobs/list/'+self.token,
        // headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in fetching job rules list")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in fetching job rules list")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
}

API.prototype.fileRuleList=function (cbk){
    let self = this;

    request.get({
        uri: self.apiUrl+'/frules/list/'+self.token+"/1000",
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in fetching file rules list")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in fetching file rules list")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
}

//Elastic search Models
// API.prototype.processRuleList=function (){}
// API.prototype.sftpRuleList=function (){}
// API.prototype.mqttRuleList=function (){}
// API.prototype.udpRuleList=function (){}
// API.prototype.tcpRuleList=function (){}
// API.prototype.emailRuleList=function (){}
// API.prototype.microApiRuleList=function (){}
API.prototype.elasticSearch=function (type,query,cbk){
    let self = this;

    var data = {
        "type": type,
        "query": JSON.stringify(query),
    }

    request.post({
        uri: self.apiUrl+"/elastic/search/query/"+self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {

                cbk(true, self.queryFormatter(JSON.parse(res.body)))
            } else {
                self.utils.log("Error in fetching "+type.toLowerCase()+" rules list")
                self.utils.log("Error | ["+res.statusCode+"] =>",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in fetching "+type.toLowerCase()+" rules list")
            self.utils.log("Error | ["+res.statusCode+"]",err)
            cbk(false,null)
        }
    });
}

API.prototype.queryFormatter=function (data){

    var resultObj = {
        total: 0,
        data: [],
        aggregations: {}
    }

    if (data.httpCode === 200) {

        var arrayData = JSON.parse(data.result);

        var totalRecords = arrayData.hits.total ? arrayData.hits.total.value : 0;
        var records = arrayData.hits.hits;

        var aggregations = arrayData.aggregations ? arrayData.aggregations : {};

        var count = 0;

        var tempData = []

        for (var i = 0; i < records.length; i++) {
            if( records[i]['_id'] != '_search') {
                records[i]['_source']['_id'] = records[i]['_id'];
                tempData.push(records[i]['_source']);
            }else{
                count++;
            }
        }

        totalRecords = totalRecords > 0 ? totalRecords-count : 0
        resultObj = {
            "total": totalRecords,
            "data": tempData,
            aggregations: aggregations
        }
        return resultObj;

    } else {

        return resultObj;
    }

}

API.prototype.domainRuleInsert=function (data,cbk){
    let self = this;

    request.post({
        uri: self.apiUrl+'/drules/upsert/'+self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in updating domain rule")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in updating domain rule")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
}

API.prototype.messageRuleInsert=function (data,cbk){
    let self = this;

    request.post({
        uri: self.apiUrl+'/rules/upsert/'+self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in updating message rule")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in updating message rule")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
}

API.prototype.namedRuleInsert=function (data,cbk){
    let self = this;

    request.post({
        uri: self.apiUrl+'/nrules/upsert/'+self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if(!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in updating named rule")
                self.utils.log("Error | ",res.body)
                cbk(false, res.body)
            }
        }else{
            self.utils.log("Error in updating named rule")
            self.utils.log("Error | ",err)
            cbk(false,null)
        }
    });
}

API.prototype.scheduleRuleInsert=function (data,cbk) {
    let self = this;

    request.post({
        uri: self.apiUrl + '/srules/upsert/' + self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in updating schedule rule")
                self.utils.log("Error | ", res.body)
                cbk(false, res.body)
            }
        } else {
            self.utils.log("Error in updating schedule rule")
            self.utils.log("Error | ", err)
            cbk(false, null)
        }
    });
}

API.prototype.binaryRuleInsert=function (data,cbk) {
    let self = this;

    request.post({
        uri: self.apiUrl + '/brules/upsert/' + self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in updating binary rule")
                self.utils.log("Error | ", res.body)
                cbk(false, res.body)
            }
        } else {
            self.utils.log("Error in updating binary rule")
            self.utils.log("Error | ", err)
            cbk(false, null)
        }
    });
}

API.prototype.jobRuleInsert=function (data,cbk) {
    let self = this;

    request.post({
        uri: self.apiUrl + '/jobs/upsert/' + self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in updating job rule")
                self.utils.log("Error | ", res.body)
                cbk(false, res.body)
            }
        } else {
            self.utils.log("Error in updating job rule")
            self.utils.log("Error | ", err)
            cbk(false, null)
        }
    });
}

API.prototype.fileRuleInsert=function (data,cbk) {
    let self = this;

    request.post({
        uri: self.apiUrl + '/frules/upsert/' + self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in updating file rule")
                self.utils.log("Error | ", res.body)
                cbk(false, res.body)
            }
        } else {
            self.utils.log("Error in updating file rule")
            self.utils.log("Error | ", err)
            cbk(false, null)
        }
    });
}

API.prototype.processRuleInsert=function (data,cbk) {
    let self = this;

    request.post({
        uri: self.apiUrl + '/process/upsert/' + self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in updating process rule")
                self.utils.log("Error | ", res.body)
                cbk(false, res.body)
            }
        } else {
            self.utils.log("Error in updating process rule")
            self.utils.log("Error | ", err)
            cbk(false, null)
        }
    });
}

//common insert for input rules
// API.prototype.sftpRuleInsert=function (){}
// API.prototype.mqttRuleInsert=function (){}
// API.prototype.udpRuleInsert=function (){}
// API.prototype.tcpRuleInsert=function (){}
// API.prototype.emailRuleInsert=function (){}
// API.prototype.microApiRuleInsert=function (){}
API.prototype.inputRuleInsert=function (type,data,cbk) {
    let self = this;

    request.post({
        uri: self.apiUrl + '/input/'+type+'/upsert/' + self.token,
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'},
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                cbk(true, JSON.parse(res.body))
            } else {
                self.utils.log("Error in updating "+type.toLowerCase()+" rule")
                self.utils.log("Error | ", res.body)
                cbk(false, res.body)
            }
        } else {
            self.utils.log("Error in updating "+type.toLowerCase()+" rule")
            self.utils.log("Error | ", err)
            cbk(false, null)
        }
    });
}




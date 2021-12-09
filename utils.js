var Utils = function (){

}
module.exports = Utils;


Utils.prototype.log=function (msg){
    console.log(new Date() + " | "+msg)
}


Utils.prototype.queryFormatter=function (data){

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
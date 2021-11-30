var Utils = function (){

}
module.exports = Utils;


Utils.prototype.log=function (msg){
    console.log(new Date() + " | "+msg)
}
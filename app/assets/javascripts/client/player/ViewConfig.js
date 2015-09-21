var ProjectActionCreator = require('../actions/ProjectActionCreator');

var ViewConfig = function(){
  var playModeConfig = {},
      addModeConfig = {},
      _conf = {},
      isConfigChanged = false
  ;

function init(){
  getLocalConfig();
}

function setLocalData(key,jsonData) {
  var data = {};
  if(true){
    data["play"] = jsonData;
    var res = getLocalData(key);
    if(res && res.hasOwnProperty("add"))data["add"] = res.add;
  } else {
    data["add"] = jsonData;
    var res = getLocalData(key);
    if(res && res.hasOwnProperty("play"))data["play"] = res.play;
  }
  var d = data.toSource();
  localStorage.setItem(key,d);
}

function getLocalData(key) {
  var data = localStorage.getItem(key);
  return eval(data);
}

function getLocalConfig() {
  var id = "ProjectId";
  var res = getLocalData(id);
  res = res || "";

    if(true){
    _conf = res.play || "";
  } else {
    _conf = res.add || "";
  }
}

function setLocalConfig(id) {
  if(_conf == ""){
    alert("there is no config");
    return false;
  }
  setLocalData(id,_conf);
}

function getConfig(){
  return normalize(_conf);
}

function saveConfig(){
  setLocalConfig("ProjectId");
}

function setConfig(conf){
  _conf = normalize(conf);
  setTimeout(function(){
    ProjectActionCreator.updateCanvas();
  },0);
  
}

function normalize(conf){
  var res = {};
  for(c in conf){
    if(isNaN(conf[c]))res[c] = 0;
    else res[c] = Number(conf[c]);
   }
   return res;
}

return {
  init : init,
  conf:getConfig,
  setConf:setConfig,
  save:saveConfig,
};

}();

module.exports = ViewConfig;

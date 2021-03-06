var request = require('request');

/**** This file calls GM apis ****/

exports.getVehicleInfoService = function(resMsg, reqBody, callback){
    request.post('http://gmapi.azurewebsites.net/getVehicleInfoService', function(err, res, body){ callback(body, resMsg) }).json(reqBody);
}

exports.getSecurityStatusService = function(resMsg, reqBody, callback){
    request.post('http://gmapi.azurewebsites.net/getSecurityStatusService', function(err, res, body){ callback(body, resMsg) }).json(reqBody);
}

exports.getEnergyRange = function(resMsg, reqBody, callback){
    request.post('http://gmapi.azurewebsites.net/getEnergyService', function(err, res, body){ callback(body, resMsg) }).json(reqBody);
}

exports.setEngineState = function(resMsg, reqBody, callback){
    request.post('http://gmapi.azurewebsites.net/actionEngineService', function(err, res, body){ callback(body, resMsg) }).json(reqBody);
}

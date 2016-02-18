var request = require('request');

exports.getVehicleInfoService = function(reqBody, callback){
    request.post('http://gmapi.azurewebsites.net/getVehicleInfoService', function(err, res, body){ callback(body) }).json(reqBody);
}

exports.getSecurityStatusService = function(reqBody, callback){
    request.post('http://gmapi.azurewebsites.net/getSecurityStatusService', function(err, res, body){ callback(body) }).json(reqBody);
}

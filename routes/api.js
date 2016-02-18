var express = require('express');
var router = express.Router();
var invokeAPICall = require('../models/apiCalls');



set = new Set(['1234', '1235']);


//Handles vehicle requests
router.post('/getVehicleInfoService', function(req, res, next) {
  //Making sure that  exists and content-type is correct
  if(req.is('application/json') && set.has(req.body['id']) && req.body['responseType'] == "JSON"){
    invokeAPICall.getVehicleInfoService(req.body, function(body){res.send(body)});
  }else{
   res.status(404).send('Not found');
  }
});

router.post('/getSecurityStatusService', function(req, res, next) {
  if(req.is('application/json') && set.has(req.body['id']) && req.body['responseType'] == "JSON"){
    invokeAPICall.getSecurityStatusService(req.body, function(body){res.send(body)});
  }else{
   res.status(404).send('Not found');
  }
});



module.exports = router;

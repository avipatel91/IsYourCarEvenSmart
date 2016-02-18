var express = require('express');
var router = express.Router();
var invokeAPICall = require('../models/apiCalls');
var repackage = require('../models/repackage');


var vehicleSet = new Set(['1234', '1235']);
var electricSet = new Set(['1235']);
var gasSet = new Set(['1234']);


//Handles vehicle requests
router.get('/vehicles/:id', function(req, res, next) {
  //Making sure that  exists and content-type is correct
  if(vehicleSet.has(req.param('id'))){
    var body = {id: req.param('id'), responseType: "JSON"};
    invokeAPICall.getVehicleInfoService(res, body, repackage.info);
  }else{
   res.status(404).send('Not found');
  }
});

router.get('/vehicles/:id/doors', function(req, res, next) {
  if(vehicleSet.has(req.param('id'))){
    var body = {id: req.param('id'), responseType: "JSON"};
    invokeAPICall.getSecurityStatusService(res, body, repackage.security);
  }else{
   res.status(404).send('Not found');
  }
});

router.get('/vehicles/:id/fuel', function(req, res, next) {
  //Have to make sure vehicle is gas powered, otherwise we might return wrong fuel range.
  if(gasSet.has(req.param('id'))){
    var body = {id: req.param('id'), responseType: "JSON"};
    invokeAPICall.getEnergyRange(res, body, repackage.fuel);
  }else{
   res.status(404).send('Not found');
  }
});

router.get('/vehicles/:id/battery', function(req, res, next) {
  //Have to make sure vehicle is electric, otherwise we might return wrong fuel range.
  if(electricSet.has(req.param('id'))){
    var body = {id: req.param('id'), responseType: "JSON"};
    invokeAPICall.getEnergyRange(res, body, repackage.battery);
  }else{
   res.status(404).send('Not found');
  }
});

router.post('/vehicles/:id/engine', function(req, res, next) {
  //making sure that req body has required info.
  options = new Set(['START', 'STOP']);
  if(vehicleSet.has(req.param('id')) && options.has(req.body['action'])){
    var body = {id: req.param('id'), command: req.body['action'] + "_VEHICLE", responseType: "JSON"};
    invokeAPICall.setEngineState(res, body, repackage.engine);
  }else{
   res.status(404).send('Not found');
  }
});

router.get('/', function(req,res,next){
  res.status(404).send('Not found');
});

router.post('/', function(req,res,next){
  res.status(404).send('Not found');
});

module.exports = router;

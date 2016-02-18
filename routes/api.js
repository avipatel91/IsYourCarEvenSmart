var express = require('express');
var router = express.Router();
var invokeAPICall = require('../models/apiCalls');
var repackage = require('../models/repackage');


var set = new Set(['1234', '1235']);


//Handles vehicle requests
router.get('/vehicles/:id', function(req, res, next) {
  //Making sure that  exists and content-type is correct
  if(set.has(req.param('id'))){
    var body = {id: req.param('id'), responseType: "JSON"};
    invokeAPICall.getVehicleInfoService(res, body, repackage.info);
  }else{
   res.status(404).send('Not found');
  }
});

router.get('/vehicles/:id/doors', function(req, res, next) {
  if(set.has(req.param('id'))){
    var body = {id: req.param('id'), responseType: "JSON"};
    invokeAPICall.getSecurityStatusService(res, body, repackage.security);
  }else{
   res.status(404).send('Not found');
  }
});


module.exports = router;

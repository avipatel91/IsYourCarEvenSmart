/**** This file repackages the payload and sends the new one out ****/

module.exports = {
  info: function(body, res){
    var payload = {};
    payload['vin'] = body.data.vin.value;
    payload['color'] = body.data.color.value;
    payload['doorCount'] = body.data.twoDoorCoupe.value == "True" ? 2 : 4; 
    payload['driveTrain'] = body.data.driveTrain.value; 
    res.send(payload);
  },

  //THE KEYS AND VALUES FOR SECURITY JSON SWAP WHEN CALLING GM SECURITY
  security: function(body, res){
    var payload = [
      {
       location: body.data.doors.values[1].location.value, 
       locked: body.data.doors.values[1].locked.value.toLowerCase()
      },
      {
       location: body.data.doors.values[0].location.value, 
       locked: body.data.doors.values[0].locked.value.toLowerCase()
      }
    ];
    res.send(payload);
  },
  
  fuel: function(body, res){
    var payload = { percent: body.data.tankLevel.value};
    res.send(payload);
  },

  battery: function(body, res){
    var payload = { percent: body.data.batteryLevel.value};
    res.send(payload);
  },

  engine: function(body, res){
    var payload =  body.actionResult;
    res.send(payload);
  }
};





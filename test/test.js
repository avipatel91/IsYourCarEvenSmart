var supertest = require('supertest');
var should = require('should');
var fs = require('fs');

//Lets agent know the port the program is running on.
/*** NOTE:THE KEYS or VALUES FOR SOME API CALLS TO GM SWAP SO EXPECT SOME TESTS TO FAIL SO
          SOME TESTS MIGHT GIVE FALSE POSITIVES
***/


var server = supertest.agent('http://localhost:3000');

//BEGIN UNIT TESTS

describe('getvehicleinfoservice', function(){ 
  var file = undefined;
  before(function() {
    file = JSON.parse(fs.readFileSync(__dirname + '/vehicle-info.txt'));
  });
  it('should return vehicle info', function(done){
    server
     .get('/vehicles/1234')
     .expect('content-type', /json/)
     .expect(200, file, done);
   });
});



describe('getSecurityStatusService', function(){ 
  var file = undefined;
  before(function() {
    file = JSON.parse(fs.readFileSync(__dirname + '/security.txt'));
  });
  it('should door security info', function(done){
    server
     .get('/vehicles/1234/doors')
     .expect('Content-type', /json/)
     .expect(200, file, done);
   });
});


describe('getFuelRange', function(){ 
  it('should return fuel levels', function(done){
    server
     .get('/vehicles/1234/fuel')
     .expect('content-type', /json/)
     .expect(200, done);
   });
});

describe('actionEngineService', function(){ 
  var file = undefined;
  before(function() {
    file = json.parse(fs.readfilesync(__dirname + '/start-stop-engine.txt'));
  });
  it('should return engine actions', function(done){
    server
     .post('/vehicles/1234/engine')
     .send({action: "START"})
     .expect('content-type', /json/)
     .expect(200, file, done);
   });
});


describe('getBatteryRange', function(){ 
  var file = undefined;
  it('should return battery', function(done){
    server
     .get('/vehicles/1235/battery')
     .expect('content-type', /json/)
     .expect(200, done);
   });
});



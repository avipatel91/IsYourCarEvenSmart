var supertest = require('supertest');
var should = require('should');
var fs = require('fs');

//Lets agent know the port the program is running on.

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
  it('should return a 404 if wrong id is provided', function(done){
    server
     .get('/vehicles/1337')
     .expect(404, done);
   });
});

describe('getSecurityStatusService', function(){ 
  it('should provide door security info', function(done){
    server
     .get('/vehicles/1234/doors')
     .expect('Content-type', /json/)
     .expect(200)
     .end(function(err,res){
       res.body[0].should.have.property('location');
       res.body[0].should.have.property('locked');
       res.body[1].should.have.property('location');
       res.body[1].should.have.property('locked');
       done();
     });
   });
});


describe('getFuelRange', function(){ 
  it('should return fuel levels', function(done){
    server
     .get('/vehicles/1234/fuel')
     .expect('content-type', /json/)
     .expect(200)
     .end(function(err,res){
       res.body.should.have.property('percent');
       done();
     });
  });
  it('should return 404 if wrong vehicle type is provided', function(done){
    server
     .get('/vehicles/1337/fuel')
     .expect(404, done);
  });
});

describe('getBatteryRange', function(){ 
  var file = undefined;
  it('should return battery', function(done){
    server
     .get('/vehicles/1235/battery')
     .expect('content-type', /json/)
     .expect(200)
     .end(function(err,res){
       res.body.should.have.property('percent');
       done();
     });
   });
  it('should return 404 if wrong vehicle type is provided', function(done){
    server
     .get('/vehicles/1234/battery')
     .expect(404, done);
  });
});

describe('actionEngineService', function(){ 
  it('should return engine action result', function(done){
    server
     .post('/vehicles/1234/engine')
     .send({action: "START"})
     .expect('content-type', /json/)
     .expect(200)
     .end(function(err,res){
       res.body.should.have.property('status');
       done();
     });
   });
  it('should return 404 if wrong action', function(done){
    server
     .post('/vehicles/1234/engine')
     .send({action: "GO!"})
     .expect(404,done);
   });
});

describe('Every other url', function(){ 
  it('should return 404 ', function(done){
    server
     .get('/blah')
     .expect(404, done);
   });
});


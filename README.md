# IsYourCarEvenSmart

IsYourCarEvenSmart calls GM apis and repackages them into a cleaner format.


### Location of my code: 
     * routes/api.js
     * models/apiCalls.js
     * models/repackage.js
     * test/test.js

### Brief description of the aformentioned files:

##### api.js  
         
         api handles all the routing and does simple validations  
         to make sure invalid payloads are not processed.
         
         For a request, it will first check for correctness. Then it will repackage the payload
         in order to be compatible with GM's api spec. The function then calls its associated
         function from apiCalls.js with the repackaged payload, res object, and a callback function.
         
##### apiCalls.js  
         
         This will take a GM compatible payload, res object, and a callback function.
         This function will first make the associated GM API call with the compatible payload.
         The response body from the aformentioend call is passed into the callback function along
         with the response object (which was passed in from api.js).

##### repackage.js  
		
		This is the callback function that will execute after the function from apiCalls.js executes.
		This function takes a response body (from GM api call) 
                        and a response object (passed from api to apicalls, and then from apicalls to here).
    	It will then repackage the payload into a clearner format and send it along to client by calling res.send


##### test.js  
		
		This uses mocha, should, supertest, and fs for TDD.
          The first test checks response of vehicle info against json in a local file.
          Rest of the tests do not check against a json since the values can change every other call.
          The rest of the tests should be self-explanatory since Mocha and Should are pretty verbose.



### Here is a list of things I would have done if this was production:
       
       1. Have an actual db such as postgres to store ids. 
       
       2. Use a in-mem cache such as Redis to store most recently used ids.
          This will help us minimize hitting the backend for frequently used ids.
       
       3. Set up a reverse proxy with AWS ELB (load balancer) to help scale horizontally
          in order to accomdate for sudden increase of traffic. (future purposes)
       
       4. Set up EC2 metrics and alarms for autoscaling. (future purposes)
       
       5. Use a configuration management tool like Ansible to set up app autonomously on EC2 units.
       
       6. Use splunk to create track of log files and aggregate other data from custom scripts.
       
       7. More exhaustive testing should be done in production

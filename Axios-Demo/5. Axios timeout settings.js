const axios = require('axios')

// With Axios, you can use the timeout property of your config object 
// to set the waiting time before timing out a network request. 
// Its value is the waiting duration in milliseconds. 
// The request is aborted if Axios doesn’t receive a response within the timeout duration. 
// The default value of the timeout property is 0 milliseconds (no timeout).

// Timeout settings for a GET request
axios({
    url: 'http://localhost:3001/tasks',
    method: 'get',
    timeout: 1
  })
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    if (error.code === "ECONNABORTED") {
      console.log('Request timed out');
    } 
    else if (error.code === "ECONNREFUSED"){
        console.log("connection refused");
    }
    console.log(error.code);
    
  });


// can also timeout a network request using the AbortSignal.timeout static method. 
// It takes the timeout as an argument in milliseconds and returns an AbortSignal instance. 
// You need to set it as the value of the signal property.

// The network request aborts when the timeout expires. 
// Axios sets the value of error.code to ERR_CANCELED and error.message to canceled:

const abortSignal = AbortSignal.timeout(1);
axios({
    baseURL: "http://localhost:3001",
    url: '/tasks',
    method: 'get',
    signal: abortSignal,
  })
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    if (error.code === "ERR_CANCELED" && abortSignal.aborted) {
        console.log("Request timed out");
    } else {
        console.log(error.message);
    }
    console.log(error.code);
    
  });
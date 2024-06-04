const axios = require('axios');

axios.interceptors.request.use(null, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use(null, function (error) {
    // Do something with response error
    if (error.response) {
      // Request was made. However, the status code of the server response falls outside the 2xx range
    } else if (error.request) {
      // Request was made but no response received
    } else {
      // Error was triggered by something else
    }
    return Promise.reject(error);
  });

// by default, rejects any response with a status code that falls outside the successful 2xx range. 
// but we can modify what range of HTTP codes should throw an error using the validateStatus config option,

// axios({
//     baseURL: 'http://localhost:3001',
//     url: "/tasks/1",
//     method: "get",
//     validateStatus: status => status <=400,
//   }).then((response) => {
//       console.log(response.data);
//   }).catch(error => {
//         console.log(error.name)
//         console.log(error.message)
//         console.log(error.code)
//         console.log(error.status)
//         console.log(error.stack)
//         console.log(error.config)
//       })

// If a server error occurs (status code not 2xx), the error object will include error.response. 
// If no response is received, it will include error.request. 
// For browsers, error.request is an XMLHttpRequest instance; 
// for Node, it's a ClientRequest instance. In your .catch callback, 
// check both to identify and address the error.


axios.get('http://localhost:3001/1').catch((error) => {
  if (error.response) {
    console.log('Data:', error.response.data);
    console.log('Status:', error.response.status);
    console.log('Headers:', error.response.headers);
  } else if (error.request) {
    console.log('Request:', error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log('Config:', error.config);
});
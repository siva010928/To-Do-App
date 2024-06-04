const axios = require('axios');

// Request Interceptor
axios.interceptors.request.use(config => {
    // console.log("CONFIG:", config);
    console.log('Request was sent');
    return config;
  }, error => {
    return Promise.reject(error);
  });
  
  // Response Interceptor
  axios.interceptors.response.use(response => {
    console.log('Response was received');
    console.log(response.data);
    response.data = {};
    return response;
  }, error => {
    return Promise.reject(error);
  });
  


  Promise.all([
    axios.get('http://localhost:3001/tasks/a26f'),
    axios.get('http://localhost:3001/tasks/7857')
  ]).then(([responseOne, responseTwo]) => {
    console.log('Task 1:', responseOne.data);
    console.log('Task 2:', responseTwo.data);
  }).catch(error => {
    if (error.response){
        console.log(error.response.statusText);
    }
    else if(error.request){
        console.log(error.request.data);
    }
  });
  
  // Shorthand method using axios.post
axios.post('http://localhost:3001/tasks', {
    task: 'Hit her',
    isDone: false
  })
  .then((response) => {
    // console.log(response);
  }, (error) => {
    console.log(error);
  });
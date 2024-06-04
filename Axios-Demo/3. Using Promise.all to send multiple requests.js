const axios = require('axios');

// Promise.all to make multiple requests in parallel by passing an iterable of promises to it. 
// The Promise.all static method returns a single promise object that fulfills only when all input promises have fulfilled.
// Be aware that Axios also has two built-in functions, axios.all and axios.spread, that are deprecated.
// Simultaneous requests to fetch multiple tasks
Promise.all([
    axios.get('http://localhost:3001/tasks/7857'),
    axios.get('http://localhost:3001/tasks/a26f')
  ]).then(([task1Response, task2Response]) => {
    // this will be executed only when all requests are complete
    console.log('Task 1:', task1Response.data.task);
    console.log('Task 2:', task2Response.data.task);
  }).catch(error => console.log(error));
  
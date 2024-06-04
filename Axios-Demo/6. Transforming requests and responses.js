const axios = require('axios');

// Although Axios automatically converts requests and responses to JSON by default, 
// it also allows you to override the default behavior and 
// define a different transformation mechanism. 
// This is particularly useful when working with an API that accepts 
// only a specific data format, such as XML or CSV.

// To change request data before sending it to the server, 
// set the transformRequest property in the config object. 
// Note that this method only works for PUT, POST, DELETE, and PATCH request methods.


// use transformRequest to modify the request data before sending it to the server 
axios({
    method: 'post',
    url: 'http://localhost:3001/tasks',
    data: {
      task: 'Finish homework',
      isDone: false
    },
    transformRequest: [function (data, headers) {
      // here data will be a javascript object
      // Modify the data object or headers here
      data.task = data.task.toUpperCase(); // Example modification: changing the task Text before sending
      return JSON.stringify(data); // You must return a string or an ArrayBuffer
    }],
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

// use transformResponse to preprocess the data returned from the server 
// before it is handled by your application logic in the .then() or .catch() methods.
  axios({
    method: 'get',
    url: 'http://localhost:3001/tasks',
    transformResponse: [function (data) {
      // here data will be the string
      // Modify the response data
      let tasks = JSON.parse(data); // Parse the JSON string received
      tasks = tasks.map(task => ({
        ...task,
        isDone: task.isDone ? 'Completed' : 'Pending'
      }));
      return tasks; // Return the modified array
    }]
  })
  .then(response => console.log(response.data))
  .catch(error => console.log(error));
  
  
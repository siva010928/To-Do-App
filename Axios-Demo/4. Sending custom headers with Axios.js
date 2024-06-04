const axios = require('axios')


// Sending custom headers with Axios is straightforward. 
// Simply pass an object containing the headers as the last argument.



// Custom headers for a POST request
const options = {
  headers: {'X-Custom-Header': 'value'}
};

axios.post('http://localhost:3001/tasks', { 
    task: 'Take out trash', 
    isDone: false 
}, options).then(response => {
    console.log(response.data);
}).catch(error => {
    console.error(error);
});
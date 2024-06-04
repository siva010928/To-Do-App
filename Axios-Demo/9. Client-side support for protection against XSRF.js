const axios = require('axios');

axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// In this configuration:

// Axios will automatically read the XSRF token from the cookie named 'XSRF-TOKEN'.
// It will then include this token in the headers of every request as the value of the 'X-XSRF-TOKEN' header.

axios.post('http://localhost:3001/tasks', {
    task: 'Finish Axios tutorial',
    isDone: false
}, {
    headers: {
        'Content-Type': 'application/json'
    },
    transformRequest: [function (data, headers) {
        console.log(headers);
        // Modify or transform the request data
        data.priority = 'High'; // Add new property
        return JSON.stringify(data); // Return the modified data as a string
    }],
    transformResponse: [function (data) {
        // Modify or transform the response data
        let task = JSON.parse(data);
        task = { ...task, description: 'Task - ' + task.task };
        return task;
    }]
}).then(response => {
    console.log('Transformed Response:', response.data);
}).catch(error => {
    console.log('Error:', error);
});


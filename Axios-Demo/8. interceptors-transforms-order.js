const axios = require('axios');




// In Axios, interceptors and transformation functions interact with the request and response data at different stages 
//in the lifecycle of a request.

// Order of Execution in Axios
// Request Interceptors: They are executed first when a request is made. 
        // Request interceptors allow you to modify the request before it is sent to the server. 
        // This includes the ability to alter headers, body data, and other request parameters.

// TransformRequest: After the request interceptors, the transformRequest functions are executed. 
        // Here, you can modify the request data before it leaves the client. 
        // For example, you can serialize the data, add or modify properties, etc.

// Server Processing: The server receives the request, processes it, and sends a response back.

// TransformResponse: When the response from the server is received, 
        // transformResponse functions are executed first on the client side. 
        // This is where you can parse and modify the response before it is processed 
        // by the response interceptors. This often involves parsing the JSON string into JavaScript objects 
        // and potentially transforming this data.

// Response Interceptors: After transformResponse, response interceptors are executed. 
        // You can further handle the response here, such as global error handling, 
        // logging responses, or other generic tasks.


// Setting up Axios with interceptors and transform functions

axios.interceptors.request.use(function (config) {
    // Modify the request configuration
    // console.log('Request Interceptor:', config);
    console.log('Request Interceptor');
    config.headers['X-Custom-Header'] = 'Interceptor Header';
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Handle the response globally
    // console.log('Response Interceptor:', response);
    console.log("Response Interceptor");
    return response;
}, function (error) {
    return Promise.reject(error);
});

axios({
    method: 'get',
    url: 'http://localhost:3001/tasks',
    transformRequest: [function (data, headers) {
        // Modify the request data or headers
        console.log('TransformRequest:', data);
        return data;
    }],
    transformResponse: [function (data) {
        // Parse and modify the response data
        console.log('TransformResponse Raw Data:', data);
        const jsonData = JSON.parse(data);
        jsonData.forEach(task => task.isDone = task.isDone ? 'Completed' : 'Pending');
        return jsonData;
    }]
})
.then(response => {
    console.log('Final Response:', response.data);
})
.catch(error => {
    console.log('Error:', error);
});

//json-server --watch db.json --port 3001


// Making a POST Request

// Why use Axios?
// The most common way for frontend programs to communicate with servers is through the HTTP protocol. You are probably familiar with the Fetch API and the XMLHttpRequest interface, which allows you to fetch resources and make HTTP requests.

// If you’re using a JavaScript library, chances are it comes with a client HTTP API. jQuery’s $.ajax() function, for example, has been particularly popular with frontend developers. But as developers move away from such libraries in favor of native APIs, dedicated HTTP clients have emerged to fill the gap.

// As with Fetch, Axios is promise-based. However, it provides a more powerful and flexible feature set. Advantages of using Axios over the native Fetch API include:

// Request and response interception
// Streamlined error handling
// Protection against XSRF
// Support for upload progress
// Support for older browsers
// Automatic JSON data transformation

const axios = require('axios');


axios({
    method: 'post',
    url: 'http://localhost:3001/tasks',
    data: {
      task: 'Practice music',
      isDone: false
    }
  });
  

//   Shorthand methods for Axios HTTP requests
// Axios also provides a set of shorthand methods for performing different types of requests. The methods are as follows:

// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.options(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])

// Shorthand method using axios.post
axios.post('http://localhost:3001/tasks', {
  task: 'Attend a class',
  isDone: false
})
.then((response) => {
  // console.log(response);
}, (error) => {
  console.log(error);
});


// If the promise is fulfilled, the first argument of then() will be called; 
// if the promise is rejected, the second argument will be called. 
// the fulfillment value is an object containing the following properties:

// {
//   // `data` is the response that was provided by the server
//   data: {},

//   // `status` is the HTTP status code from the server response
//   status: 200,

//   // `statusText` is the HTTP status message from the server response
//   statusText: 'OK',

//   // `headers` the headers that the server responded with
//   // All header names are lower cased
//   headers: {},

//   // `config` is the config that was provided to `axios` for the request
//   config: {},

//   // `request` is the request that generated this response
//   // It is the last ClientRequest instance in node.js (in redirects)
//   // and an XMLHttpRequest instance the browser
//   request: {}
// }



axios.get('http://localhost:3001/tasks/a26f')
.then((response) => {
  console.log('Data:', response.data);
  console.log('Status:', response.status);
  console.log('StatusText:', response.statusText);
  // console.log('Headers:', response.headers);
  // console.log('XMLHTTPRequest:', response.request);
  // console.log('Config:', response.config);
}, (error) => {
  console.log(error);
});





const axios = require('axios');
// In some situations, you may no longer care about the result and 
// want to cancel a request that’s already been sent. in that case
// create an AbortController instance and set its 
// corresponding AbortSignal instance as the value of the signal property of the config object.


// Using AbortController to cancel a request
const controller = new AbortController();

axios.get('http://localhost:3001/tasks/0ad1', { signal: controller.signal })
  .catch((error) => {
    if (controller.signal.aborted) {
      console.log('Request canceled:', controller.signal.reason);
    } else {
      console.log('Error:', error.message);
    }
  });

// Cancel the request
controller.abort('Operation canceled by the user.');

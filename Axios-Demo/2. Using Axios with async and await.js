const axios = require('axios')

// The async and await syntax is syntactic sugar around the Promises API. 
// It helps you write cleaner, more readable, and maintainable code. 
// With async and await, your codebase feels synchronous and easier to think about.
const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
    //   console.log(response.headers);
    //   console.log(response.config);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  
  fetchData();
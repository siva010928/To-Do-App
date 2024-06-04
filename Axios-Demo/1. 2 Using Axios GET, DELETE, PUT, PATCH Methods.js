// Using Axios GET, DELETE, PUT, PATCH Methods

const axios = require('axios');

// GET request for retrieving all tasks
axios.get('http://localhost:3001/tasks')
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

// DELETE request to delete a task by ID
axios.delete('http://localhost:3001/tasks/58ca');

// PUT request to update a task fully
axios.put('http://localhost:3001/tasks/a26f', {
  task: 'Write a letter',
  isDone: true
});

// PATCH request for partial update of a task
axios.patch('http://localhost:3001/tasks/a26f', {
  isDone: true
});

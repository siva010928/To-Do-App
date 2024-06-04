import "./styles.css";
import Header from "./Header/Header";
import ToDoItem from "./ToDoList/ToDoItem";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm/TaskForm";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json'
  }
});


api.defaults.timeout = 1000; // Timeout after 1000 ms


// Add a request interceptor
api.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
}, error => {
  console.log('Request Error:', error);
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2));
  return response;
}, error => {
  console.log('Response Error:', error);
  return Promise.reject(error);
});



export default function App() {
  
  const [tasks, setTasks] =  useState([])
  const [showCompleted, setShowCompleted] = useState(true);
  const MAX_LENGTH = 25
  const isInputDisabled = tasks.length >= MAX_LENGTH;
  const toggleCompletedVisibilityButtonStyle = tasks.length >= MAX_LENGTH? {display: "none"}: {display: "block"};

  const toggleCompletedVisibility = () => {
    setShowCompleted(!showCompleted);
  };

  // useEffect(() => {
  //   fetch("http://localhost:3001/tasks",
  //     {
  //       method: "GET"
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setTasks(data))
  //     .catch((error) => console.error("Error fetching data ", error));
  //   }, []);

  useEffect(() => {
    api.get("tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching data ", error));
  }, []);
  

  // function handleTaskClick(index) {
  //   const clickedTask = tasks[index];
  //   const updatedTask = {...clickedTask, isDone: ! clickedTask.isDone}
  //   tasks[index] = updatedTask
  //   setTasks([...tasks]);
  // }

  // function handleTaskClick(id) {
  //   const clickedTask = tasks.find(task => task.id === id);
  //   console.log(clickedTask);
  //   const updatedTask = {...clickedTask, isDone: !clickedTask.isDone}
  //   fetch(`http://localhost:3001/tasks/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(updatedTask)
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     setTasks(tasks.map((task) => (task.id === id? data: task)))
  //   })
  //   .catch((error) => console.error("Error Updating task", error))
  // }

  function handleTaskClick(id) {
    const clickedTask = tasks.find(task => task.id === id);
    const updatedTask = {...clickedTask, isDone: !clickedTask.isDone};
  
    api.put(`tasks/${id}`, updatedTask)
      .then((response) => {
        setTasks(tasks.map(task => task.id === id ? response.data : task));
      })
      .catch((error) => console.error("Error updating task", error));
  }
  

  // function addTask(newTaskText) {
  //   const addedTask = {task: newTaskText, isDone: false};
  //   fetch("http://localhost:3001/tasks/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(addedTask)
  //   })
  //   .then((response) => response.json())
  //   .then((addedTask) => {
  //     setTasks([...tasks, addedTask])
  //   })
  //   .catch((error) => {
  //     console.log("Error adding new task", error);
  //   });
  // }

  function addTask(newTaskText) {
    const addedTask = {task: newTaskText, isDone: false};
  
    api.post("tasks", addedTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => console.error("Error adding new task", error));
  }
  
  
  // function emptyTasks() {
  //   const undoneTasks = tasks.filter((task) => task.isDone === false)
  //   setTasks(undoneTasks);
  // }

  // function emptyTasks() {
  //   const completedTasks = tasks.filter((task) => task.isDone === true);
  //   Promise.all(
  //     completedTasks.map(
  //       (task) => 
  //         fetch(`http://localhost:3001/tasks/${task.id}`,
  //           {
  //             method: "DELETE"
  //           }
  //         ))
  //   ).then(() => {
  //     const undoneTasks = tasks.filter((task) => task.isDone === false)
  //     setTasks(undoneTasks);
  //   }).catch((error) => console.error("Error Removing tasks", error));

  // }

  function emptyTasks() {
    const completedTasks = tasks.filter(task => task.isDone);
  
    Promise.all(completedTasks.map(task => api.delete(`tasks/${task.id}`)))
      .then(() => {
        setTasks(tasks.filter(task => !task.isDone));
      })
      .catch((error) => console.error("Error removing tasks", error));
  }
  

  return (
    <div className="App">
      <Header title={"To-Do App"} /> 
      <hr />
      <button style={toggleCompletedVisibilityButtonStyle} id="toogle-visibility-button" onClick={toggleCompletedVisibility}>
        {showCompleted ? 'Hide' : 'Show'} Completed Tasks
      </button>
      <hr />
      {
        (tasks && tasks.length !== 0)  ?
        (tasks.filter(task => showCompleted || !task.isDone).map((task, index) => (<ToDoItem  key={task.id} taskItem={task} index={index} handleClick={() => {handleTaskClick(task.id)}}/>)))
        : 
        <h4><i>Nothing to do buddy. Sleep!!</i></h4>
      }
      <hr />
      <button onClick={emptyTasks}>Remove Completed Tasks</button>
      <br />
      <br />
      <br />
      <TaskForm isInputDisabled={isInputDisabled} addTask={addTask}/>
    </div>
  );
}

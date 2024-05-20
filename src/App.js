import "./styles.css";
import Header from "./Header/Header";
import ToDoItem from "./ToDoList/ToDoItem";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm/TaskForm";

export default function App() {

  const [tasks, setTasks] =  useState([])

  useEffect(() => {
    fetch("http://localhost:5000/tasks",
      {
        method: "GET"
      }
    )
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching data ", error));
    }, []);

  // function handleTaskClick(index) {
  //   const clickedTask = tasks[index];
  //   const updatedTask = {...clickedTask, isDone: ! clickedTask.isDone}
  //   tasks[index] = updatedTask
  //   setTasks([...tasks]);
  // }

  function handleTaskClick(id) {
    const clickedTask = tasks.find(task => task.id === id);
    console.log(clickedTask);
    const updatedTask = {...clickedTask, isDone: !clickedTask.isDone}
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTasks(tasks.map((task) => (task.id === id? data: task)))
    })
    .catch((error) => console.error("Error Updating task", error))
  }

  function addTask(newTaskText) {
    const addedTask = {task: newTaskText, isDone: false};
    fetch("http://localhost:5000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addedTask)
    })
    .then((response) => response.json())
    .then((addedTask) => {
      setTasks([...tasks, addedTask])
    })
    .catch((error) => {
      console.log("Error adding new task", error);
    });
  }
  
  // function emptyTasks() {
  //   const undoneTasks = tasks.filter((task) => task.isDone === false)
  //   setTasks(undoneTasks);
  // }

  function emptyTasks() {
    const completedTasks = tasks.filter((task) => task.isDone === true);
    Promise.all(
      completedTasks.map(
        (task) => 
          fetch(`http://localhost:5000/tasks/${task.id}`,
            {
              method: "DELETE"
            }
          ))
    ).then(() => {
      const undoneTasks = tasks.filter((task) => task.isDone === false)
      setTasks(undoneTasks);
    }).catch((error) => console.error("Error Removing tasks", error));

  }

  return (
    <div className="App">
      <Header title={"To-Do App"} /> 
      <hr />
      {
        (tasks && tasks.length !== 0)  ?
        (tasks.map((task, index) => (<ToDoItem  key={task.id} taskItem={task} index={index} handleClick={() => {handleTaskClick(task.id)}}/>)))
        : 
        <h4><i>Nothing to do buddy. Sleep!!</i></h4>
      }
      <hr />
      <button onClick={emptyTasks}>Remove Completed Tasks</button>
      <br />
      <br />
      <br />
      <TaskForm addTask={addTask}/>
    </div>
  );
}

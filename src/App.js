import "./styles.css";
import Header from "./Header/Header";
import ToDoItem from "./ToDoList/ToDoItem";
import { useState } from "react";
import TaskForm from "./TaskForm/TaskForm";

export default function App() {

  const [tasks, setTasks] =  useState([])

  function handleTaskClick(index) {
    const clickedTask = tasks[index];
    const updatedTask = {...clickedTask, isDone: ! clickedTask.isDone}
    tasks[index] = updatedTask
    setTasks([...tasks]);
  }

  function addTask(newTask) {
    setTasks([...tasks, {task: newTask, isDone: false}])
  }
  
  function emptyTasks() {
    let undoneTasks = tasks.filter((task) => task.isDone === false)
    setTasks(undoneTasks);
  }

  return (
    <div className="App">
      <Header title={"To-Do App"} /> 
      <hr />
      {
        (tasks && tasks.length !== 0)  ?
        (tasks.map((task, index) => (<ToDoItem  key={index} taskItem={task} index={index} handleClick={handleTaskClick}/>)))
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

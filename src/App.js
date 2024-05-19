import "./styles.css";
import Header from "./Header/Header";
import ToDoItem from "./ToDoList/ToDoItem";
import { useState } from "react";

export default function App() {

  const [tasks, setTasks] =  useState(
    [
      {task: "Read SpringBoot", isDone: false}, 
      {task: "Take a shower", isDone: false}, 
      {task: "Prepare breakfast", isDone: false}, 
      {task: "Sleep for 2 hours", isDone: false}, 
      {task: "Take a shower", isDone: false}, 
    ])

  function handleTaskClick(index) {
    console.log(index);
    tasks[index].isDone = ! tasks[index].isDone;
    setTasks([...tasks]);
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
    </div>
  );
}

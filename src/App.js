import "./styles.css";
import Header from "./Header/Header";
import ToDoItem from "./ToDoList/ToDoItem";
import { useState } from "react";

export default function App() {

  const [tasks, setTasks] =  useState(["Read SpringBoot", "Complete assignments", "Prepare breakfast", "Sleep for 2 hours", "Take a shower"])
  
  function emptyTasks() {
      setTasks([]);
  }

  return (
    <div className="App">
      <Header title={"To-Do App"} /> 
      <hr />
      {
        (tasks && tasks.length !== 0)  ?
        (tasks.map((task, index) => (<ToDoItem  key={index} task={task} index={index + 1} />)))
        : 
        <h4><i>Nothing to do buddy. Sleep!!</i></h4>
      }
      <hr />
      <button onClick={emptyTasks}>Empty</button>
    </div>
  );
}

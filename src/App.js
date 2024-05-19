import "./styles.css";
import Header from "./Header/Header";
import ToDoItem from "./ToDoList/ToDoItem";

export default function App() {

  const tasks =  ["Read SpringBoot", "Complete assignments", "Prepare breakfast", "Sleep for 2 hours", "Take a shower"]
  // const tasks = []

  return (
    <div className="App">
      <Header title={"To-Do App"} /> 
      <hr />
      {
        (tasks && tasks.length !== 0)  ?
        (tasks.map((task, index) => (<ToDoItem  key={index} task={task} index={index + 1} />)))
        : 
        <h4>Nothing to do buddy. Sleep!!</h4>
      }
    </div>
  );
}

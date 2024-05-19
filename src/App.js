import "./styles.css";
import Header from "./Header/Header";
import ToDoList from "./ToDoList/ToDoList";

export default function App() {
  return (
    <div className="App">
      <Header title={"To-Do App"} /> 
      <ToDoList />
    </div>
  );
}

import React from "react";
import { useState } from "react";

const TaskForm = ({addTask}) => {

    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        setTask('');
    }

    return (
      <form onSubmit={handleSubmit}>
        <label >
            <input 
                type="text" 
                name="task" 
                value={task} 
                onChange={(e) => {setTask(e.target.value)}}/>
        </label>
        <input type="submit" value="Add new Task" />
      </form>  
    );
};

export default TaskForm;
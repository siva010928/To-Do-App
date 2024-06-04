import React from "react";
import { useState } from "react";

const TaskForm = ({isInputDisabled, addTask}) => {

    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setTimeout(() => { // Simulate network delay
          addTask(task);
      }, 2000); // Delay task visibility by 2 seconds
      setTask('');
    }

    return (
      <form id="taskform" onSubmit={handleSubmit}>
        <label >
          <input
                  type="text"
                  name="task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  disabled={isInputDisabled} />
        </label>
        <input disabled={isInputDisabled} id="taskform-submit" type="submit" value="Add new Task" />
      </form>  
    );
};

export default TaskForm;
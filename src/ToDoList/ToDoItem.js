import React from "react"

const ToDoItem = ({taskItem, index, handleClick}) => {
    const {task, isDone} = taskItem;

    return (
        <div className="taskItem" onClick={() => {handleClick(index)}} id={index}>
            {
                isDone === false ? 
                (<h4>{`${index + 1}.   ${task}`}</h4>):
                (<h4><s>{`${index + 1}.   ${task}`}</s></h4>)
            }
        </div>
    );
};

export default ToDoItem;
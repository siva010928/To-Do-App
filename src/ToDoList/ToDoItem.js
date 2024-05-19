import React from "react"

const ToDoItem = ({task, index}) => {
    return (
        <h4>{`${index}.   ${task}`}</h4>
    );
};

export default ToDoItem;
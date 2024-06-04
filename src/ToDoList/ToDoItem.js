import React from "react";

const ToDoItem = ({ taskItem, index, handleClick }) => {
    const { task, isDone } = taskItem;
    const dynamicClass = `toDoItem ${isDone ? 'completed' : 'active'}`;
    // Styles applied to each task item
    const taskItemStyle = {
        backgroundColor: isDone ? 'grey' : '#fff', // Light gray for completed, white for active
        pointerEvents: index === 0 ? 'none' : 'auto', // Disables pointer events when task is completed
        cursor: isDone ? 'default' : 'pointer',
        border: '1px solid #dee2e6', // Subtle border for separation
        padding: '10px 15px',
        margin: '10px 0',
        borderRadius: '5px',
        position: 'relative', // Required for absolute positioning of the overlay
    };

    return (
        <div className={dynamicClass} style={taskItemStyle} onClick={handleClick} id={`to-do-item-${index}`}>
            <h4 style={{ zIndex: 0 }}>
            {`${index + 1}. `}
                {!isDone ? task: (<s>{task}</s>)}
            </h4>
        </div>
    );
};

export default ToDoItem;

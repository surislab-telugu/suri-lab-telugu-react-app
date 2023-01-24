import React from "react";

const TodoItem = ({ text, id, onToggleTodoItem, isCompleted }) => {
  const onTodoItemChange = (event) => {
    onToggleTodoItem(id, event);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onTodoItemChange}
      />
      <span className={isCompleted ? "completed" : ""}>{text}</span>
    </div>
  );
};

export default TodoItem;

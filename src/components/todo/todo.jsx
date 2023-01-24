import React, { useState, useEffect } from "react";
import shortid from "shortid";
import TodoItem from "./todo-item";

const STORAGE_KEY = "todo-storage";

const Todo = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [todoItem, setTodoItem] = useState("");

  useEffect(() => {
    const todoItemsString = window.localStorage.getItem(STORAGE_KEY);
    if (todoItemsString) {
      const items = JSON.parse(todoItemsString);
      setTodoItems(items);
    }
  }, []);

  const onAddTodoItem = () => {
    const todoItemObject = {
      id: shortid(),
      text: todoItem,
      isCompleted: false,
    };
    const items = [...todoItems];
    items.push(todoItemObject);

    setTodoItems(items);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const onTodoTextChange = (event) => {
    setTodoItem(event.target.value);
  };

  const onToggleTodoItem = (id, event) => {
    const items = [...todoItems];
    const todoItemIndex = items.findIndex((item) => item.id === id);
    items[todoItemIndex].isCompleted = event.target.checked;
    setTodoItems(items);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  return (
    <div>
      <div>
        <label>Enter todo item</label>
        <input onChange={onTodoTextChange} type="text" />
        <button onClick={onAddTodoItem}>Add</button>
      </div>
      <h4>Todo Items</h4>
      <ul>
        {todoItems.map((todoItemObject) => (
          <TodoItem
            onToggleTodoItem={onToggleTodoItem}
            key={todoItemObject.id}
            {...todoItemObject}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;

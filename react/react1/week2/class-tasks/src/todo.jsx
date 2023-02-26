import React, { useState } from "react";

const initTodos = [
  {
    id: 1,
    text: "clean room"
  },
  {
    id: 2,
    text: "do pushups"
  }
];

export default function TodoList() {
  const [todosState, setTodosState] = useState(initTodos);

  const [taskId, setTaskId] = useState(0);

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = { id: todosState.length + 1, text: "learn React" };
    setTodosState((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteById = (e) => {
    e.preventDefault();

    const newTodos = [...todosState];
    const elementToDelete = todosState.findIndex(
      (task) => task.id === Number(taskId)
    );
    if (elementToDelete > -1) {
      newTodos.splice(elementToDelete, 1);
    }
    console.log("%ctodo.jsx line:31 newTodos", "color: #007acc;", newTodos);
    setTodosState(newTodos);
  };

  const todoItems = todosState.map((todo) => (
    <TodoItem key={todo.id} text={todo.text}></TodoItem>
  ));

  return (
    <form name="todoList" className="App">
      <button onClick={(e) => addTodo(e)}>Add todo</button>
      <input
        type="text"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <button type="submit" onClick={(e) => deleteById(e)}>
        delete by id
      </button>
      {todoItems}
    </form>
  );
}

function TodoItem({ text }) {
  return <li>{text}</li>;
}

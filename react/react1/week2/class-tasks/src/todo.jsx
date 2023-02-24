import React, { useState } from "react";

const initTodos = [
  {
    text: "clean room"
  },
  {
    text: "do pushups"
  }
];

export default function TodoList() {
  const [todosState, setTodosState] = useState(initTodos);

  const addTodo = () => {
    const newTodo = { text: "learn React" };
    setTodosState((prevTodos) => {
      return [...prevTodos, newTodo];
    });
  };

  const todoItems = todosState.map((todo) => (
    <TodoItem text={todo.text}></TodoItem>
  ));

  return (
    <div className="App">
      <button onClick={addTodo}>Add todo</button>
      {todoItems}
    </div>
  );
}

function TodoItem({ text }) {
  return <li>{text}</li>;
}

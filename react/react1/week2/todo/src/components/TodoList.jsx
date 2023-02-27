import React from "react";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import TodoContext from "./TodoContext";
import AddTodo from "./AddTodo";

export default function TodoList() {
  const [tasks] = useContext(TodoContext);

  return (
    <div>
      <AddTodo />
      {tasks.length ? undefined : "Congratulations! You've done everything!"}
      <ul>
        {tasks.map((task: object) => (
          <TodoItem task={task} key={task.id} id={`task-${task.id}`} />
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import TodoContext from "./TodoContext";
import AddTodo from "./AddTodo";

export default function TodoList() {
  const [tasks, tasksDispatch] = useContext(TodoContext);

  return (
    <div>
      <AddTodo />
      <ul>
        {tasks.map((task: object) => (
          <TodoItem task={task} key={task.id} id={`task-${task.id}`} />
        ))}
      </ul>
    </div>
  );
}

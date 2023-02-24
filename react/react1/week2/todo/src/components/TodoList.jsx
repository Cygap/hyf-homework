import React from "react";
import TodoItem from "./TodoItem";
import { useState } from "react";

export default function TodoList({ tasks }) {
  const [currentList, setCurrentList] = useState(tasks);
  return (
    <div>
      <button
        onClick={() =>
          setCurrentList([
            ...currentList,
            { id: currentList.length + 1, description: "new task" }
          ])
        }>
        Add todo
      </button>
      <ul>
        {currentList.map((task: object) => (
          <TodoItem task={task} key={task.id} id={`task-${task.id}`} />
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import { useState, useContext } from "react";
import TodoContext from "./TodoContext";

export default function TodoItem({ task, id }) {
  const [completed, setCompleted] = useState(false);
  const [tasks, tasksDispatch] = useContext(TodoContext);
  return (
    <li id={id}>
      <label className={completed ? "completed" : undefined}>
        {task.description}
        <input
          type="checkbox"
          onChange={() => {
            setCompleted(!completed);
          }}
          checked={completed}
        />
      </label>
      <button
        onClick={() =>
          tasksDispatch({ type: "DEL", payload: { id: task.id } })
        }>
        delete
      </button>
    </li>
  );
}

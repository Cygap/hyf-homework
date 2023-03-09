import React from "react";
import { useState, useContext } from "react";
import TodoContext from "./TodoContext";

export default function AddTodo() {
  const [tasks, tasksDispatch] = useContext(TodoContext);
  const [newTask, setNewTask] = useState("");
  return (
    <fieldset>
      <input
        type="text"
        placeholder="New Task"
        onChange={(event) => setNewTask(event.target.value)}
        value={newTask}
      />
      <button
        onClick={() => {
          tasksDispatch({
            type: "ADD",
            payload: {
              id: Math.max(...tasks.map((task) => Number(task.id))) + 1,
              description: newTask
            }
          });
        }}>
        add
      </button>
    </fieldset>
  );
}

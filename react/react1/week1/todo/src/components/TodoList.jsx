import React from "react";
import ListItem from "./ListItem";

export default function TodoList({ tasks }) {
  console.log("%cTodoList.jsx line:5 tasks", "color: #007acc;", tasks);
  return (
    <ul>
      {tasks.map((task) => {
        console.log("%cTodoList.jsx line:9 task", "color: #007acc;", task);
        return <ListItem taskName={task.name} dueDate={task.deadline} />;
      })}
    </ul>
  );
}

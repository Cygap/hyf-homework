import React from "react";
import ListItem from "./ListItem";

export default function TodoList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => {
        return <ListItem task={task} />;
      })}
    </ul>
  );
}

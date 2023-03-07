import { PropsWithChildren, useContext } from "react";
import { TodoContext } from "../providers/TodoContext";

export default function TodoList(props: PropsWithChildren) {
  const todos = useContext(TodoContext);
  console.log("%cTodoList.tsx line:6 todos", "color: #007acc;", todos);
  return (
    <ul>
      {/* {todos.map((item) => (
        <li key={item.id}>{item.description}</li>
      ))} */}
    </ul>
  );
}

import { PropsWithChildren, useContext } from "react";
import { TodoContext } from "../providers/TodoContext";

export default function TodoList(props: PropsWithChildren) {
  const [todos, dispatchTodo] = useContext(TodoContext);
  console.log("%cTodoList.tsx line:6 todos", "color: #007acc;", todos);
  return (
    <ul>
      {todos ? (
        todos.map((item) => <li key={item.id}>{item.description}</li>)
      ) : (
        <li>"No todos..."</li>
      )}
    </ul>
  );
}

import TodoContextProvider from "../providers/TodoContext";
import TodoList from "./TodoList";

const DisplayTodos = (): JSX.Element => {
  return (
    <TodoContextProvider>
      <p>Todo list</p>
      <TodoList />
    </TodoContextProvider>
  );
};
export default DisplayTodos;

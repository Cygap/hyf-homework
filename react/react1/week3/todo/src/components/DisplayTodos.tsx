import TodoContextProvider from "../providers/TodoContext";

const DisplayTodos = (): JSX.Element => {
  return (
    <TodoContextProvider>
      <p>Todo list</p>
    </TodoContextProvider>
  );
};
export default DisplayTodos;

import { createContext, PropsWithChildren, useEffect, useState } from "react";
interface TodoType {
  id: number;
  description: string;
  deadline: string;
}
export const TodoContext = createContext([]);

const TodoContextProvider = (props: PropsWithChildren) => {
  const [initialTodos, setInitialTodos]: [
    Array<TodoType>,
    () => Array<TodoType>
  ] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw"
      );
      setInitialTodos(await response.json());
      console.log(
        "%cTodoContext.tsx line:13 initialTodos",
        "color: #007acc;",
        initialTodos
      );
    })();
  }, []);
  return (
    <TodoContext.Provider value={initialTodos}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;

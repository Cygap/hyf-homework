import {
  createContext,
  Reducer,
  PropsWithChildren,
  useEffect,
  useReducer,
  useState
} from "react";
interface TodoType {
  id: number;
  description: string;
  deadline: string;
}

interface ActionType {
  type: string;
  payload: TodoType[];
}
export const TodoContext = createContext<
  [TodoType[], React.Dispatch<ActionType>]
>([
  [],
  (action) => {
    console.log(
      "%cError! dispatch without a context! action type: ",
      "color: #007acc;",
      action.type
    );
  }
]);

function TodoReducer(
  allTodosState: TodoType[],
  action: ActionType
): TodoType[] {
  switch (action.type) {
    case "ADD":
      return allTodosState;
    case "DEL":
      return allTodosState;
    case "UPD":
      return allTodosState;
    case "DONE":
      return allTodosState;
    case "INIT":
      return action.payload;
    default:
      throw new Error("Unknown action!");
  }
}

const TodoContextProvider = (props: PropsWithChildren) => {
  const [initialTodos = [], setInitialTodos] = useState<TodoType[]>();

  const [todos, dispatchTodo] = useReducer<Reducer<TodoType[], ActionType>>(
    TodoReducer,
    initialTodos
  );

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw"
      );
      const todos = await response.json();
      console.log("%cTodoContext.tsx line:49 todos", "color: #007acc;", todos);
      setInitialTodos(todos);

      const action = { type: "INIT", payload: todos };
      dispatchTodo(action);
    })();
  }, []);

  return (
    <TodoContext.Provider value={[todos, dispatchTodo]}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;

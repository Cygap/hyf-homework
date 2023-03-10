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
  done: boolean;
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
  const newTodos = [...allTodosState];
  switch (action.type) {
    case "ADD":
      let lastid = Math.max(...newTodos.map((todo) => todo.id));
      action.payload.forEach((todo) => (todo.id = ++lastid));
      return newTodos.concat(action.payload);
    case "DEL":
      newTodos.splice(
        allTodosState.map((todo) => todo.id).indexOf(action.payload[0].id),
        1
      );
      return newTodos;
    case "UPD":
      newTodos.splice(
        allTodosState.map((todo) => todo.id).indexOf(action.payload[0].id),
        1,
        action.payload[0]
      );
      return newTodos;
    case "DONE":
      const done = !action.payload[0].done;
      newTodos.splice(
        allTodosState.map((todo) => todo.id).indexOf(action.payload[0].id),
        1,
        { ...action.payload[0], done }
      );

      return newTodos;
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
export type { TodoType };
export default TodoContextProvider;

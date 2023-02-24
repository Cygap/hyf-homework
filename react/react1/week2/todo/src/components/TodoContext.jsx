import { createContext, useReducer } from "react";
import initialTasks from "../tasks.json";

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case "DEL":
      console.log("%cTodoContext.jsx line:7 tasks", "color: #007acc;", tasks);
      const newState = [...tasks].splice(
        tasks.findIndex((task) => {
          console.log(
            "%cTodoContext.jsx line:15 task.id, action.payload.id",
            "color: #007acc;",
            task.id,
            action.payload.id
          );
          return task.id === action.payload.id;
        }),
        1
      );

      return newState;

    default:
      console.log(
        "%cTodoContext.jsx line:7 unknown action!",
        "color: #007acc;"
      );
  }
};

const TodoContext = createContext();

export const TasksContextProvider = (props) => {
  const [tasks, tasksDispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TodoContext.Provider value={[tasks, tasksDispatch]}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContext;

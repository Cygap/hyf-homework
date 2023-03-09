import { createContext, useReducer } from "react";
import initialTasks from "../tasks.json";

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case "DEL":
      const newState = [...tasks];
      newState.splice(
        tasks.findIndex((task) => {
          return task.id === action.payload.id;
        }),
        1
      );

      return newState;
    case "ADD":
      return tasks.concat(action.payload);
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

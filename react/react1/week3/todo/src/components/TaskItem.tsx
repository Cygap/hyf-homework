import { useContext, useState } from "react";
import { TodoContext } from "../providers/TodoContext";
import type { TodoType } from "../providers/TodoContext";
import NewTaskForm from "./NewTaskForm";
export default function TaskItem(props: TodoType) {
  const [_todos, dispatchTodo] = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const payload = [{ ...props }];
  return (
    <>
      <input
        type="checkbox"
        className={edit ? "hidden" : ""}
        onChange={(e) => dispatchTodo({ type: "DONE", payload })}
      />
      {edit ? (
        <NewTaskForm
          handleSubmit={(task: TodoType) => {
            dispatchTodo({ type: "UPD", payload: [task] });
            setEdit(!edit);
          }}
          initialTask={payload[0]}
        />
      ) : (
        <>
          <span className={props.done ? "done" : ""}>
            {props.description} until {props.deadline}
          </span>
          <button onClick={() => setEdit(!edit)}>edit task</button>
        </>
      )}
      <button onClick={(e) => dispatchTodo({ type: "DEL", payload })}>
        delete
      </button>
    </>
  );
}

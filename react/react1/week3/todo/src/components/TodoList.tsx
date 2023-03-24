import { PropsWithChildren, useContext } from "react";
import { TodoContext, TodoType } from "../providers/TodoContext";
import BorderWrapper from "./BorderWrapper";
import NewTaskForm from "./NewTaskForm";
import TaskItem from "./TaskItem";

export default function TodoList(props: PropsWithChildren) {
  const [todos, dispatchTodo] = useContext(TodoContext);

  return (
    <>
      <p>Add task:</p>
      <NewTaskForm
        handleSubmit={(task: TodoType) => {
          dispatchTodo({ type: "ADD", payload: [task] });
        }}
        initialTask={{
          id: 0,
          done: false,
          description: "",
          deadline: ""
        }}
      />

      <ul>
        {todos ? (
          todos.map((item) => (
            <li key={item.id}>
              <BorderWrapper>
                <TaskItem
                  done={item.done ?? false}
                  id={item.id}
                  description={item.description}
                  deadline={item.deadline}
                />
              </BorderWrapper>
            </li>
          ))
        ) : (
          <li>"No todos..."</li>
        )}
      </ul>
    </>
  );
}

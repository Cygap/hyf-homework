import { useState } from "react";
import { TodoType } from "../providers/TodoContext";
interface AddTaskFormType {
  handleSubmit: (task: TodoType) => void;
  initialTask: TodoType;
}
export default function NewTaskForm({
  handleSubmit,
  initialTask
}: AddTaskFormType) {
  const [task, setTask] = useState({ ...initialTask });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(task);
        setTask(initialTask);
      }}>
      <input
        type="text"
        placeholder={task.description}
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <input
        type="date"
        placeholder={task.deadline}
        value={task.deadline}
        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
      />
      <button>save task</button>
    </form>
  );
}

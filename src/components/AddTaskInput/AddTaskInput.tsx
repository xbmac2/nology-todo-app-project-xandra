import { useForm } from "react-hook-form";
import styles from "./AddTaskInput.module.scss";
import { Plus, ListDashes } from "@phosphor-icons/react/dist/ssr";
import { TaskData } from "../../services/task-services";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

export interface AddTaskInputProps {
  addTaskSubmit: (data: Partial<TaskData>) => unknown;
}

const AddTaskInput = ({ addTaskSubmit }: AddTaskInputProps) => {
  const taskSchema = z.object({
    task: z.string().min(1, "Task must be at least 1 character long"),
    isComplete: z.coerce.boolean(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task: "",
      isComplete: false,
    },
  });
  const { ref, ...rest } = register("task");

  console.log(errors, "errors");

  const addTaskHandler = (data: Partial<TaskData>) => {
    addTaskSubmit(data);
    reset();
  };

  const inputRef = useRef<null | HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(addTaskHandler)}
      data-testid="my-form"
    >
      <div className={styles.icon_container} onClick={focusInput}>
        <ListDashes size={30} data-testid="list-icon" />
      </div>

      <input
        {...rest}
        className={styles.input}
        type="text"
        placeholder="Add Task..."
        name="task"
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        data-testid="new-task-input"
      />

      <div
        className={styles.icon_container}
        onClick={handleSubmit(addTaskHandler)}
      >
        <Plus size={30} data-testid="plus-icon" />
      </div>
    </form>
  );
};

export default AddTaskInput;

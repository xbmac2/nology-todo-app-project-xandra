import { useForm } from "react-hook-form";
import styles from "./AddTaskInput.module.scss";
import { Plus } from "@phosphor-icons/react";
import { TaskData, addNewTask } from "../../services/task-services";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddTaskInput = () => {
  const taskSchema = z.object({
    task: z.string().min(1, "Task must be at least 1 character long"),
    isComplete: z.coerce.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task: "",
      isComplete: false,
    },
  });

  // register("isComplete", { value: false });
  console.log(errors, "errors");

  const addTaskHandler = (data: Partial<TaskData>) => {
    console.log(data);
    addNewTask(data)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.warn(e));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(addTaskHandler)}>
      <div className={styles.icon_container}>
        <Plus size={30} />
      </div>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Task..."
        {...register("task")}
      />
      {/* <input type="hidden" {...register("isComplete")} /> */}
    </form>
  );
};

export default AddTaskInput;

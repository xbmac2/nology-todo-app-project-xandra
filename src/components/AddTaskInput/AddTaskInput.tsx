import { useForm } from "react-hook-form";
import styles from "./AddTaskInput.module.scss";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { TaskData, addNewTask } from "../../services/task-services";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { toast } from "react-toastify";

export interface AddTaskInputProps {
  taskCount?: number;
  setTaskCount?: (value: number) => unknown;
  addTaskSubmit: (data: Partial<TaskData>) => unknown;
}

const AddTaskInput = ({
  taskCount,
  setTaskCount,
  addTaskSubmit,
}: AddTaskInputProps) => {
  const taskSchema = z.object({
    //coerce between z and string can help find type_error on tasks
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

  // register("isComplete", { value: false });
  console.log(errors, "errors");

  // const addTaskHandler = (data: Partial<TaskData>) => {
  //   console.log(data);
  //   addNewTask(data)
  //     .then((response) => {
  //       console.log(response);
  //       if (taskCount !== undefined && setTaskCount)
  //         setTaskCount(taskCount + 1);
  //       reset();
  //     })
  //     .catch((e) => {
  //       console.warn(e);
  //       toast.error(e.message);
  //     });
  // };

  const addTaskHandler = (data: Partial<TaskData>) => {
    console.log(data, "addtaskhandlerfired");
    addTaskSubmit(data);
    reset();
  };

  //clicking icon focuses input
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(addTaskHandler)}
      data-testid="my-form"
    >
      <div className={styles.icon_container} onClick={handleIconClick}>
        <Plus size={30} data-testid="plus-icon" />
      </div>
      <input
        {...rest}
        className={styles.input}
        type="text"
        placeholder="Add Task..."
        //{...register("task")}
        name="task"
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        // ref={ref}
        data-testid="new-task-input"
      />
      <button onClick={handleSubmit(addTaskHandler)}>clickme</button>
      {/* <input type="hidden" {...register("isComplete")} /> */}
    </form>
  );
};

export default AddTaskInput;

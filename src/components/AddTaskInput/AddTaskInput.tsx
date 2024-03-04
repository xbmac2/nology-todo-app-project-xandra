import { useForm } from "react-hook-form";
import styles from "./AddTaskInput.module.scss";
import { Plus } from "@phosphor-icons/react";
import { TaskData, addNewTask } from "../../services/task-services";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { toast } from "react-toastify";

export interface AddTaskInputProps {
  taskCount: number;
  setTaskCount: (value: number) => unknown;
}

const AddTaskInput = ({ taskCount, setTaskCount }: AddTaskInputProps) => {
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

  const addTaskHandler = (data: Partial<TaskData>) => {
    console.log(data);
    addNewTask(data)
      .then((response) => {
        console.log(response);
        setTaskCount(taskCount + 1);
        reset();
      })
      .catch((e) => {
        console.warn(e);
        toast.error(e.message);
      });
  };

  //clicking icon focuses input
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(addTaskHandler)}>
      <div className={styles.icon_container} onClick={handleIconClick}>
        <Plus size={30} />
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
      />
      {/* <input type="hidden" {...register("isComplete")} /> */}
    </form>
  );
};

export default AddTaskInput;

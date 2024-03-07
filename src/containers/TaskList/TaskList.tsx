import { useState } from "react";
import TaskItem from "../../components/TaskItem/TaskItem";
import { TaskData, deleteTaskById } from "../../services/task-services";
import styles from "./TaskList.module.scss";
import { toast } from "react-toastify";

export interface TaskListProps {
  tasks: TaskData[] | null;
  taskCount?: number;
  setTaskCount?: (value: number) => unknown;
}

const TaskList = ({ tasks, taskCount, setTaskCount }: TaskListProps) => {
  const [selectedTask, setSelectedTask] = useState(0);

  //defining delete function
  const deleteTask = (id: number) => {
    deleteTaskById({ id: id })
      .then((response) => {
        if (setTaskCount && taskCount) setTaskCount(taskCount - 1);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <section className={styles.container}>
      {tasks &&
        tasks.map((task) => {
          return (
            <TaskItem
              task={task}
              key={task.id}
              id={task.id}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              deleteTask={deleteTask}
            />
          );
        })}
    </section>
  );
};

export default TaskList;

import { useState } from "react";
import { updateTask, TaskData } from "../../services/task-services";
import styles from "./TaskItem.module.scss";
import { Square, CheckSquare, Trash } from "@phosphor-icons/react/dist/ssr";
import { toast } from "react-toastify";

export interface TaskItemProps {
  task: TaskData;
  id: number;
  selectedTask?: number | null;
  setSelectedTask?: (taskId: number) => unknown;
  deleteTask: (id: number) => unknown;
}

const TaskItem = ({
  deleteTask,
  task,
  id,
  selectedTask,
  setSelectedTask,
}: TaskItemProps) => {
  const [thisTask, setThisTask] = useState(task);
  const updateTaskData = { isComplete: !thisTask.isComplete, id: id };

  const toggleComplete = () => {
    updateTask(updateTaskData)
      .then((response) => {
        //console.log(response);
        setThisTask(response);
      })
      .catch((e) => {
        console.warn(e);
        toast.error(e.message);
      });
  };

  const selectTask = () => {
    if (selectedTask !== undefined && setSelectedTask) {
      selectedTask === id ? setSelectedTask(0) : setSelectedTask(id);
    }
  };

  const handleBinClick = () => {
    deleteTask(thisTask.id);
  };

  return (
    <article className={styles.container}>
      <div
        className={styles.checkbox_container}
        onClick={toggleComplete}
        data-testid="check-container"
      >
        {thisTask.isComplete ? (
          <CheckSquare size={32} data-testid="checked-box" />
        ) : (
          <Square size={32} data-testid="unchecked-box" />
        )}
      </div>
      <span
        className={styles.span}
        onClick={selectTask}
        data-testid="task-span"
      >
        <p className={thisTask.isComplete ? styles.checked_task : undefined}>
          {thisTask.task}
        </p>

        <div className={styles.checkbox_container}>
          {selectedTask === id && (
            <Trash
              size={27}
              weight="light"
              data-testid="bin-icon"
              onClick={handleBinClick}
            />
          )}
        </div>
      </span>
    </article>
  );
};

export default TaskItem;

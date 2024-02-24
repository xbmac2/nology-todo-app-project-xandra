import { updateTask, deleteTaskById } from "../../services/task-services";
import styles from "./TaskCard.module.scss";
import { Square, CheckSquare, Trash } from "@phosphor-icons/react";

export interface TaskCardProps {
  id: number;
  taskName: string;
  isComplete: boolean;
  selectedTask?: number | null;
  setSelectedTask: (taskId: number) => unknown;
}

const TaskCard = ({
  taskName,
  isComplete,
  id,
  selectedTask,
  setSelectedTask,
}: TaskCardProps) => {
  const updateTaskData = { isComplete: !isComplete, id: id };

  const toggleComplete = () => {
    //console.log(updateTaskData);
    updateTask(updateTaskData)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.warn(e));
  };

  const selectTask = () => {
    //could make below ternary
    if (selectedTask === id) {
      setSelectedTask(0);
    } else {
      setSelectedTask(id);
    }
  };

  const deleteTask = () => {
    console.log("task with following id will be deleted", id);
    deleteTaskById({ id: id })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.warn(e));
  };

  return (
    <article className={styles.container}>
      <div className={styles.checkbox_container} onClick={toggleComplete}>
        {isComplete ? <CheckSquare size={32} /> : <Square size={32} />}
      </div>
      <span className={styles.span} onClick={selectTask}>
        <p className={isComplete ? styles.checked_task : undefined}>
          {taskName}
        </p>

        <div className={styles.checkbox_container}>
          {selectedTask === id && (
            <Trash size={27} weight="light" onClick={deleteTask} />
          )}
        </div>
      </span>
    </article>
  );
};

export default TaskCard;

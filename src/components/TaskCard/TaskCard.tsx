import { updateTask } from "../../services/task-services";
import styles from "./TaskCard.module.scss";
import { Square, CheckSquare } from "@phosphor-icons/react";

export interface TaskCardProps {
  id: number;
  taskName: string;
  isComplete: boolean;
}

const TaskCard = ({ taskName, isComplete, id }: TaskCardProps) => {
  const updateTaskData = { isComplete: !isComplete, id: id };

  const toggleComplete = () => {
    console.log(updateTaskData);
    updateTask(updateTaskData)
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
      <p className={isComplete ? styles.checked_task : undefined}>{taskName}</p>
    </article>
  );
};

export default TaskCard;

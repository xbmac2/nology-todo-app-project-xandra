import styles from "./TaskCard.module.scss";
import { Square, CheckSquare } from "@phosphor-icons/react";

export interface TaskCardProps {
  //id: number;
  taskName: string;
  isComplete: boolean;
}

const TaskCard = ({ taskName, isComplete }: TaskCardProps) => {
  const toggleComplete = () => {};

  return (
    <article className={styles.container}>
      <div className={styles.checkbox_container} onClick={toggleComplete}>
        {isComplete ? <CheckSquare size={32} /> : <Square size={32} />}
      </div>
      <p>{taskName}</p>
    </article>
  );
};

export default TaskCard;

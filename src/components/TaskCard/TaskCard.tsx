import styles from "./TaskCard.module.scss";

export interface TaskCardProps {
  id: number;
  taskName: string;
  isComplete: boolean;
}

const TaskCard = ({ id, taskName, isComplete }: TaskCardProps) => {
  return (
    <article className={styles.container}>
      <div className={styles.checkbox_container}>
        <button>checkbox</button>
      </div>
      <p>{taskName}</p>
    </article>
  );
};

export default TaskCard;

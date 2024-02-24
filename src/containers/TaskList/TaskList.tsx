import TaskCard from "../../components/TaskCard/TaskCard";
import { TaskData } from "../../services/task-services";
import styles from "./TaskList.module.scss";

export interface TaskListProps {
  tasks: TaskData[] | null;
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <section className={styles.container}>
      {tasks &&
        tasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              id={task.id}
              taskName={task.task}
              isComplete={task.isComplete}
            />
          );
        })}
    </section>
  );
};

export default TaskList;

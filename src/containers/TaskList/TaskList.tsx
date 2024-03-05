import { useState } from "react";
import TaskItem from "../../components/TaskItem/TaskItem";
import { TaskData } from "../../services/task-services";
import styles from "./TaskList.module.scss";

export interface TaskListProps {
  tasks: TaskData[] | null;
  taskCount?: number;
  setTaskCount?: (value: number) => unknown;
}

const TaskList = ({ tasks, taskCount, setTaskCount }: TaskListProps) => {
  const [selectedTask, setSelectedTask] = useState(0);

  return (
    <section className={styles.container}>
      {tasks &&
        tasks.map((task) => {
          return (
            <TaskItem
              task={task}
              key={task.id}
              id={task.id}
              //taskName={task.task}
              //isComplete={task.isComplete}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              taskCount={taskCount}
              setTaskCount={setTaskCount}
            />
          );
        })}
    </section>
  );
};

export default TaskList;

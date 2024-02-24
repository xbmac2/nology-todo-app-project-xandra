import { useEffect, useState } from "react";
import TaskList from "../../containers/TaskList/TaskList";
import { TaskData, getAllTasks } from "../../services/task-services";
import styles from "./TaskPage.module.scss";

const TasksPage = () => {
  const [tasks, setTasks] = useState<TaskData[] | null>(null);

  useEffect(() => {
    getAllTasks()
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((e) => console.warn(e.message));
  }, []);

  return (
    <main className={styles.container}>
      <h1>To Do</h1>
      <div>
        <p>add new tasks input field</p>
      </div>
      <TaskList tasks={tasks} />
    </main>
  );
};

export default TasksPage;
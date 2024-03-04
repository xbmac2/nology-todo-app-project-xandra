import { useEffect, useState } from "react";
import TaskList from "../../containers/TaskList/TaskList";
import { TaskData, getAllTasks } from "../../services/task-services";
import styles from "./TaskPage.module.scss";
import AddTaskInput from "../../components/AddTaskInput/AddTaskInput";
import Header from "../../containers/Header/Header";
import { toast } from "react-toastify";

const TasksPage = () => {
  const [tasks, setTasks] = useState<TaskData[] | null>(null);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    getAllTasks()
      .then((data) => {
        //console.log(data);
        setTasks(data);
        setTaskCount(data.length);
        //toast.success("got tasks");
      })
      .catch((e) => {
        //console.warn(e.message);
        toast.error(e.message);
      });
  }, [taskCount]);

  return (
    <main className={styles.container}>
      <Header />

      <AddTaskInput taskCount={taskCount} setTaskCount={setTaskCount} />
      <p className={styles.task_count}>{taskCount} tasks</p>
      <TaskList
        tasks={tasks}
        taskCount={taskCount}
        setTaskCount={setTaskCount}
      />
    </main>
  );
};

export default TasksPage;

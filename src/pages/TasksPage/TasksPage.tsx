import { useEffect, useState } from "react";
import TaskList from "../../containers/TaskList/TaskList";
import {
  TaskData,
  addNewTask,
  getAllTasks,
} from "../../services/task-services";
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
        setTasks(data);
        setTaskCount(data.length);
      })
      .catch((e) => {
        //console.warn(e.message);
        toast.error(e.message);
      });
  }, [taskCount]);

  //putting function in the parent
  const addTaskSubmit = (data: Partial<TaskData>) => {
    addNewTask(data)
      .then(() => {
        setTaskCount(taskCount + 1);
      })
      .catch((e) => {
        console.warn(e);
        toast.error(e.message);
      });
  };

  return (
    <main className={styles.container}>
      <Header />

      <AddTaskInput addTaskSubmit={addTaskSubmit} />
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

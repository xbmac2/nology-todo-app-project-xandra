import TasksPage from "../../pages/TasksPage/TasksPage";
import styles from "./AppWrapper.module.scss";

const AppWrapper = () => {
  return (
    <div className={styles.container}>
      <TasksPage />
    </div>
  );
};

export default AppWrapper;

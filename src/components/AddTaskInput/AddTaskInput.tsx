import styles from "./AddTaskInput.module.scss";
import { Plus } from "@phosphor-icons/react";

const AddTaskInput = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icon_container}>
        <Plus size={30} />
      </div>
      <input className={styles.input} type="text" placeholder="Add Task" />
    </div>
  );
};

export default AddTaskInput;

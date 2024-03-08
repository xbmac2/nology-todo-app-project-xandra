import { useContext, useEffect, useRef, useState } from "react";
import { updateTask, TaskData } from "../../services/task-services";
import styles from "./TaskItem.module.scss";
import {
  Square,
  CheckSquare,
  Trash,
  NotePencil,
  X,
  Check,
} from "@phosphor-icons/react/dist/ssr";
import { toast } from "react-toastify";
import {
  EditModeContext,
  EditModeContextType,
} from "../../context/EditModeContextProvider";

export interface TaskItemProps {
  task: TaskData;
  id: number;
  selectedTask?: number | null;
  setSelectedTask?: (taskId: number) => unknown;
  deleteTask: (id: number) => unknown;
}

const TaskItem = ({
  deleteTask,
  task,
  id,
  selectedTask,
  setSelectedTask,
}: TaskItemProps) => {
  const { editMode, setEditMode } = useContext(
    EditModeContext
  ) as EditModeContextType;
  const [thisTask, setThisTask] = useState(task);
  const updateCompletionData = { isComplete: !thisTask.isComplete, id: id };
  const [isEditable, setIsEditable] = useState(false);
  //const updateTasknameData = { id: id, task: updatedTaskname };

  const toggleComplete = () => {
    updateTask(updateCompletionData)
      .then((response) => {
        //console.log(response);
        setThisTask(response);
      })
      .catch((e) => {
        console.warn(e);
        toast.error(e.message);
      });
  };

  const selectTask = () => {
    if (selectedTask !== undefined && setSelectedTask && editMode === false) {
      selectedTask === id ? setSelectedTask(0) : setSelectedTask(id);
    }
  };

  const handleBinClick = () => {
    deleteTask(thisTask.id);
  };

  //making editable field
  const inputRef = useRef<null | HTMLInputElement>(null);
  const makeEditable = () => {
    setEditMode(true);
    setIsEditable(true);
    //inputRef.current?.focus();
    console.log("should focus");
    //swap these conditions?
    // if (document.activeElement === inputRef.current) {
    //   //inputRef.current?.blur();
    //   setIsEditable(false);
    //   console.log("blur happened");
    // } else {
    //   console.log("toggle editable");
    //   //setIsEditable(!isEditable);
    //   setIsEditable(true);
    // }

    //checking if focused
    // document.activeElement === inputRef.current
    //   ? inputRef.current?.blur()
    //   : inputRef.current?.focus();
  };

  // useEffect(() => {
  //   document.activeElement === inputRef.current
  //     ? inputRef.current?.blur()
  //     : inputRef.current?.focus();

  //   //return inputRef.current?.blur();
  // }, [isEditable]);

  const handleBlur = () => {
    //console.log("blur happened");
    setIsEditable(false);
  };

  const editOrCloseIcon = isEditable ? (
    <div
      className={styles.checkbox_container}
      onClick={() => {
        setIsEditable(false);
        setEditMode(false);
      }}
    >
      <X size={32} />
    </div>
  ) : (
    <div className={styles.checkbox_container} onClick={makeEditable}>
      <NotePencil size={32} />
    </div>
  );

  const binOrCheckIcon = isEditable ? (
    <Check
      size={32}
      weight="bold"
      onClick={() => console.log("clicked check")}
    />
  ) : (
    <Trash
      size={27}
      weight="light"
      data-testid="bin-icon"
      onClick={handleBinClick}
    />
  );

  const displayTaskItem = (
    <span className={styles.span} onClick={selectTask} data-testid="task-span">
      <p className={thisTask.isComplete ? styles.checked_task : undefined}>
        {thisTask.task}
      </p>

      <div className={styles.checkbox_container}>
        {selectedTask === id && (
          <Trash
            size={27}
            weight="light"
            data-testid="bin-icon"
            onClick={handleBinClick}
          />
        )}
      </div>
    </span>
  );

  const editTaskItem = (
    <span className={styles.span}>
      <input
        className={styles.input}
        type="text"
        placeholder={thisTask.task}
        defaultValue={thisTask.task}
        //onBlur={handleBlur}
        ref={inputRef}
        //onFocus={() => console.log("isfocused")}
      />

      <div className={styles.checkbox_container}>
        <Check
          size={32}
          weight="bold"
          onClick={() => console.log("clicked check")}
        />
      </div>
    </span>
  );

  return (
    <article className={styles.container}>
      {selectedTask === id ? (
        // <div className={styles.checkbox_container} onClick={makeEditable}>
        //   <NotePencil size={32} />
        // </div>
        editOrCloseIcon
      ) : (
        <div
          className={styles.checkbox_container}
          onClick={toggleComplete}
          data-testid="check-container"
        >
          {thisTask.isComplete ? (
            <CheckSquare size={32} data-testid="checked-box" />
          ) : (
            <Square size={32} data-testid="unchecked-box" />
          )}
        </div>
      )}

      {isEditable ? editTaskItem : displayTaskItem}

      {/* <span
        className={styles.span}
        onClick={selectTask}
        data-testid="task-span"
      >
        {isEditable ? (
          <input
            className={styles.input}
            type="text"
            placeholder={thisTask.task}
            defaultValue={thisTask.task}
            onBlur={handleBlur}
            ref={inputRef}
            //onFocus={() => console.log("isfocused")}
          />
        ) : (
          <p className={thisTask.isComplete ? styles.checked_task : undefined}>
            {thisTask.task}
          </p>
        )}

        <div className={styles.checkbox_container}>
          {selectedTask === id && binOrCheckIcon}
        </div>
      </span> */}
    </article>
  );
};

export default TaskItem;

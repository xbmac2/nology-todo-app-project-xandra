//define the Responsedata interface eg
// interface ResponseData {
//   totalPages: number;
//   usersArray: User[];
// }

export interface TaskData {
  id: number;
  task: string;
  isComplete: boolean;
  createdAt: string;
}

//chnge return type to Response Data instead of any
export const getAllTasks = async (): Promise<TaskData[]> => {
  const response = await fetch("http://localhost:8080/tasks");

  if (!response.ok) {
    throw new Error("Failed to get tasks");
  }

  const data = await response.json();
  return data;
};

export const addNewTask = async (
  taskData: Partial<TaskData>
): Promise<TaskData> => {
  const response = await fetch("http://localhost:8080/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  return response.json();
};

export const updateTask = async (
  taskData: Partial<TaskData>
): Promise<TaskData> => {
  const taskId = taskData.id;
  const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(taskData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return response.json();
};

export const deleteTaskById = async (
  taskData: Partial<TaskData>
): Promise<number> => {
  const taskId = taskData.id;
  const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
    method: "DELETE",
    // body: JSON.stringify(taskData),
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return response.status;
};

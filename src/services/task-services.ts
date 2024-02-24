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

export const addTask = async (taskData: TaskData): Promise<TaskData> => {
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

// export const patchTask = async (): Promise<TaskData> => {

// };

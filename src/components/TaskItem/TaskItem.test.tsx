import { render } from "@testing-library/react";
import TaskItem from "./TaskItem";
import { userEvent } from "@testing-library/user-event";
import { deleteTaskById } from "../../services/task-services";

const sampleTaskData = {
  id: 28,
  task: "Clean kitchen",
  isComplete: true,
  createdAt: "2024-03-04T04:51:25.898+00:00",
};

describe("Task Item", () => {
  it("should display task name and completed status", () => {
    const rendered = render(
      <TaskItem task={sampleTaskData} id={sampleTaskData.id} />
    );
    const taskName = rendered.getByText("Clean kitchen");
    expect(taskName).toBeInTheDocument();
    const checkedBox = rendered.getByTestId("checked-box");
    expect(checkedBox).toBeInTheDocument();
  });

  // it("should toggle completed status on click of checkbox", async () => {
  //   const rendered = render(
  //     <TaskItem task={sampleTaskData} id={sampleTaskData.id} />
  //   );
  //   const checkContainer = rendered.getByTestId("check-container");
  //   const checkedBox = rendered.getByTestId("checked-box");
  //   expect(checkedBox).toBeInTheDocument();
  //   const user = userEvent.setup();
  //   await user.click(checkContainer);
  //   // fireEvent.click(checkContainer);
  //   const uncheckedBox = rendered.getByTestId("unchecked-box");
  //   expect(uncheckedBox).toBeInTheDocument();
  // });

  it("should delete task when bin icon is clicked", async () => {
    const rendered = render(
      <TaskItem
        task={sampleTaskData}
        id={sampleTaskData.id}
        selectedTask={sampleTaskData.id}
      />
    );
    const binIcon = rendered.getByTestId("bin-icon");
    expect(binIcon).toBeInTheDocument();

    //vi mocks
    //vi.mocked(deleteTaskById).mockReturnValue(Promise.resolve(204));
    const user = userEvent.setup();
    await user.click(binIcon);
    //expect(deleteTaskById).toHaveBeenCalled();

    //mock the fetch request
    // const spyFetch2 = vi.spyOn(window, "fetch");
    // const spyDelete = vi
    //   .spyOn(TaskItem, "deleteTask")
    //   .mockImplementation(() => 204);

    // spyFetch.mockResolvedValue({
    //   status: 204,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   ok: false,
    //   redirected: false,
    //   statusText: "",
    //   type: "error",
    //   url: "",
    //   clone: function (): Response {
    //     throw new Error("Function not implemented.");
    //   },
    //   body: null,
    //   bodyUsed: false,
    //   arrayBuffer: function (): Promise<ArrayBuffer> {
    //     throw new Error("Function not implemented.");
    //   },
    //   blob: function (): Promise<Blob> {
    //     throw new Error("Function not implemented.");
    //   },
    //   formData: function (): Promise<FormData> {
    //     throw new Error("Function not implemented.");
    //   },
    //   json: function (): Promise<any> {
    //     throw new Error("Function not implemented.");
    //   },
    //   text: function (): Promise<string> {
    //     throw new Error("Function not implemented.");
    //   },
    // });
  });
});

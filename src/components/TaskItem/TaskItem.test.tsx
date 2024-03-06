import { render } from "@testing-library/react";
import TaskItem from "./TaskItem";
import { userEvent } from "@testing-library/user-event";
import * as taskServices from "../../services/task-services";

const sampleTaskData = {
  id: 28,
  task: "Clean kitchen",
  isComplete: true,
  createdAt: "2024-03-04T04:51:25.898+00:00",
};

describe("Task Item", () => {
  it("should display task name and completed status", () => {
    const myMock = vi.fn(() => console.log("mock deleted"));
    const rendered = render(
      <TaskItem
        task={sampleTaskData}
        id={sampleTaskData.id}
        deleteTask={myMock}
      />
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

  it("should call updateTask when checkbox is clicked", async () => {
    const spyUpdateTask = vi.spyOn(taskServices, "updateTask");
    const myMock = vi.fn(() => console.log("mock deleted"));
    const rendered = render(
      <TaskItem
        task={sampleTaskData}
        id={sampleTaskData.id}
        deleteTask={myMock}
      />
    );
    const checkContainer = rendered.getByTestId("check-container");
    const checkedBox = rendered.getByTestId("checked-box");
    expect(checkedBox).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(checkContainer);
    // const uncheckedBox = rendered.getByTestId("unchecked-box");
    // expect(uncheckedBox).toBeInTheDocument();
    expect(spyUpdateTask).toHaveBeenCalled();
  });

  it("should call deleteTask when bin icon is clicked", async () => {
    const myMock = vi.fn(() => console.log("mock deleted"));
    const rendered = render(
      <TaskItem
        task={sampleTaskData}
        id={sampleTaskData.id}
        selectedTask={sampleTaskData.id}
        deleteTask={myMock}
      />
    );
    const binIcon = rendered.getByTestId("bin-icon");
    expect(binIcon).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(binIcon);
    expect(myMock).toHaveBeenCalled();
  });
});

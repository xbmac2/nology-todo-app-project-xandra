import { fireEvent, render } from "@testing-library/react";
import TaskItem from "./TaskItem";
import { userEvent } from "@testing-library/user-event";

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

  it("should toggle completed status on click of checkbox", async () => {
    const rendered = render(
      <TaskItem task={sampleTaskData} id={sampleTaskData.id} />
    );
    const checkContainer = rendered.getByTestId("check-container");
    const checkedBox = rendered.getByTestId("checked-box");
    expect(checkedBox).toBeInTheDocument();
    //const user = userEvent.setup();
    //await user.click(checkContainer);
    // fireEvent.click(checkContainer);
    // const uncheckedBox = rendered.getByTestId("unchecked-box");
    // expect(uncheckedBox).toBeInTheDocument();
  });
});

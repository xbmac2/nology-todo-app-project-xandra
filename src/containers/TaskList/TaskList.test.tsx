import TaskList from "./TaskList";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const sampleTaskDataArr = [
  {
    id: 23,
    task: "Collect package",
    isComplete: false,
    createdAt: "2024-03-04T04:14:17.697+00:00",
  },
  {
    id: 24,
    task: "Book appointment",
    isComplete: true,
    createdAt: "2024-03-04T04:28:32.379+00:00",
  },
  {
    id: 28,
    task: "Clean kitchen",
    isComplete: true,
    createdAt: "2024-03-04T04:51:25.898+00:00",
  },
  {
    id: 31,
    task: "Rewrite documentation",
    isComplete: true,
    createdAt: "2024-03-04T05:04:39.098+00:00",
  },
];

describe("Task List", () => {
  it("should display all tasks", () => {
    const rendered = render(<TaskList tasks={sampleTaskDataArr} />);
    const task1 = rendered.getByText("Collect package");
    const task2 = rendered.getByText("Book appointment");
    const task3 = rendered.getByText("Clean kitchen");
    const task4 = rendered.getByText("Rewrite documentation");
    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();
    expect(task3).toBeInTheDocument();
    expect(task4).toBeInTheDocument();
  });

  it("should display bin icon when task is clicked", async () => {
    const rendered = render(<TaskList tasks={sampleTaskDataArr} />);

    const task1 = rendered.getAllByTestId("task-span")[0];
    const user = userEvent.setup();
    await user.click(task1);

    const binIcon = rendered.getByTestId("bin-icon");
    expect(binIcon).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import AddTaskInput from "./AddTaskInput";
import userEvent from "@testing-library/user-event";

describe("AddTaskInput", () => {
  it("should focus on input when list icon is clicked", async () => {
    const myMock = vi.fn(() => console.log("str"));
    const rendered = render(<AddTaskInput addTaskSubmit={myMock} />);
    const listIcon = rendered.getByTestId("list-icon");
    const user = userEvent.setup();
    await user.click(listIcon);
    const input = rendered.getByTestId("new-task-input");
    expect(input).toHaveFocus();
  });

  it("should call the submit function with formated input on form submit", async () => {
    const myMock = vi.fn((value) => console.log(value));
    const rendered = render(<AddTaskInput addTaskSubmit={myMock} />);

    const user = userEvent.setup();

    const input = rendered.getByPlaceholderText("Add Task...");
    await user.type(input, "Get groceries");

    const btn = rendered.getByTestId("plus-icon");
    await user.click(btn);
    expect(myMock).toHaveBeenCalledOnce();

    const createTaskObject = {
      isComplete: false,
      task: "Get groceries",
    };

    expect(myMock.mock.calls[0][0]).toEqual(createTaskObject);
  });

  it("should not call submit function with empty string", async () => {
    const myMock = vi.fn((value) => console.log(value));
    const rendered = render(<AddTaskInput addTaskSubmit={myMock} />);

    const user = userEvent.setup();

    const btn = rendered.getByTestId("plus-icon");
    await user.click(btn);

    expect(myMock).not.toHaveBeenCalledOnce();
  });
});

import { fireEvent, render } from "@testing-library/react";
import AddTaskInput from "./AddTaskInput";
import userEvent from "@testing-library/user-event";

describe("AddTaskInput", () => {
  it("should focus on input when plus icon is clicked", async () => {
    const myMock = vi.fn(() => console.log("str"));
    const rendered = render(<AddTaskInput addTaskSubmit={myMock} />);
    const plusIcon = rendered.getByTestId("plus-icon");
    const user = userEvent.setup();
    await user.click(plusIcon);
    const input = rendered.getByTestId("new-task-input");
    expect(input).toHaveFocus();
  });

  it("should call the submit function with input on form submit", async () => {
    const myMock = vi.fn((value) => console.log(value));
    const rendered = render(<AddTaskInput addTaskSubmit={myMock} />);
    //const plusIcon = rendered.getByTestId("plus-icon");
    const user = userEvent.setup();
    //await user.click(plusIcon);
    //const input = rendered.getByTestId("new-task-input");
    const input = rendered.getByPlaceholderText("Add Task...");
    await user.type(input, "Get groceries");
    const form = rendered.getByTestId("my-form");
    expect(form).toBeInTheDocument();
    //const task = rendered.getByText("Get groceries");
    //expect(task).toBeInTheDocument();
    //fireEvent.submit(form); //doesn't work but btn works...
    const btn = rendered.getByRole("button");
    await user.click(btn);
    expect(myMock).toHaveBeenCalledOnce();
    //add assertion that it was called with getgroceries
  });

  // it("should not call submit function with empty string", async () => {
  //   const myMock = vi.fn((value) => console.log(value));
  //   const rendered = render(<AddTaskInput addTaskSubmit={myMock} />);
  //   //const plusIcon = rendered.getByTestId("plus-icon");
  //   const user = userEvent.setup();
  //   //await user.click(plusIcon);
  //   //const input = rendered.getByTestId("new-task-input");
  //   const input = rendered.getByPlaceholderText("Add Task...");
  //   await user.type(input, "");
  //   const form = rendered.getByTestId("my-form");
  //   expect(form).toBeInTheDocument();
  //   //const task = rendered.getByText("Get groceries");
  //   //expect(task).toBeInTheDocument();
  //   //fireEvent.submit(form); //doesn't work but btn works...
  //   const btn = rendered.getByRole("button");
  //   await user.click(btn);
  //   expect(myMock).toThrowError();
  // });
});

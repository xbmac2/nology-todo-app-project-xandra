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
    //const plusIcon = rendered.getByTestId("plus-icon");
    const user = userEvent.setup();
    //await user.click(plusIcon);
    //const input = rendered.getByTestId("new-task-input");
    const input = rendered.getByPlaceholderText("Add Task...");
    await user.type(input, "Get groceries");
    ////const form = rendered.getByTestId("my-form");
    ////expect(form).toBeInTheDocument();
    //const task = rendered.getByText("Get groceries");
    //expect(task).toBeInTheDocument();
    ////fireEvent.submit(form); //doesn't work but btn works...
    const btn = rendered.getByTestId("plus-icon");
    await user.click(btn);
    expect(myMock).toHaveBeenCalledOnce();
    //add assertion that it was called with getgroceries
    const createTaskObject = {
      isComplete: false,
      task: "Get groceries",
    };

    expect(myMock.mock.calls[0][0]).toEqual(createTaskObject);
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

  it("should not call submit function with empty string", async () => {
    //const spyAddTask = vi.spyOn(taskServices, "addNewTask");
    const myMock = vi.fn((value) => console.log(value));
    const rendered = render(<AddTaskInput addTaskSubmit={myMock} />);
    //const plusIcon = rendered.getByTestId("plus-icon");
    const user = userEvent.setup();
    //await user.click(plusIcon);
    //const input = rendered.getByTestId("new-task-input");
    ////const input = rendered.getByPlaceholderText("Add Task...");
    ////await user.type(input, "getgroceries");
    //const form = rendered.getByTestId("my-form");
    //expect(form).toBeInTheDocument();
    //const task = rendered.getByText("Get groceries");
    //expect(task).toBeInTheDocument();
    // fireEvent.submit(form); //doesn't work but btn works...
    const btn = rendered.getByTestId("plus-icon");
    await user.click(btn);
    //expect(spyAddTask).toHaveBeenCalled();
    expect(myMock).not.toHaveBeenCalledOnce();
  });
});

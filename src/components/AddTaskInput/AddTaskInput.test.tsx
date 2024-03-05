import { render } from "@testing-library/react";
import AddTaskInput from "./AddTaskInput";
import userEvent from "@testing-library/user-event";

describe("AddTaskInput", () => {
  it("should focus on input when plus icon is clicked", async () => {
    const rendered = render(<AddTaskInput />);
    const plusIcon = rendered.getByTestId("plus-icon");
    const user = userEvent.setup();
    await user.click(plusIcon);
    const input = rendered.getByTestId("new-task-input");
    expect(input).toHaveFocus();
  });
});

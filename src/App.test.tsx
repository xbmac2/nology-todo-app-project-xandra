//import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("Setup test", () => {
  it("checks true", () => {
    expect(true).toBe(true);
  });
});

describe("App", () => {
  it("should render a heading", () => {
    render(<App />);
    const heading = screen.getByText("To Do");
    //expect(heading).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});

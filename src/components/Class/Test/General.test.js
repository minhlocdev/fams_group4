import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import General from '../General';
import { BrowserRouter } from "react-router-dom";

describe("General Component", () => {
  test("renders General component", () => {
    render(
      <BrowserRouter> {/* Wrap LoginPage with BrowserRouter */}
        <General />
      </BrowserRouter>
    );
    expect(screen.getByText("General")).toBeInTheDocument();
  });

  test("toggles visibility of details", () => {
    render(<General />);
    const toggleButton = screen.getByLabelText("show more");

    // Initially, details are visible
    expect(screen.getByText("Class Time")).toBeInTheDocument();

    // Click the toggle button to hide the details
    fireEvent.click(toggleButton);
    // After clicking, the details should not be visible
    expect(screen.queryByText("Class Time")).not.toBeInTheDocument();

    // Click the toggle button again to show the details
    fireEvent.click(toggleButton);
    // The details should be visible again
    expect(screen.getByText("Class Time")).toBeInTheDocument();
  });
});

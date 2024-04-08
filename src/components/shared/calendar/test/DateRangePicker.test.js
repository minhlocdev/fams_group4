import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DateRangePicker from "../DateRangePicker";

describe("Date Range Picker", () => {
  it("renders component", () => {});

  it("open date range picker", () => {
    render(<DateRangePicker />);
    const button = screen.getByRole("button", { name: "Please pick a day." });

    fireEvent.click(button);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  // it("close date range picker", async () => {
  //   render(<DateRangePicker />);
  //   const button = screen.getByRole("button", { name: "Please pick a day." });

  //   fireEvent.click(button);

  //   const menu = screen.getByRole("menu");
  //   expect(menu).toBeInTheDocument();

  //   fireEvent.click(button); // Click outside to close the menu

  //   await waitFor(() => {
  //     expect(menu).not.toBeInTheDocument();
  //   });
  // });

  // it("footer displays correct message based on range", () => {
  //   // Mock Date.toLocaleDateString to ensure consistent formatting
  //   const originalToLocaleDateString = Date.prototype.toLocaleDateString;
  //   Date.prototype.toLocaleDateString = jest.fn(() => "2024-03-20");

  //   // Render the component
  //   render(<DateRangePicker />);

  //   // Simulate selecting a range
  //   fireEvent.click(screen.getByRole("button", { name: "Please pick a day." }));
  //   fireEvent.click(screen.getByText("20"));
  //   fireEvent.click(screen.getByText("23"));

  //   // Check if footer displays the correct message
  //   expect(
  //     screen.getByRole("button", { name: "2024-03-20—2024-03-23." })
  //   ).toBeInTheDocument();

  //   // Restore the original Date.toLocaleDateString
  //   Date.prototype.toLocaleDateString = originalToLocaleDateString;
  // });

  it('footer displays "Choose more days." when range is the same day', () => {
    // Mock Date.toLocaleDateString to ensure consistent formatting
    const originalToLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = jest.fn(() => "2024-03-20");

    // Render the component
    render(<DateRangePicker />);

    // Simulate selecting a range
    fireEvent.click(screen.getByRole("button", { name: "Please pick a day." }));
    fireEvent.click(screen.getByText("20"));
    fireEvent.click(screen.getByText("20"));

    // Check if footer displays "Choose more days."
    expect(screen.getByText("Choose more days.")).toBeInTheDocument();

    // Restore the original Date.toLocaleDateString
    Date.prototype.toLocaleDateString = originalToLocaleDateString;
  });
});

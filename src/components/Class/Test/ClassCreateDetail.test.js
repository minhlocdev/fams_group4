import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ClassCreateDetail from "../ClassCreateDetail";

describe("ClassCreateDetail", () => {
  it("renders class creation form when class title is empty", () => {
    render(<ClassCreateDetail />);
    
    // Check if the input field and create button are rendered
    expect(screen.getByPlaceholderText("Name the class")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("renders class details when class title is not empty", () => {
    render(<ClassCreateDetail />);
    
    // Enter a class title
    fireEvent.change(screen.getByPlaceholderText("Name the class"), { target: { value: "Class Name" }});
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    // Check if the class details components are rendered
    expect(screen.getByText("Create General")).toBeInTheDocument();
    expect(screen.getByText("Create Time Frame")).toBeInTheDocument();
    expect(screen.getByText("Create Attendee")).toBeInTheDocument();
    expect(screen.getByText("Syllabus")).toBeInTheDocument();
  });

  it("calls handleCancel when 'Back' button is clicked", () => {
    const handleCancelMock = jest.fn();
    render(<ClassCreateDetail handleCancel={handleCancelMock} />);
    
    // Enter a class title
    fireEvent.change(screen.getByPlaceholderText("Name the class"), { target: { value: "Class Name" }});
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    // Click the 'Back' button
    fireEvent.click(screen.getByRole("button", { name: "Back" }));

    // Check if handleCancel function is called
    expect(handleCancelMock).toHaveBeenCalled();
  });

  // Add more tests for other functionalities such as handling save, save as draft, etc.
});

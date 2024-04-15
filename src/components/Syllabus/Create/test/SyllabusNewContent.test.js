import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../services/queries/queryClient";
// import { AuthProvider } from "../../utils/authUtil";
import { TextEncoder, TextDecoder } from "util";
import SyllabusNewContent from "../SyllabusNewContent";
import { BrowserRouter } from "react-router-dom";
import queryClient from "../../../../services/queries/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

Object.assign(global, { TextDecoder, TextEncoder });

const theme = createTheme();

describe("Syllabus New Content", () => {
  it("renders syllabus new content", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <SyllabusNewContent />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

  // Mock handleCloseModal and AddData functions
  const handleCloseModal = jest.fn();
  const AddData = jest.fn();

  it("renders correctly", () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <SyllabusNewContent
              handleCloseModal={handleCloseModal}
              openModal={true}
              AddData={AddData}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("New Content")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Name of content...")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Training Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Method")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("handles form submission with valid data", () => {
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <SyllabusNewContent
              handleCloseModal={handleCloseModal}
              openModal={true}
              AddData={AddData}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Name of content..."), {
      target: { value: "Sample Content" },
    });
    fireEvent.change(screen.getByPlaceholderText("Minutes"), {
      target: { value: "60" },
    });
    fireEvent.click(screen.getByText("Create"));

    expect(AddData).toHaveBeenCalled();
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("displays error message with invalid data", () => {
    const { getByText } = render(
      <SyllabusNewContent
        handleCloseModal={handleCloseModal}
        openModal={true}
        AddData={AddData}
      />
    );

    fireEvent.click(screen.getByText("Create"));

    expect(screen.getByText("This field is required")).toBeInTheDocument(); // Assuming it shows the first error message
  });

  it("should set error state to true", () => {
    const OpenWarningModal = jest.fn();
    const setError = jest.fn(); // Mock the setError function
    OpenWarningModal(setError);
    expect(setError).toHaveBeenCalledWith(true);
  });

  const handleIconDelivery = jest.fn();

  it("should return correct icon type for given delivery data", () => {
    expect(handleIconDelivery("Assignment/Lab")).toBe(1);
    expect(handleIconDelivery("Concept/Lecture")).toBe(2);
    expect(handleIconDelivery("Guide/Review")).toBe(3);
    expect(handleIconDelivery("Test/Quiz")).toBe(4);
    expect(handleIconDelivery("Exam")).toBe(5);
    expect(handleIconDelivery("Seminar/Workshop")).toBe(6);
  });

  it("should return undefined for unknown delivery data", () => {
    expect(handleIconDelivery("Unknown")).toBeUndefined();
  });

  const handleSubmit = jest.fn();

  it("should call preventDefault and not call AddData or handleCloseModal if form validation fails", () => {
    const e = {
      preventDefault: jest.fn(),
    };
    const validateForm = jest.fn(() => false); // Mock validateForm to return false
    const AddData = jest.fn();
    const handleCloseModal = jest.fn();

    handleSubmit(e, validateForm, AddData, handleCloseModal);

    expect(e.preventDefault).toHaveBeenCalled();
    expect(AddData).not.toHaveBeenCalled();
    expect(handleCloseModal).not.toHaveBeenCalled();
  });

  it("should call preventDefault, AddData, and handleCloseModal if form validation succeeds", () => {
    const e = {
      preventDefault: jest.fn(),
    };
    const validateForm = jest.fn(() => true); // Mock validateForm to return true
    const AddData = jest.fn();
    const handleCloseModal = jest.fn();

    handleSubmit(e, validateForm, AddData, handleCloseModal);

    expect(e.preventDefault).toHaveBeenCalled();
    expect(AddData).toHaveBeenCalled();
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("should validate form correctly", () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <SyllabusNewContent />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    // Accessing form fields
    const contentNameInput = screen.getByPlaceholderText("Name of content...");
    const trainingTimeInput = screen.getByPlaceholderText("Minutes");
    const createButton = screen.getByText("Create");

    // Testing form validation
    fireEvent.change(contentNameInput, { target: { value: "" } });
    fireEvent.change(trainingTimeInput, { target: { value: "" } });

    fireEvent.click(createButton);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.getByText("This field is required")).toBeInTheDocument();

    fireEvent.change(contentNameInput, { target: { value: "123" } });
    fireEvent.change(trainingTimeInput, { target: { value: "abc" } });

    fireEvent.click(createButton);

    expect(
      screen.getByText("This field cannot be all number")
    ).toBeInTheDocument();
    expect(screen.getByText("This field must be a number")).toBeInTheDocument();

    fireEvent.change(trainingTimeInput, { target: { value: "500" } });

    fireEvent.click(createButton);

    expect(screen.getByText("Invalid time")).toBeInTheDocument();
  });
});

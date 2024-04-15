import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../services/queries/queryClient";
// import { AuthProvider } from "../../utils/authUtil";
import SyllabusOutline from "../SyllabusOutline";
import { TextEncoder, TextDecoder } from "util";
import { SyllabusContext } from "../../../../context/SyllabusContext";
import SyllabusOther from "../SyllabusOther";

Object.assign(global, { TextDecoder, TextEncoder });

const theme = createTheme();

const mockSyllabusContext = {
  other: {
    // Initial other state values
    quiz: 15,
    assignment: 15,
    final: 70,
    finalTheory: 40,
    finalPractice: 60,
    passing: 70,
    trainingPrinciple: "Initial training principle content",
  },
  setOther: jest.fn(),
  error: {},
  handleFieldValidation: jest.fn(),
};

describe("Syllabus Outline", () => {
  it("renders syllabus outline", () => {
    render(
      <ThemeProvider theme={theme}>
        <SyllabusOutline />
      </ThemeProvider>
    );
    expect(screen.getByText("Add day")).toBeInTheDocument();
    expect(screen.getByTestId("time-allocation")).toBeInTheDocument();
  });

  it("should call handleOtherChange correctly", () => {
    const { getByLabelText } = render(
      <SyllabusContext.Provider value={mockSyllabusContext}>
        <SyllabusOther />
      </SyllabusContext.Provider>
    );

    const quizInput = screen.getByLabelText("Quiz *");
    fireEvent.change(quizInput, { target: { value: "25" } });

    expect(mockSyllabusContext.setOther).toHaveBeenCalledWith({
      ...mockSyllabusContext.other,
      quiz: 25,
    });
    expect(mockSyllabusContext.handleFieldValidation).toHaveBeenCalledWith(
      "quiz",
      25
    );
  });

  it("should call handleRichText correctly", () => {
    const { getByTestId } = render(
      <SyllabusContext.Provider value={mockSyllabusContext}>
        <SyllabusOther />
      </SyllabusContext.Provider>
    );

    const richTextInput = screen.getByTestId("rich-text-input");
    fireEvent.change(richTextInput, {
      target: { value: "New training principle content" },
    });

    expect(mockSyllabusContext.setOther).toHaveBeenCalledWith({
      ...mockSyllabusContext.other,
      trainingPrinciple: "New training principle content",
    });
  });

  it('updates state on input change', () => {
    const { getByLabelText } = render(<SyllabusOther />);
    
    const quizInput = screen.getByLabelText('Quiz *');
    fireEvent.change(quizInput, { target: { value: '20' } });
    
    expect(quizInput.value).toBe('20');
  });

  it('handles key events correctly', () => {
    const { getByLabelText } = render(<SyllabusOther />);
    
    const assignmentInput = screen.getByLabelText('Assignment *');
    fireEvent.keyDown(assignmentInput, { key: '+' });
    
    expect(assignmentInput.value).toBe('');
  });
});

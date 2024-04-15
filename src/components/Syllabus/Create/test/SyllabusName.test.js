import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../services/queries/queryClient";
// import { AuthProvider } from "../../utils/authUtil";
import SyllabusName from "../SyllabusName";
import { SyllabusContext } from "../../../../context/SyllabusContext";

const theme = createTheme();

describe("Syllabus Name", () => {
  test("renders Syllabus Name field", () => {
    render(
      <ThemeProvider theme={theme}>
        <SyllabusName />
      </ThemeProvider>
    );

    const syllabusNameLabel = screen.getByText(/Syllabus Name\*/i);
    expect(syllabusNameLabel).toBeInTheDocument();

    const syllabusNameInput = screen.getByRole("textbox", {
      name: /Syllabus Name\*/i,
    });
    expect(syllabusNameInput).toBeInTheDocument();
  });

  it('should call setGeneral and handleFieldValidation with correct arguments', () => {
    const setGeneral = jest.fn();
    const handleFieldValidation = jest.fn();
    const general = { syllabusName: '' };
    const error = { syllabusName: false };

    const { getByLabelText } = render(
      <SyllabusContext.Provider value={{ general, setGeneral, error, handleFieldValidation }}>
        <SyllabusName />
      </SyllabusContext.Provider>
    );

    const input = screen.getByLabelText('Syllabus Name*');
    fireEvent.change(input, { target: { value: 'New Syllabus Name' } });

    expect(setGeneral).toHaveBeenCalledWith(expect.any(Function)); // Check if setGeneral is called
    expect(handleFieldValidation).toHaveBeenCalledWith('syllabusName', 'New Syllabus Name'); // Check if handleFieldValidation is called with correct arguments
  });
});

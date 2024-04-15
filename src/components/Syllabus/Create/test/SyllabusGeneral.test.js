import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import SyllabusGeneral from "../SyllabusGeneral";

const theme = createTheme();

describe("Syllabus General", () => {
  it("renders syllabus general", () => {
    render(
      <ThemeProvider theme={theme}>
        <SyllabusGeneral />
      </ThemeProvider>
    );
  });

  test('handleGeneral updates general state correctly for trainingAudience field', () => {
    const setGeneralMock = jest.fn();
    const handleFieldValidationMock = jest.fn();
    const generalState = {
      level: 'Beginner',
      trainingAudience: 10,
      technicalRequirement: '',
      courseObjective: ''
    };

    const { getByLabelText } = render(
      <SyllabusGeneral
        general={generalState}
        setGeneral={setGeneralMock}
        handleFieldValidation={handleFieldValidationMock}
      />
    );

    const audienceInput = screen.getByLabelText('Attendee number');
    fireEvent.change(audienceInput, { target: { value: '20' } });

    expect(setGeneralMock).toHaveBeenCalledWith({
      ...generalState,
      trainingAudience: 20
    });
    expect(handleFieldValidationMock).toHaveBeenCalledWith('trainingAudience', '20');
  });

  test('handleGeneral updates general state correctly for other fields', () => {
    const setGeneralMock = jest.fn();
    const handleFieldValidationMock = jest.fn();
    const generalState = {
      level: 'Beginner',
      trainingAudience: 10,
      technicalRequirement: '',
      courseObjective: ''
    };

    const { getByLabelText } = render(
      <SyllabusGeneral
        general={generalState}
        setGeneral={setGeneralMock}
        handleFieldValidation={handleFieldValidationMock}
      />
    );

    const levelSelect = screen.getByLabelText('Level');
    fireEvent.change(levelSelect, { target: { value: 'Advance' } });

    expect(setGeneralMock).toHaveBeenCalledWith({
      ...generalState,
      level: 'Advance'
    });
    expect(handleFieldValidationMock).toHaveBeenCalledWith('level', 'Advance');
  });

  test('input field should have minimum value of 1', () => {
    const { getByLabelText } = render(<SyllabusGeneral />);
    const inputField = screen.getByLabelText('Attendee number'); // Assuming 'Attendee number' is the label for the input field

    fireEvent.change(inputField, { target: { value: '0' } });
    expect(inputField.value).toBe('1'); // Minimum value constraint enforced

    fireEvent.change(inputField, { target: { value: '-5' } });
    expect(inputField.value).toBe('1'); // Minimum value constraint enforced

    fireEvent.change(inputField, { target: { value: '10' } });
    expect(inputField.value).toBe('10'); // Input within allowed range
  });

  test('should prevent typing "+" or "-" in the input field', () => {
    const { getByLabelText } = render(<SyllabusGeneral />);
    const inputField = screen.getByLabelText('Attendee number'); // Assuming 'Attendee number' is the label for the input field

    fireEvent.keyDown(inputField, { key: '+' });
    fireEvent.keyDown(inputField, { key: '-' });
    expect(inputField.value).toBe(''); // No change as typing '+' or '-' is prevented
  });
});

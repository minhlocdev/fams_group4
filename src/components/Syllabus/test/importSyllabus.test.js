import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import { ImportSyllabus } from "../importSyllabus";

const theme = createTheme();

describe("Import Syllabus", () => {
  it("render import syllabus", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ImportSyllabus />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

  it('handleDuplicateHandleChange updates duplicateHandle state correctly', () => {
    const handleClose = jest.fn(); // Mocking handleClose function
    const { getByLabelText } = render(
      <ImportSyllabus isOpen={true} handleClose={handleClose} />
    );

    const allowRadio = screen.getByLabelText('Allow');
    const replaceRadio = screen.getByLabelText('Replace');
    const skipRadio = screen.getByLabelText('Skip');

    fireEvent.click(allowRadio);
    expect(allowRadio).toBeChecked();
    expect(replaceRadio).not.toBeChecked();
    expect(skipRadio).not.toBeChecked();

    fireEvent.click(replaceRadio);
    expect(allowRadio).not.toBeChecked();
    expect(replaceRadio).toBeChecked();
    expect(skipRadio).not.toBeChecked();

    fireEvent.click(skipRadio);
    expect(allowRadio).not.toBeChecked();
    expect(replaceRadio).not.toBeChecked();
    expect(skipRadio).toBeChecked();
  });

  it('handleChange updates the file state correctly', () => {
    const { getByLabelText } = render(<ImportSyllabus isOpen={true} handleClose={() => {}} />);
    
    const file = new File(['test'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText('Select');
  
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files[0]).toEqual(file);
  });
  
  it('setCodeCheckboxChecked updates checkbox state correctly', () => {
    render(<ImportSyllabus isOpen={true} handleClose={() => {}} />);
    const codeCheckbox = screen.getByLabelText('Syllabus code');
  
    expect(codeCheckbox.checked).toBeFalsy(); // Initially unchecked
  
    fireEvent.click(codeCheckbox); // Simulate click
  
    expect(codeCheckbox.checked).toBeTruthy(); // Now checked
  });
  
  it('setNameCheckboxChecked updates checkbox state correctly', () => {
    render(<ImportSyllabus isOpen={true} handleClose={() => {}} />);
    const nameCheckbox = screen.getByLabelText('Syllabus name');
  
    expect(nameCheckbox.checked).toBeFalsy(); // Initially unchecked
  
    fireEvent.click(nameCheckbox); // Simulate click
  
    expect(nameCheckbox.checked).toBeTruthy(); // Now checked
  });

  it('handleFile()', () => {
    const handleFile = jest.fn()

    render(<ImportSyllabus isOpen={true} handleClose={() => {}} />);
    const importBtn = screen.getByText('Import');
    fireEvent.click(importBtn); // Simulate click
  
    expect(handleFile).toHaveBeenCalled(); // Now checked
  });
});

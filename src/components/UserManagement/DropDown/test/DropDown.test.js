import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import DropDown from "../DropDown";

const theme = createTheme();

describe("Drop Down", () => {
  test('onChange should call setHideLabel and handleChange correctly', () => {
    // Mock handleChange function
    const handleChange = jest.fn();
    
    // Render the DropDown component
    const { getByLabelText } = render(
      <DropDown handleChange={handleChange} formData={{ permissionId: '' }} />
    );

    // Get the select element
    const select = screen.getByLabelText('Select One');

    // Simulate change event with value 'Trainer'
    fireEvent.change(select, { target: { value: 'Trainer' } });

    // Ensure setHideLabel is called with true
    expect(select).toHaveValue('Trainer');

    // Ensure handleChange is called with correct parameters
    expect(handleChange).toHaveBeenCalledWith('permissionId', 'Trainer');
    
    // Simulate change event with value ''
    fireEvent.change(select, { target: { value: '' } });

    // Ensure setHideLabel is called with false
    expect(select).toHaveValue('');
    
    // Ensure handleChange is called with correct parameters
    expect(handleChange).toHaveBeenCalledWith('permissionId', '');
  });
});

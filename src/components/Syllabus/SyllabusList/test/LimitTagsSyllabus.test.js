import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createTheme } from "@mui/material/styles";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../services/queries/queryClient";
// import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import LimitTagsSyllabus from "../LimitTagsSyllabus";

const theme = createTheme();

describe("Limit Tags Syllabus", () => {
  it("renders limit tags syllabus", () => {
    render(
      <ThemeProvider theme={theme}>
        <LimitTagsSyllabus />
      </ThemeProvider>
    );
  });

  const mockOnTagsChange = jest.fn();

  it('calls onTagsChange with the correct value when handleAutocompleteChange is called', () => {
    // Arrange
    const data = ['Option 1', 'Option 2', 'Option 3'];
    const selectedTags = [];
    const loading = false;
    const { getByTestId } = render(
      <LimitTagsSyllabus
        data={data}
        selectedTags={selectedTags}
        onTagsChange={mockOnTagsChange}
        loading={loading}
      />
    );

    const inputField = screen.getByTestId('autocomplete-input');

    // Act
    fireEvent.change(inputField, { target: { value: 'Option 1' } });

    // Assert
    expect(mockOnTagsChange).toHaveBeenCalledWith('Option 1');
  });

  it('opens and closes Autocomplete correctly', () => {
    // Arrange
    const data = ['Option 1', 'Option 2', 'Option 3'];
    const selectedTags = [];
    const loading = false;
    const { getByRole } = render(
      <LimitTagsSyllabus
        data={data}
        selectedTags={selectedTags}
        onTagsChange={() => {}}
        loading={loading}
      />
    );

    const autocomplete = screen.getByRole('combobox');

    // Act
    fireEvent.focus(autocomplete);

    // Assert
    expect(autocomplete.getAttribute('aria-expanded')).toBe('true');

    // Act
    fireEvent.blur(autocomplete);

    // Assert
    expect(autocomplete.getAttribute('aria-expanded')).toBe('false');
  });
});

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import SyllabusButtons from "../SyllabusButtons";
import { SyllabusContext } from "../../../../context/SyllabusContext";

const theme = createTheme();

describe("Syllabus Button", () => {
  it("renders syllabus button", () => {
    render(
      <ThemeProvider theme={theme}>
        <SyllabusButtons />
      </ThemeProvider>
    );
  });

  // Mocking the context value
  const mockContextValue = {
    handleTabChange: jest.fn(),
    activeTab: 1,
    handleSave: jest.fn(), // You can add more mocks if needed
  };

  test("Previous button click should call handleTabChange with activeTab - 1", () => {
    const { getByText } = render(
      <SyllabusContext.Provider value={mockContextValue}>
        <SyllabusButtons />
      </SyllabusContext.Provider>
    );

    fireEvent.click(screen.getByText("Previous"));
    expect(mockContextValue.handleTabChange).toHaveBeenCalledWith(0);
  });

  test("Next button click should call handleTabChange with activeTab + 1", () => {
    const { getByText } = render(
      <SyllabusContext.Provider value={mockContextValue}>
        <SyllabusButtons />
      </SyllabusContext.Provider>
    );

    fireEvent.click(screen.getByText("Next"));
    expect(mockContextValue.handleTabChange).toHaveBeenCalledWith(2);
  });
});

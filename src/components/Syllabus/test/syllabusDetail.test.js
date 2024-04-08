import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import Syllabusdetail from "../syllabusDetail";
import { SyllabusContext } from "../../../context/SyllabusContext";

const theme = createTheme();

// Mocking the context values
const mockContextValues = {
  selectedDay: "mockSelectedDay",
  unitId: "mockUnitId",
  setModalData: jest.fn(),
  setSyllabusID: jest.fn(),
  setSelectedDay: jest.fn(),
  setUnitId: jest.fn(),
  OpenTrainingMaterialModal: jest.fn(),
};

// Mocking the event object
const mockEvent = {
  stopPropagation: jest.fn(),
};

// Wrapping the component with mocked context values
const renderWithContext = (component) => {
  return render(
    <SyllabusContext.Provider value={mockContextValues}>
      {component}
    </SyllabusContext.Provider>
  );
};

describe("Syllabus Detail", () => {
  it("render syllabus detail", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Syllabusdetail />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

  it("should set modal data and stop event propagation", () => {
    const { getByText } = renderWithContext(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Syllabusdetail
              unit={{
                id: "mockUnitId",
                datasyllabus: [
                  {
                    id: 1,
                    title: "Title 1",
                    output: "Output 1",
                    time: "10:00",
                    method: "Online",
                    deliveryType: "Test/Quiz",
                    TrainingMaterial: "Material 1",
                  },
                ],
              }}
              day={{ id: "mockDayId" }}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Title 1")); // Clicking on the title to trigger handleProps

    expect(mockContextValues.setSelectedDay).toHaveBeenCalled();
    expect(mockContextValues.setUnitId).toHaveBeenCalledWith("mockUnitId");
    expect(mockContextValues.OpenTrainingMaterialModal).toHaveBeenCalled();
    expect(mockContextValues.setSyllabusID).toHaveBeenCalledWith(1); // Assuming e.id is the syllabus ID
    expect(mockContextValues.setModalData).toHaveBeenCalledWith({
      day: "mockDayId",
      title: "Title 1",
      unit: "mockUnitId",
      TrainingMaterial: "Material 1",
      unitTitle: undefined, // Assuming unit.title is not provided in the test data
    });
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });
});

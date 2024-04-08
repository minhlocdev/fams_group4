import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import TrainingCalendar from "../../pages/TrainingCalendar";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../utils/authUtil";
import queryClient from "../../services/queries/queryClient";

const theme = createTheme();

describe("Training Calendar", () => {
  it("renders component", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <TrainingCalendar />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Day")).toBeInTheDocument();
    expect(screen.getByText("Week")).toBeInTheDocument();
  });
  it("changes calendar view from day to week", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <TrainingCalendar />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const weekButton = screen.getByText("Week");
    expect(weekButton).toHaveStyle({
      backgroundColor: "white",
      color: "black",
    });
    // Click on the "Week" button to change the view
    fireEvent.click(screen.getByText("Week"));

    expect(screen.getByText("Week")).toBeInTheDocument();
    // Check if the component now renders the WeekCalendar instead of DayCalendar
    expect(weekButton).toHaveStyle({
      backgroundColor: "#2D3748",
      color: "white",
    });
  });
  it("changes calendar view from week to day", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <TrainingCalendar />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const dayButton = screen.getByText("Day");
    expect(dayButton).toHaveStyle({
      backgroundColor: "#2D3748",
      color: "white",
    });
    // Click on the "day" button to change the view
    fireEvent.click(screen.getByText("Week"));
    // Check if the component now renders the dayCalendar instead of DayCalendar

    expect(dayButton).toHaveStyle({
      backgroundColor: "white",
      color: "black",
    });
    fireEvent.click(screen.getByText("Day"));
    expect(dayButton).toHaveStyle({
        backgroundColor: "#2D3748",
        color: "white",
      });
  });
});

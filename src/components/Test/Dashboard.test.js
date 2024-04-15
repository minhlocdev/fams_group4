import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider, createTheme } from "@mui/material";
import queryClient from "../../services/queries/queryClient";
import { AuthProvider } from "../../utils/authUtil";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "../../pages/Dashboard";


const theme = createTheme();

describe("Dashboard", () => {
  it("renders dashboard component", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <Dashboard/>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    
    // You can add assertions here to verify specific elements or text content
    expect(screen.getByText("Trainer")).toBeInTheDocument();
    expect(screen.getByText("Class")).toBeInTheDocument();
    expect(screen.getByText("Syllabus")).toBeInTheDocument();
    expect(screen.getByText("Training")).toBeInTheDocument();
  });

  it("displays correct initial counts", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <Dashboard/>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    // Add assertions to verify the initial counts
    expect(screen.getByText("0")).toBeInTheDocument(); // Assuming the initial count is displayed as '0'
  });

  // Add more test cases to cover other functionality or behaviors
});

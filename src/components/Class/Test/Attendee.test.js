import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider, createTheme } from "@mui/material";
import queryClient from "../../../services/queries/queryClient";
import { AuthProvider } from "../../../utils/authUtil";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import Attendee from "../Attendee";

const theme = createTheme();

describe("Attendee", () => {
  test("expands and collapses on click", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <Attendee />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const expandButton = screen.getByLabelText("show more");

    // Clicking the expand button should reveal the collapse content
    fireEvent.click(expandButton);

    // Wait for the first element to be visible
    await waitFor(() => {
      expect(screen.getByText("Planned")).toBeInTheDocument();
    });

    // Wait for the second element to be visible
    await waitFor(() => {
      expect(screen.getByText("Accepted")).toBeInTheDocument();
    });

    // Wait for the third element to be visible
    await waitFor(() => {
      expect(screen.getByText("Actual")).toBeInTheDocument();
    });

    // Clicking the expand button again should collapse the content
    fireEvent.click(expandButton);

    // Wait for the first element to be removed
    await waitFor(() => {
      expect(screen.queryByText("Planned")).not.toBeInTheDocument();
    });

    // Wait for the second element to be removed
    await waitFor(() => {
      expect(screen.queryByText("Accepted")).not.toBeInTheDocument();
    });

    // Wait for the third element to be removed
    await waitFor(() => {
      expect(screen.queryByText("Actual")).not.toBeInTheDocument();
    });
  });
});

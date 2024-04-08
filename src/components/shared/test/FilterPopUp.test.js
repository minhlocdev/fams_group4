import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FilterPopUp from "../FilterPopUp";
import { createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../utils/authUtil";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../../services/queries/queryClient";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme();

describe("Filter Pop Up", () => {
  it("renders filter box component", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <FilterPopUp />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  });
});

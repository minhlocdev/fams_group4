import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BackdropLoader from "../BackdropLoader";
import { ThemeProvider, createTheme } from "@mui/material";
import queryClient from "../../../../services/queries/queryClient";
import { AuthProvider } from "../../../../utils/authUtil";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme();

describe("Backdrop Loader", () => {
  it("renders backdrop loader component", () => {
    render(
        <BrowserRouter>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <BackdropLoader />
              </ThemeProvider>
            </QueryClientProvider>
          </AuthProvider>
        </BrowserRouter>
      );
  });
});

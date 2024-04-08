import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import ImportTrainingProgram from "../ImportTraningProgram";
import queryClient from "../../../services/queries/queryClient";

const theme = createTheme();

describe("Import Training Program", () => {
  it("render import training program", () => {

    const isOpen = jest.fn()
    const handleClose = jest.fn()

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ImportTrainingProgram isOpen={isOpen} handleClose={handleClose} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

});

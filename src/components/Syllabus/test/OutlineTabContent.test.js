import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import OutlineTabContent from "../OutlineTabContent";

const theme = createTheme();

describe("Outline Tab Content", () => {
  it("render outline tab content", () => {

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <OutlineTabContent />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

  
});

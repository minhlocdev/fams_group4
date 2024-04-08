import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import RichText from "../RichText";

const theme = createTheme();

describe("Rich Text", () => {
  it("render rich text", () => {

    const value = jest.fn()
    const onChange = jest.fn()
    const error = jest.fn()

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <RichText value={value} onChange={onChange} error={error}/>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

  
});

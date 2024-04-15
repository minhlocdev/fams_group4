import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../services/queries/queryClient";
// import { AuthProvider } from "../../utils/authUtil";
import DropDown from "../SyllabusModalDropDown";

const theme = createTheme();

describe("Syllabus Modal Dropdown", () => {
  test("renders syllabus modal dropdown", () => {
    render(
      <ThemeProvider theme={theme}>
        <DropDown />
      </ThemeProvider>
    );
  });
});

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../services/queries/queryClient";
// import { AuthProvider } from "../../utils/authUtil";
import SyllabusOther from "../SyllabusOther";

const theme = createTheme();

describe("Syllabus Other", () => {
  test("renders syllabus other", () => {
    render(
      <ThemeProvider theme={theme}>
        <SyllabusOther />
      </ThemeProvider>
    );
  });
});

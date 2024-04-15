import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import SyllabusHeader from "../SyllabusHeader";

const theme = createTheme();

describe("Syllabus Header", () => {
  it("renders syllabus header", () => {
    render(
      <ThemeProvider theme={theme}>
        <SyllabusHeader />
      </ThemeProvider>
    );
  });
});

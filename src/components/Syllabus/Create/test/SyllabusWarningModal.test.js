import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { SyllabusDeleteWarningModal, SyllabusWarningModal } from "../SyllabusWarningModal";


const theme = createTheme();

describe("Syllabus Warning Modal", () => {
  it("renders syllabus warning modal", () => {
    render(
      <ThemeProvider theme={theme}>
        <SyllabusWarningModal />
        <SyllabusDeleteWarningModal />
      </ThemeProvider>
    );
  });
});

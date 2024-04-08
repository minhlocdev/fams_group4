import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import FilterBoxProgram from "../FilterBoxProgram";

const theme = createTheme();

describe("Filter Box Program", () => {
  it("renders filter box program component", () => {
    render(
      <ThemeProvider theme={theme}>
        <FilterBoxProgram />
      </ThemeProvider>
    );
  });

});
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import SearchUser from "../SearchUser";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../../../services/queries/queryClient";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme();

describe("Search User", () => {
  it("renders search user component", () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SearchUser />
        </ThemeProvider>
      </BrowserRouter>
    );
  });
});

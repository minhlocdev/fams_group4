import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../../../services/queries/queryClient";
// import UserListing from "../UserListing";
// import { AuthProvider } from "../../../../utils/authUtil";
import { BrowserRouter } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../utils/authUtil";
import {
  BasicFilterProgrambtn,
  DoubleFilterbtn,
  GrayFilterbtn,
  IconFilterbtn,
  LageFilterbtn,
  LinkFilterbtn,
  NoneIconFilterbtn,
} from "../FilterButtonProgram";

const theme = createTheme();

describe("Filter Button Program", () => {
  it("renders basic filter button program component", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <BasicFilterProgrambtn />
              <DoubleFilterbtn />
              <LageFilterbtn />
              <LinkFilterbtn />
              <NoneIconFilterbtn />
              <IconFilterbtn />
              <GrayFilterbtn />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it("renders double filter button program component", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}></ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it("renders large filter button program component", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}></ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it("renders link filter button program component", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}></ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  });
});

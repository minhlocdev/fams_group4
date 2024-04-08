import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppContainer from "../../components/shared/layout/AppContainer";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppContainer from "../../components/shared/layout/AppContainer";

import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { Header } from "../../components/shared/layout/header";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../services/queries/queryClient";
import { AuthProvider } from "../../utils/authUtil";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { Header } from "../../components/shared/layout/header";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../services/queries/queryClient";
import { AuthProvider } from "../../utils/authUtil";
const theme = createTheme();

describe("AppContainer", () => {
  it("renders component", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
describe("AppContainer", () => {
              it("renders component", () => {
                render(
                  <BrowserRouter>
                    <AuthProvider>
                      <QueryClientProvider client={queryClient}>
                        <ThemeProvider theme={theme}>
                          <AppContainer>Test Content</AppContainer>
                          <AppContainer>Test Content</AppContainer>
                        </ThemeProvider>
                      </QueryClientProvider>
                    </AuthProvider>
                  </BrowserRouter>
                );
                expect(screen.getByText("Test Content")).toBeInTheDocument();
              }); //ok
  it("should adjust layout based on sidebar", () => {
              render(
                <BrowserRouter>
                  <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                    </QueryClientProvider>
                  </AuthProvider>
                </BrowserRouter>
              );
            expect(screen.getByText("Test Content")).toBeInTheDocument();
  }); //ok
  it("should adjust layout based on sidebar", () => {
              render(
                <BrowserRouter>
                  <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                      <ThemeProvider theme={theme}>
                        <AppContainer>Test Content</AppContainer>
                        <AppContainer>Test Content</AppContainer>
                      </ThemeProvider>
                    </QueryClientProvider>
                  </AuthProvider>
                </BrowserRouter>
              );
            fireEvent.click(screen.getByRole("button", {name: "open drawer" }));
            expect(screen.getByText("Home")).toBeInTheDocument();
  });
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: "open drawer" }));
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});

describe("Header", () => {
  it("renders component", () => {
    window.innerWidth = 2000;
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
describe("Header", () => {
              it("renders component", () => {
                window.innerWidth = 2000;
                render(
                  <BrowserRouter>
                    <AuthProvider>
                      <QueryClientProvider client={queryClient}>
                        <ThemeProvider theme={theme}>
                          <Header />
                          <Header />
                        </ThemeProvider>
                      </QueryClientProvider>
                    </AuthProvider>
                  </BrowserRouter>
                );
                expect(screen.getByText("Log out")).toBeInTheDocument();
                expect(screen.getByAltText("logo fpt")).toBeInTheDocument();
              }); //ok
});

test("Footer renders with correct styles", () => { }); //ok
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Log out")).toBeInTheDocument();
    expect(screen.getByAltText("logo fpt")).toBeInTheDocument();
  }); //ok
});

test("Footer renders with correct styles", () => { }); //ok

test("Sidebar renders with correct styles", () => { }); //ok
test("Sidebar renders with correct styles", () => { }); //ok

test("MobileSidebar renders with correct styles", () => { }); //ok
test("MobileSidebar renders with correct styles", () => { }); //ok

it("MobileSidebar renders correctly on mobiles screens", () => {
  // Set the screen size to a smaller value
  // Render the component
  // render(<MyApp />);
  // Verify that the component styles are correct for the default screen size
  // const pElement = screen.getByText("Hello Mobile");
  // expect(pElement).toBeInTheDocument();
  // Set the screen size to a smaller value
  // Render the component
  // render(<MyApp />);
  // Verify that the component styles are correct for the default screen size
  // const pElement = screen.getByText("Hello Mobile");
  // expect(pElement).toBeInTheDocument();
});

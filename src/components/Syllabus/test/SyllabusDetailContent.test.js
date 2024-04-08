import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import SyllabusDetailContent from "../SyllabusDetailContent";
import { SyllabusContext } from "../../../context/SyllabusContext";

const theme = createTheme();

describe("Syllabus Detail Content", () => {
  it("render syllabus detail content", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <SyllabusDetailContent />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

  test("renders Outline tab content when activeTab is 1", () => {
    const syllabusContextValue = {
      activeTab: 1,
      setActiveTab: jest.fn(),
    };

    render(
      <SyllabusContext.Provider value={syllabusContextValue}>
        <SyllabusDetailContent />
      </SyllabusContext.Provider>
    );

    expect(screen.getByRole('tab', {name: "Outline"})).toBeInTheDocument();
  });

  test("renders Other tab content when activeTab is 2", () => {
    const syllabusContextValue = {
      activeTab: 2,
      setActiveTab: jest.fn(),
    };

    render(
      <SyllabusContext.Provider value={syllabusContextValue}>
        <SyllabusDetailContent />
      </SyllabusContext.Provider>
    );

    expect(screen.getByRole('tab', {name: "Other"})).toBeInTheDocument();
  });

  test("does not render any tab content when activeTab is not 0, 1, or 2", () => {
    const syllabusContextValue = {
      activeTab: 3,
      setActiveTab: jest.fn(),
    };

    const { queryByTestId } = render(
      <SyllabusContext.Provider value={syllabusContextValue}>
        <SyllabusDetailContent />
      </SyllabusContext.Provider>
    );

    expect(screen.queryByTestId("general-tab-content")).toBeNull();
    expect(screen.queryByTestId("outline-tab-content")).toBeNull();
    expect(screen.queryByTestId("other-tab-content")).toBeNull();
  });

  test("changes activeTab when a tab is clicked", () => {
    const syllabusContextValue = {
      activeTab: 0,
      setActiveTab: jest.fn(),
    };

    render(
      <SyllabusContext.Provider value={syllabusContextValue}>
        <SyllabusDetailContent />
      </SyllabusContext.Provider>
    );

    fireEvent.click(screen.getByRole("tab", {name: "Outline"}));

    expect(syllabusContextValue.setActiveTab).toHaveBeenCalled();
  });
});

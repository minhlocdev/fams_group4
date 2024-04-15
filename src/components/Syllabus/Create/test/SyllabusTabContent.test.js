import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import SyllabusTabContent from "../SyllabusTabContent";
import { SyllabusContext } from "../../../../context/SyllabusContext";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../services/queries/queryClient";
// import { AuthProvider } from "../../utils/authUtil";

const theme = createTheme();

jest.mock("../../../../context/SyllabusContext", () => ({
    SyllabusContext: {
      Consumer: ({ children }) =>
        children({
          activeTab: 0 // assuming initial activeTab is 0 for testing
        })
    }
  }));

describe("Syllabus Tab Content", () => {
    it("renders SyllabusGeneral when activeTab is 0", () => {
        const { getByTestId } = render(
          <SyllabusContext.Consumer>
            {({ activeTab }) => (
              <SyllabusTabContent activeTab={activeTab} />
            )}
          </SyllabusContext.Consumer>
        );
    
        expect(screen.getByTestId("syllabus-general")).toBeInTheDocument();
      });
    
      it("renders SyllabusOutline when activeTab is 1", () => {
        // Mocking activeTab as 1
        jest.spyOn(SyllabusContext, "useContext").mockImplementation(() => ({
          activeTab: 1
        }));
    
        const { getByTestId } = render(
          <SyllabusContext.Consumer>
            {({ activeTab }) => (
              <SyllabusTabContent activeTab={activeTab} />
            )}
          </SyllabusContext.Consumer>
        );
    
        expect(screen.getByTestId("syllabus-outline")).toBeInTheDocument();
      });
    
      it("renders SyllabusOther when activeTab is 2", () => {
        // Mocking activeTab as 2
        jest.spyOn(SyllabusContext, "useContext").mockImplementation(() => ({
          activeTab: 2
        }));
    
        const { getByTestId } = render(
          <SyllabusContext.Consumer>
            {({ activeTab }) => (
              <SyllabusTabContent activeTab={activeTab} />
            )}
          </SyllabusContext.Consumer>
        );
    
        expect(screen.getByTestId("syllabus-other")).toBeInTheDocument();
      });
});

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../services/queries/queryClient";
import { AuthProvider } from "../../utils/authUtil";
import TrainingMaterialModalCreate from "../TrainingMaterialModalCreate";

const theme = createTheme();

describe("Training Material Modal Create", () => {
  it("renders correctly", () => {
    const dataUnitId = "someId";
    const openTraining = true;
    const handleClose = jest.fn();
    const dayIndex = 0;
    const unitIndex = 0;
    const dataUnitIndex = 0;

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <TrainingMaterialModalCreate
                dataUnitId={dataUnitId}
                openTraining={openTraining}
                handleClose={handleClose}
                dayIndex={dayIndex}
                unitIndex={unitIndex}
                dataUnitIndex={dataUnitIndex}
              />
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    );
  });
});

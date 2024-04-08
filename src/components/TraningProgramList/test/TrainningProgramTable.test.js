import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import TrainingProgramTable from "../TrainningProgramTable";

const theme = createTheme();

describe("Training Program Table", () => {
  it("render training program table", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <TrainingProgramTable />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

//   it("change page", () => {
//     const handleChangePage = {
//       setPage: jest.fn(),
//       setSearchParam: jest.fn(),
//     };

//     render(
//       <BrowserRouter>
//         <QueryClientProvider client={queryClient}>
//           <ThemeProvider theme={theme}>
//             <TrainingProgramTable setPage={handleChangePage.setPage} setSearchParam={handleChangePage.setSearchParam}/>
//           </ThemeProvider>
//         </QueryClientProvider>
//       </BrowserRouter>
//     );
//   });

});

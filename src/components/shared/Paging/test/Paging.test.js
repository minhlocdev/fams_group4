import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createTheme } from "@mui/material/styles";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../services/queries/queryClient";
import Paging from "../Paging";
// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "@emotion/react";

const theme = createTheme();

describe("Paging", () => {
  it("renders without crashing", () => {
//     render(<Paging />);
//   });

//   it("updates page when pagination item is clicked", () => {
//     const { getByText } = render(<Paging />);
//     fireEvent.click(screen.getByText("2")); // Click on the second page
//     expect(screen.getByText("2").classList.contains("Mui-selected")).toBe(true);
//   });

//   it("updates rows per page when select option is changed", () => {
//     const { getByLabelText, getByText } = render(<Paging />);
//     fireEvent.change(screen.getByLabelText("Rows per page"), {
//       target: { value: "10" },
//     });
//     expect(screen.getByText("1-10 of 10")).toBeInTheDocument(); // Assert that it's displaying 10 rows per page
  });
});

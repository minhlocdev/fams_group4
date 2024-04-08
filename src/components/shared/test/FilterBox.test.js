import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FilterBox from "../FilterBox";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme();

describe("Filter Box", () => {
  it("renders filter box component", () => {
    render(
      <ThemeProvider theme={theme}>
        <FilterBox />
      </ThemeProvider>
    );
  });

  // it("clears selections when handleClear is called", () => {
  //   // Render the FilterBox component
  //   render(<FilterBox />);

  //   // Simulate selecting checkboxes and adding tags
  //   const morningCheckbox = screen.getByText("Morning");
  //   fireEvent.click(morningCheckbox); // Select "Morning" checkbox

  //   // Simulate adding location tags
  //   const locationInput = screen.getByText("Class Location");
  //   fireEvent.change(locationInput, { target: { value: "An Giang" } });

  //   // Trigger the handleClear function by clicking the Clear button
  //   fireEvent.click(screen.getByText("Clear"));

  //   // Assert that the checked and selectedTags states are empty
  //   expect(screen.queryAllByRole("checkbox")).toHaveLength(0); // No checkboxes selected
  //   expect(screen.queryAllByRole("listitem")).toHaveLength(0); // No tags selected
  // });
});

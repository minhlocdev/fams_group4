import React from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createTheme } from "@mui/material/styles";
import LimitTags, {
  InputBoxSearchError,
  InputBoxSearchFilled,
  InputBoxSearchWithChip,
  InputBoxTwoSearch,
} from "../InputBox";

const theme = createTheme();

describe("Input Box", () => {
  it("render input box search error component", () => {
    render(<InputBoxSearchError />);
  });

  it("render input box search filled component", () => {
    render(<InputBoxSearchFilled />);
  });

  it("render input box two search component", () => {
    render(<InputBoxTwoSearch />);
  });

  // it("render input box search and handle delete chip with chip component", () => {
  //   render(<InputBoxSearchWithChip />);
  //   const deleteIcon = screen.getByTestId("CancelIcon");

  //   fireEvent.click(deleteIcon);

  //   // Ensure that handleDelete function is called
  //   expect(screen.queryByText("An Giang")).not.toBeInTheDocument();
  // });

  
});

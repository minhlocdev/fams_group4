import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  BasicFilterbtn,
  DoubleFilterbtn,
  GrayFilterbtn,
  IconFilterbtn,
  LageFilterbtn,
  LinkFilterbtn,
  NoneIconFilterbtn,
} from "../filterButton";

describe("Filter Button", () => {
  it("renders double filter btn component", () => {
    render(<DoubleFilterbtn />);
  });

  it("renders icon filter btn component", () => {
    render(<IconFilterbtn />);
  });

  it("renders none icon filter btn component", () => {
    render(<NoneIconFilterbtn />);
  });

  it("renders large filter btn component", () => {
    render(<LageFilterbtn />);
  });

  it("renders gray filter btn component", () => {
    render(<GrayFilterbtn />);
  });

  it("renders link filter btn component", () => {
    render(<LinkFilterbtn />);
  });

  // it("close filter button", () => {
  //   const initialState = {
  //     anchorEl: null, // Assuming it's initially closed
  //     setAnchorEl: jest.fn(), // Mock setIsFilterPopupOpen function
  //   };

  //   render(
  //     <BasicFilterbtn
  //       anchorEl={initialState.anchorEl}
  //       setAnchorEl={initialState.setAnchorEl}
  //     />
  //   ); // Pass initial state as props

  //   // Simulate a click event on the element that triggers handleFilterClick
  //   fireEvent.click(screen.getByText("Filter"));

  //   expect(initialState.setAnchorEl).toHaveBeenCalled(); // Expecting it to be closed
  // });
});

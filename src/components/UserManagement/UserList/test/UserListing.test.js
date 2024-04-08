import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import PopupMenu from "../PopupMenu";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../../../services/queries/queryClient";
import UserListing from "../UserListing";
import { AuthProvider } from "../../../../utils/authUtil";
import { BrowserRouter, Router } from "react-router-dom";

const theme = createTheme();

describe("User Listing", () => {
  it("handles page changes correctly", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <UserListing />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
    const nextPageButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextPageButton);
    await screen.findByLabelText("table-loader");
    // After page change, verify updated state and data display
  });

  it("handles rows per page changes correctly", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <UserListing />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
    const rowsPerPageSelect = screen.getByTestId("ArrowDropDownIcon");
    fireEvent.change(rowsPerPageSelect, { target: { value: "25" } });
    await screen.findByLabelText("table-loader");
    // After rows per page change, verify updated state and data display
  });

  it("displays loader when loading data", async () => {
    // Mock the useGetUserQuery hook to return isLoading as true
    jest.mock("../../../../services/queries/userQuery", () => ({
      useGetUserQuery: jest.fn(() => ({ data: [], isLoading: true })),
      useGetAllUserQuery: jest.fn(() => ({ data: [] })),
    }));

    const { getByTestId } = render(<UserListing />);
    const loader = screen.getByTestId("table-loader");
    expect(loader).toBeInTheDocument();
  });

  test('updates params and setSearchParams correctly', () => {
    const mockSetSearchParams = jest.fn();
    const mockParamsSet = jest.fn();

    const mockSort = {
      item: 'name', // or any other field you want to sort by
      dir: 'asc', // or 'desc' depending on your implementation
    };

    const mockSearchParams = {
      get: jest.fn(() => null),
      set: mockParamsSet,
      toString: jest.fn(() => 'mocked-search-params'),
    };

    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(mockSearchParams.get);
    jest.spyOn(URLSearchParams.prototype, 'set').mockImplementation(mockSearchParams.set);

    const { handleSortChange } = render(<UserListing />, {
      wrapper: ({ children }) => {
        return (
          <Router>
            {children}
          </Router>
        );
      },
    });

    handleSortChange(mockSort);

    expect(mockSearchParams.set).toHaveBeenCalledWith('orderby', 'name');
    expect(mockSearchParams.set).toHaveBeenCalledWith('order', 'asc');
    expect(mockSetSearchParams).toHaveBeenCalledWith('mocked-search-params');
  });
});

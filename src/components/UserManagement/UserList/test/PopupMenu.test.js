import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import PopupMenu from "../PopupMenu";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../../../services/queries/queryClient";

const theme = createTheme();

describe("Popup Menu", () => {
  it("renders popup menu component", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <PopupMenu item={{ id: 1, name: "Test User" }} />
        </ThemeProvider>
      </QueryClientProvider>
    );
    expect(screen.getByRole("button", { name: "more" })).toBeInTheDocument();
  });

  it("handle click", () => {
    // Render the PopupMenu component
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <PopupMenu item={{ id: 1 }} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    // Find the IconButton component and simulate a click event
    const iconButton = screen.getByLabelText("more");
    fireEvent.click(iconButton);

    // Check if anchorEl is set correctly
    expect(iconButton).toHaveAttribute("aria-controls", "long-menu");
  });

  it("close popup menu update", () => {
    // Render the PopupMenu component
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <PopupMenu item={{ id: 1 }} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    // Find the IconButton component and simulate a click event
    const iconButton = screen.getByLabelText("more");
    fireEvent.click(iconButton);
  });

  it("open modal", () => {
    // Render the component
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <PopupMenu item={{ id: 1 }} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    // Find the "more" button and click it to open the menu
    const moreButton = screen.getByLabelText("more");
    fireEvent.click(moreButton);

    // Find the "Delete User" menu item and click it
    const deleteUserMenuItem = screen.getByText("Delete User");
    fireEvent.click(deleteUserMenuItem);

    // Assert that the modal is open
    const modalTitle = screen.getByText("Delete user");
    expect(modalTitle).toBeInTheDocument();
  });
});

import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import UpdateUser from "../UpdateUser";

const theme = createTheme();

describe("Update User", () => {
  const handleCloseMock = jest.fn();

  const mockItem = {
    id: 1,
    permissionId: "somePermissionId",
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    dateOfBirth: "1990-01-01", // assuming this is in YYYY-MM-DD format
    gender: "Male",
    status: "Active",
  };

  it("renders with initial values", () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <UpdateUser
              isOpen={true}
              handleClose={handleCloseMock}
              item={mockItem}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("User name")).toHaveValue("John Doe");
    expect(screen.getByPlaceholderText("Email address")).toHaveValue(
      "john@example.com"
    );
    expect(screen.getByPlaceholderText("Phone number")).toHaveValue(
      "1234567890"
    );
    expect(screen.getByPlaceholderText("Select Date")).toHaveValue(
      "1990-01-01"
    );
    expect(screen.getByLabelText("Male")).toBeChecked();
    expect(screen.getByLabelText("Active")).toBeChecked();
  });

  it("updates form fields on change", () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <UpdateUser
              isOpen={true}
              handleClose={handleCloseMock}
              item={mockItem}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("User name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone number"), {
      target: { value: "9876543210" },
    });
    fireEvent.click(screen.getByLabelText("Female"), {
      target: { value: "Female" },
    });

    expect(screen.getByPlaceholderText("User name")).toHaveValue("Jane Doe");
    expect(screen.getByPlaceholderText("Email address")).toHaveValue(
      "jane@example.com"
    );
    expect(screen.getByPlaceholderText("Phone number")).toHaveValue(
      "9876543210"
    );
    expect(screen.getByLabelText("Female")).toBeChecked();
  });

  it("submits form data", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <UpdateUser
              isOpen={true}
              handleClose={handleCloseMock}
              item={mockItem}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(handleCloseMock).toHaveBeenCalled();
    });
  });

  test("calls handleChange on user name change", () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <UpdateUser
              isOpen={true}
              handleClose={handleCloseMock}
              item={mockItem}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText("User name");

    fireEvent.change(nameInput, { target: { value: "Hoang Anh ngu" } });

    expect(nameInput).toBe("Hoang Anh ngu");
  });
});

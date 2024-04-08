import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../utils/authUtil";
import queryClient from "../../../services/queries/queryClient";
import AddUser from "../AddUser";

const theme = createTheme();

describe("Add User", () => {
  it("handleChange", () => {
    const isSuccess = jest.fn();

    const { getByLabelText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <AddUser isOpen={true} />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText("User name");
    const emailInput = screen.getByPlaceholderText("Email address");
    const phoneInput = screen.getByPlaceholderText("Phone number");
    // const dateOfBirthInput = screen.getByPlaceholderText("Select Date");
    // const calendarBtn = screen.getByTestId("CalendarIcon");
    const genderInput = screen.getByDisplayValue("male");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, {
      target: { value: "baoptqce170696@fpt.edu.vn" },
    });
    fireEvent.change(phoneInput, { target: { value: "0123456789" } });
    // fireEvent.click(calendarBtn);
    // fireEvent.change(screen.getByText("31"));
    fireEvent.click(genderInput, { target: { value: "female" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("baoptqce170696@fpt.edu.vn");
    expect(phoneInput.value).toBe("0123456789");
    // expect(dateOfBirthInput.value).toBe("03/31/2024");
    expect(genderInput.value).toBe("female");
  });
});

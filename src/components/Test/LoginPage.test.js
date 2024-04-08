import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../../components/LoginPage";
import { postLoginUser } from "../../services/User";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../services/User");

describe("LoginPage Component", () => {
  test("renders login form", () => {
    render(
        <BrowserRouter> {/* Wrap LoginPage with BrowserRouter */}
          <LoginPage />
        </BrowserRouter>
      );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  test("displays validation errors on invalid form submission", async () => {
    render(
        <BrowserRouter> {/* Wrap LoginPage with BrowserRouter */}
          <LoginPage />
        </BrowserRouter>
      );
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Password is Required")).toBeInTheDocument();
    });
  });

  test("submits form successfully on valid input", async () => {
    postLoginUser.mockResolvedValueOnce({
      data: {
        token: "mockToken",
        expiration: "mockExpiration",
      },
    });

    render(
        <BrowserRouter> {/* Wrap LoginPage with BrowserRouter */}
          <LoginPage />
        </BrowserRouter>
      );
    userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    userEvent.type(screen.getByLabelText("Password"), "password");
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(postLoginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("ACCESS_TOKEN_KEY", "mockToken");
    });
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("EXPIRATION_KEY", "mockExpiration");
    });
    await waitFor(() => {
      expect(screen.queryByText("Email is required")).toBeNull();
    });
    await waitFor(() => {
      expect(screen.queryByText("Password is Required")).toBeNull();
    });
  });

  test("displays error message on failed form submission", async () => {
    postLoginUser.mockRejectedValueOnce({
      response: { data: "Invalid credentials" },
    });

    render(
        <BrowserRouter> {/* Wrap LoginPage with BrowserRouter */}
          <LoginPage />
        </BrowserRouter>
      );
    userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    userEvent.type(screen.getByLabelText("Password"), "password");
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(postLoginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });
    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});

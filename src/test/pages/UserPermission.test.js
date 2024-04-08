import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../services/queries/queryClient";
import { AuthProvider } from "../../utils/authUtil";
import UserPermission from "../../pages/UserPermission";
import AcceptUpdate from "../../components/UserManagement/AcceptUpdate";
import { BasicFilterbtn } from "../../components/shared/filterButton";
const theme = createTheme();

describe("User Permission", () => {
  it("renders component", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <UserPermission />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Update Permission")).toBeInTheDocument();
  });
  it("update permission", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <UserPermission />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const updatePermissionButton = screen.getByText("Update Permission");
    fireEvent.click(updatePermissionButton);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
  it("save update", () => {
    const setSave =  jest.fn()
    const setCancel = jest.fn()

    render(<AcceptUpdate onSave={setSave} onCancel={setCancel} />);

    expect(screen.getByText("Update permission?")).toBeInTheDocument();

    fireEvent.click(screen.getByText('Save'));

    expect(setSave).toHaveBeenCalled();
  });
  it("cancel update", () => {
    const setSave =  jest.fn()
    const setCancel = jest.fn()

    render(<AcceptUpdate onSave={setSave} onCancel={setCancel} />);

    expect(screen.getByText("Update permission?")).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(setCancel).toHaveBeenCalled();
  });
});

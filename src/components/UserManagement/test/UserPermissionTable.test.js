import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import UserPermissionTable from "../UserPermissionTable";

const theme = createTheme();

describe("Syllabus Detail", () => {
  it("function create data", () => {
    const permissionData = [
      {
        roleName: "Super Admin",
        syllabus: "Access Denied",
        trainingProgram: "Full Access",
        class: "Full Access",
        learningMaterial: "Full Access",
        userManagement: "View",
      },
      // Add more mock data as needed
    ];

    const { getByText } = render(
      <UserPermissionTable
        isUpdate={false}
        isSave={false}
        isLoading={false}
        setPermissionType={() => {}}
        permissionData={permissionData}
      />
    );

    // Assert the content of each cell in the first row
    expect(screen.getByText(permissionData[0].roleName)).toBeInTheDocument();
    expect(screen.getByText(permissionData[0].syllabus)).toBeInTheDocument();
    expect(screen.getByText(permissionData[0].trainingProgram)).toBeInTheDocument();
    expect(screen.getByText(permissionData[0].class)).toBeInTheDocument();
    expect(screen.getByText(permissionData[0].learningMaterial)).toBeInTheDocument();
    expect(screen.getByText(permissionData[0].userManagement)).toBeInTheDocument();
  });
});

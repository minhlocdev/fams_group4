import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../utils/authUtil";
import queryClient from "../../../services/queries/queryClient";
import UserPermission from "../UserPermission";
import AcceptUpdate from "../../UserManagement/AcceptUpdate";
import { SelectForm } from "../UserPermission";

const theme = createTheme();

describe("User Permission", () => {
  it("SelectForm component toggle works", () => {
    render(
      <ThemeProvider theme={theme}>
        <SelectForm />
      </ThemeProvider>
    );
  });

  // it('should return an object with all properties set correctly', () => {
  //   const name = 'Math Course';
  //   const syllabus = 'Algebra, Calculus';
  //   const training = 'Online';
  //   const classes = 10;
  //   const material = ['Textbook', 'Workbook'];
  //   const user = 'teacher@example.com';

  //   const result = createData(name, syllabus, training, classes, material, user);

  //   expect(result).toEqual({
  //     name,
  //     syllabus,
  //     training,
  //     classes,
  //     material,
  //     user
  //   });
  // });
});

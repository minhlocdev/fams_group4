import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import SyllabusCard from "../SyllabusCards";

const theme = createTheme();

describe("Syllabus Card", () => {
  it("render syllabus card", () => {

    const data = jest.fn()
    const onDelete = jest.fn()
    
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <SyllabusCard data={data} onDelete={onDelete} />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

  const mockData = {
    id: 1,
    name: 'Sample Syllabus',
    status: 'Active',
    version: '1.0',
    duration: '2 weeks',
    modifiedDate: '2024-04-05',
    modifiedBy: 'Admin',
  };

  it('should call onDelete with correct id when button is clicked', () => {
    const onDeleteMock = jest.fn();
    const { getByRole } = render(
      <SyllabusCard data={mockData} onDelete={onDeleteMock} />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onDeleteMock).toHaveBeenCalledWith(mockData.id);
  });

  it('should change font weight to bold when hovered over and return to normal when mouse out', () => {
    const { getByRole } = render(<SyllabusCard data={mockData} onDelete={() => {}} />);

    const button = screen.getByRole('button');

    fireEvent.mouseOver(button);
    expect(button).toHaveStyle('font-weight: 500');

    fireEvent.mouseOut(button);
    expect(button).not.toHaveStyle('font-weight: 500');
  });
});

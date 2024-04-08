import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import queryClient from "../../../services/queries/queryClient";
import { ImportSyllabus } from "../importSyllabus";
import TrainingMaterialModal from "../TrainingMaterialModal";

const theme = createTheme();

describe("Training Material Modal", () => {
  it("render training material modal", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <TrainingMaterialModal />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

  it('should delete an item from TrainingMaterial array when handleDelete is called', () => {
    const mockModalData = {
      unit: 'Unit 1',
      unitTitle: 'Unit Title',
      title: 'Title',
      TrainingMaterial: [
        {
          title: 'Material 1',
          author: 'Author 1',
          date: '2024-04-04',
        },
        {
          title: 'Material 2',
          author: 'Author 2',
          date: '2024-04-05',
        },
      ],
    };

    const { getByTestId, queryByText } = render(
      <TrainingMaterialModal />,
      {
        syllabusID: 'syllabusID',
        unitId: 'unitId',
        modalData: mockModalData,
      }
    );

    // Click on the delete button for the first item
    fireEvent.click(screen.getByTestId('delete-material-0'));

    // Check if the first item is deleted
    expect(screen.queryByText('Material 1')).toBeNull();

    // Check if the second item is still present
    expect(screen.getByText('Material 2')).toBeInTheDocument();
  });

  it("should trigger file input click when button is clicked", () => {
    const { getByText } = render(<TrainingMaterialModal />);
    const button = screen.getByLabelText("Upload File");
    const fileInputClickSpy = jest.spyOn(
      HTMLInputElement.prototype,
      "click"
    ); // Spy on the click method of input element
    fireEvent.click(button);
    expect(fileInputClickSpy).toHaveBeenCalled();
    fileInputClickSpy.mockRestore(); // Restore the original method after test
  });
});

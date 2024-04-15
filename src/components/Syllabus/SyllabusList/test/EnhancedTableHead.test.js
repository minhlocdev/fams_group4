import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import EnhancedTableHead from "../EnhancedTableHead ";



const theme = createTheme();

const mockHeadCells = [
  { id: "name", label: "Name" },
  { id: "age", label: "Age" },
  // Add more mock head cells as needed
];

const mockHandleSortChange = jest.fn();

describe("Enhanced Table Head", () => {
  it("renders enhanced table head component", () => {
    render(
      <ThemeProvider theme={theme}>
        <EnhancedTableHead
          handleSortChange={mockHandleSortChange}
          headCells={mockHeadCells}
          order="asc"
          orderBy="name"
          rowCount={10}
        />
      </ThemeProvider>
    );
    mockHeadCells.forEach((headCell) => {
      expect(screen.getByText(headCell.label)).toBeInTheDocument();
    });
  });

  it("should toggle sort direction and call handleSortChange", () => {
    // Mock handleSortChange function
    const handleSortChange = jest.fn();

    // Render the EnhancedTableHead component with mock props
    render(
      <EnhancedTableHead
        handleSortChange={handleSortChange}
        headCells={[
          { id: "column1", label: "Column 1" },
          { id: "column2", label: "Column 2" },
          // Add more head cells if needed
        ]}
        order="asc"
        orderBy="column1"
        rowCount={10}
      />
    );

    // Simulate a click on the TableSortLabel of the first column
    const sortLabel = screen.getByText("Column 1"); // Assuming the label is 'Column 1'
    fireEvent.click(sortLabel);

    // Assert that handleSortChange is called with the correct parameters
    expect(handleSortChange).toHaveBeenCalledTimes(1);
    expect(handleSortChange).toHaveBeenCalledWith({
      item: "column1",
      dir: "desc",
    }); // Assuming initial sortDir is 'asc'

    // Click again to toggle the sort direction
    fireEvent.click(sortLabel);

    // Assert that handleSortChange is called again with the updated parameters
    expect(handleSortChange).toHaveBeenCalledTimes(2);
    expect(handleSortChange).toHaveBeenCalledWith({
      item: "column1",
      dir: "asc",
    }); // Expecting the sort direction to toggle back to 'asc'
  });
  
  it('should toggle sort direction from asc to desc', () => {
    const handleSortChange = jest.fn();
    const { getByText } = render(<EnhancedTableHead handleSortChange={handleSortChange} />);
    
    // Click on the TableSortLabel to toggle sort direction
    fireEvent.click(screen.getByTestId('SortIcon'));
    
    // Ensure that handleSortChange is called with the correct parameters
    expect(handleSortChange).toHaveBeenCalledWith({ item: 'YourHeadCellId', dir: 'desc' });
  });

  it('should toggle sort direction from desc to asc', () => {
    const handleSortChange = jest.fn();
    const { getByText } = render(<EnhancedTableHead handleSortChange={handleSortChange} />);
    
    // Click again on the TableSortLabel to toggle sort direction
    fireEvent.click(screen.getByTestId('SortIcon'));
    
    // Ensure that handleSortChange is called with the correct parameters
    expect(handleSortChange).toHaveBeenCalledWith({ item: 'YourHeadCellId', dir: 'asc' });
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import queryClient from "../../../../services/queries/queryClient";
import { AuthProvider } from "../../../../utils/authUtil";
import EnhancedTableHead from '../EnhancedTableHead';

const theme = createTheme();

describe('EnhancedTableHead', () => {
  it('renders correctly', () => {
    const mockProps = {
      headCells: [
        { id: 'name', label: 'Name' },
        { id: 'age', label: 'Age' },
      ],
      handleSortChange: jest.fn(),
    };

    render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <EnhancedTableHead {...mockProps} />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if the TableHead is rendered
    expect(screen.getAllByRole('columnheader').length).toBe(mockProps.headCells.length);
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnhancedTableHead from '../EnhancedTableHead';

describe('EnhancedTableHead component', () => {
  const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
    // Add more head cells as needed
  ];

  const handleSortChange = jest.fn();

  test('renders without crashing', () => {
    render(
      <EnhancedTableHead
        headCells={headCells}
        handleSortChange={handleSortChange}
        order="asc"
        orderBy="name"
        rowCount={10}
      />
    );
    // Assert that the component renders without throwing any errors
  });

  test('handles click event on table headers', () => {
    render(
      <EnhancedTableHead
        headCells={headCells}
        handleSortChange={handleSortChange}
        order="asc"
        orderBy="name"
        rowCount={10}
      />
    );

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    expect(handleSortChange).toHaveBeenCalledWith({ item: 'name', dir: 'desc' });
  });

  // Add more test cases to cover other functionalities such as handling sort direction, rendering of table headers, etc.
});

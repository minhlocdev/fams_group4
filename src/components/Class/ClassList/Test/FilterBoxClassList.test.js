import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import queryClient from "../../../../services/queries/queryClient";
import { AuthProvider } from "../../../../utils/authUtil";
import FilterBoxClassList from '../FilterBoxClassList';
import { ClassContext } from '../../../../context/ClassContext';

const theme = createTheme();

test('renders FilterBoxClassList and checks interaction', () => {
  const mockContext = {
    checked: {},
    setChecked: jest.fn(),
    handleChangePage: jest.fn(),
  };

  render(
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ClassContext value={mockContext}>
              <FilterBoxClassList />
            </ClassContext>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  const saveButton = screen.getByText('Save');
  fireEvent.click(saveButton);

  expect(mockContext.setChecked).toHaveBeenCalled();
});
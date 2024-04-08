import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateTimeFrame from '../CreateTimeFrame';
import { BrowserRouter } from 'react-router-dom';

describe('CreateTimeFrame component', () => {
  test('renders without crashing', () => {
    render(      
  <BrowserRouter> {/* Wrap LoginPage with BrowserRouter */}
    <CreateTimeFrame />
  </BrowserRouter>);
    // Add assertions to check if certain elements are present
    expect(screen.getByText('Time Frame')).toBeInTheDocument();
  });

  test('expands and collapses on click', () => {
    render(<CreateTimeFrame />);
    const expandButton = screen.getByLabelText('show more');
    
    // Initial state: expanded
    expect(screen.getByLabelText('show less')).toBeInTheDocument();
    
    // Collapse
    fireEvent.click(expandButton);
    expect(screen.queryByLabelText('show less')).not.toBeInTheDocument();
    
    // Expand
    fireEvent.click(expandButton);
    expect(screen.getByLabelText('show less')).toBeInTheDocument();
  });

  test('selects start date using date picker', () => {
    render(<CreateTimeFrame />);
    const datePickerInput = screen.getByLabelText('Choose dates');
    
    // Simulate selecting a start date
    fireEvent.change(datePickerInput, { target: { value: '2024-03-28' } });

    // Ensure the state updates accordingly
    expect(datePickerInput).toHaveValue('2024-03-28');
  });

  test('resets start date on button click', () => {
    render(<CreateTimeFrame />);
    const resetButton = screen.getByText('Reset');
    const datePickerInput = screen.getByLabelText('Choose dates');
    
    // Simulate selecting a start date
    fireEvent.change(datePickerInput, { target: { value: '2024-03-28' } });

    // Reset the start date
    fireEvent.click(resetButton);

    // Ensure the start date is reset
    expect(datePickerInput).toHaveValue('');
  });

  test('renders DayPicker with different screen sizes', () => {
    render(<CreateTimeFrame />);
    
    // Ensure the DayPicker component is rendered for both small and medium screen sizes
    expect(screen.getByText('Caption Text')).toBeInTheDocument(); // Replace 'Caption Text' with actual text shown in DayPicker caption
  });

  // Add more tests for other functionalities, such as warning messages, etc.
});

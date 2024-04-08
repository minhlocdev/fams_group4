import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeFrame from '../TimeFrame';

describe('TimeFrame component', () => {
  test('renders without crashing', () => {
    render(<TimeFrame />);
    // Assert that the component renders without throwing any errors
  });

  test('expands and collapses on click', () => {
    render(<TimeFrame />);
    const expandButton = screen.getByRole('button', { name: 'show more' });
    fireEvent.click(expandButton);
    expect(screen.getByLabelText('show less')).toBeInTheDocument();
    fireEvent.click(expandButton);
    expect(screen.getByLabelText('show more')).toBeInTheDocument();
  });

  // You can add more test cases to cover other functionalities such as selecting dates from the DayPicker, etc.
});

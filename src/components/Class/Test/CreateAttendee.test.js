import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateAttendee from '../CreateAttendee'

describe('CreateAttendee component', () => {
  test('renders without crashing', () => {
    render(<CreateAttendee />);
    // Add assertions to check if certain elements are present
    expect(screen.getByText('Attendee')).toBeInTheDocument();
  });

  test('expands and collapses on click', () => {
    render(<CreateAttendee />);
    const expandButton = screen.getByLabelText('show more');
    
    // Expand
    fireEvent.click(expandButton);
    expect(screen.getByLabelText('show less')).toBeInTheDocument();
    
    // Collapse
    fireEvent.click(expandButton);
    expect(screen.getByLabelText('show more')).toBeInTheDocument();
  });

  test('selects attendee type', () => {
    render(<CreateAttendee />);
    const typeSelect = screen.getByLabelText('Attendee Type');
    
    // Simulate selecting a type from the dropdown
    fireEvent.change(typeSelect, { target: { value: 'Intern' } });

    // Ensure the state updates accordingly
    expect(typeSelect).toHaveValue('Intern');
  });

  test('updates planned attendee quantity', () => {
    render(<CreateAttendee />);
    const plannedInput = screen.getByLabelText('Planned Attendees');
    
    // Simulate changing the planned attendee quantity
    fireEvent.change(plannedInput, { target: { value: '10' } });

    // Ensure the state updates accordingly
    expect(plannedInput).toHaveValue('10');
  });

  // Add more tests for accepted and actual attendee quantities, edge cases, etc.
});

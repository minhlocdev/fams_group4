import React from 'react';
import { render, screen } from '@testing-library/react';
import AttendeeList from '../AttendeeList';

describe('AttendeeList component', () => {
  test('renders without crashing', () => {
    render(<AttendeeList />);
    // Add assertions to check if certain elements are present
    expect(screen.getByText('AttendeeList')).toBeInTheDocument();
  });
});

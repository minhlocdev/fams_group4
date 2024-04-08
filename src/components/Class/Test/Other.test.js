import React from 'react';
import { render, screen } from '@testing-library/react';
import Other from '../Other';

describe('Other component', () => {
  test('renders without crashing', () => {
    render(<Other />);
    // Add assertions to check if certain elements are present
    expect(screen.getByText('Other')).toBeInTheDocument();
  });
});

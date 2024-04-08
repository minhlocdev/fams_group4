import React from 'react';
import { render, screen } from '@testing-library/react';
import Budget from '../Budget';

describe('Budget component', () => {
  test('renders without crashing', () => {
    render(<Budget />);
    // Add assertions to check if certain elements are present
    expect(screen.getByText('Budget')).toBeInTheDocument();
  });
});

import React from 'react';
import '@testing-library/jest-dom';
import { screen,render, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from '../../../../services/queries/queryClient';
import SearchClass from '../SearchClass';

describe('SearchClass', () => {
  it('renders correctly and handles input changes', () => {
    const { getByPlaceholderText } = render(
    <QueryClientProvider client={queryClient}>
      <Router initialEntries={['/']}>
        <SearchClass />
      </Router>
    </QueryClientProvider>
    );

    // Check if the input field is rendered
    const input = screen.getByPlaceholderText('Search by ...');
    expect(input).toBeInTheDocument();

    // Simulate a change in the input field
    fireEvent.change(input, { target: { value: 'test' } });

    // Check if the input field value has changed
    expect(input.value).toBe('test');
  });
});
import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from '../../../../services/queries/queryClient';
import Popup from '../Popup';

describe('Popup', () => {
  it('renders correctly', () => {
    const mockProps = {
      item: { id: '1', classNames: 'Test Class' },
    };

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Popup {...mockProps} />
        </Router>
      </QueryClientProvider>
    );
    // Get all elements with label text 'more'
    const allElements = screen.getAllByLabelText('more');

    // Check if the first IconButton is rendered
    expect(allElements[0]).toBeInTheDocument();

    // Simulate a click on the first IconButton to open the menu
    fireEvent.click(allElements[0]);

    // Check if the menu items are rendered
    expect(screen.getByText('Edit class')).toBeInTheDocument();
    expect(screen.getByText('Duplicate class')).toBeInTheDocument();
    expect(screen.getByText('Delete class')).toBeInTheDocument();
  });
});
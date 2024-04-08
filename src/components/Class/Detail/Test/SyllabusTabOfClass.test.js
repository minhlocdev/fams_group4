import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SyllabusTabOfClass from '../SyllabusTabOfClass';
import ClassContext from '../../../../context/ClassContext';
import { BrowserRouter as Router } from 'react-router-dom';
describe('SyllabusTabOfClass component', () => {
  const mockHandleTabChange = jest.fn();
  const mockActiveTab = 0; // Default active tab for testing

  test('renders without crashing', () => {
    render(
    <Router>
    <ClassContext.Provider value={{ activeTab: mockActiveTab, handleTabChange: mockHandleTabChange }}>
        <SyllabusTabOfClass />
      </ClassContext.Provider>
    </Router>    
    );
    // Assert that the component renders without throwing any errors
  });

  test('renders tabs with correct names', () => {
    render(
      <ClassContext.Provider value={{ activeTab: mockActiveTab, handleTabChange: mockHandleTabChange }}>
        <SyllabusTabOfClass />
      </ClassContext.Provider>
    );

    // Assert that all tabs are rendered with correct names
    expect(screen.getByText('Training Program')).toBeInTheDocument();
    expect(screen.getByText('Attendee List')).toBeInTheDocument();
    expect(screen.getByText('Budget')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  test('switches tabs on tab click', () => {
    render(
      <ClassContext.Provider value={{ activeTab: mockActiveTab, handleTabChange: mockHandleTabChange }}>
        <SyllabusTabOfClass /> 
      </ClassContext.Provider>
    );

    // Simulate clicking on a different tab
    fireEvent.click(screen.getByText('Attendee List'));

    // Assert that the handleTabChange function is called with the correct tab value
    expect(mockHandleTabChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  // You can add more test cases to cover rendering of child components based on selected tab
});

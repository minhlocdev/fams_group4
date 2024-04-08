import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SyllabusCardOfClass from '../SyllabusCardOfClass';
import '@testing-library/jest-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import ClassContext from '../../../../context/ClassContext';

describe('SyllabusCardOfClass component', () => {
  // Create a QueryClient instance
  const queryClient = new QueryClient();

  test('renders without crashing', () => {
    render(
      <Router>
        <SyllabusCardOfClass />
      </Router>
    );
    // Assert that the component renders without throwing any errors
  });

  test('renders search program name when search is not active', () => {
    render(
      // Wrap the component with QueryClientProvider and provide the queryClient
      <QueryClientProvider client={queryClient}>
        <SyllabusCardOfClass />
      </QueryClientProvider>
    );

    // Assert that the elements related to search are rendered
    const trainingProgramName = screen.getByText('Training Program Name');
    expect(trainingProgramName).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  test('renders search program name when search is active', () => {
    // Mock data for search program
    const searchProgram = {
      programName: 'Search Program',
      duration: 5,
      hours: 30,
      createdOn: new Date(),
      createdBy: 'Admin',
      syllabus: [],
    };

    render(
      <QueryClientProvider client={queryClient}>
        <SyllabusCardOfClass />
      </QueryClientProvider>
    );

    // Simulate user typing in the search input
    userEvent.type(screen.getByPlaceholderText('Search'), 'Search Program');

    // Assert that the search program name is rendered
    expect(screen.getByText('Search Program')).toBeInTheDocument();
  });

  test('renders SyllabusCardOfClass component', () => {
    const mockClassData = {
      trainingProgram: 'Test Program',
      infoTrainers: [
        { syllabusId: 1 },
        { syllabusId: 2 },
        { syllabusId: 1 },
      ],
    };

    render(
      <Router>
        <ClassContext.Provider value={{ classData: mockClassData }}>
          <SyllabusCardOfClass />
        </ClassContext.Provider>
      </Router>
    );

    // Add assertions as needed
  });
});
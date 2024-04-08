import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClassCreateHeader from '../ClassCreateHeader';
import ClassContext from '../../../../context/ClassContext';

describe('ClassCreateHeader', () => {
  test('renders ClassCreateHeader component', () => {
    const mockClassData = {
      classTitle: 'Test Title',
      classCode: 'Test Code',
      initialDays: [],
      search: { durationByHour: '2' },
      // Add other classData properties as needed
    };

    const setClassTitle = jest.fn();
    const setClassCode = jest.fn();

    const { getByText, getByRole } = render(
      <Router>
        <ClassContext.Provider value={{ classData: mockClassData, setClassTitle, setClassCode }}>
          <ClassCreateHeader />
        </ClassContext.Provider>
      </Router>
    );

    // Add assertions as needed
    expect(screen.getByText('Class')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Planning')).toBeInTheDocument();
    expect(screen.getByText('Test Code')).toBeInTheDocument();

    // Simulate click on the IconButton
    fireEvent.click(screen.getByRole('button'));
  });
});
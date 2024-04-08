import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateTimeFrame from '../CreateTimeFrame';
import { ClassContext } from '../../../../context/ClassContext';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
describe('CreateTimeFrame', () => {
  const mockContext = {
    initialDays: [],
    setInitialDays: jest.fn(),
    fieldValidation: {},
    startDate: null,
    setStartDate: jest.fn(),
    classData: null,
  };

  it('renders without crashing', () => {
    const { container } = render(
    <Router>
        <ClassContext.Provider value={mockContext}>
            <CreateTimeFrame />
        </ClassContext.Provider>
    </Router>

    );
    expect(container).toBeTruthy();
  });

  // Add more tests here to cover different parts of the component
});
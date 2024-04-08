import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TimeFrame from '../TimeFrame';
import ClassContext from '../../../../context/ClassContext';

describe('TimeFrame', () => {
  test('renders TimeFrame component', () => {
    const mockClassData = {
      calendarStudy: ['01/01/2022'],
      startDate: '01/01/2022',
      endDate: '12/31/2022',
    };

    render(
      <Router>
        <ClassContext.Provider value={{ classData: mockClassData }}>
          <TimeFrame />
        </ClassContext.Provider>
      </Router>
    );

    // Add assertions as needed
  });
});
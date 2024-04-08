import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Attendee from '../Attendee';
import ClassContext from '../../../../context/ClassContext';
import '@testing-library/jest-dom';

describe('Attendee', () => {
  test('renders Attendee component', () => {
    const mockClassData = {
      attendee: {
        type: 'Test Type',
      },
    };

    render(
      <Router>
        <ClassContext.Provider value={mockClassData}>
          <Attendee />
        </ClassContext.Provider>
      </Router>
    );

    expect(screen.getByText('Attendee')).toBeInTheDocument();
    expect(screen.getByText('Test Type')).toBeInTheDocument();
    // Add more assertions as needed
  });
});
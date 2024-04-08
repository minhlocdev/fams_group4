import { render, screen } from '@testing-library/react';
import ClassContext  from '../../../../context/ClassContext';
import General from '../General';
import { BrowserRouter as Router } from 'react-router-dom';

describe('General', () => {
  test('renders General component', () => {
    const mockClassData = {
      classTime: '10:00 AM',
      location: 'Test Location',
      fsu: 'Test FSU',
      createdBy: 'Test User',
      createdDate: '01/01/2022',
      infoTrainers: [],
      infoAdmins: [],
      emailFSU: 'test@test.com',
    };

    render(
    <Router>
      <ClassContext.Provider value={{ classData: mockClassData }}>
        <General />
      </ClassContext.Provider>
    </Router>
    );

    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Class Time')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    // Add more assertions as needed
  });
});
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SyllabusCardItem from '../SyllabusCardItem';
import ClassContext from '../../../../context/ClassContext';

describe('SyllabusCardItem', () => {
  test('renders SyllabusCardItem component', () => {
    const mockClassData = {
      trainers: [
        { syllabusId: 1, trainerId: 1 },
        { syllabusId: 2, trainerId: 2 },
        { syllabusId: 1, trainerId: 3 },
      ],
    };

    const mockCard = {
      id: 1,
      title: 'Test Title',
      // Add other card properties as needed
    };

    render(
      <Router>
        <ClassContext.Provider value={mockClassData}>
          <SyllabusCardItem card={mockCard} isEdit={false} />
        </ClassContext.Provider>
      </Router>
    );

    // Add assertions as needed
  });
});
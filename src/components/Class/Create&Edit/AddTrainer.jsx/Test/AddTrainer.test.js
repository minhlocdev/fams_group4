import { render, screen } from '@testing-library/react';
import AddTrainer from '../AddTrainer';
import ClassContext from '../../../../../context/ClassContext';

describe('AddTrainer', () => {
  const mockContext = {
    classTitle: 'Example Class',
    search: {
      durationByHour: 10,
      modifiedDate: '2022-01-01',
      modifiedBy: 'Test User'
    },
    initialDays: [1, 2, 3],
    trainingProgramDetail: {
      name: 'Example Program',
      outline: [
        { id: '1', title: 'Example Outline 1' },
        { id: '2', title: 'Example Outline 2' }
      ]
    }
  };

  it('renders the class title', () => {
    render(
      <ClassContext.Provider value={mockContext}>
        <AddTrainer />
      </ClassContext.Provider>
    );

    expect(screen.getByText(`Training program of ${mockContext.classTitle}`)).toBeInTheDocument();
  });

  it('renders the training program name', () => {
    render(
      <ClassContext.Provider value={mockContext}>
        <AddTrainer />
      </ClassContext.Provider>
    );

    expect(screen.getByText(mockContext.trainingProgramDetail.name)).toBeInTheDocument();
  });

  it('renders the number of initial days', () => {
    render(
      <ClassContext.Provider value={mockContext}>
        <AddTrainer />
      </ClassContext.Provider>
    );

    expect(screen.getByText(mockContext.initialDays.length.toString())).toBeInTheDocument();
  });

  it('renders the syllabus card items', () => {
    render(
      <ClassContext.Provider value={mockContext}>
        <AddTrainer />
      </ClassContext.Provider>
    );

    mockContext.trainingProgramDetail.outline.forEach((data) => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
    });
  });
});
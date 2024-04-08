import { render } from '@testing-library/react';
import SyllabusClassCreate from '../SyllabusClassCreate';
import ClassContext from '../../../../context/ClassContext';

test('renders SyllabusCardOfClass without crashing', () => {
  const mockContext = {
    handleSearch: jest.fn(),
    trainingProgramDetail: null,
  };

  render(
    <ClassContext.Provider value={mockContext}>
      <SyllabusClassCreate />
    </ClassContext.Provider>
  );
});
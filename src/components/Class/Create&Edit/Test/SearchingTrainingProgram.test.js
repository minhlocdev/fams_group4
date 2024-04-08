import { render } from '@testing-library/react';
import SearchTranningProgram from '../SearchTranningProgram';
import ClassContext from '../../../../context/ClassContext';

test('renders SearchTranningProgram without crashing', () => {
  const mockProps = {
    program: [],
    loading: false,
  };

  const mockContext = {
    handleSearch: jest.fn(),
  };

  render(
    <ClassContext.Provider value={mockContext}>
      <SearchTranningProgram {...mockProps} />
    </ClassContext.Provider>
  );
});
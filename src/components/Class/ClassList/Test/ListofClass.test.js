import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListofClass from '../ListofClass';
import { ClassContext } from '../../../../context/ClassContext';

test('renders ListofClass', () => {
  const mockContext = {
    checked: {},
    page: 0,
    rowsPerPage: 5,
    debouncedSearchTerm: '',
    order: 'asc',
    orderBy: 'name',
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
    handleSortChange: jest.fn(),
  };

  render(
    <ClassContext.Provider value={mockContext}>
      <ListofClass />
    </ClassContext.Provider>
  );

  expect(screen.getByText('Class')).toBeInTheDocument();
  expect(screen.getByText('Class Code')).toBeInTheDocument();
  expect(screen.getByText('Created on')).toBeInTheDocument();
  expect(screen.getByText('Created by')).toBeInTheDocument();
  expect(screen.getByText('Duration')).toBeInTheDocument();
  expect(screen.getByText('Attendee')).toBeInTheDocument();
  expect(screen.getByText('Status')).toBeInTheDocument();
  expect(screen.getByText('Location')).toBeInTheDocument();
  expect(screen.getByText('FSU')).toBeInTheDocument();
});
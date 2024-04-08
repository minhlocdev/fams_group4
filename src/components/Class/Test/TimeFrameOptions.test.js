import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeFrameOptions from '../TimeFrameOptions';
import ClassContext from '../../../context/ClassContext';

describe('TimeFrameOptions component', () => {
  test('renders without crashing', () => {
    render(<TimeFrameOptions />);
    // Assert that the component renders without throwing any errors
  });

  test('opens menu on button click', () => {
    render(<TimeFrameOptions />);
    const button = screen.getByRole('button', { name: 'Options' });
    fireEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  test('selects and deselects options', () => {
    render(<TimeFrameOptions />, {
      wrapper: <ClassContext.Provider value={{ search: { duration: '5' }, setInitialDays: jest.fn() }} />,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Options' }));
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Sun' }));
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Mon' }));

    expect(screen.getByRole('checkbox', { name: 'Sun' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Mon' })).toBeChecked();

    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Sun' }));
    expect(screen.getByRole('checkbox', { name: 'Sun' })).not.toBeChecked();
  });

  // Add more test cases to cover other functionalities such as clearing options, auto-adding weekdays, etc.
});

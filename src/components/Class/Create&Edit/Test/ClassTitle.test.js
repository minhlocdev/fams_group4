import { screen,render, fireEvent } from '@testing-library/react';
import ClassTitle from '../ClassTitle'; 
import ClassContext from '../../../../context/ClassContext';

describe('ClassTitle', () => {
  test('renders ClassTitle without crashing', () => {
    const mockContext = {
      classTitle: '',
      setClassTitle: jest.fn(),
      setActiveStep: jest.fn(),
    };

    render(
      <ClassContext.Provider value={mockContext}>
        <ClassTitle />
      </ClassContext.Provider>
    );
  });

  test('validates the title and saves it', () => {
    const setClassTitle = jest.fn();
    const setActiveStep = jest.fn();
    const mockContext = {
      classTitle: '',
      setClassTitle,
      setActiveStep,
    };

    const { getByRole } = render(
      <ClassContext.Provider value={mockContext}>
        <ClassTitle />
      </ClassContext.Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Example Class' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(setClassTitle).toHaveBeenCalledWith('Example Class');
    // expect(setActiveStep).toHaveBeenCalledWith(1);
  });

  test('does not save the title if it is empty', () => {
    const setClassTitle = jest.fn();
    const mockContext = {
      classTitle: '',
      setClassTitle,
    };

    const { getByRole } = render(
      <ClassContext.Provider value={mockContext}>
        <ClassTitle />
      </ClassContext.Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(setClassTitle).not.toHaveBeenCalled();
  });
});
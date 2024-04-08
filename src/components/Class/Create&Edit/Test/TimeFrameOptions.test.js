import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TimeFrameOptions from '../TimeFrameOptions';
import { ClassContext } from '../../../../context/ClassContext';
import dayjs from 'dayjs';

describe('TimeFrameOptions', () => {
  const setInitialDays = jest.fn();
  const startDate = dayjs();

    render(
      <ClassContext.Provider value={{ setInitialDays }}>
        <TimeFrameOptions startDate={startDate} />
      </ClassContext.Provider>
    );
  it('renders correctly', () => {
    const optionsButton = screen.getByText('Options');
    expect(optionsButton).toBeInTheDocument();
  });

  it('opens and closes the options menu', () => {
    const optionsButton = screen.getByText('Options');
    fireEvent.click(optionsButton);
    expect(screen.getByText('Clear')).toBeInTheDocument();

    fireEvent.click(optionsButton);
    expect(screen.queryByText('Clear')).toBeNull();
  });

  it('toggles the checked state of an option', () => {
    const optionsButton = screen.getByText('Options');
    fireEvent.click(optionsButton);

    const option = screen.getByText('Monday');
    fireEvent.click(option);

    expect(setInitialDays).toHaveBeenCalled();
  });

  it('clears the selected options', () => {
    const optionsButton = screen.getByText('Options');
    fireEvent.click(optionsButton);

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(setInitialDays).toHaveBeenCalledWith([]);
  });

  it('saves the selected options', () => {
    const optionsButton = screen.getByText('Options');
    fireEvent.click(optionsButton);

    const option = screen.getByText('Monday');
    fireEvent.click(option);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(setInitialDays).toHaveBeenCalled();
  });
});
import { render, screen,fireEvent } from '@testing-library/react';
import { TimePickerViews, TimeToTime } from '../TimePicker';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';

describe('TimePickerViews', () => {
  it('renders correctly', () => {
    const setValue = jest.fn();
    const { getByRole } = render(<TimePickerViews value={dayjs("12:00", "HH:mm")} setValue={setValue} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  // Add more tests to cover all the functionalities of the TimePickerViews component
});

describe('TimeToTime', () => {
  it('renders correctly', () => {
    const setTimeRange = jest.fn();
    const { getByText } = render(<TimeToTime classTime="12:00-14:00" setTimeRange={setTimeRange} />);
    const fromText = screen.getByText('from');
    const toText = screen.getByText('to');
    expect(fromText).toBeInTheDocument();
    expect(toText).toBeInTheDocument();
  });

  // Add more tests to cover all the functionalities of the TimeToTime component
});
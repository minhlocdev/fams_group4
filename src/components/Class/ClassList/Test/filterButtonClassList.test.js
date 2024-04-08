import { render, fireEvent, screen } from '@testing-library/react';
import { BasicFilterClassListbtn } from '../filterButtonClassList'; // adjust this import path to your file structure

describe('BasicFilterClassListbtn', () => {
  it('renders without crashing', () => {
    render(<BasicFilterClassListbtn />);
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('opens and closes the menu', () => {
    render(<BasicFilterClassListbtn />);
    fireEvent.click(screen.getByText('Filter'));
    expect(screen.getByText('Class Location')).toBeInTheDocument(); // assuming 'Class Location' is in FilterBoxClassList
    fireEvent.click(screen.getByText('Filter'));
    // add assertion to check that the menu is closed
  });
});
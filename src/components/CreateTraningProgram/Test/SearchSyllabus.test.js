import { screen,render, fireEvent } from '@testing-library/react';
import SearchSyllabus from '../SearchSyllabus';

describe('SearchSyllabus', () => {
  it('renders without crashing', () => {
    render(<SearchSyllabus />);
  });

  it('calls handleSearch when an option is selected', () => {
    const handleSearch = jest.fn();
    const program = [{ name: 'Program 1' }, { name: 'Program 2' }];
    const { getByLabelText } = render(<SearchSyllabus program={program} handleSearch={handleSearch} />);
    fireEvent.change(screen.getByLabelText('search'), { target: { value: 'Program 1' } });
    fireEvent.keyDown(screen.getByLabelText('search'), { key: 'Enter', code: 'Enter' });
    expect(handleSearch).toHaveBeenCalledWith({ name: 'Program 1' });
  });

  // Add more tests as needed to cover the functionality of your component
});
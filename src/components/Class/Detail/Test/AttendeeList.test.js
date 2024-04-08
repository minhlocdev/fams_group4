import { render, screen } from '@testing-library/react';
import AttendeeList from '../AttendeeList';
import '@testing-library/jest-dom';

test('renders AttendeeList without crashing', () => {
    render(<AttendeeList />);
    expect(screen.getByText('AttendeeList')).toBeInTheDocument();
});
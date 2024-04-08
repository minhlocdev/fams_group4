import { render, screen } from '@testing-library/react';
import Budget from '../Budget';
import '@testing-library/jest-dom';

test('renders Budget without crashing', () => {
    render(<Budget />);
    expect(screen.getByText('Budget')).toBeInTheDocument();
});
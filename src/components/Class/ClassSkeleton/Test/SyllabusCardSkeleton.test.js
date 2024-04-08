import { render, screen } from '@testing-library/react';
import SyllabusCardSkeleton from '../SyllabusCardSkeleton';
import '@testing-library/jest-dom';

describe('SyllabusCardSkeleton', () => {
  it('renders without crashing', () => {
    render(<SyllabusCardSkeleton />);

    // Check that CircularProgress is in the document
    const circularProgress = screen.getByRole('progressbar');
    expect(circularProgress).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import TimeFrameSkeleton from '../TimeFrameSkeleton';
import '@testing-library/jest-dom';

describe('TimeFrameSkeleton', () => {
  it('renders without crashing', () => {
    render(<TimeFrameSkeleton />);

    // Check that the text 'Time frame' is in the document
    const timeFrameText = screen.getByText('Time frame');
    expect(timeFrameText).toBeInTheDocument();

    // Check that Skeleton is in the document
    const skeleton = screen.getByRole('progressbar');
    expect(skeleton).toBeInTheDocument();
  });
});
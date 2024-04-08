import { screen,render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GeneralSkeleton from '../GeneralSkeleton';
import '@testing-library/jest-dom';

describe('GeneralSkeleton', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <GeneralSkeleton />
      </Router>
    );
    expect(screen.getByText('General')).toBeInTheDocument();
  });
});
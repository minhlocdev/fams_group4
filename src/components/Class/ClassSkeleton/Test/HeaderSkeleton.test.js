import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../../../services/queries/queryClient';
import HeaderSkeleton from '../HeaderSkeleton';

describe('HeaderSkeleton', () => {
  it('renders without crashing', () => {    

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <HeaderSkeleton />
        </Router>
      </QueryClientProvider>
    );

    expect(screen.getByText('Class')).toBeInTheDocument();
  });
});
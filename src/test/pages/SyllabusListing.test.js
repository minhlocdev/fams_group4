import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SyllabusListing from "../../pages/SyllabusListing";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../utils/authUtil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../services/queries/queryClient';

test('Syllabus renders ok', async () => {
    
    render(
        <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
           <SyllabusListing/>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Syllabus', { selector: 'h4' })).toBeInTheDocument();
});//ok
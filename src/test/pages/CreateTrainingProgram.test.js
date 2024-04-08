import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateTranningProgramList from "../../pages/CreateTrainingProgram";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../utils/authUtil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../services/queries/queryClient';

test('CreateTrainingProgram renders ok', async () => {
    
    render(
        <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
           <CreateTranningProgramList/>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('New Training Program', { selector: 'h4' })).toBeInTheDocument();
});//ok

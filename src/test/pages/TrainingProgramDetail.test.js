import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../utils/authUtil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../services/queries/queryClient';
import TrainingProgramDetail from "../../pages/TrainingProgramDetail";

test('TrainingProgramDetail renders ok', async () => {
    
    render(
        <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
           <TrainingProgramDetail/>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('TrainingProgramDetail')).toBeInTheDocument();
});
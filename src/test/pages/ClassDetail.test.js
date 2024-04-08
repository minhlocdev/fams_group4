import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClassDetail from "../../pages/ClassDetail"
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../utils/authUtil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../services/queries/queryClient';

test('ClassDetail renders ok', async () => {
    
    render(
        <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
           <ClassDetail/>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
 
});
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserManagement from "../../pages/UserManagement";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../utils/authUtil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../services/queries/queryClient';

test('UserManagement renders ok', async () => {

  render(
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <UserManagement />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
  expect(screen.getByText('User Management', { selector: 'h4' })).toBeInTheDocument();
});//ok

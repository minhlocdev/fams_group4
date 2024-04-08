import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../utils/authUtil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../services/queries/queryClient';
import TrainingProgramList from '../../pages/TrainingProgramList';

test('TrainingProgramList renders ok', async () => {
    
    render(
        <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
           <TrainingProgramList/>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Training program')).toBeInTheDocument()
 
});//ok

// test('handleOpenImportForm opens the import form modal', () => {
//     render(<TrainingProgramList />);
  
//     // Ban đầu, modal không được hiển thị
//     expect(screen.queryByText('Import Training Program Form')).toBeNull();
  
//     // Kích hoạt sự kiện mở form
//     fireEvent.click(screen.getByRole('button', { name: /import/i }));
  
//     // Kiểm tra xem modal có được hiển thị hay không
//     expect(screen.getByText('Import Training Program Form')).toBeInTheDocument();
//   });

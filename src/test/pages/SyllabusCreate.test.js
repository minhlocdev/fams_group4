import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SyllabusCreate from "../../pages/SyllabusCreate";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../utils/authUtil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../services/queries/queryClient';

test('SyllabusCreate renders ok', async () => {
    
    render(
        <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
           <SyllabusCreate/>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Syllabus', { selector: 'h4' })).toBeInTheDocument();
});//ok

test('handleNameError sets NameError to true when value is empty', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SyllabusCreate/>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  // Trước khi gọi hàm handleNameError, NameError phải là false
  expect(screen.getByText('Syllabus', { selector: 'h4' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /Syllabus Name\*/i })).toHaveValue('');
  expect(screen.queryByText('Syllabus Name is required')).not.toBeInTheDocument();

  // Gọi hàm handleNameError với value là chuỗi rỗng
  fireEvent.change(screen.getByRole('textbox', { name: /Syllabus Name\*/i }), { target: { value: '' } });

  // Sau khi gọi hàm, NameError phải là true
  expect(screen.queryByText('Syllabus Name is required')).toBeInTheDocument();
});

test('SyllabusCreate renders ok and Syllabus Name input is initially empty', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SyllabusCreate/>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  // Kiểm tra xem trường nhập liệu "Syllabus Name" có giá trị mặc định là chuỗi rỗng không
  expect(screen.getByRole('textbox', { name: /Syllabus Name\*/i })).toHaveValue('');
});



// test('handleSubmit prevents default event when activeTab is less than or equal to 2', () => {
//   const { getByRole } = render(
//       <BrowserRouter>
//           <AuthProvider>
//               <QueryClientProvider client={queryClient}>
//                   <SyllabusCreate />
//               </QueryClientProvider>
//           </AuthProvider>
//       </BrowserRouter>
//   );

//   const submitButton = getByRole('button', { name: /submit/i });
//   fireEvent.click(submitButton);

//   expect(localStorage.getItem('draftData')).toBeNull();
//   expect(window.alert).not.toHaveBeenCalled();
// });

// test('handleSubmit removes draftData from localStorage and alerts when activeTab is greater than 2', () => {
//   const { getByRole } = render(
//       <BrowserRouter>
//           <AuthProvider>
//               <QueryClientProvider client={queryClient}>
//                   <SyllabusCreate />
//               </QueryClientProvider>
//           </AuthProvider>
//       </BrowserRouter>
//   );

//   Object.defineProperty(window, 'alert', { value: jest.fn() });

//   const submitButton = getByRole('button', { name: /submit/i });
//   fireEvent.click(submitButton);

//   expect(localStorage.getItem('draftData')).toBeNull();
//   expect(window.alert).toHaveBeenCalledWith('Created succesfully');
// });
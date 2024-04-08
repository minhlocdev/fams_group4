import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClassListing from '../../pages/ClassListing';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../utils/authUtil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../services/queries/queryClient';

test('ClassListing renders ok', async () => {
    
  render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
           <ClassListing/>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Training Class')).toBeInTheDocument()
 
});//ok


// test('handleFilterClick toggles isFilterPopupOpen state', () => {
  //     const { getByText, } = render(
    //        <BrowserRouter>
    //         <AuthProvider>
//           <QueryClientProvider client={queryClient}>
//            <ClassListing/>
//           </QueryClientProvider>
//         </AuthProvider>
//       </BrowserRouter>);
//       const List = mount( <BrowserRouter>
//         <AuthProvider>
//           <QueryClientProvider client={queryClient}>
//            <ClassListing/>
//           </QueryClientProvider>
//         </AuthProvider>
//       </BrowserRouter>)
//     const filterButton = getByText('Filter'); // Assuming you have a data-testid for the filter button

//     fireEvent.click(filterButton);
//     expect(filterButton).toBeInTheDocument()
//       expect(screen.findByRole('menu')).toBeInTheDocument
//     // Assert that isFilterPopupOpen is toggled
//     // You might need to access isFilterPopupOpen state from the component to make this assertion
// });
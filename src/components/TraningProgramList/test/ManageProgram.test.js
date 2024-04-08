import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../../../services/queries/queryClient";
// import UserListing from "../UserListing";
// import { AuthProvider } from "../../../../utils/authUtil";
import { BrowserRouter } from "react-router-dom";
import ManageProgram from "../ManageProgram";
import queryClient from "../../../services/queries/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../utils/authUtil";
import { useDeleteProgramMutation } from "../../../services/queries/programQuery";

const theme = createTheme();

describe("Manage Program", () => {
  it("renders manage program component", () => {
    const item = {
      id: 1,
      programName: "Test Program",
      // Add other necessary properties for item object
    };

    const { getByLabelText } = render(
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <ManageProgram />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if the MoreVertIcon button exists
    const moreVertIcon = screen.getByLabelText("more");
    expect(moreVertIcon).toBeInTheDocument();

    // You can add more assertions to test other elements in the component
  });

  // it("handles click on MoreVertIcon", () => {
  //   const { getByLabelText, getByText } = render(
  //     <BrowserRouter>
  //       <AuthProvider>
  //         <QueryClientProvider client={queryClient}>
  //           <ThemeProvider theme={theme}>
  //             <ManageProgram item={{ id: 1 }} />
  //           </ThemeProvider>
  //         </QueryClientProvider>
  //       </AuthProvider>
  //     </BrowserRouter>
  //   );
  //   const moreVertIcon = screen.getByLabelText("more");
  //   fireEvent.click(moreVertIcon);
  //   const manageText = screen.getByText("Manage");
  //   expect(manageText).toBeInTheDocument();
  // });

  // it("handles close menu", () => {
  //   const handleCloseMenu = {
  //     anchorEl: null, // Assuming it's initially closed
  //     setAnchorEl: jest.fn(), // Mock setIsFilterPopupOpen function
  //   };

  //   render(
  //     <BrowserRouter>
  //       <AuthProvider>
  //         <QueryClientProvider client={queryClient}>
  //           <ThemeProvider theme={theme}>
  //             <ManageProgram
  //               item={{ id: 1 }}
  //               anchorEl={handleCloseMenu.anchorEl}
  //               setAnchorEl={handleCloseMenu.setAnchorEl}
  //             />
  //           </ThemeProvider>
  //         </QueryClientProvider>
  //       </AuthProvider>
  //     </BrowserRouter>
  //   );
  //   // Get the icon button and click to open the popover
  //   const moreVertIcon = screen.getByLabelText("more");
  //   fireEvent.click(moreVertIcon);
  //   // Assert that the popover is closed
  //   expect(handleCloseMenu.setAnchorEl).toHaveBeenCalled();
  // });

  // it("handles opening and closing popover", () => {
  //   const { getByLabelText, queryByText } = render(
  //     <BrowserRouter>
  //       <AuthProvider>
  //         <QueryClientProvider client={queryClient}>
  //           <ThemeProvider theme={theme}>
  //             <ManageProgram item={{ id: 1 }} />
  //           </ThemeProvider>
  //         </QueryClientProvider>
  //       </AuthProvider>
  //     </BrowserRouter>
  //   );
  //   const moreVertIcon = screen.getByLabelText("more");
  //   fireEvent.click(moreVertIcon);
  //   const manageText = screen.getByText("Manage");
  //   expect(manageText).toBeInTheDocument();
  //   fireEvent.click(moreVertIcon);
  //   const closedPopoverText = screen.queryByText("Manage");
  //   expect(closedPopoverText).not.toBeInTheDocument();
  // });

  // it("handles delete program", async () => {
  //   // Mock the deleteProgram.mutate function
  //   const mockDeleteProgram = jest.fn();
  //   const itemId = 123; // Example item ID
  //   useDeleteProgramMutation.mockReturnValue({
  //     mutate: mockDeleteProgram,
  //   });

  //   // Render the component
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <AuthProvider>
  //         <QueryClientProvider client={queryClient}>
  //           <ThemeProvider theme={theme}>
  //             <ManageProgram item={{ id: itemId }} />
  //           </ThemeProvider>
  //         </QueryClientProvider>
  //       </AuthProvider>
  //     </BrowserRouter>
  //   );

  //   // Click the "Delete Program" menu item
  //   fireEvent.click(screen.getByText("Delete Program"));

  //   // Assert that the deleteProgram mutation function is called with the correct item ID
  //   await waitFor(() => {
  //     expect(mockDeleteProgram).toHaveBeenCalledWith(
  //       itemId,
  //       expect.any(Object)
  //     );
  //   });
  // });
});

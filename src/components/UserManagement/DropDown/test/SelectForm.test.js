import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import DropDown from "../DropDown";
import SelectForm from "../SelectForm";

const theme = createTheme();

describe("Select Form", () => {
    it('renders without crashing', () => {
        render(<SelectForm />);
      });
    
      it('displays correct permission text based on permissionType prop', () => {
        const { getByText } = render(<SelectForm permissionType="3" />);
        expect(screen.getByText('Create')).toBeInTheDocument();
      });
    
    //   it('calls setPermissionData with correct value when changing selection', () => {
    //     const setPermissionDataMock = jest.fn();
    //     const { getByLabelText, getByText } = render(
    //       <SelectForm permissionType="2" setPermissionData={setPermissionDataMock} />
    //     );
    //     const select = screen.getByLabelText('Grouping');
    
    //     fireEvent.mouseDown(select);
    //     fireEvent.click(screen.getByText('Modify'));
    
    //     expect(setPermissionDataMock).toHaveBeenCalledWith(4);
    //   });
    
    //   it('toggles selection correctly when updating is false', () => {
    //     const { getByText } = render(<SelectForm updating={false} />);
    //     fireEvent.click(screen.getByText('View'));
    //     expect(screen.getByText('View')).toBeInTheDocument();
    //   });

    //   it('handleOpen sets open state to true', () => {
    //     const setPermissionData = jest.fn(); // Mocking the setPermissionData function
      
    //     const { getByLabelText } = render(
    //       <SelectForm
    //         id="1"
    //         updating={true}
    //         permissionType={1}
    //         setPermissionData={setPermissionData}
    //       />
    //     );
      
    //     const select = screen.getByText('Permission'); // Assuming 'Permission' is the label text
      
    //     fireEvent.click(select); // Simulating opening the select menu
      
    //     expect(select).toHaveAttribute('aria-expanded="true"'); // Verifying that the select menu is open
    //   });
});

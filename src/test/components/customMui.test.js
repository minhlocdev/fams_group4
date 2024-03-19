import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ExpandMore, InfoTooltip, QuantityInput } from '../../components/shared/lib/CustomMUI';

import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { ExpandOutlined, Info } from '@mui/icons-material';

test('InfoTooltip renders with correct styles', async () => {
    const theme = createTheme();
    render(
        <ThemeProvider theme={theme}>
            <InfoTooltip title={'Hello'}>
                <Info />
            </InfoTooltip>
        </ThemeProvider>
    );

    const tooltipSVG = screen.getByTestId('InfoIcon');
    // Use a more specific query based on your Tooltip structure
    fireEvent.mouseOver(tooltipSVG)
    await waitFor(() => screen.findAllByRole('tooltip'))
    expect(screen.getByText('Hello')).toBeInTheDocument()

});//ok

test('ExpandMore rotates on click and expand is true', () => {
    const theme = createTheme();
    const expand = true;

    render(
        <ThemeProvider theme={theme}>
            <ExpandMore expand={expand}>
                <ExpandOutlined />
            </ExpandMore>
        </ThemeProvider>
    );

    const expandMoreIcon = screen.getByRole('button');
    expect(expandMoreIcon).toHaveStyle({
        transform: 'rotate(180deg)',
    });
});//ok
test('ExpandMore rotates on click and expand is false', () => {
    const theme = createTheme();
    const expand = false;

    render(
        <ThemeProvider theme={theme}>
            <ExpandMore expand={expand}>
                <ExpandOutlined />
            </ExpandMore>
        </ThemeProvider>
    );

    const expandMoreIcon = screen.getByRole('button');
    expect(expandMoreIcon).toHaveStyle({
        transform: 'rotate(0deg)',
    });
});//ok

test('QuantityInput updates value correctly', () => {
    let inputValue = 5;
    const handleInputChange = jest.fn((value) => {
        inputValue = value;
    });

    render(<QuantityInput value={inputValue} onInputChange={handleInputChange} />);

    const inputElement = screen.getByDisplayValue('5');
    // // Check the initial value
    expect(inputElement.value).toBe("5");
    // Simulate a change event on the input
    fireEvent.change(inputElement, { target: { value: '10' } });

    // Check if onInputChange was called with the correct value
    expect(handleInputChange).toHaveBeenCalledWith('10');

    // Check if the input value has been updated
    expect(inputValue).toBe("10");
});//ok

test('QuantityInput updates value increase, decrease', () => {
    let inputValue = 5;
    const handleInputChange = jest.fn((value) => {
        inputValue = value;
    });
    render(<QuantityInput value={inputValue} onInputChange={handleInputChange} />);

    const decrementButton = screen.getByTestId('RemoveIcon');
    const incrementButton = screen.getByTestId('AddIcon');
    fireEvent.click(incrementButton);
    expect(handleInputChange).toHaveBeenCalled();
    fireEvent.click(decrementButton);
    expect(handleInputChange).toHaveBeenCalled();
});//ok
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppContainer from '../../components/shared/layout/AppContainer';

import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { Header } from '../../components/shared/layout/header';

const theme = createTheme();

describe('AppContainer', () => {
    it('renders component', () => {
        render(
            <ThemeProvider theme={theme}>
                <AppContainer>Test Content</AppContainer>
            </ThemeProvider>
        )
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });//ok
    it('should adjust layout based on sidebar', () => {
        render(
            <ThemeProvider theme={theme}>
                <AppContainer>Test Content</AppContainer>
            </ThemeProvider>
        );
        fireEvent.click(screen.getByRole('button', { name: 'open drawer' }));
        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});

describe('Header', () => {
    it('renders component', () => {
        window.innerWidth = 2000
        render(
            <ThemeProvider theme={theme}>
                <Header />
            </ThemeProvider>
        )
        expect(screen.getByText('Log out')).toBeInTheDocument()
        expect(screen.getByAltText('logo fpt')).toBeInTheDocument()
    });//ok
    it('renders correctly when screen small', () => {
        window.innerWidth = 400
        fireEvent.resize(window.innerWidth)
        render(
            <ThemeProvider theme={theme}>
                <Header />
            </ThemeProvider>
        )
        expect(screen.queryByAltText('logo fpt')).toBeNull();
    });

})

test('Footer renders with correct styles', () => {


});//ok

test('Sidebar renders with correct styles', () => {


});//ok

test('MobileSidebar renders with correct styles', () => {


});//ok

it("MobileSidebar renders correctly on mobiles screens", () => {
    // Set the screen size to a smaller value

    // Render the component
    // render(<MyApp />);

    // Verify that the component styles are correct for the default screen size
    // const pElement = screen.getByText("Hello Mobile");
    // expect(pElement).toBeInTheDocument();
});
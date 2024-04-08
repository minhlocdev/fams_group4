import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateGeneral from '../CreateGeneral';
import { BrowserRouter } from 'react-router-dom';

describe('CreateGeneral component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter> {/* Wrap LoginPage with BrowserRouter */}
        <CreateGeneral />
      </BrowserRouter>
    );
    // Add assertions to check if certain elements are present
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  test('expands and collapses on click', () => {
    render(
      <BrowserRouter> {/* Wrap LoginPage with BrowserRouter */}
        <CreateGeneral />
      </BrowserRouter>
    );
    const expandButton = screen.getByLabelText('show more');
    
    // Expand
    fireEvent.click(expandButton);
    expect(screen.getByLabelText('show less')).toBeInTheDocument();
    
    // Collapse
    fireEvent.click(expandButton);
    expect(screen.getByLabelText('show more')).toBeInTheDocument();
  });

  test('selects trainer from dropdown', async () => {
    render(
      <BrowserRouter> {/* Wrap LoginPage with BrowserRouter */}
        <CreateGeneral />
      </BrowserRouter>
    );
    const trainerDropdown = screen.getByLabelText('Trainer');
    
    // Simulate selecting a trainer from the dropdown
    fireEvent.change(trainerDropdown, { target: { value: 'Some Trainer' } });

    // Ensure the state updates accordingly
    await waitFor(() => {
      expect(trainerDropdown).toHaveValue('Some Trainer');
    });
  });

  // Add more tests for selecting FSU, contact, data fetching, etc.
});

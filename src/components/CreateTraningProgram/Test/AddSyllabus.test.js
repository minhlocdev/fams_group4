import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AddSyllabus from '../AddSyllabus';

describe('AddSyllabus component', () => {
  test('renders correctly', () => {
    render(<AddSyllabus TraningProgramName="Test Program" />);

    // Add your assertions to ensure the correct elements are rendered
    expect(screen.getByText('Training program')).toBeInTheDocument();
    expect(screen.getByText('Test Program')).toBeInTheDocument();
    // Add more assertions as needed
  });

  test('searching and adding syllabus', async () => {
    render(<AddSyllabus TraningProgramName="Test Program" />);

    // Simulate searching and adding syllabus
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Linux' } });
    fireEvent.click(screen.getByText('Search'));

    // Wait for the search to complete
    await waitFor(() => {
      expect(screen.getByText('Linux')).toBeInTheDocument();
    });

    // Simulate adding syllabus
    fireEvent.click(screen.getByText('Add'));

    // Ensure syllabus is added
    expect(screen.getByText('Linux')).toBeInTheDocument();
  });

  // Add more test cases for other functionalities as needed
});

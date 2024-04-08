import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClassCreateHeader from '../ClassCreateHeader';

describe('ClassCreateHeader', () => {
  it('renders class title when classTitle is provided', () => {
    // Arrange
    const classTitle = 'Example Class';

    // Act
    render(<ClassCreateHeader classTitle={classTitle} />);

    // Assert
    expect(screen.getByText(classTitle)).toBeInTheDocument();
  });

  it('renders planning status when classTitle is provided', () => {
    // Arrange
    const classTitle = 'Example Class';

    // Act
    render(<ClassCreateHeader classTitle={classTitle} />);

    // Assert
    expect(screen.getByText('Planning')).toBeInTheDocument();
  });

  // Add more test cases as needed
});

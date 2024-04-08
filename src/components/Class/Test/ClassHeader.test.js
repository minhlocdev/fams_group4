import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClassHeader from '../ClassHeader';
import { ClassContext } from '../../../context/ClassContext'; // Assuming ClassContext is a named export

describe('ClassHeader', () => {
  it('renders class title and status', () => {
    render(
      <ClassContext.Provider value={{ classTitle: 'HCM_FR_DevOps_01' }}>
        <ClassHeader />
      </ClassContext.Provider>
    );

    expect(screen.getByText('HCM_FR_DevOps_01')).toBeInTheDocument();
    expect(screen.getByText('Planning')).toBeInTheDocument();
  });

  it('opens and closes menu when MoreHoriz button is clicked', () => {
    render(<ClassHeader />);

    const moreButton = screen.getByRole('button', { name: 'MoreHoriz' });
    fireEvent.click(moreButton);

    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(document.body); // Click outside to close the menu

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('calls handleClose when Edit menu item is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ClassContext.Provider value={{ classTitle: 'HCM_FR_DevOps_01' }}>
        <ClassHeader />
      </ClassContext.Provider>
    );

    const moreButton = screen.getByRole('button', { name: 'MoreHoriz' });
    fireEvent.click(moreButton);

    const editMenuItem = screen.getByText('Edit');
    fireEvent.click(editMenuItem);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

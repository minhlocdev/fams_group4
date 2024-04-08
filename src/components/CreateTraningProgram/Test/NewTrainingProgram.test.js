import {screen, render, fireEvent } from '@testing-library/react';
import NewTrainingProgram from '../NewTrainingProgram';


describe('NewTrainingProgram', () => {
  it('renders without crashing', () => {
    render(<NewTrainingProgram />);
  });

  it('calls newProgramName when the input value changes', () => {
    const newProgramName = jest.fn();
    const { getByLabelText } = render(<NewTrainingProgram newProgramName={newProgramName} />);
    fireEvent.change(screen.getByLabelText('search'), { target: { value: 'New Program' } });
    expect(newProgramName).toHaveBeenCalledWith('New Program');
  });

  it('calls clickCreate when the Create button is clicked', () => {
    const clickCreate = jest.fn();
    const { getByText } = render(<NewTrainingProgram clickCreate={clickCreate} />);
    fireEvent.click(screen.getByText('Create'));
    expect(clickCreate).toHaveBeenCalled();
  });

  // Add more tests as needed to cover the functionality of your component
});
import { screen, render, fireEvent } from '@testing-library/react';
import { ClassContext } from '../../../../context/ClassContext';
import ClassStepper from '../ClassStepper';
import { BrowserRouter as Router } from 'react-router-dom';
describe('ClassStepper', () => {
  it('renders without crashing', () => {
    const classData = {
      activeStep: 0,
      setActiveStep: jest.fn(),
      fieldValidation: {},
      handleSave: jest.fn(),
    };

    render(
    <Router>
      <ClassContext.Provider value={classData}>
        <ClassStepper />
      </ClassContext.Provider>
    </Router>
    );
  });

  it('calls setActiveStep with increased value when handleNext is called', () => {
    const setActiveStep = jest.fn();
    const classData = {
      activeStep: 0,
      setActiveStep,
      fieldValidation: {},
      handleSave: jest.fn(),
    };

    const { getByText } = render(
      <ClassContext.Provider value={classData}>
        <ClassStepper />
      </ClassContext.Provider>
    );

    fireEvent.click(screen.getByText('Next'));
    expect(setActiveStep).toHaveBeenCalledWith(1);
  });

  
});
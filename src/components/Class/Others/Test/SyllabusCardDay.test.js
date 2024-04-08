import React from 'react';
import {screen, render, fireEvent } from '@testing-library/react';
import SyllabusCardDay from '../SyllabusCardDay';
import '@testing-library/jest-dom';

describe('SyllabusCardDay', () => {
  it('renders without crashing', () => {
    const day = {
      dayNumber: 1,
      trainingUnits: [{ unitCode: 'unit1' }, { unitCode: 'unit2' }],
    };

    const { getByText } = render(<SyllabusCardDay day={day} syllabusId="syllabus1" />);

    expect(screen.getByText('Day 1')).toBeInTheDocument();
  });

  it('expands and collapses on click', () => {
    const day = {
      dayNumber: 1,
      trainingUnits: [{ unitCode: 'unit1' }, { unitCode: 'unit2' }],
    };

    const { getByText, queryByText } = render(<SyllabusCardDay day={day} syllabusId="syllabus1" />);

    fireEvent.click(screen.getByText('Day 1'));
    expect(screen.getByText('unit1')).toBeInTheDocument();
    expect(screen.getByText('unit2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Day 1'));
    expect(screen.queryByText('unit1')).not.toBeInTheDocument();
    expect(screen.queryByText('unit2')).not.toBeInTheDocument();
  });
});
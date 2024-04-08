import { render, screen } from '@testing-library/react';
import ClassCreateDetail from '../ClassCreateDetail';

describe('ClassCreateDetail', () => {
  it('renders without crashing', () => {
    render(<ClassCreateDetail />);

    // Check that CreateGeneral, CreateTimeFrame, CreateAttendee, and SyllabusTabOfClass are in the document
    // This assumes that these components render some text or other identifiable element
    const createGeneral = screen.getByText('Some text from CreateGeneral');
    expect(createGeneral).toBeInTheDocument();

    const createTimeFrame = screen.getByText('Some text from CreateTimeFrame');
    expect(createTimeFrame).toBeInTheDocument();

    const createAttendee = screen.getByText('Some text from CreateAttendee');
    expect(createAttendee).toBeInTheDocument();

    const syllabusTabOfClass = screen.getByText('Some text from SyllabusTabOfClass');
    expect(syllabusTabOfClass).toBeInTheDocument();
  });
});
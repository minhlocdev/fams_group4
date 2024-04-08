import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProgressBar from "../ProgressBar";

describe("Progress bar", () => {
  it("renders progress bar component", () => {
    render(<ProgressBar />);
  });

  it('renders progress bar with 40% progress and specific color when index is 1', () => {
    render(<ProgressBar index={1} />);
    const progressBar = screen.getByRole('slider');
    expect(progressBar).toHaveAttribute('aria-valuenow', '40');
    expect(progressBar).toHaveStyle('background-color: white');
  });

  it('renders progress bar with 66% progress and specific color when index is 2', () => {
    render(<ProgressBar index={2} />);
    const progressBar = screen.getByRole('slider');
    expect(progressBar).toHaveAttribute('aria-valuenow', '66');
    expect(progressBar).toHaveStyle('background-color: white');
  });

  it('renders progress bar with 90% progress and specific color when index is 3', () => {
    render(<ProgressBar index={3} />);
    const progressBar = screen.getByRole('slider');
    expect(progressBar).toHaveAttribute('aria-valuenow', '90');
    expect(progressBar).toHaveStyle('background-color: white');
  });
});

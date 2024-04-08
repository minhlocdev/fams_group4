import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchTranningProgram from "../SearchTranningProgram";

describe("SearchTranningProgram Component", () => {
  const mockHandleSearch = jest.fn();
  const mockProgram = [
    {
      programName: "Program 1",
      duration: 5,
      hours: 20,
      createdOn: "2022-03-25",
      createdBy: "John Doe",
    },
    {
      programName: "Program 2",
      duration: 7,
      hours: 25,
      createdOn: "2022-03-26",
      createdBy: "Jane Smith",
    },
  ];

  test("renders SearchTranningProgram component", async () => {
    render(<SearchTranningProgram program={[]} loading={false} />);
    expect(await screen.findByRole("textbox")).toBeInTheDocument();
  });

  test("displays options correctly", async () => {
    render(
      <SearchTranningProgram program={mockProgram} loading={false} />
    );

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);

    expect(await screen.findByText("Program 1")).toBeInTheDocument();
    expect(await screen.findByText("Program 2")).toBeInTheDocument();
  });

  test("handles search correctly", async () => {
    render(
      <SearchTranningProgram
        program={mockProgram}
        loading={false}
        handleSearch={mockHandleSearch}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Program 1" } });

    const programOption = await screen.findByText("Program 1");
    fireEvent.click(programOption);

    expect(mockHandleSearch).toHaveBeenCalledWith(mockProgram[0]);
  });

  test("displays loading indicator", async () => {
    render(<SearchTranningProgram program={[]} loading={true} />);
    expect(await screen.findByTestId("circular-progress")).toBeInTheDocument();
  });
});

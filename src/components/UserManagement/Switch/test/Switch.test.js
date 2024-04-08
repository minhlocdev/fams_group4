import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Switch from "../Switch";

describe("Switch", () => {
  it("handleChange status", () => {
    // Mock setActive and handleChange functions
    const setActive = jest.fn();
    const handleChange = jest.fn();

    // Render the Switch component
    render(
      <Switch
        isactive={false} // Initial state of isActive
        setActive={setActive}
        handleChange={handleChange}
        formData={{ status: 0 }} // Initial formData state
      />
    );

    // // Simulate a click on the slider
    // const slider = screen.getByTitle("slider"); // Assuming you set a test id for the slider
    // fireEvent.click(slider);

    // // Assert that setActive and handleChange are called with correct parameters
    // expect(setActive).toHaveBeenCalledTimes(1);
    // expect(setActive).toHaveBeenCalledWith(true); // Expect setActive to be called with true (the new state)
    // expect(handleChange).toHaveBeenCalledTimes(1);
    // expect(handleChange).toHaveBeenCalledWith("status", 1); // Expect handleChange to be called with the updated status value
  });
});

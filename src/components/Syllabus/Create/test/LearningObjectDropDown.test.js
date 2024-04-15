import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import LearningObjectiveDropDown from "../LearningObjectiveDropDown";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "../../services/queries/queryClient";
// import { AuthProvider } from "../../utils/authUtil";

const theme = createTheme();

// Mocking the useGetObjectiveQuery hook
jest.mock("../../../services/queries/syllabusQuery", () => ({
  useGetObjectiveQuery: jest.fn(() => ({
    data: [{ objectiveCode: "exampleCode" }],
    isSuccess: true,
  })),
}));

describe("Learning Object Drop Down", () => {
  test("renders learning object drop down", () => {
    const handleChange = jest.fn();
    const formData = { learningObjectiveCode: "" };
    const errors = {};
    const defaultValue = "";

    const { getByLabelText } = render(
      <LearningObjectiveDropDown
        handleChange={handleChange}
        formData={formData}
        errors={errors}
        defaultValue={defaultValue}
      />
    );

    const selectElement = screen.getByLabelText("Output Standard");

    // Simulate changing the select value
    fireEvent.change(selectElement, { target: { value: "exampleCode" } });

    // Check if handleChange is called with the correct arguments
    expect(handleChange).toHaveBeenCalledWith(
      "learningObjectiveCode",
      "exampleCode"
    );
  });

  // Mocking the useGetObjectiveQuery hook
jest.mock("../../../services/queries/syllabusQuery", () => ({
    useGetObjectiveQuery: () => ({
      data: [
        { objectiveCode: "OBJ001" },
        { objectiveCode: "OBJ002" },
        { objectiveCode: "OBJ003" },
      ],
      isSuccess: true,
    }),
  }));
  
  test("LearningObjectiveDropDown renders correctly and handles change", async () => {
    const handleChange = jest.fn();
    const formData = { learningObjectiveCode: "" };
    const errors = { learningObjectiveCode: "" };
  
    const { getByText, getByLabelText } = render(
      <LearningObjectiveDropDown
        handleChange={handleChange}
        formData={formData}
        errors={errors}
      />
    );
  
    // Ensure the label is rendered correctly
    expect(screen.getByText("Output Standard")).toBeInTheDocument();
  
    // Ensure the default label "Select One" is rendered
    expect(screen.getByText("Select One")).toBeInTheDocument();
  
    // Ensure the select dropdown is initially empty
    const selectDropdown = screen.getByLabelText("Output Standard");
    expect(selectDropdown.value).toBe("");
  
    // Simulate a selection in the dropdown
    fireEvent.change(selectDropdown, { target: { value: "OBJ001" } });
  
    // Ensure the label changes visibility after a selection is made
    await waitFor(() => {
      expect(screen.getByText("Select One")).not.toBeVisible();
    });
  
    // Ensure the handleChange function is called with the correct parameters
    expect(handleChange).toHaveBeenCalledWith("learningObjectiveCode", "OBJ001");
  
    // Ensure the selected value is reflected in the select dropdown
    expect(selectDropdown.value).toBe("OBJ001");
  });
});

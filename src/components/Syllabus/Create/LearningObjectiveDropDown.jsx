import React, { useState } from "react";
import {
    FormControlLabel,
    Select,
    MenuItem,
    ListItemIcon,
    ListItemText,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";
import {
    QuizIcon,
    ConceptIcon,
    AssignmentIcon,
    GuideIcon,
    ExamIcon,
    WorkShopIcon,
} from "../../../assets/scss/icon";
import { useGetObjectiveQuery } from "../../../services/queries/syllabusQuery";
const textBox = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    "& .MuiFormControlLabel-label": {
        fontSize: "16px",
        fontWeight: "500",
        color: "rgb(0, 0, 0)",
    },
    flexDirection: { xs: "column-reverse", lg: "row-reverse" },
    alignItems: { xs: "flex-start", lg: "" },
};
const textFields = {
    display: "flex",
    width: { xs: "90%", lg: "315px" },
    flexDirection: "row-reseve",
    "& .MuiInputBase-input": {
        padding: "10px",
    },
    "& .MuiInputBase-input::placeholder": {
        fontStyle: "italic",
        fontWeight: "bolder",
        color: "rgb(0, 0, 0)",
    },
};

export default function LearningObjectiveDropDown({
    handleChange,
    formData,
    errors,
    defaultValue,
}) {
    const { data, isSuccess } = useGetObjectiveQuery()
    const [hideLabel, setHideLabel] = useState(false);
    return (
        <FormControlLabel
            sx={textBox}
            control={
                <FormControl sx={textFields}>
                    <InputLabel
                        sx={{
                            fontStyle: "italic",
                            marginTop: "-5px",

                            display: hideLabel ? "none" : "block",
                        }}
                        id="select-one-label"
                    >
                        Select One
                    </InputLabel>
                    <Select
                        sx={{
                            borderRadius: "5px",
                            backgroundColor: "#FFFFFF",
                            boxShadow:
                                "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
                            "& .MuiInputBase-input": {
                                display: "flex",
                            },
                        }}
                        labelId="select-one-label"
                        value={formData.OutputStandard}
                        onChange={(e) => {
                            setHideLabel(e.target.value !== "");
                            handleChange("OutputStandard", e.target.value);
                        }}
                        error={Boolean(errors.OutputStandard)}
                        defaultValue={defaultValue ? defaultValue : ""}
                    >
                        {isSuccess && data?.map((value, index) => (
                            <MenuItem key={index} value={value.objectiveCode}>
                                <ListItemIcon>{value.objectiveCode}</ListItemIcon>
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText sx={{ color: "#db2f2f" }}>
                        {errors.OutputStandard}
                    </FormHelperText>
                </FormControl>
            }
            label="Output Standard"
            labelPlacement="start"
        />
    );
}

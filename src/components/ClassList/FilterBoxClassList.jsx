import React, { useState } from "react";
import {
    Checkbox,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material";
import LimitTags from "./InputBoxClassList";
import DateRangePicker from "../shared/calendar/DateRangePicker";

export default function FilterBoxClassList() {
    const [checked, setChecked] = React.useState([]);
    const [trainer, setTrainer] = React.useState("");
    const handleChangeTrainer = (event) => {
        setTrainer(event.target.value);
    };
    const [selectedTags, setSelectedTags] = useState([]);
    const handleTagsChange = (tags) => {
        setSelectedTags(tags);
    };
    const handleClear = () => {
        setChecked([]);
        setSelectedTags([]);
    };

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Typography variant="h8">Class Location</Typography>
                    <LimitTags
                        selectedTags={selectedTags}
                        onTagsChange={handleTagsChange}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h8">Created On:</Typography>
                    <DateRangePicker />
                </Grid>
            </Grid>


            <Stack direction="row" spacing={2} justifyContent={"flex-end"} style={{marginTop: "15px"}}>
                <Button
                    sx={{
                        color: "whitesmoke",
                        backgroundColor: "#2D3748",
                        padding: "5px 25px",
                        fontWeight: "600",
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: "#2D3748",
                            opacity: "0.5",
                        },
                    }}
                    onClick={() => handleClear()}
                >
                    Clear
                </Button>
                <Button
                    sx={{
                        color: "whitesmoke",
                        backgroundColor: "#2D3748",
                        padding: "5px 25px",
                        borderRadius: "8px",
                        fontWeight: "600",

                        "&:hover": {
                            backgroundColor: "#2D3748",
                            opacity: "0.5",
                        },
                    }}
                >
                    Save
                </Button>
            </Stack>
        </>
    );
}

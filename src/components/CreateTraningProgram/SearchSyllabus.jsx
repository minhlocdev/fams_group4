import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { SearchOutlined } from "@mui/icons-material";
export default function SearchSyllabus(probs) {
  const { program, loading, handleSearch } = probs;
  const [open, setOpen] = React.useState(false);
  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 350,
        "& .MuiOutlinedInput-root": {
          padding: "0px",
          paddingLeft: 1,
        },
      }}
      freeSolo
      options={program}
      loading={loading}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      onChange={(event, newValue) => {
        if (
          newValue !== null &&
          program.some((option) => option.name === newValue.name)
        ) {
          handleSearch(newValue);
        }
      }}
      getOptionLabel={(option) =>
        option.name !== undefined ? option.name : option
      }
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            width: "400px",
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),

            startAdornment: <SearchOutlined />,
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <div
            {...props}
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="p" sx={{}} fontWeight={600}>
              {option.name}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              spacing={1}
              sx={{
                fontStyle: "italic",
                fontSize: "12px",
              }}
            >
              <Typography variant="span" sx={{}}>
                {option.duration}
              </Typography>
              <Typography variant="span" sx={{}}>
                {dayjs(option.modifiedDate).format("DD/MM/YYYY")} by{" "}
                {option.modifiedBy}
              </Typography>
            </Stack>
          </div>
        );
      }}
    />
  );
}

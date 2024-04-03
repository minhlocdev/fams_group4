import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { SearchOutlined } from "@mui/icons-material";
import ClassContext from "../../../context/ClassContext";
export default function SearchTranningProgram(probs) {
  const { program, loading } = probs;
  const { handleSearch } = React.useContext(ClassContext);
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 400, marginTop: 2, marginLeft: 4, marginRight: 4 }}
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      onChange={(event, newValue) => handleSearch(newValue)}
      getOptionLabel={(option) => option.name}
      options={program}
      loading={loading}
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
                {option.durationByDay} days ({option.durationByHour} hours)
              </Typography>
              <Typography variant="span" sx={{}}>
                {option.createdDate}
              </Typography>

              <Typography variant="span" sx={{}}>
                by:{option.createdBy}
              </Typography>
            </Stack>
          </div>
        );
      }}
    />
  );
}

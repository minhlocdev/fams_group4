import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React from "react";

export default function LimitTagsSyllabus({
  data,
  selectedTags,
  onTagsChange,
  loading,
}) {
  const [open, setOpen] = React.useState(false);
  const handleAutocompleteChange = (event, value) => {
    onTagsChange(value);
  };
  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      multiple
      limitTags={2}
      id="size-small-outlined-multi"
      options={data}
      loading={loading}
      getOptionLabel={(option) => option}
      value={selectedTags}
      onChange={handleAutocompleteChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Output Standard ..."
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
          }}
        />
      )}
      sx={{
        // width: "450px",
        marginTop: "5px",
        "& .MuiInputBase-root": {
          paddingY: "5px",
        },
      }}
    />
  );
}

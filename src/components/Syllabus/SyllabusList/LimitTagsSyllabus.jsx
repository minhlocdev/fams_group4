import { Autocomplete, TextField } from '@mui/material';
import React from 'react'

export default function LimitTagsSyllabus({ selectedTags, onTagsChange }) {
    const handleAutocompleteChange = (event, value) => {
      onTagsChange(value);
    };
    return (
      <Autocomplete
        multiple
        limitTags={2}
        id="size-small-outlined-multi"
        options={provinces}
        getOptionLabel={(option) => option.name}
        value={selectedTags}
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField {...params} placeholder="Output Standard ..." />
        )}
        sx={{
          width: "450px",
          marginTop: "5px",
          "& .MuiInputBase-root": {
            paddingY: "5px",
          },
        }}
      />
    );
  }
  
  const provinces = [
    { name: "H4SD" },
    { name: "K6SD" },
    { name: "H6SD" },  
  ];
  

import React from 'react'
import {IconButton, InputBase, Box, Chip, Stack, FormControl, InputAdornment, InputLabel, TextField,OutlinedInput} from '@mui/material'
import { Visibility, VisibilityOff} from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
export function InputBoxSearch() {
  return (
    <Box
      component="form"
      sx={{ border: "1px solid", borderRadius: "10px", p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by ..."
        inputProps={{ 'aria-label': 'search' }}
      />
    </Box>
  );
}

export function InputBoxTwoSearch() {
  return (
    <Box
      component="form"
      sx={{ border: "1px solid", borderRadius: "10px", p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by ..."
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export function InputBoxSearchError() {
  return (
    <><Box
      component="form"
      sx={{ border: "1px solid #8B8B8B", borderRadius: "8px", marginLeft: '10px', p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by ..."
        inputProps={{ 'aria-label': 'search' }} />
    </Box><Box
        sx={{
          height: '10px',
          color: 'red',
          paddingLeft: '12px',
          fontSize: '12px',
          fontStyle:'italic',
          }}
      >
      <p>This field is required</p>
    </Box ></>
  );
}

export function InputBoxSearchFilled() {
  return (
    <TextField
      sx={{
        backgroundColor: "#DFDEDE",
        border: "1px solid #DFDEDE",
        borderRadius: "5px",
      }}
      label="Search by..."
      variant="outlined" />
  );
}

export function InputBoxSearchVisibility() {
  const [showSearch, setShowSearch] = React.useState(false);

  const handleClickShowSearch = () => setShowSearch((show) => !show);

  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl sx={{ backgroundColor: '#DFDEDE', border: "1px solid #DFDEDE", borderRadius: "5px", m: 1, width: '25ch' }} variant="outlined">
        <InputLabel>Search by...</InputLabel>
        <OutlinedInput
          id="outlined-adornment-search"
          type={showSearch ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle search visibility"
                onClick={handleClickShowSearch}
                onMouseDown={handleMouseDownSearch}
                edge="end"
              >
                {showSearch ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Search by ..."
        />
      </FormControl>
    </Box>
  )
}

export function InputBoxSearchWithChip() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  return (
    <Box
      component="form"
      sx={{ border: "1px solid", borderRadius: "10px", p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Stack direction="row" spacing={1}>
        <Chip
          sx={{
            color: '#FFFFFF',
            backgroundColor: '#2D3748'
          }}
          label="H4SD"
          variant="outlined"
          onDelete={handleDelete} />

      </Stack>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by ..."
        inputProps={{ 'aria-label': 'search' }}
      />
    </Box>
  );
}











import React from "react";
import {
  IconButton,
  InputBase,
  Box,
  Chip,
  Stack,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  OutlinedInput,
  Autocomplete,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

export function InputBoxSearchClassList() {
  return (
    <Box
      component="form"
      sx={{
        border: "1px solid",
        borderRadius: "10px",
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 280,
      }}
    >
      <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by ..."
        inputProps={{ "aria-label": "search" }}
      />
    </Box>
  );
}

export function InputBoxTwoSearch() {
  return (
    <Box
      component="form"
      sx={{
        border: "1px solid",
        borderRadius: "10px",
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 280,
      }}
    >
      <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by ..."
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export function InputBoxSearchError() {
  return (
    <>
      <Box
        component="form"
        sx={{
          border: "1px solid #8B8B8B",
          borderRadius: "8px",
          marginLeft: "10px",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 280,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by ..."
          inputProps={{ "aria-label": "search" }}
        />
      </Box>
      <Box
        sx={{
          height: "10px",
          color: "red",
          paddingLeft: "12px",
          fontSize: "12px",
          fontStyle: "italic",
        }}
      >
        <p>This field is required</p>
      </Box>
    </>
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
      variant="outlined"
    />
  );
}

export function InputBoxSearchVisibility() {
  const [showSearch, setShowSearch] = React.useState(false);

  const handleClickShowSearch = () => setShowSearch((show) => !show);

  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <FormControl
        sx={{
          backgroundColor: "#DFDEDE",
          border: "1px solid #DFDEDE",
          borderRadius: "5px",
          m: 1,
          width: "25ch",
        }}
        variant="outlined"
      >
        <InputLabel>Search by...</InputLabel>
        <OutlinedInput
          id="outlined-adornment-search"
          type={showSearch ? "text" : "password"}
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
  );
}

const CusChip = styled(Chip)`
  color: #ffffff;
  background-color: #2d3748;
`;

export function InputBoxSearchWithChip() {
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  return (
    <Box
      component="form"
      sx={{
        border: "1px solid",
        borderRadius: "10px",
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 280,
      }}
    >
      <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: "wrap", rowGap: "3px" }}
      >
        <CusChip label="H4SD" variant="outlined" onDelete={handleDelete} />
      </Stack>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by ..."
        inputProps={{ "aria-label": "search" }}
        multiline={true}
      />
    </Box>
  );
}
export default function LimitTags({ selectedTags, onTagsChange }) {
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
        <TextField {...params} placeholder="Province/City" />
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
  { name: "An Giang" },
  { name: "Bac Giang" },
  { name: "Bac Kan" },
  { name: "Bac Lieu" },
  { name: "Bac Ninh" },
  { name: "Ba Ria - Vung Tau" },
  { name: "Ben Tre" },
  { name: "Binh Dinh" },
  { name: "Binh Duong" },
  { name: "Binh Phuoc" },
  { name: "Binh Thuan" },
  { name: "Ca Mau" },
  { name: "Can Tho" },
  { name: "Cao Bang" },
  { name: "Da Nang" },
  { name: "Dak Lak" },
  { name: "Dak Nong" },
  { name: "Dien Bien" },
  { name: "Dong Nai" },
  { name: "Dong Thap" },
  { name: "Gia Lai" },
  { name: "Ha Giang" },
  { name: "Hai Duong" },
  { name: "Hai Phong" },
  { name: "Ho Chi Minh" },
  { name: "Ha Noi" },
  { name: "Ha Nam" },
  { name: "Ha Tinh" },
  { name: "Hau Giang" },
  { name: "Hoa Binh" },
  { name: "Hung Yen" },
  { name: "Khanh Hoa" },
  { name: "Kien Giang" },
  { name: "Kon Tum" },
  { name: "Lai Chau" },
  { name: "Lam Dong" },
  { name: "Lang Son" },
  { name: "Lao Cai" },
  { name: "Long An" },
  { name: "Nam Dinh" },
  { name: "Nghe An" },
  { name: "Ninh Binh" },
  { name: "Ninh Thuan" },
  { name: "Phu Tho" },
  { name: "Phu Yen" },
  { name: "Quang Binh" },
  { name: "Quang Nam" },
  { name: "Quang Ngai" },
  { name: "Quang Ninh" },
  { name: "Quang Tri" },
  { name: "Soc Trang" },
  { name: "Son La" },
  { name: "Tay Ninh" },
  { name: "Thai Binh" },
  { name: "Thai Nguyen" },
  { name: "Thanh Hoa" },
  { name: "Thua Thien Hue" },
  { name: "Tien Giang" },
  { name: "Tra Vinh" },
  { name: "Tuyen Quang" },
  { name: "Vinh Long" },
  { name: "Vinh Phuc" },
  { name: "Yen Bai" },
];

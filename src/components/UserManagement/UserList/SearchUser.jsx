import React, { useState } from "react";
import { IconButton, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";

export default function SearchUser() {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [searchUser, setSearchUser] = useState(
    params.has("search") ? params.get("search") : ""
  );

  const handleInputChange = (event) => {
    const searchInput = event.target.value;
    setSearchUser(searchInput);
    params.set("search", searchInput);
    setSearchParams(params.toString());
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="div"
        sx={{
          border: "1px solid",
          borderRadius: "10px",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 280,
        }}
      >
        <IconButton sx={{ p: "5px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          value={searchUser}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by ..."
          inputProps={{ "aria-label": "search" }}
          onChange={handleInputChange}
        />
      </Box>
    </Box>
  );
}

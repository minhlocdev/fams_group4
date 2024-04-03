import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ExpandMore } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { PermissionEnums } from "../../../constants/PermissionEnums";
export default function SelectForm(props) {
  const { id, updating, permissionType, setPermissionData } = props;
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    let selectedMenuItem = PermissionEnums.find(
      (item) => item.id === String(permissionType)
    );
    setValue(selectedMenuItem ? selectedMenuItem.text : "");
  }, [permissionType]);
  const [selected, isSelected] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const findPermissionTypeId = (value) => {
    let selectedMenuItem = PermissionEnums.find((item) => item.text === value);
    return parseInt(selectedMenuItem.id);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
    setPermissionData(findPermissionTypeId(event.target.value));
  };
  const handleSelect = () => {
    isSelected(!selected);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event) => {
    if (event.target.value !== undefined) {
      isSelected(!selected);
    }
    setOpen(false);
  };
  return (
    <>
      {updating ? (
        <FormControl
          sx={{
            width: "165px",
            height: "30px",
            "& label": {
              top: "-9px",
            },
          }}
        >
          <InputLabel sx={{}} htmlFor={`grouped-select-${id}`}>
            Permission
          </InputLabel>
          <Select
            sx={{
              minWidth: "165px",
              minHeight: "30px",
              fontSize: "14px",
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
            }}
            IconComponent={ExpandMore}
            id={`grouped-select-${id}`}
            label="Grouping"
            value={`${value}`}
            onChange={handleChange}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
          >
            <MenuItem sx={{ display: "none" }} value="">
              <em>None</em>
            </MenuItem>
            {PermissionEnums.map((menu) => (
              <MenuItem key={menu.id} value={menu.text}>
                <Stack
                  spacing={1}
                  direction={"row"}
                  alignItems={"center"}
                  key={menu.id}
                >
                  {menu.icon}
                  <span>{menu.text}</span>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "165px",
            height: "30px",
          }}
          onClick={handleSelect}
        >
          {PermissionEnums.map(
            (menu) =>
              value === menu.text && (
                <Stack
                  spacing={1}
                  direction={"row"}
                  alignItems={"center"}
                  key={menu.id}
                >
                  {menu.icon}
                  <span>{menu.text}</span>
                </Stack>
              )
          )}
        </Box>
      )}
    </>
  );
}

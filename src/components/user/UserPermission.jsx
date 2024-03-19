import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";

function createData(name, syllabus, training, classes, material, user) {
  return { name, syllabus, training, classes, material, user };
}

export function SelectForm(props) {
  const [Value, setValue] = React.useState("");
  const [selected, isSelected] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
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

  const menuItems = [
    {
      id: "1",
      text: "Access Denied",
      icon: "visibility_off.png",
    },
    {
      id: "2",
      text: "View",
      icon: "visibility.png",
    },
    {
      id: "3",
      text: "Modify",
      icon: "create.png",
    },
    {
      id: "4",
      text: "Create",
      icon: "add.png",
    },
    {
      id: "5",
      text: "Full access",
      icon: "grade.png",
    },
  ];
  return (
    <>
      {selected === false ? (
        <FormControl
          sx={{
            Width: "165px",
            height: "30px",
            "& label": {
              top: "-9px",
            },
          }}
        >
          <InputLabel sx={{}} htmlFor="grouped-select">
            Permission
          </InputLabel>
          <Select
            sx={{
              minWidth: "165px",
              minHeight: "30px",
              fontSize: "14px",
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
              ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  display: "flex",
                  alignItems: "center",
                  padding: "0 0 0 5px",
                },
            }}
            IconComponent={ExpandMore}
            defaultValue=""
            id={props.id}
            label="Grouping"
            value={Value}
            onChange={handleChange}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
          >
            <MenuItem sx={{ display: "none" }} value="">
              <em>None</em>
            </MenuItem>
            {menuItems.map((menu) => (
              <MenuItem key={menu.id} value={menu.text}>
                <img
                  style={{ paddingRight: "10px" }}
                  src={menu.icon}
                  alt=""
                ></img>
                {menu.text}
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
          {menuItems.map(
            (menu) =>
              Value === menu.text && (
                <React.Fragment key={menu.id}>
                  <img
                    style={{
                      paddingRight: "10px",
                    }}
                    src={menu.icon}
                    alt=""
                  ></img>{" "}
                  {menu.text}
                </React.Fragment>
              ),
          )}
        </Box>
      )}
    </>
  );
}
export default function UserPermisson() {
  const rows = [
    createData(
      "Super Admin",
      <SelectForm id="1" />,
      <SelectForm id="2" />,
      <SelectForm id="3" />,
      <SelectForm id="4" />,
      <SelectForm id="5" />,
    ),
    createData(
      "Class admin",
      <SelectForm id="6" />,
      <SelectForm id="7" />,
      <SelectForm id="8" />,
      <SelectForm id="9" />,
      <SelectForm id="10" />,
    ),
    createData(
      "Trainer",
      <SelectForm id="11" />,
      <SelectForm id="12" />,
      <SelectForm id="13" />,
      <SelectForm id="14" />,
      <SelectForm id="15" />,
    ),
  ];
  return (
    <TableContainer
      sx={{
        boxShadow: "0px 20px 40px 0px rgba(0, 0, 0, 0.16)",
        border: "1px solid",
        height: "220px",
      }}
      component={Paper}
    >
      <Table
        sx={{
          "& thead": {
            backgroundColor: "#2D3748",
            borderRadius: "10px 10px 0px 0px",
          },
          "& tbody": {
            height: "180px",
          },
        }}
        aria-label="simple table"
      >
        <TableHead
          sx={{
            "& th": {
              fontSize: "14px",
              fontWeight: "600",
              padding: "5px 10px",
              color: "#fff",
            },
            "& tr": { borderRadius: "10px 10px 0px 0px" },
          }}
        >
          <TableRow sx={{}}>
            <TableCell>Role name</TableCell>
            <TableCell align="left">Syllabus</TableCell>
            <TableCell align="left">Training program</TableCell>
            <TableCell align="left">Class</TableCell>
            <TableCell align="left">Learning material</TableCell>
            <TableCell align="left">User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& tr": {
              Height: "60px",
              Width: "100%",
            },
          }}
        >
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
                "& th ,td": {
                  borderBottom: "0.5px solid var(--Main, #2D3748)",
                },
                ".css-16yer5a-MuiTableCell-root": {
                  padding: "10px",
                },
                ".css-1ex1afd-MuiTableCell-root": {
                  padding: "10px",
                },
                ".css-177lv70-MuiFormControl-root": {
                  margin: "0",
                },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "700",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell>{row.syllabus}</TableCell>
              <TableCell>{row.training}</TableCell>
              <TableCell>{row.classes}</TableCell>
              <TableCell>{row.material}</TableCell>
              <TableCell>{row.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

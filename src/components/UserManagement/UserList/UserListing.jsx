import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import EnhancedTableHead from "./EnhancedTableHead";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PersonIcon from "@mui/icons-material/Person";
import PopupMenu from "./PopupMenu";
import { useGetUserQuery } from "../../../services/queries/userQuery";
import theme from "../../../assets/theme";
import TableLoader from "../../shared/loader/TableLoader";
import { Link, Typography } from "@mui/material";
import { UserContext } from "../../../context/UserContext";
const headCells = [
  { id: "id", label: "ID" },
  { id: "name", label: "Full name" },
  { id: "email", label: "Email" },
  { id: "dateOfBirth", label: "Date of birth" },
  { id: "gender", label: "Gender" },
  { id: "roleName", label: "Type" },
];

const typeColors = {
  "Super Admin": theme.primary,
  Trainer: theme.green,
  "Class Admin": theme.orange,
};
export default function UserListing() {
  const {
    checked,
    page,
    rowsPerPage,
    debouncedSearchTerm,
    order,
    orderBy,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSortChange,
  } = useContext(UserContext);
  const { data, isLoading, error } = useGetUserQuery(
    page,
    rowsPerPage,
    orderBy,
    order,
    debouncedSearchTerm,
    checked
  );
  if (isLoading) {
    return <TableLoader column={6} />;
  }
  console.log(error);
  return (
    <Box sx={{ width: "100%", overflowY: "auto" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer
          sx={{
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            border: "none",
          }}
        >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              headCells={headCells}
              handleSortChange={handleSortChange}
            />
            <TableBody>
              {data?.list?.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      filter: row.status ? "none" : "opacity(30%)",
                    }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      style={{ padding: "10px 20px" }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <Link href={`/user/detail/${row.id}`} underline="hover">
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.dateOfBirth}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ display: "flex" }} alignItems={"center"}>
                        <PersonIcon
                          style={{
                            color:
                              row.gender.toLowerCase() === "male"
                                ? "#E74A3B"
                                : "inherit",
                            marginRight: "5px",
                          }}
                        />
                        {row.gender}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        label={row.roleName}
                        style={{
                          backgroundColor: typeColors[row.roleName],
                          color: "#FFFFFF",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <PopupMenu item={row} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {typeof data === "string" ||
                (error && (
                  <TableRow>
                    <TableCell colSpan={headCells.length} align="center">
                      <Typography variant="body1">
                        {error.response.data}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"}>
          <Pagination
            sx={{
              margin: "0 auto",
              ".MuiPaginationItem-page": {
                backgroundColor: "#E2E8F0",
              },
              ".MuiPagination-ul ": { gap: "5px" },
              ".MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#2D3748",
                color: "white",
              },
              ".MuiPaginationItem-firstLast.Mui-disabled": { display: "none" },
              ".MuiPaginationItem-text": { fontWeight: "bold" },
            }}
            count={data ? data?.totalPage : 0}
            page={page + 1}
            onChange={(event, value) => handleChangePage(event, value - 1)}
            showFirstButton
            showLastButton
          />
          <TablePagination
            sx={{
              borderBottom: "none",
              ".MuiTablePagination-input": { marginLeft: 0 },
              ".MuiTablePagination-select": { width: "25px" },
              "& .MuiTablePagination-displayedRows": { display: "none" },
              "& .MuiTablePagination-actions": { display: "none" },
            }}
            count={data ? data?.totalPage * data?.pageSize : 0}
            component="div"
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      </div>
    </Box>
  );
}

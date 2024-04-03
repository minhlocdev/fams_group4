import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import EnhancedTableHead from "./EnhancedTableHead";
import Popup from "./Popup";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useGetClassQuery } from "../../../services/queries/classQuery";
import TableLoader from "../../shared/loader/TableLoader";
import dayjs from "dayjs";
import theme from "../../../assets/theme";
import { Link, Typography } from "@mui/material";
import useTable from "../../../utils/hooks/useTable";
import ClassContext from "../../../context/ClassContext";

const headCells = [
  { id: "name", label: "Class" },
  { id: "code", label: "Class Code" },
  { id: "createdDate", label: "Created on" },
  { id: "createdBy", label: "Created by" },
  { id: "duration", label: "Duration" },
  { id: "attendee", label: "Attendee" },
  { id: "status", label: "Status" },
  { id: "location", label: "Location" },
  { id: "fsu", label: "FSU" },
];
const attendeeColors = {
  Fresher: theme.pink,
  "Online fee-Fresher": theme.green,
  Intern: theme.primary,
  "Offline fee-Fresher": theme.orange,
};

export default function ListofClass() {
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
  } = useContext(ClassContext);

  const { data, isLoading } = useGetClassQuery(
    page,
    rowsPerPage,
    orderBy,
    order,
    debouncedSearchTerm,
    checked
  );
  if (isLoading) {
    return <TableLoader column={8} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
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
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      style={{ padding: "10px 20px" }}
                    >
                      <Link href={`/class/detail/${row.id}`} underline="hover">
                        {row.className}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.classCode}</TableCell>
                    <TableCell align="left">
                      {dayjs(row.createdOn).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="left">{row.createdBy}</TableCell>
                    <TableCell align="left">
                      {row.duration >= 2
                        ? row.duration + " days"
                        : row.duration + " day"}
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        label={row.attendee}
                        style={{
                          backgroundColor: attendeeColors[row.attendee],
                          color: "#FFFFFF",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        label={row.status}
                        style={{
                          backgroundColor: theme.primary,
                          color: "#FFFFFF",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.location}</TableCell>
                    <TableCell align="left">{row.fsu}</TableCell>
                    <TableCell align="right">
                      <Popup item={row} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {typeof data === "string" ||
                (data?.list.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={headCells.length} align="center">
                      <Typography variant="body1">No data available</Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div>
        <Stack direction={"row"} alignItems={"center"}>
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

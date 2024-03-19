import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import EnhancedTableHead from "../../components/TraningProgramList/EnhancedTableHead";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ManageProgram from "./ManageProgram";
import {
  useGetAllProgramQuery,
  useGetProgramQuery,
} from "../../services/queries/programQuery";
import dayjs from "dayjs";
import theme from "../../assets/theme";
import TableLoader from "../shared/loader/TableLoader";
import { useSearchParams } from "react-router-dom";

const headCells = [
  { id: "id", label: "ID" },
  { id: "programName", label: "Program name" },
  { id: "createdOn", label: "Created on" },
  { id: "createdBy", label: "Created by" },
  { id: "duration", label: "Duration" },
  { id: "status", label: "Status" },
];
const statusColors = {
  Active: theme.primary,
  Inactive: "#B9B9B9",
  Draft: "#285D9A",
};

export default function TrainingProgramTable() {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [page, setPage] = useState(Number(searchParams.get("p")) || 0);
  const [rowsPerPage, setRowsPerPage] = useState(
    Number(searchParams.get("l")) || 10
  );

  const handleSortChange = (sort) => {
    params.set("orderby", sort.item);
    params.set("order", sort.dir);
    setSearchParams(params.toString());
  };
  const orderBy = searchParams.get("orderby");
  const order = searchParams.get("order");
  const { data, isLoading } = useGetProgramQuery(
    page,
    rowsPerPage,
    orderBy,
    order
  );

  const allPrograms = useGetAllProgramQuery();
  const totalPages = Math.ceil(allPrograms?.data?.length / rowsPerPage);
  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
    params.set("p", newPage);
    setSearchParams(params.toString());
  };
  if (isLoading) {
    return <TableLoader column={6} />;
  }

  const handleChangeRowsPerPage = (event) => {
    event.preventDefault();
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    params.set("p", 0);
    params.set("l", event.target.value);
    setSearchParams(params.toString());
  };

  return (
    <Box sx={{ width: "100%", marginTop: 4, marginX: "auto" }}>
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
              {data?.map((row, index) => {
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
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.programName}</TableCell>
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
                        label={row.status}
                        style={{
                          backgroundColor: statusColors[row.status],
                          color: "#FFFFFF",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <ManageProgram item={row} />
                    </TableCell>
                  </TableRow>
                );
              })}
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
            count={totalPages}
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

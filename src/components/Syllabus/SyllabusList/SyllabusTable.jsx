import React, { useState } from "react";
import EnhancedTableHead from "./EnhancedTableHead ";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
  TableRow,
} from "@mui/material";
import Popup from "./Popup";
import {
  useGetAllSyllabusQuery,
  useGetSyllabusQuery,
} from "../../../services/queries/syllabusQuery";
import { useSearchParams } from "react-router-dom";
import TableLoader from "../../shared/loader/TableLoader";

const headCells = [
  { id: "syllabusName", label: "Syllabus" },
  { id: "code", label: "Code" },
  { id: "createdOn", label: "Created on" },
  { id: "createdBy", label: "Created by" },
  { id: "duration", label: "Duration" },
  { id: "outputStandard", label: "Output Standard" },
  { id: "status", label: "Status" },
];
const statusColors = {
  active: "#2D3748",
  Inactive: "#B9B9B9",
  Draft: "#285D9A",
};

export default function SyllabusTable() {
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
  const { data, isLoading } = useGetSyllabusQuery(
    page,
    rowsPerPage,
    orderBy,
    order
  );

  const allSyllabus = useGetAllSyllabusQuery();
  const totalPages = Math.ceil(allSyllabus?.data?.length / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
    params.set("p", newPage);
    setSearchParams(params.toString());
  };
  if (isLoading) {
    return <TableLoader column={7} />;
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
    <Box sx={{ width: "100%", overflowX: "auto", marginTop: "20px" }}>
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
                      {row.syllabusName}
                    </TableCell>
                    <TableCell align="left">{row.code}</TableCell>
                    <TableCell align="left">{row.createdOn}</TableCell>
                    <TableCell align="left">{row.createdBy}</TableCell>
                    <TableCell align="left">
                      {row.duration >= 2
                        ? row.duration + " days"
                        : row.duration + " day"}
                    </TableCell>

                    <TableCell sx={{ width: "20%", p: 0.5 }} align="left">
                      <Box sx={{ display: "flex" }}>
                        {row.outputStandard
                          .split(",")
                          .map((standard, index) => (
                            <Box sx={{ paddingRight: "5px" }}>
                              <Chip
                                key={index}
                                sx={{
                                  background: "#2D3748",
                                  color: "white",
                                  width: "75px",
                                  height: "28px",
                                }}
                                label={standard.trim()}
                              />
                            </Box>
                          ))}
                      </Box>
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
                      <Popup item={row} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
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

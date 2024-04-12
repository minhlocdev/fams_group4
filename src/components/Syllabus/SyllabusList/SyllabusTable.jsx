import React, { useContext } from "react";
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
  Typography,
  Link,
} from "@mui/material";
import Popup from "./Popup";
import { useGetSyllabusQuery } from "../../../services/queries/syllabusQuery";
import TableLoader from "../../shared/loader/TableLoader";
import { SyllabusContext } from "../../../context/SyllabusContext";
import { PublishStatus } from "../../../constants/PublishStatusEnum";
const MAX_OUTPUTS_TO_DISPLAY = 3;
const headCells = [
  { id: "syllabusName", label: "Syllabus" },
  { id: "syllabusCode", label: "Code" },
  { id: "createdDate", label: "Created on" },
  { id: "createdBy", label: "Created by" },
  { id: "durationByDay", label: "Duration" },
  { id: "outputStandards", label: "Output Standard" },
  { id: "publishStatus", label: "Status" },
];
const statusColors = {
  Active: "#2D3748",
  Inactive: "#B9B9B9",
  Draft: "#285D9A",
};

export default function SyllabusTable() {
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
  } = useContext(SyllabusContext);
  const { data, isLoading } = useGetSyllabusQuery(
    page,
    rowsPerPage,
    orderBy,
    order,
    debouncedSearchTerm,
    checked
  );
  if (isLoading) {
    return <TableLoader column={7} />;
  }

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
                      <Link
                        href={`/syllabus/detail/${row.id}`}
                        underline="hover"
                      >
                        {row.syllabusName}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.syllabusCode}</TableCell>
                    <TableCell align="left">{row.createdDate}</TableCell>
                    <TableCell align="left">{row.createdBy}</TableCell>
                    <TableCell align="left">
                      {row.durationByDay >= 2
                        ? row.durationByDay + " days"
                        : row.durationByDay + " day"}
                    </TableCell>

                    <TableCell sx={{ width: "20%", p: 0.5 }} align="left">
                      <Box sx={{ display: "flex" }}>
                        {row.outputStandards
                          .slice(0, MAX_OUTPUTS_TO_DISPLAY)
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
                        {row.outputStandards.length >
                          MAX_OUTPUTS_TO_DISPLAY && (
                          <Chip
                            key="more"
                            label={`
                            +
                            ${
                              row.outputStandards.length -
                              MAX_OUTPUTS_TO_DISPLAY
                            }`}
                            sx={{ color: "#285D9A" }}
                          ></Chip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        label={PublishStatus[row.publishStatus]}
                        style={{
                          backgroundColor:
                            statusColors[PublishStatus[row.publishStatus]],
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
              {typeof data === "string" ||
                (data.list.length === 0 && (
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

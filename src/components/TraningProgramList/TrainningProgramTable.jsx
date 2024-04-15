import React, { useContext } from "react";
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
import { useGetProgramQuery } from "../../services/queries/programQuery";
import theme from "../../assets/theme";
import TableLoader from "../shared/loader/TableLoader";
import { TrainingProgramContext } from "../../context/TrainingProgramContext";
import { Typography } from "@mui/material";
import { TrainingStatus } from "../../constants/PublishStatusEnum";
import { Link } from "react-router-dom";

const headCells = [
  { id: "trainingProgramCode", label: "Code" },
  { id: "name", label: "Program Name" },
  { id: "createdDate", label: "created Date" },
  { id: "createdBy", label: "Created by" },
  { id: "durationByDay", label: "Duration" },
  { id: "status", label: "Status" },
];
const statusColors = {
  Active: theme.primary,
  Inactive: "#B9B9B9",
  Draft: "#285D9A",
};

export default function TrainingProgramTable() {
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
  } = useContext(TrainingProgramContext);

  const { data, isLoading } = useGetProgramQuery(
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
              {data?.list?.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.trainingProgramCode}>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ padding: "10px 20px" }}
                    >
                      {row.trainingProgramCode}
                    </TableCell>
                    <TableCell align="left">
                      <Link to={`/training/detail/${row.trainingProgramCode} `}>
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.createdDate}</TableCell>
                    <TableCell align="left">{row.createdBy}</TableCell>
                    <TableCell align="left">
                      {row.durationByDay >= 2
                        ? row.durationByDay + " days"
                        : row.durationByDay + " day"}
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        label={TrainingStatus[row.status]}
                        style={{
                          backgroundColor:
                            statusColors[TrainingStatus[row.status]],
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

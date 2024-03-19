import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Skeleton from "@mui/material/Skeleton";
import theme from "../../../assets/theme";

export default function TableLoader({ column }) {
  // Generate an array of column indices based on the 'column' prop
  const columnIndices = Array.from({ length: column }, (_, index) => index);

  return (
    <TableContainer
      sx={{
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        border: "none",
      }}
    >
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
        <TableHead>
          <TableRow>
            {columnIndices.map((index) => (
              <TableCell key={index} sx={{ backgroundColor: theme.primary }}>
                <Skeleton variant="rectangle" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Generate 6 rows for the table body */}
          {Array.from({ length: 6 }, (_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columnIndices.map((index) => (
                <TableCell key={index}>
                  <Skeleton variant="rectangle" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

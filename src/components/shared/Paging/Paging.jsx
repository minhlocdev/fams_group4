import React from "react";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { ExpandMore } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSearchParams } from "react-router-dom";

const PaginationStyled = styled(Pagination)({
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
});
const TablePaginationStyled = styled(TablePagination)({
  borderBottom: "none",
  ".MuiTablePagination-input": { marginLeft: 0 },
  ".MuiTablePagination-select": { width: "25px" },
  "& .MuiTablePagination-displayedRows": { display: "none" },
  "& .MuiTablePagination-actions": { display: "none" },
});

export default function Paging() {
  let [_, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handlePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
    setSearchParams({ rowsPerPage: rowsPerPage, page: newPage });
  };
  function handleChangeRowsPerPage(event) {
    const el = parseInt(event.target.value, 10);
    setRowsPerPage(el);
    setSearchParams({ rowsPerPage: el, page: 1 });
    setPage(1);
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "1174px",
          padding: "0px 20px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "25%",
        }}
      >
        <PaginationStyled
          size="small"
          count={10} //set so trang
          siblingCount={0}
          page={page}
          onChange={handlePage}
          showFirstButton
          showLastButton
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIosIcon, next: ArrowForwardIosIcon }}
              {...item}
            />
          )}
        />
        <TablePaginationStyled
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          count={10}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          slotProps={{ select: { IconComponent: ExpandMore } }}
          defaultValue={5}
        />
      </Box>
    </>
  );
}

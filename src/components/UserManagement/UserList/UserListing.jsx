import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import EnhancedTableHead from './EnhancedTableHead';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import PopupMenu from './PopupMenu'; 



const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Full name' },
  { id: 'email', label: 'Email' },
  { id: 'dateofbirth', label: 'Date of birth' },
  { id: 'gender', label: 'Gender' },
  { id: 'type', label: 'Type' },
];

const typeColors = {
  'Admin': '#4DB848',
  'Trainer': '#0B2136',
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export default function UserListing() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('className');
  const [isDomChange, setIsDomChange] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, isLoading] = React.useState(true);


  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("https://65d8432ec96fbb24c1bb11b2.mockapi.io/UserList");
        setRows(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading(false)
      }
    }
    getUser();
  }, [isDomChange]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, rows],
  );


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, visibleRows.length - page * rowsPerPage);


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx={{ boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)', borderRadius: '5px', border: 'none' }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {(rowsPerPage > 0
                ? visibleRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : visibleRows
              ).map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;


                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      style={{ padding: '10px 20px' }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.dateofbirth}</TableCell>
                    <TableCell align="left">
                      <PersonIcon style={{ color: row.gender ? "#E74A3B" : "inherit" }} />
                    </TableCell>
                    <TableCell align="left">
                      <Chip label={row.type} style={{ backgroundColor: typeColors[row.type], color: '#FFFFFF' }} />
                    </TableCell>
                    <TableCell align="right">
                        <PopupMenu
                        item={row}
                        setUser={() => setIsDomChange(true)}
                        setClassSuccess={() => setIsDomChange(false)}
                        rows={rows}
                        types={Object.keys(typeColors)} 
                      />
                    </TableCell>
                  </TableRow>
                );
              })}


              {emptyRows > 0 && loading && (
                <>
                  <TableRow >
                    <TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell>

                  </TableRow>
                  <TableRow >
                    <TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell>

                  </TableRow>
                  <TableRow >
                    <TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell>

                  </TableRow>
                  <TableRow >
                    <TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell>

                  </TableRow>
                  <TableRow >
                    <TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell>

                  </TableRow>
                  <TableRow >
                    <TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell><TableCell><Skeleton variant='rectangle' /></TableCell>

                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div>
        <Stack direction={'row'} alignItems={'center'} justifyContent={"space-around"}>

          <Pagination
            sx={{
              margin: '0 auto',
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
            count={Math.ceil(rows.length / rowsPerPage)}
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
            count={rows.length}
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
import React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import { styled } from '@mui/system';
import SortIcon from '@mui/icons-material/Sort';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const StyledSortIcon = styled(SortIcon)({
    color: '#FFFFFF',
});


function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };


    return (
        <TableHead>
            <TableRow>
                {props.headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        sx={{ backgroundColor: '#2D3748', color: '#FFFFFF' }}
                    >
                        <TableSortLabel
                            active={true}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            IconComponent={() => <StyledSortIcon style={{ color: '#FFFFFF' }} />}
                            style={{ color: '#FFFFFF' }}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align="right" sx={{ backgroundColor: '#2D3748' }}></TableCell>
            </TableRow>
        </TableHead>
    );
}


EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array.isRequired,
};


export default EnhancedTableHead;
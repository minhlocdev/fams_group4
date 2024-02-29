import React, { useState } from "react";
import { Button, Chip, Divider, ListItemIcon, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { HandleSortTPID, handleSortTPName, handleSorTPCreatedOn, handleSortTPCreatedBy, HandleSortTPDuration, handleSortTPStatus } from '../../utils/util';
import { Link } from "react-router-dom";

export default function TrainningProgramTable({ data }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // cai này đang bỏ data ảo nha
    const [datas, setDatas] = useState(data);

    const [sortOrder, setSortOrder] = useState("asc");
    return (
        <TableContainer sx={{ marginTop: 3, borderRadius: 1, width: '100%' }}>
            <Table >
                <TableHead sx={{ background: '#2D3748' }}>
                    <TableRow>
                        <TableCell sx={{ color: 'white', width: '7%', pt: 1, pb: 1 }} onClick={() => HandleSortTPID(datas, sortOrder, setSortOrder, setDatas)}> ID<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon> </TableCell>
                        <TableCell sx={{ color: 'white', width: '39%', pt: 1, pb: 1 }} align="left"
                            onClick={() => handleSortTPName(datas, sortOrder, setSortOrder, setDatas)}>
                            Program name
                            <SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
                        </TableCell>
                        <TableCell sx={{ color: 'white', width: '10%', pl: 0, pr: 0, pt: 1, pb: 1 }} align="center"
                            onClick={() => handleSorTPCreatedOn(datas, sortOrder, setSortOrder, setDatas)}>
                            Created on<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
                        </TableCell>
                        <TableCell sx={{ color: 'white', width: '10%', pl: 0, pr: 0, pt: 1, pb: 1 }} align="center"
                            onClick={() => handleSortTPCreatedBy(datas, sortOrder, setSortOrder, setDatas)}
                        >Created by<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon></TableCell>
                        <TableCell sx={{ color: 'white', width: '10%', pl: 0, pr: 0, pt: 1, pb: 1 }} align="center"
                            onClick={() => HandleSortTPDuration(datas, sortOrder, setSortOrder, setDatas)}
                        >Duration<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon></TableCell>
                        <TableCell sx={{ color: 'white', width: '10%', pl: 0, pr: 0, pt: 1, pb: 1 }} align="center"
                            onClick={() => handleSortTPStatus(datas, sortOrder, setSortOrder, setDatas)}
                        >Status<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon></TableCell>
                        <TableCell sx={{ color: 'white', pt: 1, pb: 1 }} align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datas?.map((data) => (
                        <TableRow
                            key={data.id}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                maxHeight: '30px'
                            }}
                        >
                            <TableCell sx={{ width: '7%', pt: 0.5, pb: 0.5 }} > {data.id}</TableCell>
                            <TableCell sx={{ width: '39%', fontWeight: 'bold', pt: 0.5, pb: 0.5 }} align="left">{data.programName}</TableCell>
                            <TableCell sx={{ width: '10%', p: 0.5 }} align="center">{data.createdOn}</TableCell>
                            <TableCell sx={{ width: '10%', p: 0.5 }} align="center">{data.createdBy}</TableCell>
                            <TableCell sx={{ width: '10%', p: 0.5 }} align="center">{data.duration} days</TableCell>
                            <TableCell sx={{ width: '10%', p: 0.5 }} align="center">
                                {data.status === 'Active' ? (
                                    <Chip sx={{ background: '#2D3748', color: 'white' }} label={data.status} />
                                ) : data.status === 'Inactive' ? (
                                    <Chip sx={{ background: '#B9B9B9', color: 'white' }} label={data.status} />
                                ) : data.status === 'Draft' ? (
                                    <Chip sx={{ background: '#285D9A', color: 'white' }} label={data.status} />
                                ) : null}
                            </TableCell>
                            <TableCell sx={{ p: 0.5 }} align="center">
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MoreHorizIcon></MoreHorizIcon>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <Typography sx={{ fontSize: 14, color: '#2A4365', fontWeight: 'bold', ml: 2 }}>
                                        Manage
                                    </Typography>
                                    <Divider sx={{ background: '#ACACAC' }} variant="middle" component="li" />

                                    <MenuItem sx={{ color: '#2C5282' }} onClick={handleClose}>
                                        <Link to={`/tranning/detail/${data.id}`}>
                                            <ListItemIcon>
                                                <SnippetFolderOutlinedIcon sx={{ color: '#285D9A' }} />
                                            </ListItemIcon>
                                            Training material
                                        </Link>
                                    </MenuItem>
                                    <MenuItem sx={{ color: '#2C5282' }} onClick={handleClose}>
                                        <ListItemIcon>
                                            <CreateOutlinedIcon sx={{ color: '#285D9A' }} />
                                        </ListItemIcon>
                                        Edit program
                                    </MenuItem>
                                    <MenuItem sx={{ color: '#2C5282' }} onClick={handleClose}>
                                        <ListItemIcon>
                                            <ContentCopyOutlinedIcon sx={{ color: '#285D9A' }} />
                                        </ListItemIcon>Duplicate program
                                    </MenuItem>
                                    <MenuItem sx={{ color: '#2C5282' }} onClick={handleClose}>
                                        <ListItemIcon>
                                            <VisibilityOffOutlinedIcon sx={{ color: '#285D9A' }} />
                                        </ListItemIcon>De-activate program
                                    </MenuItem>
                                    <MenuItem sx={{ color: '#8B8B8B' }} onClick={handleClose}>
                                        <ListItemIcon>
                                            <DeleteForeverOutlinedIcon />
                                        </ListItemIcon>
                                        Delete program
                                    </MenuItem>
                                </Menu>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

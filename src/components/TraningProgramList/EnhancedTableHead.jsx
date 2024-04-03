import React, { useState } from "react";
import PropTypes from "prop-types";
import TableSortLabel from "@mui/material/TableSortLabel";
import { styled } from "@mui/system";
import SortIcon from "@mui/icons-material/Sort";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Settings } from "@mui/icons-material";
import { InfoTooltip } from "../shared/lib/CustomMUI";
import { useNavigate } from "react-router";

const StyledSortIcon = styled(SortIcon)({
  color: "#FFFFFF",
});

function EnhancedTableHead(props) {
  const navigate = useNavigate();
  const { handleSortChange } = props;
  const [sortDir, setSortDir] = useState("asc"); // State for sort direction

  const toggleSortDir = (item) => {
    const newSortDir = sortDir === "asc" ? "desc" : "asc";
    setSortDir(newSortDir);
    handleSortChange({ item, dir: newSortDir });
  };
  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sx={{ backgroundColor: "#2D3748", color: "#FFFFFF" }}
          >
            <TableSortLabel
              active={true}
              IconComponent={() => (
                <StyledSortIcon style={{ color: "#FFFFFF" }} />
              )}
              onClick={() => toggleSortDir(headCell.id)}
              style={{ color: "#FFFFFF" }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          sx={{ backgroundColor: "#2D3748", cursor: "pointer" }}
          align="right"
          onClick={() => {
            navigate("/training-programs");
          }}
        >
          <InfoTooltip title={"Reset sort"}>
            <Settings sx={{ color: "#fff", marginRight: "8px" }} />
          </InfoTooltip>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;

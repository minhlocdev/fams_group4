import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonIcon from "@mui/icons-material/Person";
import { orange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import data from "../data.json";
import { Chip } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const ListingRow = ({ data }) => {
  return (
    <tr key={data.id}>
      <td
        style={{
          padding: "8px",
          textAlign: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        {parseInt(data.id)}
      </td>
      <td
        style={{
          padding: "8px",
          textAlign: "left",
          borderBottom: "1px solid #ddd",
          fontWeight: "bold",
        }}
      >
        {data.name}
      </td>
      <td
        style={{
          padding: "8px",
          paddingLeft: "10px",
          textAlign: "left",
          borderBottom: "1px solid #ddd",
        }}
      >
        {data.email}
      </td>
      <td
        style={{
          padding: "8px",
          textAlign: "left",
          borderBottom: "1px solid #ddd",
        }}
      >
        {data.dateofbirth}
      </td>
      <td
        style={{
          padding: "8px",
          textAlign: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        <PersonIcon style={{ color: data.gender ? orange[500] : "inherit" }} />
      </td>
      <td
        style={{
          padding: "8px",
          textAlign: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        {data.type === "Admin" ? (
          <Chip
            label={data.type}
            sx={{
              ml: 1.5,
              bgcolor: "green",
              color: "white",
              border: "none",
              fontWeight: 600,
              height: "auto",
              minWidth: 70,
              py: 0.5,
              my: "auto",
              alignSelf: "flex-start",
              mt: -1.5,
            }}
          />
        ) : (
          <Chip
            label={data.type}
            sx={{
              ml: 1.5,
              bgcolor: "rgb(45, 55, 72)",
              color: "white",
              border: "none",
              fontWeight: 600,
              height: "auto",
              minWidth: 70,
              py: 0.5,
              my: "auto",
              alignSelf: "flex-start",
              mt: -1.5,
            }}
          />
        )}
      </td>
      <td style={{ cursor: "pointer" }}>
        <MoreHorizIcon />
      </td>
    </tr>
  );
};
const UserListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const [APIData, setAPIData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    let sortedData = [...data];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (sortConfig.key === "name" || sortConfig.key === "email") {
          return sortConfig.direction === "ascending"
            ? a[sortConfig.key].localeCompare(b[sortConfig.key])
            : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        } else if (sortConfig.key === "dateofbirth") {
          const yearA = a[sortConfig.key].split("/")[2];
          const yearB = b[sortConfig.key].split("/")[2];
          return sortConfig.direction === "ascending"
            ? yearA - yearB
            : yearB - yearA;
        } else if (sortConfig.key === "type") {
          return sortConfig.direction === "ascending"
            ? a[sortConfig.key].localeCompare(b[sortConfig.key])
            : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        } else {
          return sortConfig.direction === "ascending"
            ? a[sortConfig.key] - b[sortConfig.key]
            : b[sortConfig.key] - a[sortConfig.key];
        }
      });
    }
    setAPIData(sortedData);
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="table" style={{ fontFamily: "Arial" }}>
      <table
        className="dashboard-table"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead
          style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        >
          <tr style={{ backgroundColor: "rgb(45, 55, 72)", color: "#fff" }}>
            <th
              style={{
                padding: "8px",
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                ID
              </span>
              <SortIcon
                style={{
                  fontSize: "1em",
                  verticalAlign: "middle",
                  cursor: "pointer",
                }}
                onClick={() => requestSort("id")}
              />
            </th>

            <th
              style={{
                padding: "8px",
                textAlign: "left",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                Name
              </span>
              <SortIcon
                style={{
                  fontSize: "1em",
                  verticalAlign: "middle",
                  cursor: "pointer",
                }}
                onClick={() => requestSort("name")}
              />
            </th>

            <th
              style={{
                padding: "8px",
                textAlign: "left",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                Email
              </span>
              <SortIcon
                style={{
                  fontSize: "1em",
                  verticalAlign: "middle",
                  cursor: "pointer",
                }}
                onClick={() => requestSort("email")}
              />
            </th>

            <th
              style={{
                padding: "8px",
                textAlign: "left",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                Date of Birth
              </span>
              <SortIcon
                style={{
                  fontSize: "1em",
                  verticalAlign: "middle",
                  cursor: "pointer",
                }}
                onClick={() => requestSort("dateofbirth")}
              />
            </th>

            <th
              style={{
                padding: "8px",
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                Gender
              </span>
              <SortIcon
                style={{
                  fontSize: "1em",
                  verticalAlign: "middle",
                  cursor: "pointer",
                }}
                onClick={() => requestSort("gender")}
              />
            </th>

            <th
              style={{
                padding: "8px",
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                Type
              </span>
              <SortIcon
                style={{
                  fontSize: "1em",
                  verticalAlign: "middle",
                  cursor: "pointer",
                }}
                onClick={() => requestSort("type")}
              />
            </th>

            <th
              style={{
                padding: "8px",
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {APIData &&
            APIData.map((data) => {
              return <ListingRow data={data} key={data.id} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserListing;

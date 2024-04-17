import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableLoader from "../shared/loader/TableLoader";
import SelectForm from "./DropDown/SelectForm";
function createData(roleName, syllabus, training, classes, material, user) {
  return { roleName, syllabus, training, classes, material, user };
}
export default function UserPermissionTable({
  isUpdate,
  isSave,
  isLoading,
  setPermissionType,
  permissionData,
}) {
  const rows = permissionData.map((item) =>
    createData(
      item.roleName,
      <SelectForm
        id="syllabus"
        updating={isUpdate}
        permissionType={item.syllabus}
        setPermissionData={(type) =>
          setPermissionType(item.roleName, { field: "syllabus", type })
        }
      />,
      <SelectForm
        id="trainingProgram"
        updating={isUpdate}
        permissionType={item.trainingProgram}
        setPermissionData={(type) =>
          setPermissionType(item.roleName, { field: "trainingProgram", type })
        }
      />,
      <SelectForm
        id="class"
        updating={isUpdate}
        permissionType={item.class}
        setPermissionData={(type) =>
          setPermissionType(item.roleName, { field: "class", type })
        }
      />,
      <SelectForm
        id="learningMaterial"
        updating={isUpdate}
        permissionType={item.learningMaterial}
        setPermissionData={(type) =>
          setPermissionType(item.roleName, {
            field: "learningMaterial",
            type,
          })
        }
      />,
      <SelectForm
        id="userManagement"
        updating={isUpdate}
        permissionType={item.userManagement}
        setPermissionData={(type) =>
          setPermissionType(item.roleName, { field: "userManagement", type })
        }
      />
    )
  );
  if (isLoading) {
    return <TableLoader column={6} />;
  }
  return (
    <>
      <TableContainer
        sx={{
          maxWidth: "100%",
          boxShadow: "0px 20px 40px 0px rgba(0, 0, 0, 0.16)",
          border: "1px solid",
          height: "220px",
        }}
        component={Paper}
      >
        <Table
          sx={{
            "& thead": {
              backgroundColor: "#2D3748",
              borderRadius: "10px 10px 0px 0px",
            },
            "& tbody": {
              height: "180px",
            },
          }}
          aria-label="simple table"
        >
          <TableHead
            sx={{
              "& th": {
                fontSize: "14px",
                fontWeight: "600",
                padding: "5px 10px",
                color: "#fff",
              },
              "& tr": { borderRadius: "10px 10px 0px 0px" },
            }}
          >
            <TableRow key={"1"} sx={{}}>
              <TableCell key={"roleName"}>Role name</TableCell>
              <TableCell key={"syllabus"} align="left">
                Syllabus
              </TableCell>
              <TableCell key={"tranning"} align="left">
                Training program
              </TableCell>
              <TableCell key={"class"} align="left">
                Class
              </TableCell>
              <TableCell key={"learning"} align="left">
                Learning material
              </TableCell>
              <TableCell key={"user"} align="left">
                User
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& tr": {
                Height: "60px",
                Width: "1174px",
              },
            }}
          >
            {rows?.map((row) => (
              <TableRow
                key={row.roleName}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                  "& th ,td": {
                    borderBottom: "0.5px solid var(--Main, #2D3748)",
                  },
                  ".css-16yer5a-MuiTableCell-root": {
                    padding: "10px",
                  },
                  ".css-1ex1afd-MuiTableCell-root": {
                    padding: "10px",
                  },
                  ".css-177lv70-MuiFormControl-root": {
                    margin: "0",
                  },
                  display: row.roleName === "Super Admin" && "none",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "700",
                  }}
                >
                  {row.roleName}
                </TableCell>
                <TableCell>{row.syllabus}</TableCell>
                <TableCell>{row.training}</TableCell>
                <TableCell>{row.classes}</TableCell>
                <TableCell>{row.material}</TableCell>
                <TableCell>{row.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

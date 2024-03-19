import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";


export const ImportButton = ({ }) => {
  const [users, setUsers] = useState({});
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = useState({});
  const [duplicateHandle, setDuplicateHandle] = React.useState("Allow");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError(null);
  };
  const handleDuplicateHandleChange = (event) => {
    setDuplicateHandle(event.target.value);
  };

  const handleFileChange = (event) => {
    // Assuming you only want to handle a single file selection
    const file = event.target.files[0];
    const acceptedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    setSelectedFile(file);
    if (file) {
      if (!acceptedTypes.includes(file.type)) {
        alert("Only accept CSV file");
        event.target.value = "";
      } else {
        setSelectedFile(file.name);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://65d84217c96fbb24c1bb0d3f.mockapi.io/api/syllabus/Syllabus",
      );
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setUsers([]);
    }
  };
  const handleCheck = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };
  const handleExport = () => {
    const selectedRows = users.filter((user) => checked[user.id]);
    const dataToExport = selectedRows.map((user) => ({
      id: user.id,
      syllabusName: user.syllabusName,
      code: user.code,
      createdOn: user.createdOn,
      createdBy: user.createdBy,
      duration: user.duration,
      outputStandard: user.outputStandard,
      status: user.status,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Syllabus Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileName = "syllabus_data.xlsx";
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }
    const formData = new FormData();
    const endcoding = document.getElementById("encoding-select").value;
    const separator = document.getElementById("separator-select").value;
    const ScanOptionCheckBox = [
      document.getElementById("code-checkbox".checked),
      document.getElementById("name-checkbox".checked),
    ];
    const radioValue = document.querySelector(
      'input[name="choice"]:checked',
    ).value;
    formData.append("file", selectedFile);
    formData.append("Endcoding type", endcoding);
    formData.append("Column seperator", separator);
    formData.append("ScanoptionCheckBox", ScanOptionCheckBox);
    formData.append("radio", radioValue);

    fetch("http://localhost:3000/api/syllabus/${id}/add-syllabus-by-excel", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to import syllbus");
        }
        return response.json();
      })
      .then((data) => {
        alert("Syllbus import successfully", data);
        handleClose();
      })
      .catch((error) => {
        alert("Syllabus import failed");
        setError("Failed to import syllabus");
      });
  };
};

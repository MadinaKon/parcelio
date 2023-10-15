import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "userName", headerName: "Username", width: 150 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
  { field: "fromCity", headerName: "From City", width: 150 },
  { field: "toCity", headerName: "To City", width: 150 },
  { field: "flightDateTime", headerName: "Flight Date Time", width: 200 },
  { field: "availableKilos", headerName: "Available Kilos", width: 150 },
];

export default function DataGridComponent({ data }) {
  const getRowId = (data) => data._id;

  function handleContactButtonClick(rowData) {
    console.log("Contact button clicked for row:", rowData);
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={getRowId}
      />
    </div>
  );
}

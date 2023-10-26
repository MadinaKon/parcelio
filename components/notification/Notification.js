import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Notification({ defaultData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow
            style={{
              backgroundColor: "teal",
              border: "solid 5px yellow",
              marginBottom: "10px",
              borderRadius: "100px",
            }}
          >
            <TableCell>Date/Time</TableCell>
            <TableCell align="right">Sender email</TableCell>
            <TableCell align="right">Notification</TableCell>
            <TableCell align="right">Sender phone number</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {defaultData?.notifications.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.packageType}</TableCell>
              <TableCell align="right">{row.totalWeight}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

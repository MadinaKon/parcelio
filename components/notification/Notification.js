import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";

const StyledTableCell = styled(TableCell)`
  background-color: rgb(227, 252, 239);
`;

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
            <StyledTableCell>Date/Time</StyledTableCell>
            <StyledTableCell align="right">Sender email</StyledTableCell>
            <StyledTableCell align="right">Notification</StyledTableCell>
            <StyledTableCell align="right">Sender phone number</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {defaultData?.notifications.map((row) => (
            <TableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
              <StyledTableCell align="right">{row.packageType}</StyledTableCell>
              <StyledTableCell align="right">{row.totalWeight}</StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">
                <CheckIcon />
                <CloseIcon />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

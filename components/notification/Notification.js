import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import styled from "styled-components";
import { Alert } from "@mui/material";
import DeleteSenderNotification from "../modal/DeleteSenderNotification";

const StyledTableCell = styled(TableCell)`
  background-color: rgb(227, 252, 239);
  padding: 10px; /* Add padding */
  margin: 5px; /* Add margin */
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: rgba(227, 252, 239, 0.8);
  }
`;
export default function Notification({ defaultData }) {
  const [open, setOpen] = useState(false);

  const handleCheckMark = () => {
    console.log("handleCheckMark is clicked ");
    // you accepted this request from sender xyz
  };

  const handleCloseIcon = () => {
    console.log("handleCloseIcon is clicked ");
    setOpen(false);

    // handleClose();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <StyledTableRow
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
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {defaultData?.notifications.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
              <StyledTableCell align="right">{row.packageType}</StyledTableCell>
              <StyledTableCell align="right">{row.totalWeight}</StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">
                <CheckIcon onClick={handleCheckMark} />

                <DeleteSenderNotification id={row._id}>
                  <DeleteIcon onClick={handleCloseIcon} />
                </DeleteSenderNotification>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
import useLocalStorageState from "use-local-storage-state";

import styled from "styled-components";
import DeleteSenderNotification from "../modal/DeleteSenderNotification";
import toast, { Toaster } from "react-hot-toast";

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
  const [confirmedPackages, setConfirmedPackages] = useLocalStorageState(
    "confirmedPackages",
    { defaultValue: [] }
  );

  if (defaultData?.notifications.length === 0) {
    return null;
  }

  const handleCheckMark = (rowId) => {
    toast.success("You accepted this request from sender", {
      duration: 8000,
    });

    setConfirmedPackages([...confirmedPackages, rowId]);
  };

  const handleCloseIcon = () => {
    setOpen(false);
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        marginBottom: "200px",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <StyledTableRow
            style={{
              backgroundColor: "teal",
              border: "solid 5px teal",
              marginBottom: "10px",
              borderRadius: "100px",
            }}
          >
            <StyledTableCell align="left">Sender email</StyledTableCell>
            <StyledTableCell align="left">Sender phone number</StyledTableCell>
            <StyledTableCell align="right">Package type</StyledTableCell>
            <StyledTableCell align="center">Weight</StyledTableCell>
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
              <StyledTableCell align="left">{row.phoneNumber}</StyledTableCell>
              <StyledTableCell align="right">{row.packageType}</StyledTableCell>
              <StyledTableCell align="center">
                {row.totalWeight}
              </StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">
                {confirmedPackages?.includes(row._id) ? (
                  <>
                    <div>Request confirmed</div>
                  </>
                ) : (
                  <>
                    <CheckIcon onClick={() => handleCheckMark(row._id)} />
                    <Toaster position="top-right" reverseOrder={false} />
                    <DeleteSenderNotification notificationId={row._id}>
                      <DeleteIcon onClick={handleCloseIcon} />
                    </DeleteSenderNotification>
                  </>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

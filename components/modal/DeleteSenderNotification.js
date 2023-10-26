import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR from "swr";

export default function DeleteSenderNotification({ children, id }) {
  console.log("DeleteSenderNotification ID ", id);

  const [open, setOpen] = useState(false);

  const { data: user, mutate } = useSWR(`/api/users`);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteSenderNotification(id) {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    mutate();
    handleClose();
  }

  return (
    <>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteSenderNotification(id)}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

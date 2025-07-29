import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useSWR from "swr";

export default function DeleteModal({ id }) {
  const [open, setOpen] = useState(false);

  const { mutate } = useSWR(`/api/services`);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteService(id) {
    await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });

    mutate();
    handleClose();
  }

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handleClickOpen}
        data-cy="delete-service-btn"
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            data-cy="cancel-delete-btn"
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteService(id)}
            color="primary"
            autoFocus
            data-cy="confirm-delete-btn"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

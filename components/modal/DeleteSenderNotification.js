import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function DeleteSenderNotification({ children, notificationId }) {
  const { data: session } = useSession();
  const { data: user, mutate } = useSWR(`/api/users`);
  const userId = session?.user?.userId;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteSenderNotification(notificationId) {
    console.log("I'M GETTING USER ID ", userId);
    console.log("I'M GETTING NOTIFICATION ID ", notificationId);

    try {
      await fetch(`/api/users/${userId}/notifications/${notificationId}`, {
        method: "DELETE",
      });

      mutate();
      handleClose();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
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
            onClick={() => deleteSenderNotification(notificationId)}
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

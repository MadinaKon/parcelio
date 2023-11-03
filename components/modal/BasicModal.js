import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useSWR from "swr";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ children, id }) {
  const router = useRouter();
  const { data: service, mutate } = useSWR(`/api/services`);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const { data: session } = useSession();

  const handleButtonClick = (event) => {
    if (!session) {
      event.preventDefault();
    }
  };

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
    <div>
      {session ? (
        <>
          <Button onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="error" onClick={handleClickOpen}>
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
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => deleteService(id)}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <a onClick={handleButtonClick}>
          {!session && (
            <Button onClick={handleOpen} variant="contained" color="primary">
              Contact
            </Button>
          )}
        </a>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

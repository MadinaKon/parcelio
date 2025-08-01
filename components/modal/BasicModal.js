import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useSession } from "next-auth/react";
import DeleteModal from "./DeleteModal";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

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
  m: 4,
};

export default function BasicModal({ children, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const { data: session } = useSession();

  const handleButtonClick = (event) => {
    if (!session) {
      event.preventDefault();
    }
  };

  return (
    <div>
      {session ? (
        <>
          <Button onClick={handleOpen}>Update</Button>
          <DeleteModal id={id} />
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

      <Modal open={open}>
        <Box sx={style}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

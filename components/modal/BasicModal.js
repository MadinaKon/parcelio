import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";
import { StyledLink } from "../../components/StyledLink.js";

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

const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

export default function BasicModal({ children, id }) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: session } = useSession();

  const handleButtonClick = (event) => {
    if (!session) {
      event.preventDefault();
    }
  };

  async function deleteService(id) {
    await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  }

  return (
    <div>
      {session ? (
        <>
          <Button onClick={handleOpen}>Update</Button>
          <Button onClick={() => deleteService(id)} type="button">
            DELETE
          </Button>
        </>
      ) : (
        <a onClick={handleButtonClick}>
          {!session && (
            <Tooltip
              title="Contact is available only for logged-in users"
              arrow
            >
              <span>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  color="primary"
                  disabled
                >
                  Contact
                </Button>
              </span>
            </Tooltip>
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

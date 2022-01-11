import * as React from "react";
import Box from "@mui/material/Box";
import { Add } from "@material-ui/icons";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SmallButton from "../Navbar/SmallButton";
import './styles/BasicModal.css'
import DragArea from "./DragArea";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <SmallButton size="large" startIcon={<Add />} onClick={handleOpen}>
        Agregar Pelicula
      </SmallButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#64EEBC" }}
            align="center"
          >
            <h1>AGREGAR PELICULA

            <i class="fas fa-times" onClick={handleClose}></i>
            </h1>
          </Typography>
          <DragArea />
        </Box>
        </Modal>
    </div>
  );
}

// ------------------------------------------------------------

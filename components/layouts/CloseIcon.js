import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const CustomCloseIcon = ({ onClick }) => {
  return <CloseIcon onClick={onClick} style={{ cursor: "pointer" }} />;
};

export default CustomCloseIcon;

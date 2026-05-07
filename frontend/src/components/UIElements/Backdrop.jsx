import React from "react";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;

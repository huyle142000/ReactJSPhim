import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../redux/type/ModalType";

export default function ModalFilm() {
  const dispatch = useDispatch();
  const { show, ComponentContentModal } = useSelector(
    (state) => state.ModalFilmReducer
  );

  const handleClose = () => dispatch({ type: CLOSE_MODAL });
  return (
    <>
      <>
        <Modal show={show} onHide={handleClose} style={{ border: "red", margin:"auto 0"}}>
          <Modal.Header style={{ backgroundColor: "#182028" }} className="p-2">
            <i
              className="fa-solid fa-xmark ml-auto text-danger pr-3 pl-3"
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={handleClose}
            ></i>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:"#182028"}}>{ComponentContentModal}</Modal.Body>

       
        </Modal>
      </>
    </>
  );
}

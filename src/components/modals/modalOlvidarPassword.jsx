import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Modal, Button, Row, Input, notification } from "antd";
import Modalmensaje from "./modalMensaje"
import Modalenter from "./modalEnterCode"
import { actionEmail } from "../../redux/actions/login/login"
import { useDispatch } from "react-redux";

import { FloatingLabel, Form } from "react-bootstrap";
function Home({ show, setShow }) {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const [showmsg, setShowmsg] = useState(false)
  const [showenter, setShowenter] = useState(false)
  const [clave, setClave] = useState("")
  const dispatch = useDispatch()
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      btn_aceptar();
    }
  }

  const btn_aceptar = () => {
    if (email.trim().length == 0) {
      setMsg("You cannot leave empty field")
      setShowmsg(true)
      return
    }
    var parametros = {
      email: email
    };
    dispatch(actionEmail(parametros, callback, callbackError));
  }

  const callback = (value) => {
    if (value.status == false) {
      callbackError()
      return
    }
    setShow(false)
    setShowenter(true)
    setClave(value.clave)
  }

  const callbackError = () => {
    setMsg("Nonexistent email")
    setShowmsg(true)
  }

  return (
    <>
      <Modalmensaje show={showmsg} setShow={setShowmsg} msg={msg} />
      <Modalenter show={showenter} setShow={setShowenter} email={email} />
      <Modal
        title="Password Recovery"
        visible={show}
        onCancel={() => setShow(false)}
        footer={[
          <Button key="cancel" onClick={() => setShow(false)}>
            Cancel
          </Button>,
          <Button key="submit" className="custom-button" type="primary" onClick={() => btn_aceptar()}>
            Submit
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '1rem',marginTop:30 }}>
          <h6>Enter the email address associated with your account.</h6>
        </div>
        <div className="mt-3">
        <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="Enter email"
              maxLength={100}
              ref={inputRef}
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </FloatingLabel>
        </div>
      </Modal>
    </>
  );
}

export default Home

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Modal, Button, Row, Input, notification } from "antd";
import { actionReset } from "../../redux/actions/login/login"
import { useDispatch } from "react-redux";

import { FloatingLabel, Form } from "react-bootstrap";
function Home({ show, setShow }) {
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  const inputRef = useRef(null);

  const openNotification = (msg) => {
    notification.error({
      message: "Error",
      description: msg,
    });
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      btn_aceptar();
    }
  }

  const btn_aceptar = () => {
    if (email.trim().length == 0) {
      openNotification("You cannot leave empty field")
      return
    }
    var parametros = {
      email: email
    };
    dispatch(actionReset(parametros, callback, callbackError));
  }
const openNotificationSuccess = () => {
  notification.success({
    message: "Email Sent",
    description: "A password recovery link has been sent to the email address you provided.",
  });
};
  const callback = () => {
       openNotificationSuccess("A password recovery link has been sent to the email address you provided.");
  }

  const callbackError = () => {
    openNotification("Nonexistent email")

  }

  return (
    <>
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

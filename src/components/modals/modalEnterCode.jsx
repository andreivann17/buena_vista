import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Modal, Button, Input, Form } from "antd";
import Modalmensaje from "./modalMensaje";
import Modalnewpass from "./modalNewPassword";
import { actionValidateCode } from "../../redux/actions/login/login";
import { useDispatch } from "react-redux";

function Home({ show, setShow, email }) {
  const handleClose = () => setShow(false);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [showmsg, setShowmsg] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      btn_aceptar();
    }
  }

  const btn_aceptar = () => {
    if (code.trim().length == 0) {
      setMsg("You cannot leave empty field");
      setShowmsg(true);
      return;
    }
    var parametros = {
      email: email,
      code: code,
    };
    dispatch(actionValidateCode(parametros, callback, callbackError));
  }

  const callback = (value) => {
    if (value.status) {
      setShowpass(true);
      setShow(false);
      return;
    }
    setMsg("Invalid key");
    setShowmsg(true);
  }

  const callbackError = (value) => {
    setMsg(value);
    setShowmsg(true);
  }

  return (
    <>
      <Modalmensaje show={showmsg} setShow={setShowmsg} msg={msg} />
      <Modalnewpass show={showpass} setShow={setShowpass} email={email} />
      <Modal
        title="Password Recovery"
        visible={show}
        onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="submit" className="custom-button" type="primary" onClick={() => btn_aceptar()}>
            Submit
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '1rem' , marginTop:30}}>
          <h6>Enter the key that was sent to your email.</h6>
        </div>
        <Form.Item
          label="Key"
          name="key"
          rules={[
            { required: true, message: 'Please input the key!' },
            { max: 10, message: 'Key cannot be longer than 10 characters!' }
          ]}
        >
          <Input
            required
            type="text"
            value={code}
            ref={inputRef}
            autoFocus
            onKeyDown={handleKeyDown}
            onChange={(ev) => setCode(ev.target.value)}
          />
        </Form.Item>
      </Modal>
    </>
  );
}

export default Home;

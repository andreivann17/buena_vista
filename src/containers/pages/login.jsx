import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notification, Button } from "antd";
import logo from "../../assets/img/logo.png";
import logo2 from "../../assets/img/login.webp";
import {  actionLoginAdmin } from "../../redux/actions/login/login";
import { Form, FloatingLabel } from 'react-bootstrap';
import ModalOlvidar from "../../components/modals/modalOlvidarPassword";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const passwordInput = useRef(null);

  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  // Detecta resize para ocultar o mostrar la imagen de la derecha
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openNotification = (msg) => {
    notification.open({
      message: "Error",
      description: msg,
    });
  };

  const checkFields = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      openNotification("You can't leave fields empty");
      return false;
    }
    return true;
  };

  const callback = (token) => {
    localStorage.setItem("tokenadmin", token);
    navigate("/admin/shipments");
  };

  const callbackError = (value) => {
    openNotification(value);
  };

  const acceptButtonHandler = () => {
    if (!checkFields()) return;
    const parametros = { username, password };
    dispatch(actionLoginAdmin(parametros, callback, callbackError));
  };

  const handleKeyDownusername = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      passwordInput.current.focus();
    }
  };

  const handleKeyDownPassword = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      acceptButtonHandler();
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f0f2f5',
      padding: '20px',
      boxSizing: 'border-box',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      width: '100%',
      maxWidth: '900px',
      overflow: 'hidden',
      flexWrap: 'wrap',
    },
    left: {
      flex: 1,
      padding: '40px',
      minWidth: '280px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    right: {
      flex: 1,
      backgroundImage: `url(${logo2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '300px',
      display: isLargeScreen ? 'block' : 'none',
    },
    logo: {
      width: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '30px',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    forgot: {
      marginTop: '10px',
      fontSize: '0.9rem',
      textAlign: 'center',
      color: '#1890ff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.left}>
          <div style={{ textAlign: 'center' }}>
            <img src={logo} style={styles.logo} alt="logo" />
            <h2 style={styles.title}>Login</h2>
          </div>

          <form style={styles.form} noValidate autoComplete="off">
            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
              <Form.Control
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="name@example.com"
                onKeyDown={handleKeyDownusername}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                ref={passwordInput}
                onKeyDown={handleKeyDownPassword}
              />
            </FloatingLabel>

            <Button
              type="primary"
              block
              style={{ marginTop: 10 }}
              onClick={acceptButtonHandler}
            >
              Start
            </Button>

            <div style={styles.forgot} onClick={() => setShow(true)}>
              Forgot your password?
            </div>

            
          </form>
        </div>

        <div style={styles.right}></div>
      </div>

      <ModalOlvidar show={show} setShow={setShow} admin={true} />
    </div>
  );
}

export default Home;

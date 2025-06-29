import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  notification,
  Input,
  Form
} from 'antd';
import logo from "../../assets/img/logo.png";
import logo2 from "../../assets/img/reset.webp";
import { useSearchParams } from "react-router-dom";

import {  actionConfirmAdmin} from "../../redux/actions/login/login";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
const checkFields = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      openNotification("Please complete all fields correctly.");
      return false;
    }
  };
  const openNotification = (msg) => {
    notification.error({
      message: "Error",
      description: msg,
    });
  };

  
  const openNotificationSuccess = () => {
  notification.success({
    message: "Password Updated",
    description: "Your password has been successfully reset. You can now log in.",
  });
};

const callback = () => {
  openNotificationSuccess();
  navigate("/");
};

 const callbackError = (msg) =>{
  if(msg =="Token expirado"){
     openNotification("Your password reset link has expired or is invalid. Please try again.");
    return
  }
    openNotification(msg);
 }
const acceptButtonHandler = async () => {
  const valid = await checkFields();
  if (!valid) return;

  const values = form.getFieldsValue(); // <-- obtiene los valores del formulario
  dispatch(actionConfirmAdmin(values,token, callback, callbackError)); // <-- los pasa como JSON
};

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
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
      maxWidth: '1000px',
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
    logotext: {
        fontSize: '24px',
        color:"#444",
        fontWeight: 'bold'
      },
    logo: {
      width: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '30px',
    },
    formContainer: {
      maxWidth: 600,
      width: '100%',
      margin: '0 auto',
    },
  };

  return (
    <>

      <div style={styles.wrapper}>
     <div style={styles.container}>
          <div style={styles.left}>
          <div style={{ textAlign: 'center' }}>
            <img src={logo} style={styles.logo} alt="logo" />
            <div  style={styles.logotext}>Buena Vista Mail Center</div>
            <h2 style={styles.title}>Password reset</h2>
          </div>
            <div style={styles.formContainer}>
              <Form
                form={form}
                layout="vertical"
                name="register"
                onFinish={acceptButtonHandler}
              >
               
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    {
                      pattern: /^(?=.*\d).{8,}$/,
                      message: 'Password must be at least 8 characters and contain at least one number!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

              <Form.Item>
  <Button
    type="primary"
    block
    onClick={acceptButtonHandler}
  >
    Submit
  </Button>
</Form.Item>

<Form.Item>
  <Button
    type="default"
    block
    onClick={() => navigate("/")}
  >
    Back to Home
  </Button>
</Form.Item>

              </Form>
            </div>

            
          </div>
          <div style={styles.right}></div>
        </div>
      </div>
    </>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import Header from "../../components/navigation/headerDashboard.jsx";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card as Cardant, Input, DatePicker, Form, notification } from 'antd';
import { Card as CardBootrap } from "react-bootstrap/";
import { actionUsersAdminUpdate, actionUsersGet, actionUsersUpdate } from "../../redux/actions/users/users.js";
import backgroundImage from "../../assets/img/users.jpg"

const { RangePicker } = DatePicker;

const backgroundStyle = {
  position: "absolute",
  top: -120,
  left: 0,
  height: "100%",
  minHeight: "160px",
  color: "white",
  backgroundRepeat: "no-repeat",
  width: "100%",

};
const cardStyle = {
  backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.7) 100%), url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', // Puedes usar '100%' si prefieres que no haga zoom
  backgroundPosition: 'center',
  color: 'white',
  height: 250,
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
};
const styles = {

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

  formContainer: {
    maxWidth: 600,
    width: '100%',
    margin: '0 auto',
  },
};

function Home({ infoAdmin, infoUser }) {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false);
  const isAdmin = location.pathname.includes("/admin");
  const [token, setToken] = useState(localStorage.getItem(isAdmin ? "tokenadmin" : "token"));
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutarlo al montar
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (isAdmin) {
      console.log(infoAdmin)
      dispatch(actionUsersGet(infoAdmin["id"]));
    } else {
      dispatch(actionUsersGet(infoAdmin));
    }

  }, [infoAdmin]);

  const openNotification = (msg) => {
    notification.error({
      message: "Error",
      description: msg,
    });
  };

  const checkFields = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      openNotification("Please complete all fields correctly.");
      return false;
    }
  };
  const callback = () => {
    window.location.reload();
  }
  const callbackError = (msg) => {
    openNotification(msg);
  }
  const acceptButtonHandler = async () => {
    const valid = await checkFields();
    if (!valid) return;

    const values = form.getFieldsValue(); // <-- obtiene los valores del formulario
    if (isAdmin) {
      dispatch(actionUsersAdminUpdate(values, infoAdmin.id, callback, callbackError))
    } else {
      dispatch(actionUsersUpdate(values, infoUser.id, callback, callbackError))
    }
  };

  const log_out_click = () => {

    if (isAdmin) {
      localStorage.removeItem("tokenadmin");

      navigate("/");
      return
    }
    localStorage.removeItem("token");
    navigate("/");


  }

  return (
    <>
      {token != null && (
        <>


          <Header title="Users" icon="fas fa-truck marginr-1" />
          <div className="h-100" >
            <CardBootrap style={cardStyle} className="">
              <div style={backgroundStyle}></div>
              <div className="h-100" style={{ position: 'relative', }}>
                <CardBootrap.Body className="h-100 d-flex justify-content-between align-items-center">

                  <div className="d-flex align-items-center h-100">
                    <i style={{ fontSize: 42 }} className={"fas fa-user marginr-1"}></i>
                    <h1 style={{ fontSize: 42, fontWeight: 600, marginTop: 5 }} >{"My Account"}</h1>
                  </div>

                  <div className="">
                    {
                      isAdmin ? (
                        <div className="">
                          {
                            !isMobile && (
                              <h5 style={{ fontWeight: 600 }}>{infoAdmin.nombre + " " + infoAdmin.apellido}</h5>
                            )
                          }

                          {/* Hipervínculo con animación underline */}
                          <div style={{ marginTop: isMobile ? "80px" : "10px" }}>
                            <Button
                              type="default"
                              block
                              onClick={log_out_click}
                            >
                              Log out?
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="">

                          {
                            !isMobile && (
                              <>
                                <h5 style={{ fontWeight: 600 }}>{infoUser.nombre + " " + infoUser.apellido}</h5>
                                <div className="d-flex justify-content-start">
                                  <h5 className="marginr-1" style={{}} >PMB: </h5>
                                  <h5>{infoUser.pmb}</h5>
                                </div>

                              </>
                            )
                          }

                          {/* Hipervínculo con animación underline */}
                          <div style={{ marginTop: isMobile ? "80px" : "10px" }}>
                            <Button
                              type="default"
                              block
                              onClick={log_out_click}
                            >
                              Log out?
                            </Button>
                          </div>


                        </div>
                      )
                    }
                  </div>
                </CardBootrap.Body>
              </div>
            </CardBootrap>

          </div>
          <div className="Panel_Contenido marginb-5">

            <div className="d-flex justify-content-center">
              <div className="" style={styles.container}>
                <div style={styles.left}>

                  <div style={styles.formContainer}>
                    {
                      !edit ? (

                        isAdmin ? (
                          <div className="p-3" style={{ border: '1px solid #e5e5e5', borderRadius: 10, background: '#fafafa' }}>
                            <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Account Information</h3>

                            <div className="mb-3">
                              <label style={{ fontWeight: '500', color: '#555' }}>First Name</label>
                              <div style={{ padding: '8px 12px', background: '#fff', border: '1px solid #ccc', borderRadius: 5 }}>
                                {infoAdmin.nombre}
                              </div>
                            </div>

                            <div className="mb-3">
                              <label style={{ fontWeight: '500', color: '#555' }}>Last Name</label>
                              <div style={{ padding: '8px 12px', background: '#fff', border: '1px solid #ccc', borderRadius: 5 }}>
                                {infoAdmin.apellido}
                              </div>
                            </div>

                            <div className="mb-3">
                              <label style={{ fontWeight: '500', color: '#555' }}>E-mail</label>
                              <div style={{ padding: '8px 12px', background: '#fff', border: '1px solid #ccc', borderRadius: 5 }}>
                                {infoAdmin.email}
                              </div>
                            </div>

                            {/* Botón para editar */}
                            <div className="mt-4">
                              <Button
                                type="primary"
                                block
                              onClick={() => {
  const dataToFill = isAdmin ? infoAdmin : infoUser;
  form.setFieldsValue({
    firstName: dataToFill.nombre,
    lastName: dataToFill.apellido,
    email: dataToFill.email,
  });
  setEdit(true);
}}

                              >
                                Edit Account
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3" style={{ border: '1px solid #e5e5e5', borderRadius: 10, background: '#fafafa' }}>
                            <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Account Information</h3>

                            <div className="mb-3">
                              <label style={{ fontWeight: '500', color: '#555' }}>First Name</label>
                              <div style={{ padding: '8px 12px', background: '#fff', border: '1px solid #ccc', borderRadius: 5 }}>
                                {infoUser.nombre}
                              </div>
                            </div>

                            <div className="mb-3">
                              <label style={{ fontWeight: '500', color: '#555' }}>Last Name</label>
                              <div style={{ padding: '8px 12px', background: '#fff', border: '1px solid #ccc', borderRadius: 5 }}>
                                {infoUser.apellido}
                              </div>
                            </div>

                            <div className="mb-3">
                              <label style={{ fontWeight: '500', color: '#555' }}>E-mail</label>
                              <div style={{ padding: '8px 12px', background: '#fff', border: '1px solid #ccc', borderRadius: 5 }}>
                                {infoUser.email}
                              </div>
                            </div>

                            {/* Botón para editar */}
                            <div className="mt-4">
                              <Button
                                type="primary"
                                block
                              onClick={() => {
  const dataToFill = isAdmin ? infoAdmin : infoUser;
  form.setFieldsValue({
    firstName: dataToFill.nombre,
    lastName: dataToFill.apellido,
    email: dataToFill.email,
  });
  setEdit(true);
}}

                              >
                                Edit Account
                              </Button>
                            </div>
                          </div>
                        )




                      ) : (
                        <Form
                          form={form}
                          layout="vertical"
                          name="register"
                          onFinish={acceptButtonHandler}
                        >
                          <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[{ required: true, message: 'Please input your first name!' }]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please input your last name!' }]}
                          >
                            <Input />
                          </Form.Item>



                          <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                              { type: 'email', message: 'The input is not valid E-mail!' },
                              { required: true, message: 'Please input your E-mail!' },
                            ]}
                          >
                            <Input />
                          </Form.Item>

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
                              Update Account
                            </Button>
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="default"
                              block
                              onClick={() => setEdit(false)}
                            >
                              Cancel
                            </Button>
                          </Form.Item>


                        </Form>
                      )
                    }
                  </div>
                </div>

              </div>
            </div>

          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  infoAdmin: state.menus.infoAdmin ?? { id: "", nombre: "", pmb: "", apellido: "", email: "" },
  infoUser: state.menus.infoUser ?? { id: "", nombre: "", pmb: "", apellido: "", email: "" },

});

export default connect(mapStateToProps)(Home);

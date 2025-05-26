import { connect, useDispatch } from "react-redux";
import backgroundImage from "../../assets/img/city.jpg"; // <<<<<< Cambia esto si tu imagen está en otro folder
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form as AntForm, Input, Button, notification } from "antd";
import { Form as BootstrapForm, FloatingLabel } from "react-bootstrap";
import localImage from "../../assets/img/buena_vista.jpg"; // Imagen del local (opcional)
import axios from "axios";
import { actionLogin,actionLoginAdmin } from "../../redux/actions/login/login";
import { CheckCircleOutlined } from '@ant-design/icons';
import { actionContact } from "../../redux/actions/utils/contact";
import "../../assets/css/login.css"
import Header from "../../components/navigation/header"
import Footer from "../../components/navigation/footer"
import ReCAPTCHA from "react-google-recaptcha";

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';


function Home({}) {
  const [form] = AntForm.useForm();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const passwordInput = useRef(null);
  const servicesRef = useRef(null);
  const dispatch = useDispatch();
  const homeRef = useRef(null);
const officeRef = useRef(null);
const contactRef = useRef(null);
const recaptchaRef = useRef();
const [captchaValue, setCaptchaValue] = useState(null);
const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 400);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      if (!values.message || values.message.trim().length <= 10) {
        notification.error({ message: 'Error', description: 'The message must be longer than 10 characters.' });
        return;
      }

      if (!executeRecaptcha) {
        notification.error({ message: 'Error', description: 'Captcha is not ready.' });
        return;
      }

      const token = await executeRecaptcha('contact_form');
      values.captcha = token;

      dispatch(actionContact(values, callbackContact, callbackContactError));
    } catch {
      notification.error({ message: 'Error', description: 'Please complete all fields correctly.' });
    }
  };
useEffect(() => {
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 400);
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const onCaptchaChange = (value) => {
  setCaptchaValue(value);
};
const checkFields = async () => {
  try {
    await form.validateFields(); // Validación de reglas de Ant Design

    const values = form.getFieldsValue(); // Obtener todos los valores del formulario

    if (!values.message || values.message.trim().length <= 10) {
      openNotification("The message must be longer than 10 characters.");
      return false;
    }

    if (!captchaValue) {
      openNotification("Please complete the captcha before sending.");
      return;
    }
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
  const openNotificationSuccess = (msg) => {
    notification.success({
      message: "Success",
      description: msg,
    });
  };
  
  const handleKeyDownemail = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      passwordInput.current.focus();
    }
  };

  const handleKeyDownPassword = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      acceptButtonHandlerLogin();
    }
  };
  const callbackAdmin = (token) => {
    console.log(token)
    localStorage.setItem("tokenadmin", token);
    navigate("/admin/shipments");
  };
  const callbackUser = (token) => {
    console.log(token)

    localStorage.setItem("token", token);
    navigate("/shipments");
  };

  const callbackErrorAdmin = () => {
    const parametros = { username, password };
    dispatch(actionLogin(parametros, callbackUser, callbackError));
  };
  const callbackError = (value) => {
    openNotification(value);
   
  };
  const checkFieldsLogin = () => {
    if (!username || username.trim() === "") {
      openNotification("Username field is required.");
      return false;
    }
  
    if (!password || password.trim() === "") {
      openNotification("Password field is required.");
      return false;
    }
  
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      openNotification("Invalid email format.");
      return false;
    }
  
    return true;
  };
  
  
 const acceptButtonHandlerLogin = () => {
    if (!checkFieldsLogin()) return;
    const parametros = { username, password };
    dispatch(actionLogin(parametros, callbackUser, callbackError));
  };
  const callbackContact = () => {
    openNotificationSuccess("Your message has been sent successfully!");
  }
  
  const callbackContactError = (error) => {
    openNotification("There was an error sending your message. Please try again.");
  }
  
  const acceptButtonHandler = async () => {
    const isValid = await checkFields();
    if (!isValid) return;
  
    const values = form.getFieldsValue();
    console.log(values);
    dispatch(actionContact(values, callbackContact, callbackContactError));
  };
  
  const scrollToServices = () => {
    const y = servicesRef.current.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  const scrollToHome = () => {
    const y = homeRef.current.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  const scrollToOffice = () => {
    const y = officeRef.current.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  
  const scrollToContact = () => {
    const y = contactRef.current.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  
  

  return (
    <>

  
      {/* Hero Section */}
      <main  style={styles.mainContent}>
      <Header
  onScrollHome={scrollToHome}
  onScrollLocation={scrollToOffice}
  onScrollContact={scrollToContact}
  onScrollService={scrollToServices}
/>

{isSmallScreen ? (
  // 👇 Aquí va tu versión para iPhone tal cual
  <section
    ref={homeRef}
    className="d-flex justify-content-center align-items-center"
    style={{
      ...styles.heroSection,
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
      flexDirection: 'column',
      padding: '40px 20px',
      textAlign: 'center'
    }}
  >
    <div style={{ ...styles.heroContent, flexDirection: 'column', alignItems: 'center', gap: '30px', padding: 0 }}>
      {/* Texto de bienvenida */}
      <div className="hero-overlay" style={{ ...styles.heroOverlay, width: '100%', maxWidth: '500px' }}>
        <p style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem', fontWeight: 550 }}>
          Services:
        </p>

        <ul style={{ textAlign: "start", color: 'white', fontSize: '1rem', lineHeight: '1.8rem', paddingLeft: '1rem' }}>
          <li>P.O. Box</li>
          <li>Fax Services</li>
          <li>Copy Services</li>
          <li>Shipping</li>
        </ul>
      </div>

      {/* Login Form */}
      <div className="login-box" style={{ ...styles.loginBox, width: '100%', maxWidth: '350px' }}>
        <div className="d-flex justify-content-center w-100">
          <h2 className="text-dark">Login</h2>
        </div>
        <form className="login-form" noValidate autoComplete="off">
          <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
            <BootstrapForm.Control
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="name@example.com"
              onKeyDown={handleKeyDownemail}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Password">
            <BootstrapForm.Control
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
            className="custom-button mt-3"
            onClick={acceptButtonHandlerLogin}
          >
            Start
          </Button>

          <div className="forgot-password-link mt-2">
            <span className="link-pointer text-dark" onClick={() => setShow(true)}>
              Forgot your password?
            </span>
          </div>

          <div className="forgot-password-link mt-1">
            <span className="link-pointer text-dark" onClick={() => navigate("/signup")}>
              Don’t have an account? Sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  </section>
) : (
  // 👇 Aquí va tu versión normal tal cual
  <section
    ref={homeRef}
    className="d-flex justify-content-between align-items-center"
    style={{
      ...styles.heroSection,
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
    }}
  >
    <div className="hero-content" style={styles.heroContent}>
      {/* Texto de bienvenida */}
      <div className="hero-overlay" style={styles.heroOverlay}>
        <p style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 550 }}>
          Services:
        </p>

        <ul style={{ textAlign: "start", color: 'white', fontSize: '1.5rem', lineHeight: '2rem' }}>
          <li>P.O. Box</li>
          <li>Fax Services</li>
          <li>Copy Services</li>
          <li>Shipping</li>
        </ul>
      </div>

      {/* Login Form */}
      <div className="login-box" style={styles.loginBox}>
        <div className="d-flex justify-content-center w-100">
          <h2 className="text-dark">Login</h2>
        </div>
        <form className="login-form" noValidate autoComplete="off">
          <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
            <BootstrapForm.Control
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="name@example.com"
              onKeyDown={handleKeyDownemail}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Password">
            <BootstrapForm.Control
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
            className="custom-button mt-3"
            onClick={acceptButtonHandlerLogin}
          >
            Start
          </Button>

          <div className="forgot-password-link">
            <span className="link-pointer text-dark" onClick={() => setShow(true)}>
              Forgot your password?
            </span>
          </div>

          <div className="forgot-password-link">
            <span className="link-pointer text-dark" onClick={() => navigate("/signup")}>
              Don’t have an account? Sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  </section>
)}




     {/* NUEVA SECCIÓN "Lo que ofrecemos" */}
     {/* Sección de servicios (Home) */}
<section ref={servicesRef} style={styles.servicesSection}>

  <h2 style={styles.sectionTitle}>
    What We Offer
    <div style={styles.underline}></div>
  </h2>

  <div style={styles.offersGrid}>
    <div style={styles.offerCard}>
      <i style={{ fontSize: 42, marginBottom: 20 }} className="fa-solid fa-box"></i>
      <h3 style={styles.offerTitle}>P.O. Box</h3>
      <p>Rent a secure P.O. Box to receive all your personal or business mail. Access your mail safely and privately during business hours at our convenient location.</p>
    </div>

    <div style={styles.offerCard}>
      <i style={{ fontSize: 42, marginBottom: 20 }} className="fa-solid fa-fax"></i>
      <h3 style={styles.offerTitle}>Fax Services</h3>
      <p>Send and receive faxes quickly and securely. Our fax service is ideal for official documents, contracts, and any urgent paperwork you need to transmit.</p>
    </div>

    <div style={styles.offerCard}>
      <i style={{ fontSize: 42, marginBottom: 20 }} className="fa-solid fa-copy"></i>
      <h3 style={styles.offerTitle}>Copy Services</h3>
      <p>High-quality black and white or color copies available. Perfect for personal or professional use, with options for multiple sizes and finishes.</p>
    </div>

    <div style={styles.offerCard}>
      <i style={{ fontSize: 42, marginBottom: 20 }} className="fa-solid fa-truck-fast"></i>
      <h3 style={styles.offerTitle}>Shipping</h3>
      <p>We partner with major carriers to provide reliable shipping and courier services. Send your packages locally or internationally with tracking and affordable rates.</p>
    </div>
  </div>
</section>


        {/* Extra Info Section */}
     {/* Sección de oficina (Location) */}
<section ref={officeRef} style={styles.infoSection}>
    <h2 style={styles.sectionTitle}>
   Our Office
    <div style={styles.underline}></div>
  </h2>
  <div style={styles.infoContainer}>
  
    <div style={styles.textContainer}>
    
      <div style={{fontSize:"22px"}}>
        <p><strong>Address:</strong> 689 N Main St Suite 2San Luis, Arizona 85336 United States</p>
        <p><strong>Phone:</strong> +1 928 550 5039</p>
        <p><strong>Email:</strong> buenavistamailc@gmail.com</p>
        <p>Monday to Friday</p>
        <p><strong>Hours:</strong> 9:00 AM - 5:00 PM</p>
      </div>
    </div>
    <div style={styles.imageContainer}>
      <img src={localImage} alt="Our Location" style={styles.localImage} />
    </div>
  </div>
</section>



     {/* Sección del mapa (Contact) */}
<section ref={contactRef} style={styles.contactSection}>
<h2 style={styles.sectionTitle}>
Send Us a Message
    <div style={styles.underline}></div>
  </h2>
        <div style={styles.infoContainer}>


          {/* Contact Form */}
          <div style={styles.imageContainer}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                      <GoogleReCaptchaProvider reCaptchaKey="6Le0ZUArAAAAAB3dG_M_Lgc7sk9fwEj94KCDFco6">
              <AntForm   scrollToFirstError form={form} layout="vertical">
                <AntForm.Item rules={[{ required: true, message: 'Please input your name!' }]} name="name" label="Name">
                  <Input placeholder="Your Name" />
                </AntForm.Item>
                <AntForm.Item
                  rules={[{ required: true, message: 'Please enter your phone number!' }]}
                  name="phone"
                  label="Phone Number"
                >
                  <Input placeholder="Your phone number" type="tel" />
                </AntForm.Item>

                <AntForm.Item required name="subject" label="Subject">
                  <Input placeholder="Subject" />
                </AntForm.Item>
                <AntForm.Item rules={[{ required: true, message: 'Please input your message!' }]} name="message" label="Message">
                  <Input.TextArea placeholder="Write your message here..." rows={5} />
                </AntForm.Item>
       

                <AntForm.Item>
                  <Button className="custom-button" onClick={handleSubmit} type="primary" htmlType="submit" style={styles.sendButton}>
                    SEND
                  </Button>
                </AntForm.Item>
              
              </AntForm>
                </GoogleReCaptchaProvider>
            </div>
          </div>
        </div>
      </section>
    {/* Sección del mapa (Contact) */}
<section ref={contactRef} style={styles.mapSection}>
<h2 style={styles.sectionTitle}>
   Visit Us
    <div style={styles.underline}></div>
  </h2>
        <div style={styles.infoContainer}>
          {/* Contact Information */}
          <div style={styles.textContainer}>
       
        <div style={styles.mapContainer}>
          <iframe 
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.3521805383975!2d-114.78434582384398!3d32.49001499859709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d651a9314797f5%3A0xc79a0a21fea0adf8!2sBuena%20vista%20mail%20center!5e0!3m2!1sen!2smx!4v1745934711579!5m2!1sen!2smx" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
          </div>

    
        </div>
      </section>
   
      <Footer />
      </main>
     
    </>
  );
}

const styles = {
  mainContent: {
    padding: '0',
    textAlign: 'center'
  },
  heroContent: {
    display: 'flex',
    flexWrap: 'wrap', // para responsividad
    justifyContent: 'space-between', // o 'center' si quieres centrar
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px',
    gap: '40px',
  },
  
  heroSection: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center', // o 'space-between' si quieres separación
    alignItems: 'center',
    padding: '20px',
    marginTop: 60,
  },
  
  loginBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.74)',
    borderRadius: '10px',
    padding: '30px',
    width: '350px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  
  
  responsiveRow: {
    display: 'flex',
    justifyContent: 'center',
   
    flexWrap: 'wrap', // 👈 esta es la clave para que la imagen baje cuando sea necesario
  },
  responsiveImage: {
    display: 'flex',
    justifyContent: 'center',
   
  },
  

  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '40px',
    borderRadius: '10px',
    color: 'white',
  },
  heroTitle: {
    fontSize: '48px',
    marginBottom: '10px'
  },
  heroSubtitle: {
    fontSize: '24px',
    marginBottom: '20px'
  },
  ctaButton: {
    backgroundColor: '#0052cc',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '20px'
  },
  servicesSection: {
    padding: '60px 20px',
    backgroundColor: '#e1f1fc'
  },
  sectionTitle: {
    fontSize: '42px',
    fontWeight:"650",
    marginBottom: '120px',
    color: '#003366'
  },
  offersGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '120px'
  },
  offerCard: {
    maxWidth: '300px',
    textAlign: 'center',
    borderRadius:12,
    padding:30,
    backgroundColor:"#fff"
  },
  offerIcon: {
    width: '80px',
    marginBottom: '20px'
  },
  offerTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#003366'
  },
  extraInfoSection: {
    padding: '60px 20px'
  },

  infoIcon: {
    width: '100px',
    height: '100px',
    marginRight: '20px'
  },
  infoText: {
    maxWidth: '600px',
    textAlign: 'left'
  },
  underline: {
    width: '120px',
    height: '8px',
    margin: '20px auto 0',
    background: 'linear-gradient(to right, #2683c6 60%, #003366 40%)',
    borderRadius: '2px'
  },
    testimonialsSection: {
      padding: '60px 20px',
      backgroundColor: '#ffffff'
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    testimonialCard: {
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'left',
      fontSize: '14px'
    },
    starsContainer: {
      color: 'orange',
      fontSize: '24px',
      marginBottom: '10px'
    },
   
    infoSection: {
      padding: '60px 20px',
     backgroundColor: '#e5e9eb'
    },
     mapSection: {
      padding: '60px 20px',
     backgroundColor: '#e5e9eb'
    },
     contactSection: {
      padding: '60px 20px',
     backgroundColor: '#e1f1fc'
    },
    infoContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    textContainer: {
      flex: '1 1 400px'
    },
    imageContainer: {
      flex: '1 1 700px', // ← en vez de 400px
      textAlign: 'center',
      maxWidth: '100%'     // ← permite que crezca dentro del layout
    },
    localImage: {
      width: '100%',
      maxWidth: '1000px',  // ← antes 800px o 1000px
      height: 'auto',
      borderRadius: '10px'
    }
    ,
   
    mapContainer: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sendButton: {
      backgroundColor: '#ffb400',
      border: 'none',
      width: '100%',
      height: '40px',
      fontSize: '16px',
      fontWeight: 'bold'
    }
   ,
      testimonialsSection: {
        padding: '60px 20px',
        backgroundColor: '#ffffff'
      },
      testimonialsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      },
      testimonialCard: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'left',
        fontSize: '14px'
      },
      starsContainer: {
        color: 'orange',
        fontSize: '24px',
        marginBottom: '10px'
      },
     

    
};

const mapStateToProps = (state) => ({});
// RESPONSIVE FIX



export default connect(mapStateToProps)(Home);

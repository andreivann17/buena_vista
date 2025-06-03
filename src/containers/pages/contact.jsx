import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/navigation/header";
import Footer from "../../components/navigation/footer";
import { Button, Input, Form,notification } from "antd";
import backgroundImage from "../../assets/img/contact.jpg"; // Tu imagen correcta
import localImage from "../../assets/img/buena_vista.webp"; // Imagen del local (opcional)
import axios from "axios";
function Contact({}) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [showtoast, setShowToast] = useState(false);
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


  const acceptButtonHandler = () => {
    if (!checkFields()) return;
    
    axios
      .post(`http://${window.location.hostname}:5000/api/contact`, form)
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch(() => {
        setMsg("Error en la autenticación");
        setShowToast(true);
      });
  };

  return (
    <>
  

      {/* Hero Section */}
      <section style={{...styles.heroSection, backgroundImage: `url(${backgroundImage})`}}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Contact</h1>
          <p style={styles.heroSubtitle}>We're here to help you. Reach out to us anytime.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.infoSection}>
        <div style={styles.infoContainer}>
          {/* Contact Information */}
          <div style={styles.textContainer}>
            <h2 style={{ color: '#003366', marginBottom: 20 }}>Contact Information</h2>
            <p><strong>Phone:</strong> <a href="tel:19285505039" style={{ color: '#2683c6' }}>+1 928 550 5039</a></p>
            <p><strong>Email:</strong> <a href="mailto:support@yourcompany.com" style={{ color: '#2683c6' }}>buenavistamailc@gmail.com</a></p>
            <p><strong>Support Hours:</strong> Monday to Friday: 9:00 AM - 6:00 PM</p>

          </div>

          {/* Contact Form */}
          <div style={styles.imageContainer}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: '#003366', marginBottom: 20 }}>Send Us a Message</h2>
              <Form  scrollToFirstError form={form} layout="vertical">
                <Form.Item rules={[{ required: true, message: 'Please input your name!' }]} name="name" label="Name">
                  <Input placeholder="Your Name" />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Please input your email!' }]} name="email" label="Email">
                  <Input placeholder="Your Email Address" />
                </Form.Item>
                <Form.Item required name="subject" label="Subject">
                  <Input placeholder="Subject" />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Please input your message!' }]} name="message" label="Message">
                  <Input.TextArea placeholder="Write your message here..." rows={5} />
                </Form.Item>
                <Form.Item>
                  <Button className="custom-button" onClick={acceptButtonHandler} type="primary" htmlType="submit" style={styles.sendButton}>
                    SEND
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}

const styles = {
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
  heroSection: {
    position: 'relative',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '95% center',
    width: '100%',
    minHeight: '300px',
    height: '40vh',
    maxHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '50px',
    paddingRight: '20px',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.85) 45%, rgba(0, 0, 0, 0.1) 100%)',
    borderRadius: '0'
  },
  heroContent: {
    position: 'relative',
    color: 'white',
    textAlign: 'start',
  },
  heroTitle: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  heroSubtitle: {
    fontSize: '20px'
  },
  infoSection: {
    padding: '60px 20px',
    backgroundColor: '#f5f5f5'
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
    flex: '1 1 400px',
    textAlign: 'center'
  },
  localImage: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '10px'
  },
  mapSection: {
    padding: '60px 20px',
    backgroundColor: '#e1f1fc'
  },
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
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Contact);

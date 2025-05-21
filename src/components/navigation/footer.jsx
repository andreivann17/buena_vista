import React from "react";
import { MailOutlined, ClockCircleOutlined, PhoneOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <footer style={styles.footer}>
    <div className="justify-content-center " style={styles.footerContainer}>
     
  
      <div style={styles.column}>
  <h3 style={styles.columnTitle}>Our Services</h3>
  <ul style={styles.list}>
    <li>P.O. Box Rental</li>
    <li>Fax Sending & Receiving</li>
    <li>Copy Services (B/W & Color)</li>
    <li>Shipping Services</li>
    <li>Courier & Package Delivery</li>
  </ul>
</div>

      <div style={styles.column}>
        <h3 style={styles.columnTitle}>How to Reach Us</h3>
        <ul style={styles.contactList}>
          <li><PhoneOutlined /> Call Us Today<br /><strong>1 928 550 5039</strong></li>
          <li><MailOutlined /> Send Us an Email<br />buenavistamailc@gmail.com</li>
          <li><ClockCircleOutlined /> Support Hours<br />Monday to Friday: 9:00 AM - 5:00 PM</li>
        </ul>
        <div style={styles.socialIcons}>
          <a href="https://www.facebook.com/PoBox990" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook" style={styles.icon}></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-x-twitter" style={styles.icon}></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube" style={styles.icon}></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin" style={styles.icon}></i>
          </a>
        </div>
      </div>
    </div>
    <div style={styles.bottomBar}>
      Buena Vista Mail Center &copy; {new Date().getFullYear()} | All rights reserved
    </div>
  </footer>
  
  );
}

const styles = {
  footer: {
    backgroundColor: '#2683c6', // color de fondo azul claro
    color: '#fff',
    padding: '50px 20px 20px 20px',
    fontSize: '14px'
  },
  footerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft:50,
    paddingRight:50,
    gap: '50px',
    marginBottom: '20px'
  },
  column: {

    minWidth: '220px'
  },
  columnTitle: {
    fontSize: '18px',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  contactList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    marginBottom: '20px'
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'start',
    gap: '15px',
    marginTop: '10px'
  },
  icon: {
    fontSize: '24px',
    color: '#003366',
    cursor: 'pointer'
  },
  bottomBar: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #cccccc',
    fontSize: '13px',
    color: '#555'
  }
};

export default Footer;

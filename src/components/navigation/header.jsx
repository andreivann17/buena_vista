import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png"
import "../../assets/css/header_home.css"
function Header({ onScrollHome, onScrollLocation, onScrollContact,onScrollService,onScrollVisitUs }) {
  return (
    <header style={styles.header}>
      <div className="d-flex align-items-center">
        <img  onClick={onScrollHome} src={logo} className="marginr-1 link-pointer" style={{ width: 60 }} alt="" />
        <div className="link-pointer" onClick={onScrollHome} style={styles.logo}>Buena Vista Mail Center</div>
      </div>
      <nav style={styles.navLinks}>
      <span className="link-pointer header-link" onClick={onScrollService}>Services</span>
<span className="link-pointer header-link" onClick={onScrollLocation}>Location</span>
<span className="link-pointer header-link" onClick={onScrollContact}>Contact</span>
<span className="link-pointer header-link" onClick={onScrollVisitUs}>Visit Us</span>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    position:"fixed",
    width:"100%",
    top:0,
    zIndex:"100",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#2683c6',
    color: 'white',
    flexWrap: 'wrap'
  },
  logo: {
    fontSize: '24px',
    color:"#fff",
    fontWeight: 'bold'
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px'
  },
  login: {
    border: '1px solid white',
    padding: '5px 10px',
    borderRadius: '5px'
  },
  signup: {
    backgroundColor: 'white',
    color: '#0052cc',
    padding: '5px 10px',
    borderRadius: '5px'
  }
};

export default Header;

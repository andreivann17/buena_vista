import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/navigation/header";
import Footer from "../../components/navigation/footer";

function NotFound() {
  return (
<>


    <div style={styles.container}>
      <div style={styles.animationContainer}>
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 6.5L12 13L22 6.5V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6.5Z" stroke="#2683C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 12L2 6" stroke="#2683C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.subtitle}>We couldn't find the page you were looking for.</p>
      <Link to="/" style={styles.homeButton}>Return Home</Link>
    </div>
   
    </>
  );
}

const styles = {
  container: {
    position: 'relative',

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f6fc",
    textAlign: "center",
    padding: '50px',
    paddingTop:80,
   
  },
  animationContainer: {
    marginBottom: "20px",
    animation: "float 3s ease-in-out infinite"
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#2683C6",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px"
  },
  homeButton: {
    padding: "10px 20px",
    backgroundColor: "#2683C6",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "18px"
  }
};

export default NotFound;

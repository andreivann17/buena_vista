import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/navigation/header";
import Footer from "../../components/navigation/footer";
import { Button } from "antd";
import { CheckCircleOutlined } from '@ant-design/icons';
import backgroundImage from "../../assets/img/location.jpg"; 
import localImage from "../../assets/img/buena_vista.jpg"; // <<-- Nueva imagen del local

function Location({}) {
  return (
    <>


      {/* Hero Section */}
      <section style={{...styles.heroSection, backgroundImage: `url(${backgroundImage})`}}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Location</h1>
          <p style={styles.heroSubtitle}>Find us easily and get to know our facilities</p>
        </div>
      </section>

      {/* Info Section */}
      <section style={styles.infoSection}>
        <div style={styles.infoContainer}>
          <div style={styles.textContainer}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Our Office</h2>
            <p><strong>Address:</strong> 689 N Main Suite 2, 85349 ,San Luis, Arizona, USA</p>
            <p><strong>Phone:</strong> +1 928 550 5039</p>
            <p><strong>Email:</strong> buenavistamailc@gmail.com</p>
            <p><strong>Hours:</strong> Monday to Friday: 9:00 AM - 6:00 PM</p>
          </div>
          <div style={styles.imageContainer}>
            <img src={localImage} alt="Our Location" style={styles.localImage} />
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section style={styles.mapSection}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '32px' }}>Visit Us</h2>
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
      </section>
{/* Happy Customers Section */}
<section style={styles.testimonialsSection}>
  <h2 style={styles.sectionTitle}>Happy Customers</h2>
  <p style={{textAlign: 'center', marginBottom: '40px', fontSize: '18px'}}>They love us!</p>
  <div style={styles.testimonialsGrid}>
    {testimonials.map((item, idx) => (
      <div key={idx} style={styles.testimonialCard}>
        <div style={styles.starsContainer}>★★★★★</div>
        <p><strong>{item.name}</strong> </p>
        <p style={{ fontSize: '12px', marginBottom: '10px' }}>{item.date}</p>
        <p>{item.review}</p>
      </div>
    ))}
  </div>
</section>

   
    </>
  );
}
const testimonials = [
  {
    name: "Carmelo Hernandez",
    location: "UT, United States",
    date: "September 2024",
    review: "Excelente servicio, muy amables y dispuestos a ayudar.",
  },
  {
    name: "Angel Reyes",
    location: "IL, United States",
    date: "April 2024",
    review: "Los mejores, excelente calidad y atencion.",
  },
  {
    name: "Ing. Ricardo Moreno",
    location: "FL, United States",
    date: "April 2023",
    review: "EXCELENTE SERVICIO Y ATENCIÓN.",
  },
  {
    name: "ZENIFF DIAZ",
    location: "Tokyo, Japan",
    date: "April 2023",
    review: "",
  }
];

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
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.85) 45%, rgba(0, 0, 0,0.1) 100%)',
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
    alignItems: 'center',
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
  }
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Location);

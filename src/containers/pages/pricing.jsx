import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { CheckCircleOutlined } from '@ant-design/icons';
import backgroundImage from "../../assets/img/office.jpg"; // Ajusta el path si es necesario

function Pricing({}) {
  return (
    <>
    

      {/* Hero Section */}
      <section style={{...styles.heroSection, backgroundImage: `url(${backgroundImage})`}}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Pricing</h1>
          <p style={styles.heroSubtitle}>Find the Right Plan for Your Mail Management Needs</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={styles.pricingSection}>
        <div style={styles.pricingGrid}>
          {plans.map((plan, index) => (
            <div key={index} style={styles.pricingCard}>
              <div style={{ flex: 1 }}>
                <h2>{plan.name}</h2>
                <h3>${plan.price}<span style={{fontSize: '16px'}}>/m</span></h3>
                <ul style={styles.featuresList}>
                  <li><strong>Letters or Packages:</strong> {plan.letters}</li>
                  <li><strong>Open & Scan:</strong> {plan.scan}</li>
                  <li><strong>Recipients:</strong> {plan.recipients}</li>
                </ul>
              </div>
              <Button style={{marginTop:10}} className="custom-button">
                <Link to="/signup" style={{fontSize:22, textDecoration:"none"}}>SIGN UP</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Features List */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>All plans include:</h2>
        <div style={styles.featuresGrid}>
          {features.map((item, idx) => (
            <div className="text-center" key={idx} style={styles.featureItem}>
              <div style={{marginBottom:5}}> ✅</div>
              <strong className="marginb-1">{item.title}</strong>
              <h6>{item.description}</h6>
            </div>
          ))}
        </div>
      </section>


      {/* Trust Section */}
<section style={styles.trustSection}>
  <div style={styles.trustGrid}>
    <div style={styles.trustItem}>
      <CheckCircleOutlined style={{ fontSize: 42, marginBottom: 20 }} />
      <h3>We’re Here for You</h3>
      <p>Dedicated support every step of the way — from sign-up to mail delivery.</p>
    </div>
    <div style={styles.trustItem}>
      <CheckCircleOutlined style={{ fontSize: 42, marginBottom: 20 }} />
      <h3>Secure and Reliable</h3>
      <p>SSL protection ensures your information stays safe at all times.</p>
    </div>
    <div style={styles.trustItem}>
      <CheckCircleOutlined style={{ fontSize: 42, marginBottom: 20 }} />
      <h3>30-Day Money-Back Guarantee</h3>
      <p>If you're not satisfied, we’ll refund your money within the first 30 days.</p>
    </div>
  </div>
</section>

{/* Final Banner */}
<section style={styles.bannerSection}>
  <h2>Interested in learning more about our Business Mailroom?</h2>
  <Button style={{ margin: 5, fontSize: 22, minHeight: 32 }} className="custom-button-secondary">
    LEARN MORE
  </Button>
</section>


    </>
  );
}

const plans = [
  { name: "Starter", price: "10", letters: "30 per month", scan: "Not included", recipients: "2" },
  { name: "Standard", price: "20", letters: "60 per month", scan: "10 per month", recipients: "3" },
  { name: "Premium", price: "30", letters: "120 per month", scan: "20 per month", recipients: "6" },
];

const features = [
  { title: "Professional U.S. mailing address:", description: " enhances your business presence..." },
  { title: "Instant notifications:", description: " receive real-time email alerts..." },
  { title: "Local pickup:", description: " pick up your mail and packages at your subscribed location..." },
  { title: "Unlimited junk mail recycling:", description: " keep your mailbox clean..." },
  { title: "Convenient mobile app:", description: " manage your mail from your phone..." },
  { title: "Detailed sender indexing:", description: " easily track senders..." },
  { title: "Automated mail scanning:", description: " benefit from automatic scans..." },
  { title: "24/7 online access & cloud storage:", description: " access your mail whenever you need..." },
  { title: "Detailed content scans:", description: " get high-quality scans..." },
  { title: "Flexible use:", description: " perfect for both personal and business use..." },
  { title: "Comprehensive user management:", description: " add multiple recipients..." },
  { title: "Real-time tracking:", description: " stay informed about deliveries..." },
  { title: "Efficient mail management:", description: " organize your mail with ease..." },
];


const styles = {
  heroSection: {
    position: 'relative',
    backgroundSize: 'contain',
backgroundRepeat: 'no-repeat',
backgroundPosition: '95% center',



    
    width: '100%',
    minHeight: '300px', // 👈 Altura mínima para pantallas chicas
    height: '40vh',     // 👈 Altura adaptable a pantallas (40% del alto de pantalla)
    maxHeight: '500px', // 👈 No pases este tope para pantallas muy grandes
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
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.85) 45%, rgba(0, 0, 0,0.2) 100%)',
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
  
  pricingSection: {
    padding: '60px 20px',
    backgroundColor: '#f5f5f5'
  },
  pricingGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px'
  },
  pricingCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '30px',
    height: '520px',
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer'
  },
  featuresList: {
    textAlign: 'left',
    listStyle: 'none',
    padding: '0',
    margin: '20px 0'
  },
  featuresSection: {
    padding: '60px 20px',
    backgroundColor: '#e1f1fc'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '42px',
    color: '#003366',
    fontWeight: 650,
    marginBottom: '80px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  featureItem: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '16px'
  },
  trustSection: {
    backgroundColor: '#f5f5f5',
    padding: '60px 20px'
  },
  trustGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px'
  },
  trustItem: {
    width: '300px',
    textAlign: 'center'
  },
  bannerSection: {
    background: '#0047AB',
    color: 'white',
    padding: '60px 20px',
    textAlign: 'center'
  }
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Pricing);
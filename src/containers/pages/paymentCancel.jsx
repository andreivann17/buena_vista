import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/payment'); // Ajusta esta ruta si es necesario
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#f0f2f5' }}>
      <Card
        style={{
          width: 420,
          padding: 24,
          borderRadius: 12,
          textAlign: 'center',
          background: '#ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <h2>Payment could not be completed</h2>
<p>
  Something went wrong while processing your payment. Please try again later or use a different payment method.
</p>
<Button className='custom-button' type="primary" onClick={handleBackClick}>
  Go back to payment options
</Button>
      </Card>
    </div>
  );
};

export default PaymentCancelled;

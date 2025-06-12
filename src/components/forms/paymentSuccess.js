import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { executePayment } from '../services/api';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const paymentId = searchParams.get('paymentId'); // PayPal usa paymentId en la URL
    const payerId = searchParams.get('PayerID');    // Nota: PayPal usa "PayerID" con mayúsculas
    
    if (paymentId && payerId) {
      const completePayment = async () => {
        try {
          const response = await executePayment({
            payment_id: paymentId,  // backend espera snake_case
            payer_id: payerId       // backend espera snake_case
          });
          setPaymentStatus(response.data.state);
        } catch (err) {
          setError(err.response?.data?.detail || 'Error completing payment');
        }
      };
      
      completePayment();
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Payment Processing</h1>
      {paymentStatus ? (
        <div>
          <p>Payment status: {paymentStatus}</p>
          {paymentStatus === 'approved' && (
            <p>Your payment was successful!</p>
          )}
        </div>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <p>Processing your payment...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;


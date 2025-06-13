// PaymentSuccess.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { executePayment, checkPaymentStatus } from '../services/api';

const PaymentSuccess = () => {
 const [searchParams] = useSearchParams();
 const [paymentStatus, setPaymentStatus] = useState('processing');
 const [pollingCount, setPollingCount] = useState(0);
const [pollingInterval, setPollingInterval] = useState(null);

 const paymentId = searchParams.get('paymentId');
 const payerId = searchParams.get('PayerID');
const pollPaymentStatus = (paymentId) => {
  const interval = setInterval(async () => {
    try {
      const res = await fetch(`/api/status/${paymentId}`); // Ajusta ruta si es diferente
      const data = await res.json();

      setPaymentStatus(data.status);
      setPollingCount(prev => prev + 1);

      if (data.status === 'approved' || pollingCount >= 6) {
        clearInterval(interval);
      }
    } catch (err) {
      console.error('Polling error:', err);
      clearInterval(interval);
    }
  }, 3000);

  setPollingInterval(interval);
};

 useEffect(() => {
  if (!paymentId || !payerId) return;

  // Paso 1: Ejecución inicial rápida
  const initiatePayment = async () => {
   try {
    await executePayment({ payment_id: paymentId, payer_id: payerId });
    
    // Paso 2: Iniciar polling para estado actualizado
    const interval = setInterval(async () => {
     try {
      const response = await checkPaymentStatus(paymentId);
      setPaymentStatus(response.data.status);
      setPollingCount(prev => prev + 1);
      
      if (response.data.status === 'approved' || pollingCount >= 6) {
       clearInterval(interval);
      }
     } catch (error) {
      console.error('Error checking status:', error);
      clearInterval(interval);
     }
    }, 3000); // Consulta cada 3 segundos

    return () => clearInterval(interval);
   } catch (error) {
    console.error('Payment execution error:', error);
    setPaymentStatus('failed');
   }
  };

  initiatePayment();
 }, [paymentId, payerId]);
const callback = () => {
  setPaymentStatus("processing");
  const paymentId = searchParams.get("paymentId");
  if (paymentId) {
    pollPaymentStatus(paymentId); // iniciar el polling
  }
};

 return (
  <div className="payment-status-container">
   {paymentStatus === 'processing' && (
    <div className="processing-message">
     <h2>Processing Your Payment</h2>
     <div className="spinner"></div>
     <p>This usually takes just a few seconds...</p>
     <p>Payment ID: {paymentId}</p>
    </div>
   )}
   
   {paymentStatus === 'approved' && (
    <div className="success-message">
     <h2>Payment Successful!</h2>
     <div className="success-icon">✓</div>
     <p>Your transaction has been completed successfully.</p>
    </div>
   )}
   
   {paymentStatus === 'failed' && (
    <div className="error-message">
     <h2>Payment Processing Failed</h2>
     <div className="error-icon">✗</div>
     <p>We encountered an issue processing your payment.</p>
     <button className="retry-button">Try Again</button>
    </div>
   )}
  </div>
 );
};

export default PaymentSuccess;

//Estructura de plantilla

src/
  components/
    PaymentForm.jsx
    PaymentConcepts.jsx
    PaymentHistory.jsx
  pages/
    PaymentPage.jsx
    PaymentSuccess.jsx
    PaymentCancel.jsx
  services/
    api.js

// dependencia necesaria en el frontend:
npm install axios react-router-dom


//1. Servicio API (api.js)

// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Asegúrate de que coincida con tu backend
  withCredentials: true,
});

// Payment endpoints
export const getPaymentConcepts = () => api.get('/payments/concepts');
export const createPayment = (paymentData) => api.post('/payments/create', paymentData);
export const executePayment = (paymentId, payerId) => api.post('/payments/execute', { payment_id: paymentId, payer_id: payerId });
export const getPaymentHistory = () => api.get('/payments/history');

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirigir a login si no está autenticado
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;


//2. Componente PaymentForm

// src/components/PaymentForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPayment } from '../services/api';

const PaymentForm = () => {
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await createPayment({
        concept,
        amount: parseFloat(amount),
        description
      });
      
      // Redirigir a PayPal
      window.location.href = response.data.approval_url;
    } catch (err) {
      setError(err.response?.data?.detail || 'Error creating payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <div>
        <label>Concept:</label>
        <select 
          value={concept} 
          onChange={(e) => setConcept(e.target.value)}
          required
        >
          <option value="">Select a concept</option>
          <option value="subscription_12m">12 months PMB payment</option>
          <option value="subscription_6m">6 months PMB payment</option>
          <option value="service_fee">Service Fee</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label>Amount (USD):</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label>Description (optional):</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay with PayPal'}
      </button>
    </form>
  );
};

export default PaymentForm;


//3. Página de éxito (PaymentSuccess.jsx)
// Cuando PayPal redirige al usuario a la página de éxito
 (/payment/success), recibirás los parámetros en la URL, ejemplo:
https://tudominio.com/payment/success?paymentId=PAY-123456789&token=EC-987654321&PayerID=USER12345
En el componente de React, se extrae estos parámetros y se envian al backend.

// src/pages/PaymentSuccess.jsx
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


//4. Página de cancelación (PaymentCancel.jsx)

// src/pages/PaymentCancel.jsx
import React from 'react';

const PaymentCancel = () => {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. No charges have been made.</p>
    </div>
  );
};

export default PaymentCancel;



//5. Componente PaymentHistory

// src/components/PaymentHistory.jsx
import React, { useEffect, useState } from 'react';
import { getPaymentHistory } from '../services/api';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPaymentHistory();
        setPayments(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Error fetching payment history');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPayments();
  }, []);

  if (loading) return <div>Loading payment history...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Payment History</h2>
      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Concept</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                <td>{payment.concept}</td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;


//6. Configuración de rutas en tu App.js

// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
      </Routes>
    </Router>
  );
}

export default App;



///////////////////////////////////////////
El flujo es:

1. Tu aplicación crea un pago con el endpoint /payments/create

2. Rediriges al usuario a la approval_url que devuelve PayPal

3. El usuario aprueba el pago en el sitio de PayPal

4. PayPal redirige al usuario a tu return_url (configurado en settings) con dos parámetros importantes:

paymentId: El ID del pago que creaste originalmente

PayerID: El identificador único del comprador (payer_id)
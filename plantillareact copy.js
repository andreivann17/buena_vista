//Flujo de pagos con PayPal
//Permite crear un pago
//Maneja la redirección a PayPal
//Procesa la respuesta al regresar del flujo de PayPal
//Muestra el estado del pago
//Proporciona un historial de pagos
//Maneja errores
//Incluye archivos:
//1.Componente Principal de Pago (PaymentForm.jsx)
//2.Página de Éxito (PaymentSuccess.jsx)
//3. Servicio API (api.js)
//4. Componente de Historial de Pagos (PaymentHistory.jsx)
//5. Estilos CSS (Payment.css)
//Configuración de Rutas (App.js)
//Variables de Entorno (.env)


//Componente Principal de Pago (PaymentForm.jsx)
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { executePayment, checkPaymentStatus } from '../services/api';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('processing');
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const paymentId = searchParams.get('paymentId');
    const payerId = searchParams.get('PayerID');

    useEffect(() => {
        if (!paymentId || !payerId) {
            navigate('/payment');
            return;
        }

        const processPayment = async () => {
            try {
                // Paso 1: Ejecutar el pago
                const executionResponse = await executePayment({
                    payment_id: paymentId,
                    payer_id: payerId
                });

                // Paso 2: Manejar diferentes estados de respuesta
                if (executionResponse.data.status === 'requires_approval') {
                    // Redirigir a PayPal para aprobación
                    window.location.href = executionResponse.data.approval_url;
                    return;
                }

                // Paso 3: Verificar estado periódicamente si está en procesamiento
                if (executionResponse.data.status === 'processing') {
                    const interval = setInterval(async () => {
                        try {
                            const statusResponse = await checkPaymentStatus(paymentId);
                            setPaymentStatus(statusResponse.data.status);
                            
                            if (statusResponse.data.status === 'approved' || retryCount >= 5) {
                                clearInterval(interval);
                                if (retryCount >= 5) {
                                    setError('El pago está tomando más tiempo de lo esperado');
                                }
                            }
                            setRetryCount(prev => prev + 1);
                        } catch (err) {
                            clearInterval(interval);
                            setError(err.response?.data?.detail || 'Error verificando estado del pago');
                        }
                    }, 3000); // Consultar cada 3 segundos

                    return () => clearInterval(interval);
                }

                setPaymentStatus(executionResponse.data.status);
            } catch (err) {
                setError(err.response?.data?.detail || 'Error processing payment');
            }
        };

        processPayment();
    }, [paymentId, payerId, navigate, retryCount]);

    return (
        <div className="payment-status-container">
            {paymentStatus === 'processing' && (
                <div className="processing-message">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3>Procesando tu pago...</h3>
                    <p>Esto normalmente toma solo unos segundos.</p>
                    <p>ID de pago: {paymentId}</p>
                </div>
            )}

            {paymentStatus === 'approved' && (
                <div className="success-message">
                    <div className="success-icon">✓</div>
                    <h3>¡Pago Exitoso!</h3>
                    <p>Tu transacción se ha completado correctamente.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="btn btn-primary"
                    >
                        Volver al inicio
                    </button>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <div className="error-icon">✗</div>
                    <h3>Error en el Pago</h3>
                    <p>{error}</p>
                    <button 
                        onClick={() => navigate('/payment')}
                        className="btn btn-danger"
                    >
                        Intentar nuevamente
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;


//Servicio API (api.js)

import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    withCredentials: true,
});

// Interceptor para manejar errores
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Redirigir a login si no está autenticado
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const createPayment = (paymentData) => {
    return api.post('/payments/create', paymentData);
};

export const executePayment = (paymentData) => {
    return api.post('/payments/execute', paymentData);
};

export const checkPaymentStatus = (paymentId) => {
    return api.get(`/payments/status/${paymentId}`);
};

export const getPaymentHistory = () => {
    return api.get('/payments/history');
};

export default api;


//Componente de Historial de Pagos (PaymentHistory.jsx)
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
                setError(err.response?.data?.detail || 'Error loading payment history');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            created: 'bg-secondary',
            approved: 'bg-success',
            processing: 'bg-info',
            failed: 'bg-danger',
            refunded: 'bg-warning'
        };
        return <span className={`badge ${statusClasses[status] || 'bg-primary'}`}>{status}</span>;
    };

    return (
        <div className="payment-history mt-5">
            <h3>Historial de Pagos</h3>
            
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : payments.length === 0 ? (
                <p>No hay pagos registrados</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>ID PayPal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(payment => (
                                <tr key={payment.id}>
                                    <td>{formatDate(payment.created_at)}</td>
                                    <td>{payment.concept}</td>
                                    <td>${payment.amount.toFixed(2)}</td>
                                    <td>{getStatusBadge(payment.status)}</td>
                                    <td className="text-truncate" style={{maxWidth: '150px'}}>
                                        {payment.paypal_payment_id}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;


// Estilos CSS (Payment.css)
.payment-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.payment-form {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

.payment-status-container {
    text-align: center;
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.success-message {
    color: #28a745;
}

.error-message {
    color: #dc3545;
}

.processing-message {
    color: #17a2b8;
}

.success-icon, .error-icon {
    font-size: 72px;
    margin-bottom: 20px;
}

.spinner {
    width: 50px;
    height: 50px;
    margin: 20px auto;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.table-responsive {
    margin-top: 20px;
}



// Configuración de Rutas (App.js)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentForm from './components/PaymentForm';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
            </Routes>
        </Router>
    );
}

export default App;

//Variables de Entorno (.env)
REACT_APP_API_URL=http://tu-backend.com/api
REACT_APP_PAYPAL_CLIENT_ID=tus_client_id_paypal



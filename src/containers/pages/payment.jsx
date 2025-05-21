import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import Header from "../../components/navigation/headerDashboard.jsx";
import Contenido from "../../components/navigation/contentDashboard.jsx";
import FormPayment from "../../components/forms/payment.js";
import { connect, useDispatch } from 'react-redux';
import { actionPaymentGet } from "../../redux/actions/payment/payments.js";

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  color: "white",
  borderRadius:12,
  width: "100%",
  background: "linear-gradient(90deg, rgba(38, 131, 198, 0.94) 100%, rgba(38, 131, 198, 0) 100%)",
};

const PaymentForm = (props) => {
  const [data, setData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionPaymentGet());
  }, [dispatch]);

  useEffect(() => {
    if (props.payment) {
      setData(props.payment); // <<== Ahora directamente a data
    }
  }, [props.payment]);

  return (
    <>
      {token && data && (
        <>
          <Header title="Payment Details" icon="fas fa-money-check-dollar marginr-1" />
          <Contenido backgroundStyle={backgroundStyle} title="Payment Details" icon="fas fa-money-check-dollar marginr-1" />

          <div style={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'stretch',
            gap: '20px',
            maxWidth: '1000px',
            margin: '30px auto',
            padding: '20px',
            flexWrap: 'wrap'
          }}>
            {/* Resumen de pago */}
            <Card
              title={<span style={{ fontSize: '22px', fontWeight: 'bold' }}>Order Recap</span>}
              bordered={false}
              style={{
                flex: '1 1 300px',
                minHeight: '450px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                borderRadius: '8px',
                fontSize: '18px'
              }}
            >
              
              <div style={{ marginBottom: '14px' }}>
                <strong>Name:</strong><br />
                <h6>{data.name + " " + data.lastName}</h6>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <strong>Date:</strong><br />
                <h6>{new Date().toLocaleDateString()}</h6>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <strong>Email:</strong><br />
                <h6>{data.email}</h6>
              </div>
            </Card>

            {/* Formulario de Pago */}
            <div style={{
              flex: '1 1 450px',
              minHeight: '450px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius:12,
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              fontSize: '18px'
            }}>
              <FormPayment />
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment.data,
});

export default connect(mapStateToProps)(PaymentForm);

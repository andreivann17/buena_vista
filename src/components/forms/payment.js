import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, message, Card } from 'antd';
import { useDispatch } from 'react-redux';
import {actionPaymentPost} from "../../redux/actions/payment/payments"
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import dayjs from 'dayjs';

const { MonthPicker } = DatePicker;

const FormPayment = () => {
  const dispatch = useDispatch();
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [nombre, setNombre] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [expiracion, setExpiracion] = useState('');
  const [cvv, setCvv] = useState('');
  const [focus, setFocus] = useState('');
  const callback = () => {
    message.success('Payment sent successfully');
  };
  
  const callbackError = (code) => {
    message.error('There was an error processing the payment');
  };
  
  const onFinish = () => {
    dispatch(actionPaymentPost({
      nombreTarjeta: nombre,
      numeroTarjeta: numeroTarjeta,
      expiracion,
      cvv,
      monto,
      descripcion
    }, callback, callbackError));
  };
  
  const validateCardNumber = (_, value) => {
    if (!value) return Promise.reject(new Error('Please enter the card number'));
    const cleaned = value.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleaned)) {
      return Promise.reject(new Error('Card number must be 16 digits'));
    }
    return Promise.resolve();
  };
  
  const validateCVV = (_, value) => {
    if (!value) return Promise.reject(new Error('Please enter the CVV'));
    if (!/^\d{3,4}$/.test(value)) {
      return Promise.reject(new Error('CVV must be 3 or 4 digits'));
    }
    return Promise.resolve();
  };
  
  const validateExpiracion = (_, value) => {
    if (!value) return Promise.reject(new Error('Please select the expiration date'));
    if (value.isBefore(dayjs(), 'month')) {
      return Promise.reject(new Error('The card has expired'));
    }
    return Promise.resolve();
  };
  

  return (
    <div style={{   padding:20,minWidth:500}}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        {/* Animación de Tarjeta */}
        <Cards
          number={numeroTarjeta}
          name={nombre}
          
          expiry={expiracion.replace('/', '')} // Para que acepte formato MMYY
          cvc={cvv}
          focused={focus}
        />
      </div>

      <Form
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
  label="Name on Card"
  name="nombre"
  rules={[{ required: true, message: 'Please enter the name' }]}
>
  <Input
    placeholder="Full name"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    onFocus={(e) => setFocus('name')}
  />
</Form.Item>

<Form.Item
  label="Card Number"
  name="numeroTarjeta"
  rules={[{ validator: validateCardNumber }]}>
  <Input
    placeholder="1234 5678 9012 3456"
    maxLength={19}
    value={numeroTarjeta}
    onChange={(e) => setNumeroTarjeta(e.target.value)}
    onFocus={(e) => setFocus('number')}
  />
</Form.Item>
<div className='d-flex'>
    
<Form.Item
  label="Expiration Date"
  name="expiracion"
  className='marginr-1'
  rules={[{ validator: validateExpiracion }]}>
  <MonthPicker
    placeholder="Select month/year"
    style={{ width: '100%' }}
    onChange={(date, dateString) => setExpiracion(dateString)}
    onFocus={() => setFocus('expiry')}
  />
</Form.Item>

<Form.Item
  label="CVV"
  name="cvv"
  rules={[{ validator: validateCVV }]}>
  <Input.Password
    placeholder="123"
    maxLength={4}
    value={cvv}
    onChange={(e) => setCvv(e.target.value)}
    onFocus={(e) => setFocus('cvc')}
  />
</Form.Item>
</div>


<Form.Item
  label="Amount"
  name="monto"
  rules={[
    { required: true, message: 'Please enter the amount' },
    { pattern: /^\d+(\.\d{1,2})?$/, message: 'Enter a valid amount (e.g. 100 or 100.50)' },
  ]}
>
  <Input
    placeholder="Enter amount"
    value={monto}
    onChange={(e) => setMonto(e.target.value)}
  />
</Form.Item>

<Form.Item
  label="Description"
  name="descripcion"
  rules={[{ required: true, message: 'Please enter a description' }]}
>
  <Input
    placeholder="Payment description"
    value={descripcion}
    onChange={(e) => setDescripcion(e.target.value)}
  />
</Form.Item>

<Form.Item>
  <Button type="primary" htmlType="submit" block>
    Pay Now
  </Button>
</Form.Item>
      </Form>
    </div>
  );
};

export default FormPayment;

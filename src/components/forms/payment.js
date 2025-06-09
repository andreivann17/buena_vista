import React, { useRef, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { connect, useDispatch } from "react-redux";
import { actionPaymentCreate,actionPaymentExecute } from '../../redux/actions/payment/payments';
const FormPayment = ({ conceptsData }) => {
  const [form] = Form.useForm();
  const paypalRef = useRef();
  const [paypalReady, setPaypalReady] = useState(false);
const dispatch = useDispatch();
  const concepts = Array.isArray(conceptsData)
    ? conceptsData.filter(c => typeof c === 'string' && c.trim() !== '')
    : [];

  const clearPaypal = () => {
    if (paypalRef.current) {
      paypalRef.current.innerHTML = '';
    }
    setPaypalReady(false);

    // Elimina overlays manualmente si quedaron residuos de PayPal
    const overlays = document.querySelectorAll('[id^=paypal-overlay]');
    overlays.forEach(el => el.remove());

    // Forzar eliminación de posibles scripts fallidos
    if (window.paypal && typeof window.paypal.cleanup === 'function') {
      try {
        window.paypal.cleanup();
      } catch {}
    }
  };
  const callback = () =>{
  message.success('Payment completed successfully!');
  }
  const callbackError = () =>{
 message.error('An error occurred with PayPal.');
  }
  const handleShowPaypal = async () => {
  try {
    const values = await form.validateFields();
    const { amount, concept, description } = values;
    const amountNumber = parseFloat(amount);

    if (!amount || isNaN(amountNumber) || amountNumber <= 0) {
      message.error('Invalid amount.');
      return;
    }

    // Crear el pago en el backend
    const response =  dispatch(actionPaymentCreate(amount, concept, description));
    
    if (response && response.data && response.data.approval_url) {
      // Redirigir al sitio de PayPal
      window.location.href = response.data.approval_url;
    } else {
      message.error('No approval URL returned from backend.');
    }
  } catch (error) {
    message.error('Please complete all required fields or check the backend.');
  }
};


  return (
    <div style={{ padding: 20 }}>
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onValuesChange={clearPaypal}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: 'Enter the amount' },
            {
              validator: (_, value) => {
                const num = parseFloat(value);
                if (!value || isNaN(num) || num <= 0) {
                  return Promise.reject('Amount must be greater than 0');
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input placeholder="e.g. 100.00" />
        </Form.Item>

        <Form.Item
          label="Concept"
          name="concept"
          rules={[{ required: true, message: 'Select a concept' }]}
        >
          <Select placeholder="Select concept">
            {concepts.map((item, idx) => (
              <Select.Option key={idx} value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Enter a description' }]}
        >
          <Input placeholder="Payment details" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block onClick={handleShowPaypal}>
            Continue to PayPal
          </Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 24, display: paypalReady ? 'block' : 'none' }}>
        <div ref={paypalRef} />
      </div>
    </div>
  );
};

export default FormPayment;

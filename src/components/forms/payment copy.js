import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, DatePicker, message,Card } from 'antd';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

const { MonthPicker } = DatePicker;

const PaymentForm = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {

    console.log('Datos validados:', values);

    // Aquí mandas a tu dispatch
    dispatch({
      type: "PAYMENT_REQUEST",
      payload: {
        nombreTarjeta: values.nombre,
        numeroTarjeta: values.numeroTarjeta,
        expiracion: values.expiracion.format('MM/YYYY'),
        cvv: values.cvv,
        correo: values.correo,
        monto: values.monto,
      },
    });

    message.success('Pago enviado correctamente 🚀');
  };

  const validateCardNumber = (_, value) => {
    if (!value) return Promise.reject(new Error('Por favor ingresa el número de tarjeta'));
    const cleaned = value.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleaned)) {
      return Promise.reject(new Error('El número de tarjeta debe tener 16 dígitos'));
    }
    return Promise.resolve();
  };

  const validateCVV = (_, value) => {
    if (!value) return Promise.reject(new Error('Por favor ingresa el CVV'));
    if (!/^\d{3,4}$/.test(value)) {
      return Promise.reject(new Error('El CVV debe ser de 3 o 4 dígitos'));
    }
    return Promise.resolve();
  };

  const validateExpiracion = (_, value) => {
    if (!value) return Promise.reject(new Error('Por favor selecciona la expiración'));
    if (value.isBefore(dayjs(), 'month')) {
      return Promise.reject(new Error('La tarjeta está expirada'));
    }
    return Promise.resolve();
  };

  return (
    <>
    <Card className="equal-height-card"
    style={{

      padding: "20px",
     
      boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
      border: "0",
    }}
  >
      <Form
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre en la Tarjeta"
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
        >
          <Input placeholder="Nombre completo" />
        </Form.Item>

        <Form.Item
          label="Número de Tarjeta"
          name="numeroTarjeta"
          rules={[{ validator: validateCardNumber }]}
        >
          <Input placeholder="1234 5678 9012 3456" maxLength={19} />
        </Form.Item>

        <Form.Item
          label="Fecha de Expiración"
          name="expiracion"
          rules={[{ validator: validateExpiracion }]}
        >
          <MonthPicker placeholder="Selecciona mes/año" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="CVV"
          name="cvv"
          rules={[{ validator: validateCVV }]}
        >
          <Input.Password placeholder="123" maxLength={4} />
        </Form.Item>

        <Form.Item
          label="Correo Electrónico"
          name="correo"
          rules={[
            { required: true, message: 'Por favor ingresa el correo' },
            { type: 'email', message: 'El correo no es válido' }
          ]}
        >
          <Input placeholder="correo@ejemplo.com" />
        </Form.Item>

        <Form.Item
          label="Monto a Pagar"
          name="monto"
          rules={[{ required: true, message: 'Por favor ingresa el monto' }]}
        >
          <InputNumber
            min={1}
            formatter={value => `$ ${value}`}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
            placeholder="Ej: 100"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Pagar Ahora
          </Button>
        </Form.Item>
      </Form>

      </Card>
      </>
  );
};

export default PaymentForm;

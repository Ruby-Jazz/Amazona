import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckOutSteps from './CheckOutSteps';
import { savePaymentMethod } from '../../Stores/CartScreenSlice';

const PAYMENT_METHODS = [
  { id: 'paypal', label: 'PayPal', value: 'PayPal' },
  { id: 'opay', label: 'Opay', value: 'Opay' },
  { id: 'palmpay', label: 'Palmpay', value: 'Palmpay' },
];

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal'); // default
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3 />

      <form className="form" onSubmit={submitHandler}>
        <h1>Select Payment Method</h1>

        {PAYMENT_METHODS.map(({ id, label, value }) => (
          <div key={id}>
            <input
              type="radio"
              id={id}
              name="paymentMethod"
              value={value}
              checked={paymentMethod === value}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        ))}

        <button type="submit" className="primary">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;

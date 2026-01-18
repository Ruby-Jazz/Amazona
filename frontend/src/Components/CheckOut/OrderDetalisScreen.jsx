import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../Loading/LoadingBox';
import MessageBox from '../Loading/MessageBox';
import {  orderDetails } from '../../Stores/OrderDetailsSlice';
import {
  PayPalScriptProvider,
  PayPalButtons,
} from '@paypal/react-paypal-js';
import { orderPayReset, payOrder } from '../../Stores/PayOrderSlice';
import api from '../../api';

const OrderDetailsScreen = () => {
  const { loading, error, order } = useSelector(
    (state) => state.orderDetails
  );
  const {loading :loadingPay, error: errorPay, success: successPay}= useSelector(state=> state.orderPay);

  const [clientId, setClientId] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
  if (successPay) {
    dispatch(orderPayReset());
    dispatch(orderDetails(id));
  }
}, [dispatch, successPay, id]);

useEffect(() => {
  if (order?.paymentMethod === 'PayPal' && !order.isPaid) {
    const getClientId = async () => {
      const { data } = await api.get('/api/config/paypal');
      setClientId(data);
    };
    getClientId();
  }
}, [order?.paymentMethod, order?.isPaid]);

useEffect(() => {

  dispatch(orderDetails(id));
}, [dispatch, id]);



  if (loading) return <LoadingBox />;
  if (error) return <MessageBox variant="danger">{error}</MessageBox>;
  if (!order || !order.shippingAddress)
    return <MessageBox>Order Not Found</MessageBox>;
if (loading) return <LoadingBox />;
if (error) return <MessageBox variant="danger">{error}</MessageBox>;

if (!order || !order._id || order._id !== id) {
  return <LoadingBox />;
}

  return (
    <div>
      <h1>Order: {order._id}</h1>

      <div className="row top">
        {/* LEFT */}
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h1>Shipping</h1>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName}
                  <br />
                  <strong>Address:</strong>{' '}
                  {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered At: {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h1>Payment</h1>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid At: {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h1>Order Items</h1>
                <ul>
                  {order.orderItems.map((x) => (
                    <li key={x.id}>
                      <div className="row">
                        <img
                          src={x.image}
                          alt={x.name}
                          className="small"
                        />
                        <div className="min-30">
                          <Link to={`/product/${x.id}`}>{x.name}</Link>
                        </div>
                        <div>
                          ${x.price} x {x.qty} = ${x.qty * x.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li><h1>Order Summary</h1></li>

              <li className="row">
                <div>Items</div>
                <div>${order.itemsPrice.toFixed(2)}</div>
              </li>

              <li className="row">
                <div>Shipping</div>
                <div>
                  {order.shippingPrice === 0
                    ? 'Free'
                    : `$${order.shippingPrice.toFixed(2)}`}
                </div>
              </li>

              <li className="row">
                <div>Tax</div>
                <div>${order.taxPrice.toFixed(2)}</div>
              </li>

              <li className="row">
                <strong>Total</strong>
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </li>

              {/* PAYPAL */}
              {order.paymentMethod === 'PayPal' && !order.isPaid && (
                <li>
                  {!clientId ? (
                    <div>Loading Payment...</div>
                  ) : (
<>
                   {loadingPay && <LoadingBox/>}
                   {errorPay && <MessageBox variant='danger'> {errorPay} </MessageBox>}

                    <PayPalScriptProvider
                      options={{ 'client-id': clientId }}
                    >
                      <PayPalButtons
                        createOrder={(data, actions) =>
                          actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value:
                                    order.totalPrice.toFixed(2),
                                },
                              },
                            ],
                          })
                        }
                        onApprove={(data, actions) =>
                          actions.order
                            .capture()
                            .then((paymentResult) => {
                              console.log('Paid:', paymentResult);
                              // dispatch(payOrder(order._id, details))
                              dispatch(payOrder({order,paymentResult}))
                            })
                        }
                      />
                    </PayPalScriptProvider>
                 </> )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsScreen;

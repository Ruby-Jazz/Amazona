import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import LoadingBox from '../Loading/LoadingBox'
import MessageBox from '../Loading/MessageBox'
import { useNavigate } from 'react-router-dom'
import { getOrderHistory } from '../../Stores/OrderhistorySlice'
import './OrderHistory.css'
const OrderHistory = () => {
    const {loading,error,orders} = useSelector(state=> state.orderHistory);
const navigate = useNavigate();
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(getOrderHistory())
},[dispatch])
  return (
    <div>
        <h1>Order History</h1>
        {loading? (<LoadingBox/>): error? (<MessageBox variant='danger'> {error} </MessageBox>):(
            <table className='table'>
                <thead>
                   <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL($)</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTION</th>
                  
                   </tr>
                </thead>
                <tbody>
  {orders && orders.map(order => (
    <tr key={order._id}>
      <td>{order._id}</td>

      <td>
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      <td>{order.totalPrice.toFixed(2)}</td>

      <td>
        {order.isPaid
          ? new Date(order.paidAt).toLocaleDateString()
          : 'No'}
      </td>

      <td>
        {order.isDelivered
          ? new Date(order.deliveredAt).toLocaleDateString()
          : 'No'}
      </td>

      <td>
        <button
          className="small"
          onClick={() => navigate(`/order/${order._id}`)}
        >
          Details
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
        )}
    </div>
  )
}

export default OrderHistory
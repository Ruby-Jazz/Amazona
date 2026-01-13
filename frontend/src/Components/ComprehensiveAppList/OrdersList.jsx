import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../Loading/LoadingBox';
import MessageBox from '../Loading/MessageBox';
import { getOrdersList } from '../../Stores/OrdersListsSlice';

const OrdersLists = () => {
    const {loading,error,orders}= useSelector(state=>state.ordersLists);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getOrdersList())
    },[dispatch])
  return (
    <div>
      <div>
        <h1>Users Lists</h1>
      </div>
{loading ? <LoadingBox/> :error ? <MessageBox variant='danger'>{error} </MessageBox>:

(
            <table className='table'>
                <thead>
                   <tr>

                    <th> ORDER ID</th>
                    <th> USER ID</th>
                
                    <th>USER NAME</th>
                    <th>USER EMAIL</th>
                    <th>PRICE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                  
                  
                   </tr>
                </thead>
                <tbody>
  { orders && orders.map(order => (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td>{order.user._id}</td>
      <td>{order.user.name}</td>
      <td>{order.user.email}</td>
      <td>${order.totalPrice.toFixed(2)}</td>
      <td>{order.isPaid? <div className='success'>{order.paidAt.slice(0,10)}</div> : 'NO'}</td>
      <td>{order.isDeliverd? order.deliveredAt.slice(0,10) : 'NO'}</td>
      
    </tr>
  ))}
</tbody>

            </table>
        )}


    </div>
  )
}

export default OrdersLists
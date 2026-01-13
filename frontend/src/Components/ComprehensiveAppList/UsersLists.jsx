import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../Loading/LoadingBox';
import MessageBox from '../Loading/MessageBox';
import { getUsersLists } from '../../Stores/UsersListsSlice';

const UsersLists = () => {
    const {loading,error,users}= useSelector(state=>state.usersLists);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getUsersLists())
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
                    <th>ID</th>
                
                    <th>NAME</th>
                    <th>EMAIL</th>
                  
                   </tr>
                </thead>
                <tbody>
  {users && users.map(user => (
    <tr key={user._id}>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  ))}
</tbody>

            </table>
        )}


    </div>
  )
}

export default UsersLists
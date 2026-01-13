import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoutes = () => {
  const { userInfo } = useSelector(state => state.auth);

  return userInfo?.isAdmin?  <Outlet /> : <Navigate to="/signin" replace />;
};

export default AdminRoutes;

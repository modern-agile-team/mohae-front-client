/** @format */

import { useLocation, Navigate, Outlet } from 'react-router-dom';

export default function Default() {
  const isAuth = sessionStorage.getItem('isAuthorized');
  const location = useLocation();

  console.log('isAuth :>> ', isAuth);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/home" state={{ form: location }} replace />
  );
}

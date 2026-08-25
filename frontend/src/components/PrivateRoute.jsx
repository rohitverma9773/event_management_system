import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children, role }) {
  const { auth } = useAuth();
  if (!auth.token) return <Navigate to="/login" replace />;
  if (role && auth.user?.role !== role) return <Navigate to="/" replace />;
  return children;
}

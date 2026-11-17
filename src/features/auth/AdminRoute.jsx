import { Navigate } from 'react-router';
import { useAuth } from './AuthContext';

export default function AdminRoute({ children }) {
	const { user, loading } = useAuth();
	if (loading) return 'Loading';
	if (!user) return <Navigate to={'/login'} replace />;
	if (user.role !== 'ADMIN') return 'Forbidden';
	return children;
}

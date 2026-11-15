import { createBrowserRouter, Navigate } from 'react-router';
import LoginPage from './features/auth/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './features/dashboard/DashboardHome';

export const router = createBrowserRouter([
	{ path: '/', element: <Navigate to={'/dashboard'} replace /> },
	{ path: '/login', element: <LoginPage /> },
	{
		element: <DashboardLayout />,
		children: [{ path: '/dashboard', element: <DashboardHome /> }],
	},
]);

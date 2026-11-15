import { Outlet } from 'react-router';

export default function DashboardLayout() {
	return (
		<div>
			<h1 className="text-2xl font-bold">Dashboard</h1>
			<Outlet />
		</div>
	);
}

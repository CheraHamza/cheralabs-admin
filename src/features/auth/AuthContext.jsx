import { useEffect, createContext, useContext } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const queryClient = useQueryClient();

	// 1. Check authenticated user, once on load
	const currentUser = useQuery({
		queryKey: ['current-user'],
		queryFn: () => api('/users/me'),
		retry: false,
	});

	// 2. Any 401 from the api client logs us out locally
	useEffect(() => {
		const onUnauthorized = () => {
			queryClient.setQueryData(['current-user'], null);
			queryClient.removeQueries({
				predicate: (query) => query.queryKey[0] !== 'current-user',
			});
		};

		window.addEventListener('unauthorized', onUnauthorized);
		return () => window.removeEventListener('unauthorized', onUnauthorized);
	}, [queryClient]);

	const logout = useMutation({
		mutationFn: () => api('/auth/logout', { method: 'POST' }),
		onSuccess: () => {
			queryClient.clear();
			queryClient.setQueryData(['current-user'], null);
		},
	});

	return (
		<AuthContext.Provider
			value={{
				user: currentUser.data ?? null,
				loading: currentUser.isLoading,
				logout: logout.mutateAsync,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
}

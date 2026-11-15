function LoginButton({ provider, redirect_to }) {
	return (
		<a
			className="block w-full rounded-md bg-gray-700 p-2 text-center text-amber-50"
			href={`/api/auth/${provider}?redirect_to=${encodeURIComponent(redirect_to)}`}
		>
			Login with {provider}
		</a>
	);
}

export default function LoginPage() {
	const redirect_to = `${window.location.origin}`;
	return (
		<div className="w-full flex flex-col content-center space-y-5 p-2">
			<h1 className="text-2xl font-bold text-center">Login Page</h1>
			<LoginButton provider={'Google'} redirect_to={redirect_to} />
			<LoginButton provider={'Github'} redirect_to={redirect_to} />
		</div>
	);
}

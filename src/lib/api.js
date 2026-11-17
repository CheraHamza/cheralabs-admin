export class ApiError extends Error {
	constructor(status, message, errors = []) {
		super(message);
		this.status = status;
		this.details = errors;
	}
}

export async function api(path, options = {}) {
	const res = await fetch(`/api${path}`, {
		headers: { 'Content-Type': 'application/json', ...options.headers },
		...options,
	});

	const body = res.status === 204 ? null : await res.json().catch(() => null);

	if (!res.ok || body?.success === false) {
		const err = body?.error;
		if (res.status === 401) window.dispatchEvent(new Event('unauthorized'));
		throw new ApiError(
			res.status,
			err?.message ?? 'Something went wrong',
			err?.errors,
		);
	}
	return body.data;
}

import { env } from '$env/dynamic/public';

export const API_BASE_URL = `http://localhost:${env.PUBLIC_COLLECTOR_PORT}`;

export const API_ENDPOINTS = {
	COMPUTE: `${API_BASE_URL}/compute`,
	TASKS: `${API_BASE_URL}/tasks`
} as const;

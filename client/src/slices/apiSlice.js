import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://meowtopia-server.onrender.com',
	prepareHeaders: (headers) => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo) {
			const { token } = userInfo;

			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		}
	},
}); // with no proxy -> baseUrl:'http://localhost:8000'

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ['User'],
	endpoints: (builder) => ({}),
});

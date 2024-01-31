import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://meowtopia-phi.vercel.app/',
}); // with no proxy -> baseUrl:'http://localhost:8000'

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ['User'],
	endpoints: (builder) => ({}),
});

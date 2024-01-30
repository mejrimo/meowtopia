import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				body: data,
			}),
		}),

		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/register`,
				method: 'POST',
				body: data,
			}),
		}),

		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),

		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PATCH',
				body: data,
			}),
		}),

		deleteUser: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/profile`,
				method: 'DELETE',
			}),
		}),

		updateFavorites: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile/favorites/${data}`,
				method: 'POST',
			}),
		}),

		getFavKittiesId: builder.query({
			query: () => ({
				url: `${USERS_URL}/profile/favorites`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useUpdateFavoritesMutation,
	useGetFavKittiesIdQuery,
} = usersApiSlice;

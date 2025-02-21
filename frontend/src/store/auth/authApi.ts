import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`,
  }),
  endpoints(builder) {
    return {
      register: builder.mutation({
        query: (payload) => ({
          method: 'POST',
          url: '/signup',
          body: payload,
        }),
      }),
      login: builder.mutation({
        query: (payload) => ({
          method: 'POST',
          url: '/signin',
          body: payload,
        }),
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation } = authApi;

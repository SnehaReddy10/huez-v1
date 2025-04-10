import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utitlities';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      { clientSecret: string },
      { amount: number; currency: string; cartId: string }
    >({
      query: (body) => ({
        url: '/api/v1/payments/create-payment-intent',
        method: 'POST',
        body,
      }),
    }),
    getPaymentStatus: builder.query<
      { status: string; customer_email: string },
      { sessionId: string }
    >({
      query: ({ sessionId }) => ({
        url: `/api/v1/payments/payment-session-status?session_id=${sessionId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useGetPaymentStatusQuery } =
  paymentApi;

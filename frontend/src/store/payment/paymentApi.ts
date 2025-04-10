import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utitlities';

export const paymentApi = createApi({
  reducerPath: 'payment',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['cart'],
  endpoints(builder) {
    return {
      createPaymentIntent: builder.mutation<
        { clientSecret: string },
        { amount: number; currency: string; cartId: string }
      >({
        query: (body) => ({
          url: '/payments/create-payment-intent',
          method: 'POST',
          body,
        }),
      }),
      getPaymentStatus: builder.query<
        { status: string; customer_email: string },
        { sessionId: string }
      >({
        query: ({ sessionId }) => ({
          url: `/payments/payment-session-status?session_id=${sessionId}`,
          method: 'GET',
        }),
      }),
      confirmPayment: builder.mutation<
        { success: boolean; message: string },
        { paymentIntentId: string }
      >({
        query: ({ paymentIntentId }) => ({
          url: '/payments/confirm',
          method: 'POST',
          body: { paymentIntentId },
        }),
        invalidatesTags: () => [{ type: 'cart', id: getToken() ?? '' }],
      }),
    };
  },
});

export const {
  useCreatePaymentIntentMutation,
  useGetPaymentStatusQuery,
  useConfirmPaymentMutation,
} = paymentApi;

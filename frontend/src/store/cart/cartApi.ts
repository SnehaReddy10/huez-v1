import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utitlities';

export const cartApi = createApi({
  reducerPath: 'cart',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/cart',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getCart: builder.query({
        query: () => ({
          method: 'GET',
          url: '/',
        }),
      }),
      addToCart: builder.mutation({
        query: (payload) => ({
          method: 'POST',
          url: '/product',
          body: payload,
        }),
      }),
      updateCartItem: builder.mutation({
        query: ({ productId, quantity }) => ({
          method: 'PUT',
          url: `/update/${productId}`,
          body: { quantity },
        }),
      }),
      removeFromCart: builder.mutation({
        query: (productId) => ({
          method: 'DELETE',
          url: `/remove/${productId}`,
        }),
      }),
    };
  },
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = cartApi;

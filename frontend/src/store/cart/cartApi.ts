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
  tagTypes: ['cart', 'product'],
  endpoints(builder) {
    return {
      getCart: builder.query({
        query: () => ({
          method: 'GET',
          url: '/',
        }),
        providesTags: [{ type: 'cart', id: getToken() ?? '' }],
      }),
      addToCart: builder.mutation({
        query: (payload) => ({
          method: 'POST',
          url: '/product',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'cart', id: getToken() ?? '' }],
      }),
      incrementProductQuantity: builder.mutation({
        query: (payload) => ({
          method: 'POST',
          url: '/product/increment',
          body: { menuItemId: payload },
        }),
        invalidatesTags: () => [{ type: 'cart', id: getToken() ?? '' }],
      }),
      decrementProductQuantity: builder.mutation({
        query: (payload) => ({
          method: 'POST',
          url: '/product/decrement',
          body: { menuItemId: payload },
        }),
        invalidatesTags: () => [{ type: 'cart', id: getToken() ?? '' }],
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
          url: `/product/${productId}`,
        }),
        invalidatesTags: () => [{ type: 'cart', id: getToken() ?? '' }],
      }),
    };
  },
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useIncrementProductQuantityMutation,
  useDecrementProductQuantityMutation,
} = cartApi;

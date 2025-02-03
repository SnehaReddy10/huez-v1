import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/products',
  }),
  endpoints(builder) {
    return {
      getProducts: builder.query({
        query: () => ({
          method: 'GET',
          url: '/',
        }),
      }),
      getProductById: builder.query({
        query: (productId) => ({
          method: 'GET',
          url: `/${productId}`,
        }),
      }),
    };
  },
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;

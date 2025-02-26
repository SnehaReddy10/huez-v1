import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utitlities';

export const productApi = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`,
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
      getProducts: builder.query({
        query: () => ({
          method: 'GET',
          url: '/',
        }),
        providesTags: [{ type: 'cart', id: getToken() ?? '' }],
      }),
      getProductsByCategory: builder.query({
        query: ({ isVeg, isVegan, cuisine, category }) => {
          const queryParams = new URLSearchParams();

          if (isVeg !== undefined) queryParams.append('isVeg', isVeg);
          if (isVegan !== undefined) queryParams.append('isVegan', isVegan);
          if (cuisine) queryParams.append('cuisine', cuisine);
          if (category) queryParams.append('category', category);

          return {
            method: 'GET',
            url: `/?${queryParams.toString()}`,
          };
        },
        providesTags: [{ type: 'cart', id: getToken() ?? '' }],
      }),
      getProductById: builder.query({
        query: (productId) => ({
          method: 'GET',
          url: `/${productId}`,
        }),
      }),
      search: builder.query({
        query: (searchQuery) => ({
          method: 'GET',
          url: `/search?query=${searchQuery}`,
        }),
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useSearchQuery,
} = productApi;

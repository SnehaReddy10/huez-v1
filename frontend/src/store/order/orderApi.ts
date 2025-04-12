import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utitlities';

export const orderApi = createApi({
  reducerPath: 'order',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['order'],
  endpoints(builder) {
    return {
      getPastOrders: builder.query({
        query: (timeRange) => ({
          method: 'GET',
          url: `/past-orders${timeRange ? `?timeRange=${timeRange}` : ''}`,
        }),
        providesTags: [{ type: 'order', id: 'LIST' }],
      }),
    };
  },
});

export const { useGetPastOrdersQuery } = orderApi;

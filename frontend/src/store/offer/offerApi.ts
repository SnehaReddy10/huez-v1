import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utitlities';

export const offerApi = createApi({
  reducerPath: 'offer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/offers',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['offer'],
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: () => ({
        method: 'GET',
        url: '/',
      }),
      providesTags: [{ type: 'offer', id: 'LIST' }],
    }),
    getOfferById: builder.query({
      query: (offerId) => ({
        method: 'GET',
        url: `/${offerId}`,
      }),
      providesTags: (result, error, offerId) => [
        { type: 'offer', id: offerId },
      ],
    }),
    createOffer: builder.mutation({
      query: (payload) => ({
        method: 'POST',
        url: '/',
        body: payload,
      }),
      invalidatesTags: [{ type: 'offer', id: 'LIST' }],
    }),
    updateOffer: builder.mutation({
      query: ({ offerId, ...updates }) => ({
        method: 'PUT',
        url: `/${offerId}`,
        body: updates,
      }),
      invalidatesTags: (result, error, { offerId }) => [
        { type: 'offer', id: offerId },
      ],
    }),
    deleteOffer: builder.mutation({
      query: (offerId) => ({
        method: 'DELETE',
        url: `/${offerId}`,
      }),
      invalidatesTags: [{ type: 'offer', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useGetOfferByIdQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = offerApi;

import { configureStore } from '@reduxjs/toolkit';
import { authApi, useLoginMutation, useRegisterMutation } from './auth/authApi';
import {
  cartApi,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useIncrementProductQuantityMutation,
  useDecrementProductQuantityMutation,
} from './cart/cartApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  productApi,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useSearchQuery,
} from './product/productApi';
import {
  offerApi,
  useGetOffersQuery,
  useGetOfferByIdQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} from './offer/offerApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(offerApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useRegisterMutation,
  useLoginMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useIncrementProductQuantityMutation,
  useDecrementProductQuantityMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetOffersQuery,
  useGetOfferByIdQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
  useSearchQuery,
};

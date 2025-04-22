import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  email: null,
  name: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ email: string; name: string }>
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    clearAuthData: (state) => {
      state.email = null;
      state.name = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;

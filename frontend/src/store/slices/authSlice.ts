import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  email: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    clearAuthData: (state) => {
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;

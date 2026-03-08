import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Apni banayi hui user ki almari import ki

export const store = configureStore({
  reducer: {
    user: userReducer, // Store room ko bataya ke hamare paas 'user' naam ki almari hai
  },
});
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import hardwareReducer from './hardwareSlice';

export default configureStore({
  reducer: {
    hardware: hardwareReducer
  }
});
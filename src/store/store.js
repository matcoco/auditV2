// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import hardwareReducer from './hardwareSlice.js';

export default configureStore({
  reducer: {
    hardware: hardwareReducer
  }
});
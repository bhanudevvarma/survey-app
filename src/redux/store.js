import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import axiosErrorMiddleware from '../middleware/axiosErrorMiddleware';


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(axiosErrorMiddleware),
  });
  
  export default store;
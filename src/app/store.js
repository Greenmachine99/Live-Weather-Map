// Import React & Redux Dependencies
import { configureStore } from '@reduxjs/toolkit';

// Import Individual Reducers
import mapReducer from '../features/map/mapSlice';
import weatherReducer from '../features/weatherInfo/weatherSlice';

// Create Store
export const store = configureStore({
  reducer: {
    map: mapReducer,
    weather: weatherReducer
  }
});

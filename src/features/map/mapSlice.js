// Import Dependencies for Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import Other Dependencies
import { loadUserPosition } from '../geoLocation/geoLocation.js';

// Set Start Position of Map
const initialState = {
    startPosition: [52.377, 4.896],
    endDestination: [],
    isLoading: false,
    hasError: false
}

// Create Function to Retrieve User Position from Browser into Redux Store
export const getUserPosition = createAsyncThunk(
    'map/getUserPosition',
    async (arg, thunkAPI) => {
      const position = await loadUserPosition();
      return position;
    }
  );

// Create Slice Options
const options = {
    name: 'map',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [getUserPosition.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getUserPosition.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.startPosition = action.payload;
        },
        [getUserPosition.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
}

// Create Slice of Map
const mapSlice = createSlice(options);

// Export Selectors
export const startPositionSelector = (state) => state.map.startPosition;
export const endDestinationSelector = (state) => state.map.endDestination;

// Export Reducer
export default mapSlice.reducer;
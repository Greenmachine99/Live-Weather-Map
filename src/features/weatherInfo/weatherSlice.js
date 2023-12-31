// Import React & Redux Dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import API Call
import { fetchWeather } from './weatherAPI';

// Load Weather Data
export const loadWeather = createAsyncThunk(
    'weather/loadWeather',
    async ({lat, lon}) => {
        const weatherData = await fetchWeather(lat, lon);
        return weatherData;
    }
)

// Create Initial State
const initialState = {
    description: '',
    temp: 0,
    tempFeelslike: 0,
    windSpeed: 0,
    cloudiness: 0,

    isLoading: false,
    hasError: false
}

// Create Slice Options
const options = {
    name: 'weather',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(loadWeather.pending, state => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadWeather.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;

            state.description = action.payload.weather[0].description;
            state.temp = action.payload.main.temp;
            state.tempFeelslike = action.payload.main.feels_like;
            state.windSpeed =  action.payload.wind.speed;
            state.cloudiness = action.payload.clouds.all;
        })
        .addCase(loadWeather.rejected, state => {
            state.isLoading = false;
            state.hasError = true;
        })
    }
}

// Create Slice
export const weatherSlice = createSlice(options);

// Export Selectors
export const descriptionSelector = state => state.weather.description;
export const tempSelector = state => state.weather.temp;
export const tempFeelslikeSelector = state => state.weather.tempFeelslike;
export const windSpeedSelector = state => state.weather.windSpeed;
export const cloudinessSelector = state => state.weather.cloudiness;

export const isLoadingSelector = state => state.weather.isLoading;
export const hasErrorSelector = state => state.weather.hasError;

// Export Reducer
export default weatherSlice.reducer;

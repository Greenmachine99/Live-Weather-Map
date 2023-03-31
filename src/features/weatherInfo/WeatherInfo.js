// Import React & Redux Dependencies
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

// Import CSS
import "./weatherInfo.css";

// Import Slice Dependencies
import { loadWeather, descriptionSelector, tempSelector, tempFeelslikeSelector, windSpeedSelector, cloudinessSelector, isLoadingSelector, hasErrorSelector } from "./weatherSlice";
import { startPositionSelector } from "../map/mapSlice";


export function WeatherInfo() {
  const dispatch = useDispatch();

  // Get Data from Store
  const isLoading = useSelector(isLoadingSelector);
  const hasError = useSelector(hasErrorSelector);

  const description = useSelector(descriptionSelector);
  const temp = useSelector(tempSelector);
  const tempFeelslike = useSelector(tempFeelslikeSelector);
  const windSpeed = useSelector(windSpeedSelector);
  const cloudiness = useSelector(cloudinessSelector);

  const [lat, lon] = useSelector(startPositionSelector);

  // Load Weather Data
  useEffect(() => {
    dispatch(loadWeather({lat ,lon}));
  }, [dispatch, lat, lon]);

  return (
    <div className="weather">
      {isLoading ? (
        <p> Loading weather... </p>
      ) : (!hasError ? (
        <div className="weatherOverview">
        <h5> Current Weather Situation </h5>
        <p> {description} </p>
        <p> {temp}°C </p>
        <p> It feels like {tempFeelslike}°C </p>
        <p> Wind speed is {windSpeed} km/h </p>
        <p> {cloudiness}% Cloudy</p>
      </div>
      ) : (
      <p> Cannot load weather unfortunately </p>)
      )}
    </div>
  );
}
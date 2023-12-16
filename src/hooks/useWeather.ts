import { WeatherFetchProps, WeatherFetchResponse } from "@/types/weather";
import { useState } from "react";

const WEATHER_API_BASE = "https://api.open-meteo.com/v1";

export const useWeather = (props: WeatherFetchProps) => {
  const [weather, setWeather] = useState<WeatherFetchResponse | null>(null);

  const buildURL = (): URL => {
    let url = new URL(WEATHER_API_BASE + "/forecast");

    //Set coordinates
    url.searchParams.set("latitude", props.latitude.toString());
    url.searchParams.set("longitude", props.longitude.toString());

    //Set response units
    if (props.units && Object.keys(props.units).length > 0) {
      Object.entries(props.units).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    //Set current parameters
    if (props.current && props.current.length > 0) {
      let currentParams = props.current.join(",");
      url.searchParams.set("current", currentParams);
    }

    //Set hourly parameters
    if (props.hourly && props.hourly.length > 0) {
      let hourlyParams = props.hourly.join(",");
      url.searchParams.set("hourly", hourlyParams);
    }

    return url;
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(buildURL().href, {
        cache: "force-cache",
        method: "GET",
      });

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchWeather, weather };
};

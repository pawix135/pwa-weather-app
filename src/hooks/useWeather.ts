import { weatherFetcher } from "@/fetchers/weatherFetchers";
import {
  WeatherFetchProps,
  WeatherFetchResponse,
  WetherProps,
} from "@/types/weather";
import { useEffect, useState } from "react";

const WEATHER_API_BASE = "https://api.open-meteo.com/v1";

export const useWeather = (props: WeatherFetchProps) => {
  const [options, setOptions] = useState<WetherProps>({
    current: ["temperature_2m", "weather_code"],
    hourly: [],
    units: {
      precipitation_unit: "mm",
      wind_speed_unit: "mph",
      temperature_unit: "celsius",
    },
  });
  const [weather, setWeather] = useState<WeatherFetchResponse | null>(null);

  const buildURL = (): URL => {
    if (!props.location) throw Error("No location provided");
    let url = new URL(WEATHER_API_BASE + "/forecast");

    //Set coordinates
    url.searchParams.set("latitude", props.location.latitude.toString());
    url.searchParams.set("longitude", props.location.longitude.toString());

    //Set response units
    if (options.units && Object.keys(options.units).length > 0) {
      Object.entries(options.units).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    //Set current parameters
    if (options.current && options.current.length > 0) {
      let currentParams = options.current.join(",");
      url.searchParams.set("current", currentParams);
    }

    //Set hourly parameters
    if (options.hourly && options.hourly.length > 0) {
      let hourlyParams = options.hourly.join(",");
      url.searchParams.set("hourly", hourlyParams);
    }

    return url;
  };

  const changeUnits = (units: Partial<WetherProps["units"]>) => {
    setOptions((prev) => ({
      ...prev,
      units: {
        ...prev.units,
        ...units,
      },
    }));
  };

  const fetchWeather = async () => {
    try {
      let data = await weatherFetcher(buildURL());
      data.timestamp = new Date();
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!props.location) return;
    fetchWeather();
  }, [props.location, options]);

  return {
    fetchWeather,
    weather,
    changeUnits,
    units: options.units,
  };
};

export interface WeatherFetchProps {
  latitude: number;
  longitude: number;
  units?: WeatherUnits;
  hourly?: HourlyWeatherProps[];
  current?: CurrentWeatherProps[];
}

export interface WeatherUnits {
  temperature_unit?: "celsius" | "fahrenheit";
  wind_speed_unit?: "kmh" | "mph" | "ms" | "kn";
  precipitation_unit?: "mm" | "inch";
}

export type CurrentWeatherProps =
  | "temperature_2m"
  | "relative_humidity_2m"
  | "apparent_temperature"
  | "is_day_or_night"
  | "precipitation"
  | "rain"
  | "showers"
  | "snowfall"
  | "weather_code"
  | "cloud_cover_total"
  | "sealevel_pressure"
  | "surface_pressure"
  | "wind_speed_10m"
  | "wind_direction_10m"
  | "wind_gusts_10m";

export type WeatherAPIInterface = "forecast";

export interface WeatherFetchResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
    [key: string]: string[] | number[];
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    [key: string]: string;
  };
  current: {
    time: string;
    interval: number;
    [key: string]: string | number;
  };
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    rain: string;
    wind_speed_10m: string;
    [key: string]: string | number;
  };
}

export type HourlyWeatherProps =
  | "temperature_2m"
  | "relative_humidity_2m"
  | "dewpoint_2m"
  | "apparent_temperature"
  | "precipitation_probability"
  | "precipitation"
  | "rain"
  | "showers"
  | "snowfall"
  | "snow_depth"
  | "weather_code"
  | "sealevel_pressure"
  | "surface_pressure"
  | "cloud_cover_total"
  | "cloud_cover_low"
  | "cloud_cover_mid"
  | "cloud_cover_high"
  | "visibility"
  | "evapotranspiration"
  | "reference_evapotranspiration"
  | "vapour_pressure_deficit"
  | "wind_speed_10m"
  | "wind_speed_80m"
  | "wind_speed_120m"
  | "wind_speed_180m"
  | "wind_direction_10m"
  | "wind_direction_80m"
  | "wind_direction_120m"
  | "wind_direction_180m"
  | "wind_gusts_10m"
  | "temperature_80m"
  | "temperature_120m"
  | "temperature_180m"
  | "soil_temperature_0cm"
  | "soil_temperature_6cm"
  | "soil_temperature_18cm"
  | "soil_temperature_54cm"
  | "soil_moisture_0_1cm"
  | "soil_moisture_1_3cm"
  | "soil_moisture_3_9cm"
  | "soil_moisture_9_27cm"
  | "soil_moisture_27_81cm";

export const hourlyWeatherPropsArray: HourlyWeatherProps[] = [
  "temperature_2m",
  "relative_humidity_2m",
  "dewpoint_2m",
  "apparent_temperature",
  "precipitation_probability",
  "precipitation",
  "rain",
  "showers",
  "snowfall",
  "snow_depth",
  "weather_code",
  "sealevel_pressure",
  "surface_pressure",
  "cloud_cover_total",
  "cloud_cover_low",
  "cloud_cover_mid",
  "cloud_cover_high",
  "visibility",
  "evapotranspiration",
  "reference_evapotranspiration",
  "vapour_pressure_deficit",
  "wind_speed_10m",
  "wind_speed_80m",
  "wind_speed_120m",
  "wind_speed_180m",
  "wind_direction_10m",
  "wind_direction_80m",
  "wind_direction_120m",
  "wind_direction_180m",
  "wind_gusts_10m",
  "temperature_80m",
  "temperature_120m",
  "temperature_180m",
  "soil_temperature_0cm",
  "soil_temperature_6cm",
  "soil_temperature_18cm",
  "soil_temperature_54cm",
  "soil_moisture_0_1cm",
  "soil_moisture_1_3cm",
  "soil_moisture_3_9cm",
  "soil_moisture_9_27cm",
  "soil_moisture_27_81cm",
] as const;

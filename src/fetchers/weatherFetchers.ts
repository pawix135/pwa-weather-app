import { WeatherFetchResponse } from "@/types/weather";

export const weatherFetcher = async (
  url: URL
): Promise<WeatherFetchResponse> => {
  const response = await fetch(url.href, {
    cache: "force-cache",
    method: "GET",
  });

  return (await response.json()) as WeatherFetchResponse;
};

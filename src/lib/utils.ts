import { Location } from "@/types/weather";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkIfDateIsBehindOneHour = (dateToCheck: Date): boolean => {
  const currentDate = new Date();
  const oneHourAfterDate = new Date(dateToCheck.getTime() + 1000 * 60 * 60);

  return currentDate >= oneHourAfterDate;
};

export const persistLocation = ({
  latitude,
  longitude,
  name,
}: Location): boolean => {
  try {
    localStorage.setItem(
      "location",
      JSON.stringify({ latitude, longitude, name })
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const getLocation = (): Location | null => {
  const location = localStorage.getItem("location");
  if (location) {
    let parsedLocation = JSON.parse(location);
    return parsedLocation as Location;
  } else {
    return null;
  }
};

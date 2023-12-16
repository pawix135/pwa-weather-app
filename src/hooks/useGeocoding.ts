import { useToast } from "@/components/ui/use-toast";
import { getLocation } from "@/lib/utils";
import { GeocodingLocation, GeocodingResponse } from "@/types/geocoding";
import { Location } from "@/types/weather";
import { useEffect, useState } from "react";

const GEOCODING_API_BASE = "https://geocoding-api.open-meteo.com/v1";
const CURRENT_LOCATION_API =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

interface UseGeocodingProps {
  userLocationInput: string;
}
export const useGeocoding = (props: UseGeocodingProps) => {
  let { toast } = useToast();
  const [location, setLocation] = useState<Location | null>(null);
  const [foundLocations, setFoundLocations] = useState<GeocodingLocation[]>([]);

  const buildUrl = (): URL => {
    let url = new URL(GEOCODING_API_BASE + "/search");
    url.searchParams.set("name", props.userLocationInput);
    url.searchParams.set("count", "10");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");
    return url;
  };

  const fetchLocations = async () => {
    if (!props.userLocationInput || props.userLocationInput.length < 3) {
      setFoundLocations([]);
      return;
    }
    try {
      let response = await fetch(buildUrl().href);
      let data = (await response.json()) as GeocodingResponse;

      if (!data.error) {
        setFoundLocations(data.results);
      }
    } catch (error) {
      toast({
        title: "Something went wrong while fetching locations!",
        description: "Please try again!",
        variant: "destructive",
      });
      console.log("Locations error: ", error);
    }
  };

  const saveLocation = (data: Location) => {
    setLocation({
      latitude: data.latitude,
      longitude: data.longitude,
      name: data.name,
    });
  };

  const selectLocation = (location: GeocodingLocation) => {
    console.log(location);

    saveLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      name: `${location.name}, ${
        location.admin1 ? location.admin1 + ", " : ""
      } ${location.country_code}`,
    });
    setFoundLocations([]);
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let newPosition: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        try {
          let url = new URL(CURRENT_LOCATION_API);
          url.searchParams.set("latitude", position.coords.latitude.toString());
          url.searchParams.set(
            "longitude",
            position.coords.longitude.toString()
          );
          url.searchParams.set("localityLanguage", "en");
          let response = await fetch(url.href);
          let data = await response.json();
          console.log(data, "fetched");

          newPosition.name = `${data.city}, ${data.principalSubdivision}, ${data.countryCode}`;
        } catch (error) {
          newPosition.name = "Current Location";
          toast({
            title: "Something went wrong while fetching your location!",
            description: "Please try again!",
            variant: "destructive",
          });
        }
        saveLocation(newPosition);
      });
    } else {
      toast({
        title: "Geolocation not supported!",
        description: "Use the search bar to find your location!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [props.userLocationInput]);

  useEffect(() => {
    if (getLocation()) {
      setLocation(getLocation());
    } else {
      getCurrentLocation();
    }
  }, []);

  return {
    location,
    fetchLocations,
    foundLocations,
    selectLocation,
    getCurrentLocation,
  } as const;
};

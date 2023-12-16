import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { useDebounce } from "./hooks/useDebounce";
import { Input } from "./components/ui/input";
import { useGeocoding } from "./hooks/useGeocoding";
import { Card, CardContent } from "./components/ui/card";
import { NavigationIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { WeatherIcon } from "./components/WeatherIcon";
import { ScrollArea } from "./components/ui/scroll-area";
import { cn } from "./lib/utils";

function App() {
  const [userLocationInput, setUserLocationInput] = useState<string>("");
  let userLocationInputDebounce = useDebounce(userLocationInput, 1000);

  let { location, foundLocations, selectLocation, getCurrentLocation } =
    useGeocoding({
      userLocationInput: userLocationInputDebounce,
    });
  let { weather, changeUnits, units } = useWeather({
    location: location,
    userLocationInput,
  });

  return (
    <div className="flex flex-col w-[600px] mx-auto h-screen justify-center gap-2">
      <div className="flex flex-col gap-5 relative">
        <div className="flex flex-row items-center gap-2 ">
          <Input
            value={userLocationInput}
            onChange={(e) => {
              setUserLocationInput(e.target.value);
            }}
          />
          <Button
            onClick={getCurrentLocation}
            variant={"ghost"}
            size={"icon"}
            className="items-center justify-center flex"
          >
            <NavigationIcon />
          </Button>
        </div>
        <div
          className={cn(
            "scale-y-0 absolute w-full top-10 bg-secondary duration-150 origin-top rounded-md",
            {
              "scale-y-100": foundLocations.length > 0,
            }
          )}
        >
          <ScrollArea className={"h-80 w-full rounded-md border"}>
            <div className="flex flex-col gap-2 p-4 ">
              {foundLocations.map((location) => {
                console.log(location);

                return (
                  <Button
                    className="text-sm"
                    key={location.id}
                    onClick={() => {
                      selectLocation(location);
                      setUserLocationInput("");
                    }}
                  >
                    <p>
                      {location.name}, {location.admin1}, {location.country}
                    </p>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      <Tabs defaultValue="current">
        <div className="flex flex-row justify-between items-center">
          <TabsList>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
          </TabsList>
          <div className="flex flex-row gap-2">
            <Button
              variant={
                units.temperature_unit === "celsius" ? "default" : "ghost"
              }
              onClick={() => {
                changeUnits({ temperature_unit: "celsius" });
              }}
            >
              °C
            </Button>
            <Button
              variant={
                units.temperature_unit === "fahrenheit" ? "default" : "ghost"
              }
              onClick={() => {
                changeUnits({ temperature_unit: "fahrenheit" });
              }}
            >
              °F
            </Button>
          </div>
        </div>
        <TabsContent value="current">
          <Card>
            <CardContent className="flex flex-col justify-center items-center py-5 gap-2">
              <p className="text-4xl">
                {weather?.current.temperature_2m}
                {weather?.current_units.temperature_2m}
              </p>
              <p className="text-3xl">{location?.name}</p>
              <WeatherIcon
                temperature={weather?.current.temperature_2m}
                weatherCode={48}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="hourly">Hourly</TabsContent>
      </Tabs>
    </div>
  );
}

export default App;

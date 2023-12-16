import { useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  let { fetchWeather, weather } = useWeather({
    hourly: [],
    current: ["temperature_2m", "rain", "wind_speed_10m"],
    units: {
      wind_speed_unit: "kmh",
    },
    latitude: 50.4738,
    longitude: 17.3344,
  });

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="flex">
      <pre>{JSON.stringify(weather, null, 2)}</pre>
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="hourly">Hourly</TabsTrigger>
        </TabsList>
        <TabsContent value="current">Current</TabsContent>
        <TabsContent value="hourly">Hourly</TabsContent>
      </Tabs>
    </div>
  );
}

export default App;

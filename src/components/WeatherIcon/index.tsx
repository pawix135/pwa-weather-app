import { weatherDescriptions } from "@/test";
import { WeatherCode } from "@/types/weather";
import {} from "lucide-react";
interface Props {
  temperature?: number | undefined;
  weatherCode?: WeatherCode;
}

const Icon: React.FC<{ temperature?: number }> = ({ temperature }) => {
  if (!temperature) return null;
  if (temperature <= 0) {
    return <div>🥶</div>;
  } else if (temperature < 5) {
    return <div>😨</div>;
  } else if (temperature < 15) {
    return <div>😐</div>;
  } else if (temperature < 25) {
    return <div>😎</div>;
  } else if (temperature < 35) {
    return <div>🥵</div>;
  }
};

export const WeatherIcon: React.FC<Props> = ({ temperature, weatherCode }) => {
  if (!temperature) return null;
  console.log(temperature);

  return (
    <div className="flex flex-col gap-2 items-center">
      <Icon temperature={temperature} />
      {weatherCode && weatherDescriptions[weatherCode]}
    </div>
  );
};

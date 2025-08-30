import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import WeatherCard from "@/components/WeatherCard";
import CitySearch from "@/components/CitySearch";
import { getWeatherForCity } from "@/services/weatherService";
import skyBackground from "@/assets/sky-background.jpg";

interface WeatherInfo {
  city: string;
  coordinates: { latitude: number; longitude: number };
  weather: {
    current: {
      temperature_2m: number;
      relative_humidity_2m: number;
      apparent_temperature: number;
      weather_code: number;
      wind_speed_10m: number;
    };
    current_units: {
      temperature_2m: string;
    };
  };
  description: string;
  icon: string;
}

const Index = () => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (cityName: string) => {
    setLoading(true);
    try {
      const result = await getWeatherForCity(cityName);
      if (result) {
        setWeatherInfo(result);
        toast({
          title: "Weather loaded",
          description: `Current weather for ${cityName}`,
        });
      } else {
        toast({
          title: "City not found",
          description: "Please check the city name and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-sky-gradient bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: `linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%), url(${skyBackground})` 
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/30" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Weather Now
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Get instant weather updates for any city worldwide
          </p>
          
          <div className="flex justify-center mb-8">
            <CitySearch onSearch={handleSearch} loading={loading} />
          </div>
        </div>

        {/* Weather display */}
        <div className="flex justify-center">
          {weatherInfo ? (
            <div className="w-full max-w-lg">
              <WeatherCard
                city={weatherInfo.city}
                temperature={weatherInfo.weather.current.temperature_2m}
                description={weatherInfo.description}
                icon={weatherInfo.icon}
                feelsLike={weatherInfo.weather.current.apparent_temperature}
                humidity={weatherInfo.weather.current.relative_humidity_2m}
                windSpeed={weatherInfo.weather.current.wind_speed_10m}
                unit={weatherInfo.weather.current_units.temperature_2m.replace('°', '')}
              />
            </div>
          ) : (
            !loading && (
              <div className="text-center text-muted-foreground">
                <div className="text-6xl mb-4">🌤️</div>
                <p className="text-lg">Search for a city to see current weather conditions</p>
              </div>
            )
          )}
        </div>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Fetching weather data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

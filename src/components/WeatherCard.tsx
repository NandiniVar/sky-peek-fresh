import { Card } from "@/components/ui/card";

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  unit: string;
}

const WeatherCard = ({
  city,
  temperature,
  description,
  icon,
  feelsLike,
  humidity,
  windSpeed,
  unit,
}: WeatherCardProps) => {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg backdrop-blur-sm bg-white/20 border border-white/20 p-8">
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-glow/20 to-primary/10 animate-glow rounded-lg" />
      
      <div className="relative z-10">
        {/* City name */}
        <h2 className="text-2xl font-bold text-foreground mb-2">{city}</h2>
        
        {/* Main weather info */}
        <div className="flex items-center gap-6 mb-6">
          <div className="text-6xl animate-float">{icon}</div>
          <div>
            <div className="text-5xl font-bold text-foreground">
              {Math.round(temperature)}°{unit}
            </div>
            <div className="text-lg text-muted-foreground capitalize">{description}</div>
          </div>
        </div>
        
        {/* Additional info */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Feels like</div>
            <div className="font-semibold text-foreground">
              {Math.round(feelsLike)}°{unit}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Humidity</div>
            <div className="font-semibold text-foreground">{humidity}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Wind</div>
            <div className="font-semibold text-foreground">{Math.round(windSpeed)} km/h</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
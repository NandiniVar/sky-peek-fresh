interface Coordinates {
  latitude: number;
  longitude: number;
}

interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
  };
}

interface GeocodeResult {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
  }>;
}

const WEATHER_CODES = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  61: { description: 'Slight rain', icon: '🌦️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  71: { description: 'Slight snow', icon: '🌨️' },
  73: { description: 'Moderate snow', icon: '❄️' },
  75: { description: 'Heavy snow', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
};

export const getCoordinatesForCity = async (cityName: string): Promise<Coordinates | null> => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch coordinates');
    }

    const data: GeocodeResult = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return null;
    }

    const result = data.results[0];
    return {
      latitude: result.latitude,
      longitude: result.longitude,
    };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

export const getWeatherData = async (coordinates: Coordinates): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const getWeatherDescription = (code: number) => {
  return WEATHER_CODES[code as keyof typeof WEATHER_CODES] || { description: 'Unknown', icon: '❓' };
};

export const getWeatherForCity = async (cityName: string) => {
  const coordinates = await getCoordinatesForCity(cityName);
  if (!coordinates) {
    return null;
  }

  const weatherData = await getWeatherData(coordinates);
  if (!weatherData) {
    return null;
  }

  const weatherInfo = getWeatherDescription(weatherData.current.weather_code);

  return {
    city: cityName,
    coordinates,
    weather: weatherData,
    description: weatherInfo.description,
    icon: weatherInfo.icon,
  };
};
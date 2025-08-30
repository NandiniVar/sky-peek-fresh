import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface CitySearchProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const CitySearch = ({ onSearch, loading }: CitySearchProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pr-10 bg-white/20 border-white/30 text-foreground placeholder:text-muted-foreground backdrop-blur-sm focus:bg-white/30 focus:border-white/50 transition-all duration-300"
          disabled={loading}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <Button 
        type="submit" 
        disabled={loading || !city.trim()}
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "..." : "Search"}
      </Button>
    </form>
  );
};

export default CitySearch;
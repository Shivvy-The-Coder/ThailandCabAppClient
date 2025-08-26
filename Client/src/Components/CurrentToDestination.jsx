import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";

const CurrentToDestination = ({
  onSearch,
  currentLocation,
  destination,
  setDestination,
  // restrict to your country (e.g., "IN" for India)
  countryCode = "IN", 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch location suggestions from Nominatim
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination.length < 3) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&countrycodes=${countryCode}&limit=5&q=${destination}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 400); // debounce typing
    return () => clearTimeout(delayDebounce);
  }, [destination, countryCode]);

  const handleSelect = (place) => {
    setDestination(place.display_name);
    setSuggestions([]);
  };

  return (
    <div className="bg-white max-w-md mx-auto rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        Book Your Ride
      </h2>

      <div className="flex flex-col space-y-3">
        {/* Current Location */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
          <FaLocationArrow className="text-green-500 text-xl" />
          <input
            type="text"
            value={currentLocation || "Fetching current location..."}
            readOnly
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
        </div>

        {/* Destination Search */}
        <div className="relative">
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
            <FaMapMarkerAlt className="text-red-500 text-xl" />
            <input
              type="text"
              placeholder="Enter Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white shadow-lg rounded-xl mt-1 max-h-48 overflow-y-auto z-50">
              {suggestions.map((place, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(place)}
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        onClick={onSearch}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
      >
        Search Cabs
      </button>
    </div>
  );
};

export default CurrentToDestination;

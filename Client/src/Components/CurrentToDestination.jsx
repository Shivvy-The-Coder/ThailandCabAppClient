import React from "react";
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";

const CurrentToDestination = ({onSearch,currentLocation,destination,setDestination}) => {
  return (
    <div className="bg-white max-w-md mx-auto rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        Book Your Ride
      </h2>

      <div className="flex flex-col space-y-3">
        {/* Current Location (auto-updated & read-only) */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
          <FaLocationArrow className="text-green-500 text-xl" />
          <input
            type="text"
            value={currentLocation || "Fetching current location..."}
            readOnly
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
        </div>

        {/* Destination (user input) */}
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

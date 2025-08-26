import React, { useState } from "react";
import NavbarWithSidebar from "../Components/NavbarWithSidebar";
import CurrentToDestination from "../Components/CurrentToDestination";
import LeafletMap from "../Components/MapComponent";
import RideBookingSummary from "../Components/RideBookingSummary";
import { useLocationContext } from "../context/LocationContext";

const Home = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { currentLocation, destination, setDestination } = useLocationContext();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="shrink-0 w-full max-w-md mx-auto py-4">
        <NavbarWithSidebar />
      </div>
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto py-4">
        <div>
          <LeafletMap />
        </div>
        <div className="w-full max-w-md mx-auto py-4">
          {!showSummary ? (
            <CurrentToDestination
              onSearch={() => setShowSummary(true)}
              currentLocation={currentLocation}
              destination={destination}
              setDestination={setDestination}
            />
          ) : (
            <RideBookingSummary />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

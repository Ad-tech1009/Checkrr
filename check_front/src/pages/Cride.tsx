import { useState } from 'react';
import { IoIosTime } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import {Link} from 'react-router';
// import MapComponent from '../../components/MapComponent'; // Import the new Map Component
// import { LatLng } from 'leaflet'; // Import LatLng type from Leaflet

const Cride = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  // State for selected locations with LatLng type or null
  // const [pickupLocation, setPickupLocation] = useState<LatLng | null>(null);
  // const [dropoffLocation, setDropoffLocation] = useState<LatLng | null>(null);

  const rideOptions = [
    {
      provider: "Uber",
      price: "$15",
      arrivalTime: "5 mins",
      rating: 4.5,
      type: "Economy",
    },
    {
      provider: "Ola",
      price: "$12",
      arrivalTime: "3 mins",
      rating: 4.7,
      type: "Economy",
    },
    {
      provider: "Lyft",
      price: "$18",
      arrivalTime: "7 mins",
      rating: 4.6,
      type: "Premium",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-6 md:px-10 py-4">
        <Link to="/">
          <img src="/logo.png" alt="Checkrr Logo" width={150} height={50} />
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mt-6 text-blue-700">
        Compare Ride Prices
      </h1>

      {/* Search/Filter Section */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-6 space-y-4 md:space-y-0 md:space-x-4 px-4">
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="p-2 border border-blue-300 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Drop-off Location"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          className="p-2 border border-blue-300 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Search
        </button>
      </div>

      {/* Leaflet Map Section */}
      {/* <div className="w-full px-4 md:px-10 mt-8">
        <MapComponent
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          setPickupLocation={setPickupLocation}
          setDropoffLocation={setDropoffLocation}
        />
      </div> */}

      {/* Comparison Results Section */}
      <div className="mt-10 w-full px-4 md:px-10">
        {rideOptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rideOptions.map((ride, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col border border-blue-300">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-blue-700">{ride.provider}</h3>
                  <span className="flex items-center text-blue-500">
                    <MdAttachMoney className="mr-1" /> {ride.price}
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-blue-500">
                  <span>{ride.arrivalTime} Away</span>
                  <span className="flex items-center">
                    <IoIosTime className="mr-1" /> {ride.rating} ★
                  </span>
                </div>
                <button className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-6 text-blue-600">No rides available.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-blue-600">
        <p>© 2024 Checkrr. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Cride;
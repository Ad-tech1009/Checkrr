import Card from '../components/Card';
import { IoIosTime } from "react-icons/io";
import { MdSavings } from "react-icons/md";
import {Link} from 'react-router';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">

      {/* Header */}
      <div className="w-full flex justify-between items-center px-6 md:px-10 py-4">
        {/* Logo */}
        <div className="flex-1 text-center">
          <img src="/logo.png" alt="Checkrr Logo" width={150} height={50} />
        </div>
        {/* Buttons */}
          <div className="flex space-x-2 md:space-x-4">
            <Link to="/login">
              <button className="px-3 md:px-4 py-1 md:py-2 text-white bg-black rounded hover:bg-blue-600 transition duration-300">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-3 md:px-4 py-1 md:py-2 text-white bg-black rounded hover:bg-green-600 transition duration-300">
                Signup
              </button>
            </Link>
          </div>
      </div>
      
      {/* Hero Section */}
      <div className="text-center mt-10 mb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to Checkrr!</h1>
        <p className="text-base md:text-lg mt-4">Check Kar for the Best Deals on Rides and Meals!</p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-6 md:px-10 lg:px-20">
        <Card
          initialText="Ready to Go?"
          hoverText="Look for Rides"
          initialColor="bg-white"
          hoverColor="bg-blue-400 text-white"
          href="/compare-rides"
          imageSrc="/City driver-cuate.png" 
        />
        <Card
          initialText="Hungry?"
          hoverText="Grab a Snack!"
          initialColor="bg-white"
          hoverColor="bg-green-400 text-white"
          href="/compare-food"
          imageSrc="/food2.jpg" // Path to food comparison image
        />
      </div>

      {/* Feature Highlights Section */}
      <div className="mt-10 mb-8 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold">Features</h2>
        <div className="flex flex-col md:flex-row justify-center mt-6">
          <div className="m-4 p-6 bg-white rounded-lg shadow-md flex flex-col items-center transition-transform duration-300 hover:scale-105">
            {/* Add icon for feature */}
            <IoIosTime className="text-4xl text-blue-600 mb-2" />
            <h3 className="text-xl md:text-2xl font-semibold mt-2">Real-time Comparisons</h3>
            <p className="text-sm md:text-base">Get the latest prices in real-time from various platforms.</p>
          </div>
          <div className="m-4 p-6 bg-white rounded-lg shadow-md flex flex-col items-center transition-transform duration-300 hover:scale-105">
            {/* Add icon for feature */}
            <MdSavings className="text-4xl text-green-600 mb-2" />
            <h3 className="text-xl md:text-2xl font-semibold mt-2">Track Your Savings</h3>
            <p className="text-sm md:text-base">See how much you save by using our service.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center">
        <p>© 2024 Checkrr. All rights reserved.</p>
      </footer>
    </div>
  );
}
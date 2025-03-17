"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CompareFood() {
  const [foodCategory, setFoodCategory] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Logic for searching based on foodCategory and location
    console.log(`Searching for ${foodCategory} in ${location}`);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center">
      {/* Header with Logo linking to Landing Page */}
      <div className="w-full flex justify-between items-center px-6 md:px-10 py-4">
        <div className="flex-1 text-center">
          <Link href="/">
            <Image src="/logo.png" alt="Checkrr Logo" width={150} height={50} />
          </Link>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="text-center mt-10 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800">Compare Food Prices</h1>
        <p className="text-lg md:text-xl mt-4 text-green-700">Find the best deals on your favorite meals!</p>
      </div>

      {/* Search Options Section */}
      <div className="w-full px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-center mb-8">
          <input
            type="text"
            placeholder="Enter food category (e.g., Pizza, Sushi)"
            value={foodCategory}
            onChange={(e) => setFoodCategory(e.target.value)}
            className="w-full md:w-1/3 p-2 mb-4 md:mb-0 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-1/3 p-2 mb-4 md:ml-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 md:ml-4"
          >
            Search
          </button>
        </div>
      </div>

      {/* Food Options Section */}
      <div className="w-full px-6 md:px-10">
        {/* Example Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <Image src="/food2.jpg" alt="Food Item 1" width={300} height={200} className="rounded" />
            <h2 className="text-lg font-semibold mt-2 text-green-600">Food Item 1</h2>
            <p className="text-sm text-green-500">Price: $10.99</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <Image src="/food2.jpg" alt="Food Item 2" width={300} height={200} className="rounded" />
            <h2 className="text-lg font-semibold mt-2 text-green-600">Food Item 2</h2>
            <p className="text-sm text-green-500">Price: $12.99</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <Image src="/food2.jpg" alt="Food Item 3" width={300} height={200} className="rounded" />
            <h2 className="text-lg font-semibold mt-2 text-green-600">Food Item 3</h2>
            <p className="text-sm text-green-500">Price: $8.99</p>
          </div>
          {/* Add more food items as needed */}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center">
        <p className="text-green-600">© 2024 Checkrr. All rights reserved.</p>
      </footer>
    </div>
  );
}

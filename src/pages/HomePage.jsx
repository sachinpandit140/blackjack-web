import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './HomePage.css'; // Optional for additional custom styles

const HomePage = () => {
  return (
    <div className="home-container flex justify-center items-center min-h-screen relative">
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-300 ease-in-out blur-md"
        style={{ backgroundImage: 'url("/cards-table.jpg")' }}></div>

      <div className="flex space-x-8 z-10">
        {/* SinglePlayer Card with Link */}
        <Link to="/singleplayer" className="card flex flex-col items-center justify-center w-96 h-64 rounded-lg shadow-lg hover:scale-105 transform transition-all bg-blue-500 hover:bg-blue-600 text-white p-6 relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-4">Singleplayer</h2>
          <p>Play against the dealer in a solo game!</p>
        </Link>

      </div>
    </div>
  );
};

export default HomePage;

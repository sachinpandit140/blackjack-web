import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PiPokerChipLight } from "react-icons/pi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-700 opacity-90  text-white overflow-hidden">
      {/* Left Section - Logo or Home Button */}
      <Link to="/" className="text-2xl font-bold">
        <PiPokerChipLight className="size-10" />
      </Link>

      <p className="ml-3 font-serif-heavy text-2xl align-middle ">BLACKJACK</p>

      {/* Center Section - Navigation Links (Hidden on mobile) */}
      <ul className="hidden md:flex gap-6 text-lg ml-auto mr-0 font-roboto">
        <li className="text-xl hover:underline">
          <Link to="/about" >About</Link>
        </li>
      </ul>

      {/* Right Section - Mobile Menu Icon */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle Icon */}
        <button onClick={handleMenuToggle} className="md:hidden text-2xl">
          {menuOpen ? <IoCloseOutline /> : <CiMenuBurger />}
        </button>
      </div>

      {/* Mobile Menu (Visible only when menuOpen is true) */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-gray-600 flex flex-col items-center text-lg md:hidden font-roboto">
          <li className="p-4">
            <Link to="/about" onClick={handleMenuToggle}>
              About
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;

import React, { useContext, useEffect, useState } from 'react';
import { MdMenu, MdClose } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
import { FaArrowRight, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import  { isLoggedin } from '../auth/authentication';
import userContext from '../auth/userContext';
import { USER_IMAGE_RESOURCE } from "../services/userService";

const Navbar = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = useContext(userContext);
  const location = useLocation();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  return (
    <>
      <nav className="rounded-lg overflow-hidden shadow-lg bg-gray-900 my-1 mx-1">
        <div className="flex justify-between items-center p-4 bg-slate-700 text-white">
        <div className="flex items-center space-x-3">
            <IoCarSportOutline className="text-5xl" />
            <Link to="/" className="text-white text-3xl font-bold ">
                 <span className="">Car</span> Hunt
            </Link>
        </div>
          <div className="hidden md:flex space-x-10">
            <Link to="/" className="hover:text-gray-400 text-lg">Home</Link>
            <Link to="/explore" className="hover:text-gray-400 text-lg">Explore</Link>
            {isLoggedin() && <Link to="/booking" className="hover:text-gray-400 text-lg">Bookings</Link>}
            <Link to="/about" className="hover:text-gray-400 text-lg">About Us</Link>
            <Link to="/contact" className="hover:text-gray-400 text-lg">Contact</Link>
            
            
          </div>
          <div className="hidden md:flex items-center space-x-10">
          {isLoggedin() ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile">
                <img
                    src={USER_IMAGE_RESOURCE + userData.user.userImage} // Use a default image if no profile image is available
                    alt="Profile"
                    className="w-10 h-10 rounded-full hover:opacity-80 hover:border-2 hover:border-yellow-400 transition duration-300"
                />
              </Link>

              <Link to="/profile" >
              <span className="text-lg hover:text-yellow-400">{userData.user.name}</span>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-blue-500 text-white flex px-4 py-2 rounded hover:bg-red-600 backdrop-blur-md transform transition-transform duration-500 hover:translate-x-4">
                Login
                <FaArrowRight className="ml-2 my-auto" />
              </button>
            </Link>
          )}
            <div>
              <IoSettingsOutline
                className="text-3xl hover:text-gray-400 animate-spin"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div
                  className={`absolute right-0 mt-2 mr-3 w-48 bg-stone-600 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out transform ${
                    showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <ul className="py-2">
                                    <Link to="/Admin" onClick={() => setShowDropdown(false)}>
                                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                         Admin Login
                                     </li>
                                     </Link>

                                     <Link to="/Employee" onClick={() => setShowDropdown(false)}>
                                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                         Owner Login
                                     </li>
                                     </Link>
                                     
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <MdClose className="text-3xl hover:text-gray-400" />
              ) : (
                <MdMenu className="text-3xl hover:text-gray-400" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 text-white p-4 space-y-4">
            <Link to="/" className="block hover:text-gray-400">Home</Link>
            <Link to="/explore" className="block hover:text-gray-400">Explore</Link>
            <Link to="/booking" className="block hover:text-gray-400">Bookings</Link>
            <Link to="/about" className="block hover:text-gray-400">About Us</Link>
            <Link to="/contact" className="block hover:text-gray-400">Contact</Link>
            {isLoggedin ? (
              <Link to="/profile" className="block hover:text-gray-400">
                <FaUserCircle className="inline-block text-2xl mr-2" />
                Profile
              </Link>
            ) : (
              <Link to="/login" className="block">
                <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-red-600">
                  Login
                  <FaArrowRight className="ml-2 inline-block" />
                </button>
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
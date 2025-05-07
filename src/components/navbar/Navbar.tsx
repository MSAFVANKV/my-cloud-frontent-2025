import { useMainContext } from "@/providers/context/context";
import { useAppSelector } from "@/providers/redux/hook";
import { CloudRain, Menu, Search, Settings, X } from "lucide-react";
import { useState } from "react";
import Loader from "../global/loader";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(currentUser, "currentUser");

  const { menuOpen, setMenuOpen } = useMainContext();

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="md:hidden mr-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-500"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <CloudRain className="text-[var(--mainColor)] h-8 w-8" />
         <Link to={'/'} >
         <h1 className="ml-2 text-xl font-bold text-[var(--mainColor)]">
            My Cloud
          </h1>
         </Link>
        </div>

        <div className="relative max-w-md w-full mx-4 hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Search files and folders"
          />
        </div>

        <div className="flex items-center">
          <button className="text-gray-600 hover:text-blue-600 ml-4">
            <Settings className="h-6 w-6" />
          </button>
          {/* avatar section */}
          <div className="ml-4 h-8 w-8 overflow-hidden rounded-full bg-blue-600 text-white flex items-center justify-center">
            <span className="font-bold">
              {isLoading && <Loader state={isLoading} />}
              {currentUser?.avatar && !error ? (
                <img
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  onLoad={() => setIsLoading(false)} // Hide loader when image loads
                  onError={() => {
                    setIsLoading(false); // Hide loader if image fails
                    setError(true); // Show fallback text
                  }}
                />
              ) : (
                <span className="font-bold">
                  {currentUser?.userName?.charAt(0).toUpperCase() || "?"}
                </span>
              )}
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

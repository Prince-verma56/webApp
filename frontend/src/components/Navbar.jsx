import { Leaf } from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/stepper", label: "Stepper" },
  
    { path: "/music", label: "Music" },
    { path: "/doctor", label: "Doctor" },
    { path: "/blogs", label: "Blogs" },
    { path: "/music-therapy", label: "Music Therapy" },
    { path: "/mood-tracker", label: "Mood Tracker" },
    { path: "/ai-chat", label: "AI Chat" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-[#f3f3f6]/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-4xl font-bold text-[#776982] hover:opacity-80 transition flex items-center gap-2"
        >
          <Leaf size={40}/>
          Sahaj
        </button>

        {/* Nav Links */}
        <ul className="flex space-x-6 ">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 font-medium ${
                    isActive
                      ? "text-[#776982] border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-500"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <div className="text-2xl font-extrabold tracking-tight text-indigo-700">
          Keepline
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-large transition ${
                isActive
                  ? "text-indigo-700 font-bold border-b-2 border-indigo-700 pb-1"
                  : "text-gray-600 hover:text-indigo-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/lines"
            className={({ isActive }) =>
              `text-sm font-large transition ${
                isActive
                  ? "text-indigo-700 font-bold border-b-2 border-indigo-700 pb-1"
                  : "text-gray-600 hover:text-indigo-600"
              }`
            }
          >
            Lines
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

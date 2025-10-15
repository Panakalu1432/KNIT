import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  const handleLogout = () => { logout(); nav('/login') }

  return (
    <nav className="bg-white shadow fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl text-indigo-600">Knit App</Link>
        <div className="flex items-center space-x-3 sm:space-x-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
              <Link to="/entities" className="text-gray-700 hover:text-indigo-600">Entities</Link>
              <Link to="/profile" className="text-gray-700 hover:text-indigo-600">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-indigo-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

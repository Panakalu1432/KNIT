import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Dashboard</h1>
      <p className="mb-6 text-gray-600 text-lg">Welcome, <strong>{user?.email}</strong></p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/entities" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">Manage Entities</Link>
        <Link to="/profile" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">Profile</Link>
      </div>
    </div>
  )
}

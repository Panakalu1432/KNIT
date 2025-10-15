import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Profile</h2>
        <p className="text-gray-700 mb-2"><strong>Email:</strong> {user?.email}</p>
        <p className="text-gray-700"><strong>Role:</strong> {user?.role}</p>
      </div>
    </div>
  )
}

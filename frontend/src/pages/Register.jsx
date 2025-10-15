import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/FormInput'

export default function Register() {
  const { register } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      await register(form.email, form.password)
      nav('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="flex pt-20 items-center justify-center min-w-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Register</h2>
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        <form onSubmit={submit} className="space-y-4">
          <FormInput label="Email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
          <FormInput label="Password" name="password" type="password" value={form.password} onChange={onChange} placeholder="password" />
          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Register</button>
        </form>
      </div>
    </div>
  )
}

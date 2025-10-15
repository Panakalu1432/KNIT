import React from 'react'

export default function FormInput({ label, type='text', value, onChange, name, placeholder }){
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded text-black border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 p-2"
      />
    </label>
  )
}
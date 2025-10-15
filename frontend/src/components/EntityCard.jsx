import React from 'react'

export default function EntityCard({ item, onEdit, onDelete }){
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold text-black text-lg">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => onEdit(item)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
        <button onClick={() => onDelete(item.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
      </div>
    </div>
  )
}

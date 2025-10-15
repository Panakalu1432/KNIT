import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import EntityCard from '../components/EntityCard'

export default function EntityPage(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', description: '', price: 0 })
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)

  const fetchItems = async () => {
    try {
      const res = await api.get('/products')
      setItems(res.data)
    } catch (err) { console.error(err) }
  }

  useEffect(() => { fetchItems() }, [])

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      if (editing) {
        await api.put(`/products/${editing.id}`, form)
      } else {
        await api.post('/products', form)
      }
      setForm({ name: '', description: '', price: 0 })
      setEditing(null)
      fetchItems()
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed')
    }
  }

  const onEdit = item => setEditing(item)
  const onDelete = async id => { await api.delete(`/products/${id}`); fetchItems() }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 mt-16 min-w-screen">

      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Entities</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <form
  onSubmit={submit}
  className="bg-white p-6 rounded-xl shadow mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
>
  {/* Name */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium mb-1">Name</label>
    <input
      value={form.name}
      onChange={e => setForm({ ...form, name: e.target.value })}
      placeholder="Enter name"
      className="p-2 border border-gray-400 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Description */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium mb-1">Description</label>
    <input
      value={form.description}
      onChange={e => setForm({ ...form, description: e.target.value })}
      placeholder="Enter description"
      className="p-2 border border-gray-400 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Price */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium mb-1">Price</label>
    <input
      type="number"
      value={form.price}
      onChange={e => setForm({ ...form, price: Number(e.target.value) })}
      placeholder="Enter price"
      className="p-2 border border-gray-400 rounded text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Button */}
  <div className="flex items-end">
    <button
      type="submit"
      className="bg-indigo-600 text-white py-2 px-4 rounded w-full hover:bg-indigo-700 transition col-span-full sm:col-span-1"
    >
      {editing ? 'Update' : 'Create'}
    </button>
  </div>
</form>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(it => (
          <EntityCard key={it.id} item={it} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

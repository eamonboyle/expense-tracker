'use client'

import React, { useState } from 'react'
import { Item } from './types';
import { useExpenseItems } from './services/useExpenseItems';
import badWords from 'bad-words';

const filter = new badWords();

export default function Home() {
  const { items, total, addItem, deleteItem } = useExpenseItems();
  const [newItem, setNewItem] = useState<Item>({ id: '', name: '', price: 0 });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Filter out bad words
    if (filter.isProfane(newItem.name)) {
      alert('Please do not use profanity');
      return;
    }

    addItem(newItem);
    setNewItem({ id: '', name: '', price: 0 });
  }

  const handleDelete = async (id: string) => {
    deleteItem(id);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>

        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input value={newItem.name} onFocus={(e) => e.target.select()} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="col-span-3 p-3 border" type="text" name="" placeholder="Enter Item" />
            <input value={newItem.price} onFocus={(e) => e.target.select()} onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })} className="col-span-2 p-3 border mx-3" type="number" name="" placeholder="£" />
            <button onClick={handleSubmit} className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl transition-all" type="submit">+</button>
          </form>

          <ul>
            {items.map((item) => (
              <li key={item.id} className='my-4 w-full flex justify-between bg-slate-950'>
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>{item.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</span>
                </div>
                <button onClick={() => handleDelete(item.id)} className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'>X</button>
              </li>
            ))}
          </ul>

          {items.length < 1 ? ('') : (
            <div className='flex justify-between p-3'>
              <span>Total</span>
              <span>{total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

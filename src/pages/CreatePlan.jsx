import React, { useState } from 'react';

export default function CreatePlan() {
  const [form, setForm] = useState({ plan: '', location: '', vibe: '', privacy: 'Public', date: '', time: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-extrabold text-[#ff5500] mb-5 text-center">Make A Plan</h1>

      <div className="space-y-4">
        <input name="plan" value={form.plan} onChange={handleChange} placeholder="What’s the plan..." className="w-full h-12 rounded-xl border border-[#ff5500]/40 px-4 bg-white" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full h-12 rounded-xl border border-[#ff5500]/40 px-4 bg-white" />
        <input name="vibe" value={form.vibe} onChange={handleChange} placeholder="Vibe" className="w-full h-12 rounded-xl border border-[#ff5500]/40 px-4 bg-white" />
        <select name="privacy" value={form.privacy} onChange={handleChange} className="w-full h-12 rounded-xl border border-[#ff5500]/40 px-4 bg-white">
          <option>Public</option>
          <option>Friends</option>
          <option>Private</option>
        </select>
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full h-12 rounded-xl border border-[#ff5500]/40 px-4 bg-white" />
        <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full h-12 rounded-xl border border-[#ff5500]/40 px-4 bg-white" />
      </div>

      <button className="mt-6 w-full h-12 rounded-xl bg-[#ff5500] text-white font-semibold">Post</button>
    </div>
  );
}

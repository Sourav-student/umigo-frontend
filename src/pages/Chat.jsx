import React, { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Farmhouse mein hoon.', from: 'them' },
    { id: 2, text: 'No network 😎', from: 'them' },
    { id: 3, text: 'You and your farmhouse.', from: 'me' },
    { id: 4, text: 'Planning a party again?', from: 'me' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), text: input.trim(), from: 'me' }]);
    setInput('');
  };

  return (
    <div className="max-w-md mx-auto h-[calc(100vh-120px)] px-4 py-4 flex flex-col">
      <div className="flex items-center gap-3 text-[#ff5500] mb-3">
        <button aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <div className="font-semibold">Selmon Bhai</div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map(m => (
          <div key={m.id} className={['max-w-[75%] rounded-2xl px-4 py-2', m.from==='me' ? 'ml-auto bg-white border border-[#ff5500]/30' : 'bg-[#ffd3bf]'].join(' ')}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Message..." className="flex-1 h-12 rounded-2xl border border-[#ff5500]/40 px-4 bg-white" />
        <button onClick={send} className="h-12 w-12 rounded-full bg-[#ff5500] text-white grid place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function App() {
  const [chatId, setChatId] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const sendMessage = async () => {
    if (!chatId || !message) {
      alert('Please provide Chat ID and Message');
      return;
    }

    try {
      const res = await fetch('/.netlify/functions/telegram-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Send Telegram Message</h1>
      <input
        type="text"
        placeholder="Chat ID"
        value={chatId}
        onChange={(e) => setChatId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>

      {response && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}

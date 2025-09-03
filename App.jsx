import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io();

export default function App() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (!msg) return;
    socket.emit("send-message", msg);
    setChat((prev) => [...prev, `You: ${msg}`]);
    setMsg("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>WhatsGo 💬</h1>
      <div style={{ border: "1px solid #ddd", height: "200px", overflowY: "auto", padding: "10px" }}>
        {chat.map((c, i) => (
          <div key={i}>{c}</div>
        ))}
      </div>
      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

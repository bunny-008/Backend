import React, { useState, useEffect } from "react";
import API_BASE from "./config";

function App() {
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState("");

  const login = async () => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test", password: "1234" }),
    });
    const data = await res.json();
    setToken(data.access_token);
  };

  const getBooks = async () => {
    const res = await fetch(`${API_BASE}/books`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <div>
      <h1>📚 Smart Library</h1>
      <button onClick={getBooks}>Get Books</button>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.title} by {b.author} {b.available ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

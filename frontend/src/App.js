import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, repoUrl })
    });
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div style={{ padding: 50 }}>
      <h1>User Hosting Dashboard</h1>
      <input 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      /><br/><br/>
      <input 
        placeholder="GitHub Repo URL" 
        value={repoUrl} 
        onChange={(e) => setRepoUrl(e.target.value)} 
      /><br/><br/>
      <button onClick={handleSubmit}>Submit Project</button>
      <p>{message}</p>
    </div>
  );
}

export default App;

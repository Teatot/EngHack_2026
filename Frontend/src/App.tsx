import React from 'react';
import { GoogleGenAI } from '@google/genai';


async function callGenAI() {
  const api_key = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenAI( {apiKey: api_key} );
  
  const response = await genAI.models.generateContent({
    model: 'gemini-3.1-flash-lite-preview',
    contents: "Explain how AI can be used in a Chrome extension.",
  });
  console.log(response.text);
};

const APIButton: React.FC = () => {
  const handleClick = async () => {
    console.log('Button clicked!');
    await callGenAI();
  };

  return (
    <button onClick={handleClick}>Test API Button</button>
  )
};

export default function App() {
  return (
<<<<<<< HEAD
    <section className="app-card">
      <div className="app-card__header">
        <p className="eyebrow">Injected App</p>
        <span className="status-pill">API Ready</span>
      </div>
      <h1>Classic Full Stack App</h1>
      <p className="lead">
        This is the React application rendered inside the Chrome extension
        shell.
      </p>
        <APIButton />
      <div className="app-grid">
        <article className="panel">
          <h2>Frontend</h2>
          <p>Vite and React power the extension popup experience.</p>
        </article>
        <article className="panel">
          <h2>Backend</h2>
          <p>Express and TypeScript expose the API your extension can call.</p>
        </article>
      </div>
=======
    <section>
      <div>Content</div>
>>>>>>> 480419b (refactor(backend): Add new libraries and basic framework for uploader route)
    </section>
  );
}

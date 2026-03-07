import { useState } from "react";
import { Home } from "./pages/Home";

interface BackendResult {
  recommendation: string;
  links: string[];
  linkNum: number;
}


export default function App() {
  const [response, setResponse] = useState<BackendResult | null>(null);

  async function handleClick() {
    const res = await fetch("http://localhost:3000/api/prompt-gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "I want to get good skills in web development. Give me a recommendation and provide links to resources I can use.",
      }),
    });

    if (!res.ok) {
      console.error("Request failed", res.status);
      return;
    }

    const data = (await res.json()) as { result: BackendResult };
    console.log("Backend result:", data.result);
    setResponse(data.result);
  }
  
  return (
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

      <button onClick={handleClick}>Get study recommendation</button>

      {response && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Recommendation</h2>
          <p>{response.recommendation}</p>

          {response.links.length > 0 && (
            <div style={{ marginTop: "0.5rem" }}>
              <h3>Links ({response.linkNum})</h3>
              <ul>
                {response.links.map((link) => (
                  <li key={link}>
                    <a href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

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
    </section>
  );
}
import { useState } from "react";
import { BackendResult, ScrapedPage } from "./types/general_interfaces";

export default function App() {
  const [response, setResponse] = useState<BackendResult | null>(null);
  const [scrapeResult, setScrapeResult] = useState<ScrapedPage | null>(null);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [isScraping, setIsScraping] = useState(false);

  async function handleClick() {
    const res = await fetch("http://localhost:3000/api/prompt-gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question:
          "I want to get good skills in web development. Give me a recommendation and provide links to resources I can use.",
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

  async function handleScrapeTab() {
    if (isScraping) return;
  
    setScrapeError(null);
    setIsScraping(true);
    setScrapeResult(null);
  
    try {
      if (!chrome?.tabs || !chrome?.scripting) {
        throw new Error("Chrome extension APIs unavailable.");
      }
  
      const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
  
      if (!activeTab?.id) {
        throw new Error("No active tab found.");
      }
  
      if (!activeTab.url || activeTab.url.startsWith("chrome://")) {
        throw new Error("Cannot scrape this page.");
      }
  
      const results = await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["scrapeDOM.js"],
      });
  
      const result = await chrome.tabs.sendMessage(activeTab.id, {
        type: "SCRAPE_PAGE",
      });
  
      if (!result) {
        throw new Error("No scrape result returned.");
      }
  
      setScrapeResult(result);
      
      // Send the scraped page data to the backend for logging
      try {
        await fetch("http://localhost:3000/api/scrape/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result),
        });
      } catch (networkError) {
        console.error("Failed to send scrape result to backend:", networkError);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown scraping error";
      console.error("Scrape failed:", message);
      setScrapeError(message);
    } finally {
      setIsScraping(false);
    }
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

      <button
        style={{ marginLeft: "0.75rem" }}
        onClick={handleScrapeTab}
        disabled={isScraping}
      >
        {isScraping ? "Scraping current tab..." : "Scrape current tab"}
      </button>

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

      {scrapeError && (
        <div style={{ marginTop: "1rem", color: "red" }}>{scrapeError}</div>
      )}

      {scrapeResult && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Scraped Current Tab</h2>
          
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
export default function App() {
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

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ExtensionShell from "./ExtensionShell";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ExtensionShell>
      <App />
    </ExtensionShell>
  </React.StrictMode>
);

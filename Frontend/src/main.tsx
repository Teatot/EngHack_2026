import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import ExtensionShell from "./ExtensionShell";
import "./index.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <ExtensionShell>
        <App />
      </ExtensionShell>
    </HashRouter>
  </React.StrictMode>
);

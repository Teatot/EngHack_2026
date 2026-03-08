import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ExtensionShell from "./ExtensionShell";
import "./index.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ExtensionShell>
        <App />
      </ExtensionShell>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

const rootElement = document.getElementById("root");

// Use hydrate if the HTML is pre-rendered (from react-snap)
// Otherwise use render for development
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

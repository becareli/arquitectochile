import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error('The application root element "#root" was not found.');
}

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

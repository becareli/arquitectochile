import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router as WouterRouter } from "wouter";
import App from "./App";
import { resetSSRHead, ssrHead } from "./hooks/useSEO";

export function render(url: string) {
  resetSSRHead();
  const helmetContext: Record<string, unknown> = {};
  const html = renderToString(
    <WouterRouter ssrPath={url}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </WouterRouter>,
  );

  return {
    html,
    head: { ...ssrHead },
    helmet: helmetContext,
  };
}

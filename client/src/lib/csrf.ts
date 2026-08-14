/**
 * CSRF helper — reads the double-submit cookie set by the server
 * and returns it as the x-csrf-token header value.
 * The cookie is httpOnly:false so JS can read it.
 */
export function getCsrfToken(): string {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrf-token="));
  return match ? match.split("=")[1] : "";
}

/**
 * Returns the headers object augmented with x-csrf-token.
 * Pass existing headers to merge with; pass contentType to add Content-Type.
 */
export function csrfHeaders(contentType?: string): Record<string, string> {
  const h: Record<string, string> = { "x-csrf-token": getCsrfToken() };
  if (contentType) h["Content-Type"] = contentType;
  return h;
}

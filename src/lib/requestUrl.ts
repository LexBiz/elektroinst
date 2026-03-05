export function getPublicBaseUrl(request: Request): string {
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const ref = new URL(referer);
      if (ref.protocol === "https:" || ref.protocol === "http:") {
        return `${ref.protocol}//${ref.host}`;
      }
    } catch {
      // Ignore invalid referer header.
    }
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const parsed = new URL(origin);
      if (parsed.protocol === "https:" || parsed.protocol === "http:") {
        return `${parsed.protocol}//${parsed.host}`;
      }
    } catch {
      // Ignore invalid origin header.
    }
  }

  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || url.host;
  const proto = forwardedProto || url.protocol.replace(":", "");
  return `${proto}://${host}`;
}

export function toPublicUrl(request: Request, pathname: string): URL {
  const base = getPublicBaseUrl(request);
  return new URL(pathname, base);
}


import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Self-ping každých 10 minut (aby Render free tier neusnul)
const RENDER_URL = typeof process !== "undefined" ? process.env?.RENDER_URL : undefined;
if (RENDER_URL) {
  setInterval(() => {
    fetch(`${RENDER_URL}/api/ping`)
      .then(() => console.log(`✅ Ping OK — ${new Date().toLocaleTimeString()}`))
      .catch((err) => console.log("❌ Ping failed:", err.message));
  }, 10 * 60 * 1000); // 10 minut
  console.log("🏓 Self-ping aktivní (každých 10 min)");
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    // Respond to /api/ping with a quick health check
    const url = new URL(request.url);
    if (url.pathname === "/api/ping") {
      return new Response(
        JSON.stringify({ status: "ok", timestamp: Date.now() }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

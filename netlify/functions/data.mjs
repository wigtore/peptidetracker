import { getStore } from "@netlify/blobs";

// Simple shared-storage API for the Peptide Tracker.
// Data is stored under a "household code" that both devices share.
// GET  /api/data?k=CODE   -> returns the saved JSON (or null)
// PUT  /api/data?k=CODE   -> saves the request body as the new JSON

export default async (req) => {
  const url = new URL(req.url);
  const code = (url.searchParams.get("k") || "").trim();

  if (code.length < 4 || code.length > 64) {
    return new Response(JSON.stringify({ error: "Household code must be 4-64 characters." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const store = getStore("peptide-tracker");
  const key = "data-" + code;

  if (req.method === "GET") {
    const val = await store.get(key);
    return new Response(val || "null", {
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  }

  if (req.method === "PUT" || req.method === "POST") {
    const body = await req.text();
    if (body.length > 900_000) {
      return new Response(JSON.stringify({ error: "Payload too large." }), { status: 413 });
    }
    try {
      const parsed = JSON.parse(body);
      if (!parsed || typeof parsed !== "object" || !parsed.profiles) throw new Error("bad shape");
    } catch {
      return new Response(JSON.stringify({ error: "Invalid data." }), { status: 400 });
    }
    await store.set(key, body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/data" };

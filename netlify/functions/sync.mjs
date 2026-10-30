import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, no-cache, must-revalidate"
};

function keyToBlobId(rawKey) {
  const normalized = String(rawKey || "").trim();
  if (!normalized || normalized.length < 3) return null;
  const hash = crypto.createHash("sha256").update(normalized).digest("hex");
  return `u_${hash}`;
}

export default async (req) => {
  try {
    const url = new URL(req.url);
    const headerKey = req.headers.get("x-sync-key") || url.searchParams.get("key") || "";
    const blobId = keyToBlobId(headerKey);

    if (!blobId) {
      return new Response(
        JSON.stringify({ ok: false, error: "Informe uma chave de sincronização com pelo menos 3 caracteres." }),
        { status: 400, headers: HEADERS }
      );
    }

    const store = getStore("qdequestao_sync");

    if (req.method === "GET") {
      const data = await store.get(blobId, { type: "json" });
      if (!data) {
        return new Response(
          JSON.stringify({ ok: true, empty: true, state: null }),
          { status: 200, headers: HEADERS }
        );
      }
      return new Response(
        JSON.stringify({ ok: true, empty: false, state: data }),
        { status: 200, headers: HEADERS }
      );
    }

    if (req.method === "POST") {
      const body = await req.json();
      if (!body || typeof body !== "object" || !Array.isArray(body.questions)) {
        return new Response(
          JSON.stringify({ ok: false, error: "Formato de estado inválido." }),
          { status: 400, headers: HEADERS }
        );
      }
      await store.setJSON(blobId, body);
      return new Response(
        JSON.stringify({ ok: true, updatedAt: body.updatedAt || Date.now() }),
        { status: 200, headers: HEADERS }
      );
    }

    return new Response(
      JSON.stringify({ ok: false, error: "Método não suportado." }),
      { status: 405, headers: HEADERS }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) }),
      { status: 500, headers: HEADERS }
    );
  }
};

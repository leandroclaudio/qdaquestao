import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, no-cache, must-revalidate"
};

// Chaves novas precisam ter pelo menos 16 caracteres. Chaves curtas antigas
// continuam funcionando só enquanto já tiverem dados salvos, para dar tempo
// de migrar pelo app.
const MIN_KEY_LENGTH = 16;
const MAX_KEY_LENGTH = 200;
const MAX_BODY_BYTES = 5 * 1024 * 1024;

const reply = (status, obj) => new Response(JSON.stringify(obj), { status, headers: HEADERS });

function keyToBlobId(normalized) {
  const hash = crypto.createHash("sha256").update(normalized).digest("hex");
  return `u_${hash}`;
}

export default async (req) => {
  try {
    // A chave vem só pelo cabeçalho, nunca pela URL (URLs acabam em logs).
    const rawKey = String(req.headers.get("x-sync-key") || "").trim();
    if (!rawKey || rawKey.length > MAX_KEY_LENGTH) {
      return reply(400, { ok: false, error: "Chave de sincronização ausente ou inválida." });
    }

    const store = getStore("qdequestao_sync");
    const blobId = keyToBlobId(rawKey);
    const weak = rawKey.length < MIN_KEY_LENGTH;

    if (weak) {
      const existing = await store.getMetadata(blobId);
      if (!existing) {
        return reply(400, {
          ok: false,
          code: "weak_key",
          error: `Chave curta demais ou desativada. Use uma chave com pelo menos ${MIN_KEY_LENGTH} caracteres (o botão 🎲 gera uma).`
        });
      }
    }

    if (req.method === "GET") {
      const data = await store.get(blobId, { type: "json" });
      return reply(200, { ok: true, empty: !data, state: data || null, weakKey: weak });
    }

    if (req.method === "POST") {
      const declared = Number(req.headers.get("content-length") || 0);
      if (declared > MAX_BODY_BYTES) {
        return reply(413, { ok: false, error: "Dados grandes demais para sincronizar." });
      }
      const text = await req.text();
      if (text.length > MAX_BODY_BYTES) {
        return reply(413, { ok: false, error: "Dados grandes demais para sincronizar." });
      }
      let body;
      try { body = JSON.parse(text); } catch { body = null; }
      if (!body || typeof body !== "object" || !Array.isArray(body.questions)) {
        return reply(400, { ok: false, error: "Formato de estado inválido." });
      }
      await store.setJSON(blobId, body);
      return reply(200, { ok: true, updatedAt: body.updatedAt || Date.now(), weakKey: weak });
    }

    if (req.method === "DELETE") {
      await store.delete(blobId);
      return reply(200, { ok: true, deleted: true });
    }

    return reply(405, { ok: false, error: "Método não suportado." });
  } catch (err) {
    return reply(500, { ok: false, error: String(err && err.message ? err.message : err) });
  }
};

const SYSTEME_IO_API_BASE = "https://api.systeme.io/api";

interface SystemeIoContactPayload {
  email: string;
  firstName?: string;
  fields?: Array<{ slug: string; value: string }>;
  tags?: string[];
}

interface SystemeIoResult {
  ok: boolean;
  contactId?: number;
  error?: string;
}

interface SystemeIoContactRecord {
  id: number;
  firstName?: string;
  tags?: Array<{ name: string }>;
  fields?: Array<{ slug: string; value: string }>;
}

function getApiKey(): string | undefined {
  return process.env.SYSTEME_IO_API_KEY;
}

export function buildTags(opts: {
  source: "contacto" | "calculadora" | "otro";
  classification: "VIP" | "NUEVO" | string;
  serviceInterest?: string;
}): string[] {
  const tags: string[] = [];

  tags.push(opts.source);

  if (opts.classification === "VIP") {
    tags.push("vip");
  } else {
    tags.push("nuevo");
  }

  if (opts.serviceInterest) {
    const normalised = opts.serviceInterest
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50);
    if (normalised) {
      tags.push(normalised);
    }
  }

  return tags;
}

export async function upsertSystemeIoContact(opts: {
  email: string;
  firstName: string;
  tags: string[];
  source?: string;
}): Promise<SystemeIoResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.log("ℹ️ SYSTEME_IO_API_KEY no configurado — sincronización omitida");
    return { ok: false, error: "SYSTEME_IO_API_KEY not configured" };
  }

  const payload: SystemeIoContactPayload = {
    email: opts.email,
    firstName: opts.firstName,
    tags: opts.tags,
  };

  try {
    const response = await fetch(`${SYSTEME_IO_API_BASE}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = (await response.json()) as { id?: number };
      console.log(`✅ Systeme.io: contacto creado [${opts.email}] id=${data.id ?? "?"}`);
      return { ok: true, contactId: data.id };
    }

    const errText = await response.text();

    if (response.status === 409 || (response.status === 422 && errText.includes("ya se ha utilizado"))) {
      console.log(`ℹ️ Systeme.io: contacto ya existe [${opts.email}], actualizando`);
      return await updateExistingContact(opts, apiKey);
    }

    console.warn(`⚠️ Systeme.io: respuesta inesperada ${response.status} — ${errText}`);
    return { ok: false, error: `HTTP ${response.status}: ${errText}` };
  } catch (err: any) {
    console.warn(`⚠️ Systeme.io: error de red — ${err.message}`);
    return { ok: false, error: err.message };
  }
}

async function updateExistingContact(
  opts: { email: string; firstName: string; tags: string[]; source?: string },
  apiKey: string
): Promise<SystemeIoResult> {
  try {
    const searchRes = await fetch(
      `${SYSTEME_IO_API_BASE}/contacts?email=${encodeURIComponent(opts.email)}`,
      { headers: { "X-API-Key": apiKey } }
    );

    if (!searchRes.ok) {
      const errText = await searchRes.text();
      return { ok: false, error: `Search failed: HTTP ${searchRes.status} — ${errText}` };
    }

    const searchData = (await searchRes.json()) as { items?: SystemeIoContactRecord[] };
    const contact = searchData.items?.[0];
    if (!contact) {
      return { ok: false, error: "Contact not found after 409" };
    }

    const existingTagNames: string[] = (contact.tags ?? []).map((t) => t.name);
    const mergedTags = Array.from(new Set([...existingTagNames, ...opts.tags]));

    const patchPayload: Partial<SystemeIoContactPayload> = {
      firstName: opts.firstName,
      tags: mergedTags,
    };

    const patchRes = await fetch(`${SYSTEME_IO_API_BASE}/contacts/${contact.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(patchPayload),
    });

    if (patchRes.ok) {
      console.log(`✅ Systeme.io: contacto actualizado [${opts.email}] id=${contact.id} tags=[${mergedTags.join(",")}]`);
      return { ok: true, contactId: contact.id };
    }

    const errText = await patchRes.text();
    return { ok: false, error: `PATCH failed: HTTP ${patchRes.status} — ${errText}` };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

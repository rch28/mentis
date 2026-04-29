const CRM_ENDPOINT =
  "https://famous.ai/api/crm/69ecc440c8cde95900318958/subscribe";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribePayload {
  email?: unknown;
  name?: unknown;
  source?: unknown;
  tags?: unknown;
}

export async function POST(request: Request) {
  let payload: SubscribePayload;

  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const source =
    typeof payload.source === "string" ? payload.source.trim() : "newsletter";
  const tags = Array.isArray(payload.tags)
    ? payload.tags.filter((tag): tag is string => typeof tag === "string")
    : ["newsletter"];

  if (!emailPattern.test(email)) {
    return Response.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );
  }

  let response: Response;

  try {
    response = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        source,
        tags,
      }),
    });
  } catch {
    return Response.json(
      { error: "Newsletter provider is unavailable." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return Response.json(
      { error: "Newsletter provider rejected the request." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

/**
 * Server-only helpers for persisting Contact page submissions to Google
 * Sheets — one sheet for volunteer sign-ups, a separate one for general
 * queries, so the two can be triaged independently.
 *
 * This module intentionally supports both process.env and Vite's server-side
 * import.meta.env. That matters for TanStack Start/Nitro deployments where
 * the server bundle can receive build/runtime configuration through either
 * path. Only the webhook URLs have safe code fallbacks; secrets MUST remain
 * deployment secrets and are never committed to the repository.
 *
 * This module must only ever be imported from server code.
 */

export type ContactSubmissionKind = "volunteer" | "query";

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}

const CONFIG = {
  volunteer: {
    urlEnv: "VOLUNTEER_SHEET_WEBHOOK_URL",
    secretEnv: "VOLUNTEER_SHEET_WEBHOOK_SECRET",
    // Web App IDs are not authentication secrets. The actual write
    // credential remains SHEET_SECRET in the server environment.
    fallbackUrl:
      "https://script.google.com/macros/s/AKfycbxE3eHFQUPjUKHGQKjNbfk-u3kkFHw7MFLED9QHSfCVbp7lOfp-BVhH7jhN3ZDPOwCq_w/exec",
  },
  query: {
    urlEnv: "QUERY_SHEET_WEBHOOK_URL",
    secretEnv: "QUERY_SHEET_WEBHOOK_SECRET",
    fallbackUrl:
      "https://script.google.com/macros/s/AKfycbzYoPT3D7UZCquslsLfBMeDL-7LwUrPcAyFqvkKPmh8P2q3TTBhQZSvxmXBJrDCPbg/exec",
  },
} as const;

export class SheetNotConfiguredError extends Error {
  constructor(kind: ContactSubmissionKind) {
    super(
      `Google Sheet isn't connected yet for ${kind} submissions. Configure ${CONFIG[kind].secretEnv} in the server environment (see GOOGLE_SHEET_CONTACT_SETUP.md).`,
    );
    this.name = "SheetNotConfiguredError";
  }
}

/**
 * Read a server configuration value from both runtime Node env and Vite's
 * server-side env. Never use a VITE_ variable for secrets.
 */
function getServerEnv(name: string): string | undefined {
  const runtimeValue =
    typeof process !== "undefined" ? process.env?.[name] : undefined;
  if (runtimeValue?.trim()) return runtimeValue.trim();

  const viteValue =
    typeof import.meta !== "undefined" ? (import.meta.env?.[name] as string | undefined) : undefined;
  return viteValue?.trim() || undefined;
}

function getWebhookUrl(kind: ContactSubmissionKind): string | undefined {
  return getServerEnv(CONFIG[kind].urlEnv) || CONFIG[kind].fallbackUrl;
}

function getWebhookSecret(kind: ContactSubmissionKind): string | undefined {
  return getServerEnv(CONFIG[kind].secretEnv);
}

export function isContactSheetConfigured(kind: ContactSubmissionKind): boolean {
  // The URL always has a safe fallback. The secret is optional because the
  // Apps Script setup explicitly supports deployments without SHEET_SECRET.
  return Boolean(getWebhookUrl(kind));
}

/** Appends one submission row to the relevant sheet. Throws on any failure. */
export async function appendContactSubmissionToSheet(
  kind: ContactSubmissionKind,
  submission: ContactSubmission,
): Promise<void> {
  const url = getWebhookUrl(kind);
  if (!url) throw new SheetNotConfiguredError(kind);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(getWebhookSecret(kind)
          ? { secret: getWebhookSecret(kind) }
          : {}),
        ...submission,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(
        `The ${kind} Google Sheet webhook timed out after 15 seconds. Check the Apps Script deployment and try again.`,
      );
    }
    throw new Error(
      `Couldn't reach the ${kind} Google Sheet webhook: ${message}`,
    );
  } finally {
    clearTimeout(timeout);
  }

  const responseText = await response.text();
  let data: { success?: boolean; error?: string } | null = null;

  try {
    data = responseText
      ? (JSON.parse(responseText) as { success?: boolean; error?: string })
      : null;
  } catch {
    // Keep the raw response below so an HTML/proxy error is diagnosable.
  }

  if (!response.ok) {
    const detail = data?.error || responseText.slice(0, 300) || "No response body.";
    throw new Error(
      `${kind} Google Sheet webhook responded with HTTP ${response.status}: ${detail}`,
    );
  }

  if (!data?.success) {
    const detail = data?.error || responseText.slice(0, 300) || "No response body.";
    throw new Error(
      `${kind} Google Sheet webhook did not confirm the write: ${detail}`,
    );
  }
}

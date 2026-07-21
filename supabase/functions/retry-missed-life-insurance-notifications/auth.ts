// Authorization decision for the retry-missed-life-insurance-notifications
// scheduled function, extracted as a pure, side-effect-free, runtime-agnostic
// module so it can be unit-tested deterministically (see auth.test.ts).
//
// Only the pg_cron job (presenting CRON_SECRET) or internal edge functions
// (presenting the service-role key) may invoke the caller. The publishable
// anon key is public and must NEVER authorize privileged retries.
//
// Uses only Web-standard APIs (Web Crypto + TextEncoder) so it runs identically
// under Deno (production) and Node (tests).

export interface AuthInput {
  /** Raw value of the incoming `Authorization` header, if any. */
  authHeader: string | null;
  /** Raw value of the incoming `x-cron-secret` header, if any. */
  cronSecretHeader: string | null;
  /** Server-side `SUPABASE_SERVICE_ROLE_KEY`, if configured. */
  serviceRoleKey: string | undefined;
  /** Server-side `CRON_SECRET`, if configured. */
  cronSecret: string | undefined;
}

/**
 * Constant-time string comparison.
 *
 * Both inputs are first hashed with SHA-256 (yielding fixed 32-byte digests),
 * which removes any input-length side channel, then the digests are compared
 * with a branch-free XOR accumulator so the running time does not depend on
 * where the first differing byte occurs.
 */
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [digestA, digestB] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const bytesA = new Uint8Array(digestA);
  const bytesB = new Uint8Array(digestB);

  let diff = 0;
  for (let i = 0; i < bytesA.length; i++) {
    diff |= bytesA[i] ^ bytesB[i];
  }
  return diff === 0;
}

/**
 * Returns true only when the request presents a valid privileged credential.
 *
 * Fails closed:
 *   - An empty/whitespace-only presented credential never matches.
 *   - An empty/whitespace-only server-side secret is treated as unconfigured,
 *     so it can never be matched by an (also empty) presented value.
 *   - If neither server-side secret is configured, nothing is authorized.
 */
export async function isAuthorizedRequest(input: AuthInput): Promise<boolean> {
  const token = (input.authHeader ?? "").replace(/^Bearer\s+/i, "").trim();
  const cronHeader = (input.cronSecretHeader ?? "").trim();
  const serviceRoleKey = (input.serviceRoleKey ?? "").trim();
  const cronSecret = (input.cronSecret ?? "").trim();

  // Service-role key presented as a bearer token (internal edge-function calls).
  if (serviceRoleKey && token && (await timingSafeEqual(token, serviceRoleKey))) {
    return true;
  }

  // Cron secret presented either via the dedicated header or as a bearer token.
  if (cronSecret) {
    if (cronHeader && (await timingSafeEqual(cronHeader, cronSecret))) {
      return true;
    }
    if (token && (await timingSafeEqual(token, cronSecret))) {
      return true;
    }
  }

  return false;
}

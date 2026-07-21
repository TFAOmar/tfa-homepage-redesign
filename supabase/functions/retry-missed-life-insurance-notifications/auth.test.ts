// Deterministic, network-free tests for the cron/service-role authorization
// decision used by the retry-missed-life-insurance-notifications function.
//
// Runtime-agnostic: the module under test uses only Web-standard APIs
// (Web Crypto, TextEncoder), so these tests run under both Deno (production)
// and Node's built-in test runner (local gate):
//
//   node --experimental-strip-types --test supabase/functions/retry-missed-life-insurance-notifications/auth.test.ts
//
// No real secrets are used or printed — only obviously-fake fixtures below.
import { test } from "node:test";
import assert from "node:assert/strict";
import { isAuthorizedRequest } from "./auth.ts";

// Fake, non-sensitive fixtures. These are NOT real credentials.
const SERVICE_ROLE_KEY = "fake-service-role-key-AAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const CRON_SECRET = "fake-cron-secret-BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
// A structurally valid but anon-role JWT is still public and must NOT authorize.
const ANON_JWT =
  "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiJ9.ZmFrZS1zaWduYXR1cmUtbm90LXJlYWw";

test("authorized: service-role key via Authorization: Bearer", async () => {
  assert.equal(
    await isAuthorizedRequest({
      authHeader: `Bearer ${SERVICE_ROLE_KEY}`,
      cronSecretHeader: null,
      serviceRoleKey: SERVICE_ROLE_KEY,
      cronSecret: CRON_SECRET,
    }),
    true,
  );
});

test("authorized: cron secret via x-cron-secret header", async () => {
  assert.equal(
    await isAuthorizedRequest({
      authHeader: null,
      cronSecretHeader: CRON_SECRET,
      serviceRoleKey: SERVICE_ROLE_KEY,
      cronSecret: CRON_SECRET,
    }),
    true,
  );
});

test("authorized: cron secret via Authorization: Bearer", async () => {
  assert.equal(
    await isAuthorizedRequest({
      authHeader: `Bearer ${CRON_SECRET}`,
      cronSecretHeader: null,
      serviceRoleKey: SERVICE_ROLE_KEY,
      cronSecret: CRON_SECRET,
    }),
    true,
  );
});

test("unauthorized: anon JWT bearer", async () => {
  assert.equal(
    await isAuthorizedRequest({
      authHeader: `Bearer ${ANON_JWT}`,
      cronSecretHeader: null,
      serviceRoleKey: SERVICE_ROLE_KEY,
      cronSecret: CRON_SECRET,
    }),
    false,
  );
});

test("unauthorized: no credentials at all", async () => {
  assert.equal(
    await isAuthorizedRequest({
      authHeader: null,
      cronSecretHeader: null,
      serviceRoleKey: SERVICE_ROLE_KEY,
      cronSecret: CRON_SECRET,
    }),
    false,
  );
});

test("unauthorized: wrong cron secret", async () => {
  assert.equal(
    await isAuthorizedRequest({
      authHeader: null,
      cronSecretHeader: "totally-wrong-value",
      serviceRoleKey: SERVICE_ROLE_KEY,
      cronSecret: CRON_SECRET,
    }),
    false,
  );
});

test("unauthorized: empty presented header cannot match empty stored secret", async () => {
  // Fail closed: even if the server-side secret were somehow empty, an empty
  // presented credential must never authorize.
  assert.equal(
    await isAuthorizedRequest({
      authHeader: "Bearer ",
      cronSecretHeader: "",
      serviceRoleKey: "",
      cronSecret: "",
    }),
    false,
  );
});

test("unauthorized: whitespace-only cron secret is treated as unset", async () => {
  assert.equal(
    await isAuthorizedRequest({
      authHeader: null,
      cronSecretHeader: "   ",
      serviceRoleKey: SERVICE_ROLE_KEY,
      cronSecret: "   ",
    }),
    false,
  );
});

test("unauthorized: correct cron secret but no server secret configured", async () => {
  // If neither server-side secret is configured, nothing may authorize.
  assert.equal(
    await isAuthorizedRequest({
      authHeader: `Bearer ${CRON_SECRET}`,
      cronSecretHeader: CRON_SECRET,
      serviceRoleKey: undefined,
      cronSecret: undefined,
    }),
    false,
  );
});

test("unauthorized: near-miss secret (length equal, one char off)", async () => {
  const almost = CRON_SECRET.slice(0, -1) + "X";
  assert.equal(
    await isAuthorizedRequest({
      authHeader: null,
      cronSecretHeader: almost,
      serviceRoleKey: SERVICE_ROLE_KEY,
      cronSecret: CRON_SECRET,
    }),
    false,
  );
});

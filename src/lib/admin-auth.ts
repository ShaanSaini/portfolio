import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "admin_session";

function constantTimeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Derives the expected session token from ADMIN_PASSWORD. Throws if unset. */
function expectedSessionToken(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add it to your environment variables to enable the admin dashboard.",
    );
  }
  return createHmac("sha256", secret).update("admin-session").digest("hex");
}

export function verifyPassword(password: string): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  return constantTimeEqual(password, secret);
}

/** The cookie value to set on successful login. */
export function createSessionToken(): string {
  return expectedSessionToken();
}

/** Checks the current request's cookies for a valid admin session. */
export async function isAdminSession(): Promise<boolean> {
  try {
    const store = await cookies();
    const value = store.get(ADMIN_SESSION_COOKIE)?.value;
    if (!value) return false;
    return constantTimeEqual(value, expectedSessionToken());
  } catch {
    return false;
  }
}

import { SPARROW_SMS_TOKEN, SPARROW_SMS_IDENTITY } from "@env";

// The /api/send-otp backend generates the OTP and hands back { phone, text }
// instead of sending it itself — Sparrow rejects Vercel's outbound IP (see
// live-nepalmotor-com/lib/send-otp.ts), so delivery happens here, from the
// phone's own network, which Sparrow doesn't block.
const SPARROW_API = "https://api.sparrowsms.com/v2/sms/";

/** https://docs.sparrowsms.com/sms/examples_outgoing/ */
const SPARROW_ERROR_MESSAGES: Record<number, string> = {
  1001: "Sparrow SMS rejected the request: invalid IP address.",
  1002: "Sparrow SMS rejected the request: invalid token.",
  1003: "Sparrow SMS account is inactive.",
  1004: "Sparrow SMS account is inactive.",
  1005: "Sparrow SMS account has expired.",
  1006: "Sparrow SMS account has expired.",
  1012: "Sparrow SMS account has no credits available.",
};

export async function deliverOtpSms(
  phone: string,
  text: string
): Promise<{ ok: boolean; error?: string }> {
  let res: Response;
  try {
    res = await fetch(SPARROW_API, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        token: SPARROW_SMS_TOKEN,
        from: SPARROW_SMS_IDENTITY,
        to: phone,
        text,
      }).toString(),
    });
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Network error contacting Sparrow SMS.",
    };
  }

  const data = (await res.json().catch(() => ({}))) as {
    response_code?: number;
    response?: string;
  };

  if (!res.ok || data.response_code !== 200) {
    const known = data.response_code ? SPARROW_ERROR_MESSAGES[data.response_code] : undefined;
    return {
      ok: false,
      error: known ?? data.response ?? `Sparrow SMS request failed (${res.status}).`,
    };
  }

  return { ok: true };
}

import {
  CORS_HEADERS,
  handleBecomeADealerSubmission,
} from "@/lib/submit-become-a-dealer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleBecomeADealerSubmission(request);
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

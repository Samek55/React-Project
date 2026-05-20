import { handleBuyUsedCarsSubmission } from "@/lib/submit-buy-used-cars";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleBuyUsedCarsSubmission(request);
}

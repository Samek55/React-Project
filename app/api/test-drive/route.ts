import { handleTestDriveSubmission } from "@/lib/submit-test-drive";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleTestDriveSubmission(request);
}

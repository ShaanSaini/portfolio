import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin-auth";

// Client uploads (browser -> Blob directly) route through this handler only
// to mint a short-lived, constrained token — the file bytes never pass
// through this server, so there's no serverless body-size limit to worry
// about here.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdminSession())) {
          throw new Error("Unauthorized");
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 20 * 1024 * 1024, // 20MB
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 400 },
    );
  }
}

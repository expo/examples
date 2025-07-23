import { AwsClient } from "aws4fetch";

if (!process.env.AWS_BUCKET_NAME) {
  throw new Error("AWS_BUCKET_NAME is not set");
}
if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error("AWS_ACCESS_KEY_ID is not set");
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS_SECRET_ACCESS_KEY is not set");
}
if (!process.env.AWS_REGION) {
  throw new Error("AWS_REGION is not set");
}

const LINKS_EXPIRATION_SECONDS = 600;

// Function to get file extension from content type (images only)
function getFileExtensionFromContentType(contentType: string): string {
  const mimeToExtension: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/bmp": ".bmp",
    "image/tiff": ".tiff",
    "image/tif": ".tif",
  };

  return mimeToExtension[contentType.split(";")[0].trim().toLowerCase()] || "";
}

export async function POST(request: Request) {
  const { contentType } = await request.json();
  const fileExtension = getFileExtensionFromContentType(contentType);

  if (!fileExtension) {
    return Response.json(
      { error: `Unsupported content type: ${contentType}` },
      { status: 400 },
    );
  }

  const key = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExtension}`;

  const client = new AwsClient({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    region: process.env.AWS_REGION,
  });

  const url = new URL(
    `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  );
  url.searchParams.set("X-Amz-Expires", LINKS_EXPIRATION_SECONDS.toString());

  const signedRequest = await client.sign(url, {
    method: "PUT",
    body: "", // Empty body for presigned URL
    aws: { signQuery: true },
  });

  return Response.json({
    url: signedRequest.url,
  });
}

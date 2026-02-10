import { generate as DefaultImage } from "fumadocs-ui/og";
import { ImageResponse } from "next/og";
import { Logo } from "@/components/logo";

export const revalidate = false;

export async function GET(
  _req: Request,
) {
  return new ImageResponse(
    <DefaultImage
      title="Home"
      description="Documentation for the Better Auth Invite Plugin."
      icon={<Logo />}
      site="Better Auth Invite Docs"
      primaryColor="#0B1220"
      primaryTextColor="#E6EDF7"
    />,
    {
      width: 1200,
      height: 630,
    },
  );
}

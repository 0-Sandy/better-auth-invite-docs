import { readFile } from "node:fs/promises";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { baseUrl } from "@/lib/metadata";

export interface GenerateProps {
  title: ReactNode;
  description?: ReactNode;
}

const font = readFile("./src/lib/og/Geist-Regular.ttf").then((data) => ({
  name: "Geist",
  data,
  weight: 400 as const,
}));
const fontMedium = readFile("./src/lib/og/Geist-Medium.ttf").then((data) => ({
  name: "Geist",
  data,
  weight: 600 as const,
}));

export async function getImageResponseOptions() {
  return {
    width: 1200,
    height: 630,
    format: "webp",
    fonts: await Promise.all([font, fontMedium]),
  };
}

export function generate({ title, description }: GenerateProps) {
  const siteName = "Better Auth Invite Plugin";
  const primaryTextColor = "rgb(240,240,240)";
  console.log(baseUrl.href);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "white",
        backgroundImage: `url(${baseUrl.href}/background.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "4rem",
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: "76px",
          }}
        >
          {title}
        </span>
        <p
          style={{
            fontSize: "48px",
            color: "rgba(240,240,240,0.7)",
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
            color: primaryTextColor,
          }}
        >
          <Logo />
          <span
            style={{
              fontSize: "46px",
              fontWeight: 600,
            }}
          >
            {siteName}
          </span>
        </div>
      </div>
    </div>
  );
}

import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { baseUrl, createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  verification: {
    google: "2_Rk36ZAi2agX8jVuzvGnG_mgC_4NSyeeQlTfyXoIdA",
  },
  title: {
    default: "Better Auth Invite Plugin",
    template: "%s | Better Auth Invite Plugin",
  },
  description:
    "A Better Auth plugin for secure invitations and automatic role assignment.",
  metadataBase: baseUrl,
});

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children}
          <SpeedInsights />
          <Analytics />
        </RootProvider>
      </body>
    </html>
  );
}

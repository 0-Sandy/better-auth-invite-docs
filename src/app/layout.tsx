import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import "./global.css";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  verification: {
    google: "2_Rk36ZAi2agX8jVuzvGnG_mgC_4NSyeeQlTfyXoIdA",
  },
  title: {
    default: "Better Auth Invite Docs",
    template: "%s | Better Auth Invite Docs",
  },
  description: "The documentation of Better Auth Invite Plugin.",
  openGraph: {
    title: "Better Auth Invite Docs",
    description: "The documentation of Better Auth Invite Plugin.",
    siteName: "Better Auth Invite Docs",
    images: "/og/default.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Auth Invite Docs",
    description: "The documentation of Better Auth Invite Plugin.",
    images: "/og/default.png",
  },
  metadataBase: new URL(
    process.env.VERCEL_ENV === "production"
      ? `https://better-auth-invite.vercel.app/`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:3000`,
  ),
};

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

import type { Metadata } from 'next';
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  verification: {
    google: "2_Rk36ZAi2agX8jVuzvGnG_mgC_4NSyeeQlTfyXoIdA"
  }
};

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

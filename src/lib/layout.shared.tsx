import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/logo";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Logo className="w-5 h-5" />
          <span className="hidden sm:inline">better-auth-invite-plugin</span>
        </div>
      ),
      transparentMode: "top",
    },
    links: [
      { text: "Docs", url: "/docs" },
      { text: "Showcase", url: "/showcase" },
    ],
    githubUrl: "https://github.com/0-Sandy/better-auth-invite-plugin",
  };
}

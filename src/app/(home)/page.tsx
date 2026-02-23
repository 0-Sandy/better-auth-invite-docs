import Link from "next/link";
import { GithubButton } from "@/components/github-button";
import { NpmButton } from "@/components/npm-button";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Better Auth Invite Plugin
      </h1>
      <p className="mt-4 text-base text-muted-foreground">
        A small plugin for inviting users to your Better Auth app.
      </p>
      <div className="flex items-center justify-center gap-3 mt-7">
        <Link
          href="/docs"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background shadow-sm transition hover:opacity-90"
        >
          Docs
        </Link>
        <Link
          href="/showcase"
          className="inline-flex h-10 items-center justify-center rounded-xl border px-4 text-sm font-medium shadow-sm transition hover:bg-muted"
        >
          Showcase
        </Link>
      </div>

      <div className="flex justify-center mt-12">
        <div className="flex w-fit px-6 gap-9 py-4 rounded-[10px] border border-white/10 dark:bg-white/5 bg-black/5">
          <code className="md:text-base text-xs font-geist flex items-center">
            <span className="text-sky-500">git:</span>
            <span className="text-red-400">(main)</span>
            <span className="dark:text-white text-black">
              {" "}
              &gt; pnpm add better-auth-invite-plugin
            </span>
          </code>
          <div className="flex gap-2 items-center">
            <NpmButton
              packageName="better-auth-invite-plugin"
              label=""
              noExternalIcon
            />
            <GithubButton
              username="0-Sandy"
              repository="better-auth-invite-plugin"
              label=""
              noExternalIcon
            />
          </div>
        </div>
      </div>
    </div>
  );
}

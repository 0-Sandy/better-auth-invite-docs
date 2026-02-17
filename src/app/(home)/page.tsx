import Link from "next/link";

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
    </div>
  );
}

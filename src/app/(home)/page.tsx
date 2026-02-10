import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  openGraph: {
    url: "/",
  }
};

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">Better Auth Invite Plugin</h1>
      <p>
        A plugin to invite users to your app, see more in{" "}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>
      </p>
    </div>
  );
}

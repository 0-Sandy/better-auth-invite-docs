"use client";

import { HomeLayout } from "fumadocs-ui/layouts/home";
import { NotFound as NotFoundComponent } from "@/components/layout/not-found";
import { baseOptions } from "@/lib/layout.shared";

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] text-center gap-4 p-8">
        <NotFoundComponent />
      </div>
    </HomeLayout>
  );
}

import { BookText, PanelsTopLeft } from "lucide-react";
import { DocsLayout } from "@/components/layout/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        tabs: [
          {
            title: "Docs",
            description: "Get started with the plugin",
            url: "/docs",
            icon: <BookText size="20" />,
          },
          {
            title: "Examples",
            description: "Examples and guides",
            url: "/docs/examples",
            icon: <PanelsTopLeft size="20" />,
          },
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}

import { NextResponse } from "next/server";
import { source } from "@/lib/source";

export const revalidate = false;

interface PageInfo {
  title: string;
  description: string;
  url: string;
  category: string;
}

function cleanPath(path: string): string[] {
  const parts = path.split("/");

  // quitar () del primer elemento si existen
  if (parts[0].startsWith("(") && parts[0].endsWith(")")) {
    parts[0] = parts[0].slice(1, -1);
  }

  // quitar .mdx del último elemento
  const lastIndex = parts.length - 1;
  parts[lastIndex] = parts[lastIndex].replace(/\.mdx$/, "");

  return parts;
}

function groupPagesByCategory(pages: any[]): Map<string, PageInfo[]> {
  const grouped = new Map<string, PageInfo[]>();

  for (const page of pages) {
    // Skip openapi pages
    if (page.slugs[0] === "openapi") continue;
    const slugs = cleanPath(page.path);

    const category = slugs[0] || "general";
    const pageInfo: PageInfo = {
      title: page.data.title,
      description: page.data.description || "",
      url: `/llms.mdx${page.url}`,
      category: category,
    };

    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push(pageInfo);
  }

  return grouped;
}

function formatCategoryName(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function GET() {
  const pages = source.getPages();
  const groupedPages = groupPagesByCategory(pages);

  let content = `# Better Auth Invite Plugin

> A Better Auth plugin for secure invitations and automatic role assignment.

## Table of Contents

`;

  const categories = Array.from(groupedPages.keys());

  for (const category of categories) {
    const categoryPages = groupedPages.get(category)!;
    const formattedCategory = formatCategoryName(category);

    content += `### ${formattedCategory}\n\n`;

    for (const page of categoryPages) {
      const description = page.description ? `: ${page.description}` : "";
      content += `- [${page.title}](${page.url})${description}\n`;
    }

    content += "\n";
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "fumadocs-ui/components/callout";
import { GithubInfo } from "fumadocs-ui/components/github-info";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";
import { APIMethod } from "@/components/api-method";
import { GithubButton } from "@/components/github-button";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  PageLastUpdate,
} from "@/components/layout/notebook/page";
import { NpmButton } from "@/components/npm-button";
import { getPageImage, source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const lastModifiedTime = page.data.lastModified;
  const MDX = page.data.body;
  const gitConfig = {
    user: "0-Sandy",
    repo: "better-auth-invite-docs",
    branch: "main",
  };
  const npmName = "better-auth-invite-plugin";

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          // update it to match your repo
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/docs/content/docs/${page.path}`}
        />
        <GithubButton
          label="Source"
          username={gitConfig.user}
          repository={gitConfig.repo}
        />
        <NpmButton packageName={npmName} />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
            Step,
            Steps,
            Callout,
            Tabs,
            Tab,
            APIMethod,
            GithubInfo: (props) => (
              <GithubInfo
                owner={gitConfig.user}
                repo={gitConfig.repo}
                {...props}
              />
            ),
            TypeTable,
            Accordions,
            Accordion,
          })}
        />
      </DocsBody>
      {lastModifiedTime && <PageLastUpdate date={lastModifiedTime} />}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const images = getPageImage(page).url;
  const path = params.slug ? `/docs/${params.slug?.join("/")}` : "/docs"

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images,
      description: page.data.description,
      title: page.data.title,
      url: path
    },
    twitter: {
      images,
      description: page.data.description,
      title: page.data.title
    },
  };
}

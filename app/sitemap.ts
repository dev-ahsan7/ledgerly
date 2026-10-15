import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/posts";
import { legalDocs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/pricing", "/contact", "/blog"].map((p) => ({ url: `${site.url}${p}` }));
  const blog = posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date }));
  const legal = legalDocs.map((d) => ({ url: `${site.url}/legal/${d.slug}`, lastModified: d.updated }));
  return [...pages, ...blog, ...legal];
}

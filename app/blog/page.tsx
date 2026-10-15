import type { Metadata } from "next";
import { blogCopy } from "@/lib/posts";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description: blogCopy.sub,
  alternates: { canonical: "/blog" },
  openGraph: { title: `Ledgerly blog: ${blogCopy.title}`, description: blogCopy.sub, url: "/blog" },
};

export default function BlogPage() {
  return (
    <section aria-labelledby="blog-title" className="container-x pb-24 pt-12 md:pt-20">
      <Reveal className="max-w-2xl">
        <SectionLabel index={1}>Blog</SectionLabel>
        <h1 id="blog-title" className="mt-4 font-display text-4xl font-heading tracking-tight sm:text-5xl md:text-6xl">
          {blogCopy.title}
        </h1>
        <p className="lead mt-5">{blogCopy.sub}</p>
      </Reveal>
      <div className="mt-12">
        <BlogIndex />
      </div>
    </section>
  );
}

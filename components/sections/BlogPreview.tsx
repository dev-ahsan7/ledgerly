import Link from "next/link";
import { blogPreview } from "@/lib/site";
import { posts } from "@/lib/posts";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { PostCard } from "@/components/blog/PostCard";

/** Latest posts on the home page, newest first. */
export function BlogPreview({ index = 10 }: { index?: number }) {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, blogPreview.count);

  return (
    <section aria-labelledby="blog-preview-title" className="container-x section-y">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <SectionHeader index={index} label={blogPreview.label} title={blogPreview.title} sub={blogPreview.sub} titleId="blog-preview-title" />
        </Reveal>
        <Reveal delay={0.05}>
          <Link
            href={blogPreview.link.href}
            className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-line bg-surface px-4 py-2.5 text-sm font-medium hover:border-ink/40"
          >
            {blogPreview.link.label}
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-12 md:mt-12 md:grid-cols-3">
        {latest.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={0.1 + i * 0.08} className="h-full">
              <PostCard post={p} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

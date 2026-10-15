"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { blogCopy, categories, posts } from "@/lib/posts";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/format";
import { PostCard, PostCover, PostMeta } from "./PostCard";

type Filter = (typeof categories)[number];

export function BlogIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const showFeatured = filter === "All" || filter === featured.category;
  const list = posts.filter((p) => p.slug !== featured.slug && (filter === "All" || p.category === filter));

  return (
    <>
      {showFeatured && (
        <article className="card group relative grid overflow-hidden md:grid-cols-[1.2fr_1fr]">
          <PostCover post={featured} large className="m-3 md:m-4" />
          <div className="flex flex-col justify-center p-6 md:p-10">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              <span className="rounded-pill bg-accent px-2 py-0.5 text-accent-ink">{blogCopy.featured}</span>
              {featured.category}
            </p>
            <h2 className="mt-4 font-display text-2xl font-heading tracking-tight md:text-3xl">
              <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-3 text-muted">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-3">
              <Avatar initials={featured.author.initials} size="sm" />
              <div className="text-sm">
                <p className="font-medium">{featured.author.name}</p>
                <PostMeta post={featured} />
              </div>
            </div>
          </div>
        </article>
      )}

      <div role="group" aria-label={blogCopy.filterLabel} className="mt-12 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
              filter === c ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-muted hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length + (showFeatured ? 1 : 0)} posts shown
      </p>

      {list.length === 0 ? (
        <p className="mt-10 text-muted">{blogCopy.empty}</p>
      ) : (
        <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <PostCard post={p} headingLevel="h2" />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}

import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";
import { cn } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";

/** Cover: stock photo with a small receipt-style tag carrying the post's headline number. */
export function PostCover({
  post,
  large = false,
  className,
  sizes,
}: {
  post: Post;
  large?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-surface-2",
        large ? "aspect-[16/10] md:aspect-auto md:h-full md:min-h-[320px]" : "aspect-[16/10]",
        className,
      )}
    >
      <Photo
        name={post.image}
        decorative
        sizes={sizes ?? (large ? "(min-width: 810px) 60vw, 100vw" : "(min-width: 1100px) 380px, (min-width: 480px) 50vw, 100vw")}
        className="transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div aria-hidden className={cn("absolute bottom-3 left-3 rounded bg-surface/95 px-3 py-2 backdrop-blur", large && "bottom-4 left-4 px-4 py-3")}>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{post.cover.label}</p>
        <p className={cn("font-mono tabular", large ? "mt-1 text-2xl" : "text-base")}>{post.cover.amount}</p>
      </div>
    </div>
  );
}

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 text-sm text-muted", className)}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span>{post.readTime} min read</span>
    </p>
  );
}

export function PostCard({ post, headingLevel = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col">
      <PostCover post={post} />
      <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">{post.category}</p>
      <Heading className="mt-2 text-lg font-heading leading-snug">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4">
          {post.title}
        </Link>
      </Heading>
      <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
      <PostMeta post={post} className="mt-auto pt-4" />
    </article>
  );
}

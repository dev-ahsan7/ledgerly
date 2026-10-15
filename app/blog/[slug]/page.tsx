import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogCopy, formatDate, getPost, getRelated, posts } from "@/lib/posts";
import { site } from "@/lib/site";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard, PostCover } from "@/components/blog/PostCard";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author.name],
      section: post.category,
      siteName: site.name,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelated(post.slug);

  return (
    <>
      <article className="container-x pb-16 pt-10 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
            <ArrowLeftIcon width={16} height={16} />
            {blogCopy.back}
          </Link>
          <Reveal>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted">{post.category}</p>
            <h1 className="mt-3 font-display text-4xl font-heading leading-tight tracking-tight md:text-5xl" style={{ textWrap: "balance" }}>
              {post.title}
            </h1>
            <p className="lead mt-5">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-4 text-sm">
              <span className="flex items-center gap-3">
                <Avatar initials={post.author.initials} size="sm" />
                <span>
                  <span className="block font-medium">{post.author.name}</span>
                  <span className="block text-muted">{post.author.role}</span>
                </span>
              </span>
              <span className="text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime} min read
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-4xl">
          <PostCover post={post} large className="md:min-h-[420px]" sizes="(min-width: 900px) 896px, 100vw" />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          <PostBody blocks={post.body} />

          <aside aria-labelledby="post-newsletter" className="card mt-16 p-6 md:p-8">
            <h2 id="post-newsletter" className="text-xl font-semibold">
              {blogCopy.newsletter.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{blogCopy.newsletter.body}</p>
            <NewsletterForm className="mt-5 max-w-md" />
          </aside>
        </div>
      </article>

      <section aria-labelledby="related-title" className="border-t border-line bg-surface-2/50 py-16 md:py-20">
        <div className="container-x">
          <h2 id="related-title" className="h2 !text-3xl">
            {blogCopy.related}
          </h2>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

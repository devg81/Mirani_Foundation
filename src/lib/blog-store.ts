import { useEffect, useState } from "react";
import { blogPosts as staticBlogPosts, type BlogPost } from "@/lib/site-data";
import { coreBlogPosts } from "@/lib/core-blog-posts";

/**
 * Client-side access to admin-created blog posts.
 *
 * Sheet-backed posts remain available for admin publishing, while the
 * foundation's core editorial posts are version-controlled in the repo.
 */
export const BLOG_IMAGE_PLACEHOLDER = "__placeholder__";

export type NewBlogPostInput = {
  title: string;
  excerpt: string;
  content: string;
  category: BlogPost["category"];
  date: string;
  image?: string;
};

/** Creates a new blog post via the API (which appends it to the Google Sheet). */
export async function addBlogPost(input: NewBlogPostInput): Promise<BlogPost> {
  const res = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  let data: { success?: boolean; post?: BlogPost; error?: string } = {};
  try {
    data = await res.json();
  } catch {
    // fall through to the generic error below
  }

  if (!res.ok || !data.success || !data.post) {
    throw new Error(data.error ?? "Failed to publish the post. Please try again.");
  }

  return data.post;
}

async function fetchSheetPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("/api/blogs");
    const data = (await res.json()) as { success?: boolean; posts?: BlogPost[] };
    return data.success && Array.isArray(data.posts) ? data.posts : [];
  } catch {
    return [];
  }
}

/** All posts: sheet-backed admin posts first, then repo-managed editorial posts. */
export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  const sheetPosts = await fetchSheetPosts();
  return [...sheetPosts, ...coreBlogPosts, ...staticBlogPosts];
}

export function useBlogPosts(): BlogPost[] {
  const [posts, setPosts] = useState<BlogPost[]>([...coreBlogPosts, ...staticBlogPosts]);

  useEffect(() => {
    let cancelled = false;
    fetchAllBlogPosts().then((all) => {
      if (!cancelled) setPosts(all);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
}

import data from "../data/links.json";

export type Link = {
  id: string;
  title: string;
  url: string;
  note?: string;
  label?: string;
  /** ISO date with offset. Item hides before this. */
  start?: string;
  /** ISO date with offset. Item hides at or after this. */
  end?: string;
};

export type Post = Link & {
  /** Public image URL for the grid tile (same image as the Instagram post). */
  image: string;
  alt?: string;
  /** Date the post went out, ISO. Newest first. */
  postedAt?: string;
  bufferId?: string;
};

export type Section = { id: string; title: string; links: Link[] };

export type LinksData = {
  meta: { updatedAt: string; note?: string };
  featured: Link[];
  posts: Post[];
  sections: Section[];
};

function isLive<T extends Link>(item: T, now: number) {
  if (item.start && Date.parse(item.start) > now) return false;
  if (item.end && Date.parse(item.end) <= now) return false;
  return true;
}

export function getLinks(): LinksData {
  const d = data as LinksData;
  const now = Date.now();
  const posts = d.posts
    .filter((p) => isLive(p, now))
    .sort((a, b) => Date.parse(b.postedAt ?? "0") - Date.parse(a.postedAt ?? "0"))
    .slice(0, 12);
  // Keep the 3-up grid in full rows once there are at least three photos.
  const shown = posts.length >= 3 ? posts.slice(0, posts.length - (posts.length % 3)) : posts;
  return {
    meta: d.meta,
    featured: d.featured.filter((l) => isLive(l, now)),
    posts: shown,
    sections: d.sections
      .map((s) => ({ ...s, links: s.links.filter((l) => isLive(l, now)) }))
      .filter((s) => s.links.length > 0),
  };
}

/** Tag links into our own sites so link-in-bio traffic shows up in analytics. */
export function tracked(url: string, id: string) {
  try {
    const u = new URL(url);
    if (!/(^|\.)sainthelen\.org$/.test(u.hostname)) return url;
    if (!u.searchParams.has("utm_source")) {
      u.searchParams.set("utm_source", "link_in_bio");
      u.searchParams.set("utm_medium", "social");
      u.searchParams.set("utm_campaign", "link_in_bio");
      u.searchParams.set("utm_content", id);
    }
    return u.toString();
  } catch {
    return url;
  }
}

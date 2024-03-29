/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import BlogListItem from "./blog-list-item";

type ListingProps = {
  posts: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: {
      name: string;
      slug: string;
    }[];
  }[];
  className?: string;
  showTags?: boolean;
};

const Listing = ({ posts, className = ``, showTags = true }: ListingProps) => (
  <section className={className}>
    {posts.map((post) => (
      <>
        <BlogListItem key={post.slug} post={post} showTags={showTags} />
      </>
    ))}
  </section>
);

export default Listing;

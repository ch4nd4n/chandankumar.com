/** @jsx jsx */
import React from "react";
import { jsx, Link as TLink } from "theme-ui";
import { Box } from "@theme-ui/components";
import { Link } from "gatsby";
import ItemTags from "@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags";

type BlogListItemProps = {
  post: {
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
  };
  showTags?: boolean;
};

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (
  <Box mb={4}>
    <TLink as={Link} to={post.slug} sx={{ fontSize: [1, 2, 3], color: `text` }}>
      {post.title}
    </TLink>
    <div
      sx={{
        color: `secondary`,
        mt: 1,
        a: { color: `secondary` },
        fontSize: [1, 1, 2],
      }}
    >
      <p>{post.excerpt}</p>
      <time>{post.date}</time>
      {post.tags && showTags && (
        <React.Fragment>
          {` — `}
          <ItemTags tags={post.tags} />
        </React.Fragment>
      )}
    </div>
  </Box>
);

export default BlogListItem;

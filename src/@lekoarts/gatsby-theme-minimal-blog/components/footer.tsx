/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";

const Footer = () => {
  const { siteTitle } = useSiteMetadata();

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [6],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
      }}
    >
      <div>
        <span
          sx={{ width: "10px", display: "inline-block", marginRight: "2px" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 980">
            <circle
              cx="490"
              cy="490"
              r="440"
              fill="none"
              stroke="#000"
              strokeWidth="100"
            />
            <path d="M219,428H350a150,150 0 1 1 0,125H219a275,275 0 1 0 0-125z" />
          </svg>
        </span>
        Copyleft. WTH
      </div>
      <div>Theme by LekoArts</div>
    </footer>
  );
};

export default Footer;

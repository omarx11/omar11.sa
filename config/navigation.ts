// The site's pages. The ones with an icon are the navbar's tabs; the rest are
// linked from the footer.

/** The tint behind the active tab. */
const TAB_OPACITY = 0.3;

export type SitePage = {
  href: string;
  name: string;
  /** The tab's icon. Pages without one aren't in the navbar. */
  icon?: string;
  /** The active tab's highlight colour. */
  color: string;
};

export const pages: SitePage[] = [
  {
    href: "/",
    name: "Projects",
    icon: "/static/icons/pages/album-2-fill.svg",
    color: `rgba(139, 92, 246, ${TAB_OPACITY})`,
  },
  {
    href: "/skills",
    name: "Skills",
    icon: "/static/icons/pages/grid-fill.svg",
    color: `rgba(244, 63, 94, ${TAB_OPACITY})`,
  },
  {
    href: "/specs",
    name: "Specs",
    icon: "/static/icons/pages/command-fill.svg",
    color: `rgba(14, 165, 233, ${TAB_OPACITY})`,
  },
  {
    href: "/about",
    name: "About",
    icon: "/static/icons/pages/draw-pen.svg",
    color: `rgba(245, 158, 11, ${TAB_OPACITY})`,
  },
  {
    href: "/anime",
    name: "Anime",
    icon: "/static/icons/pages/star-four-fill.svg",
    color: `rgba(244, 114, 182, ${TAB_OPACITY})`,
  },
  {
    href: "/games",
    name: "Games",
    icon: "/static/icons/pages/grid-2-fill.svg",
    color: `rgba(34, 197, 94, ${TAB_OPACITY})`,
  },
  {
    href: "/guestbook",
    name: "Guestbook",
    icon: "/static/icons/pages/comment-fill.svg",
    color: `rgba(209, 213, 219, ${TAB_OPACITY})`,
  },
  {
    href: "/license",
    name: "License",
    color: `rgba(30, 30, 30, ${TAB_OPACITY})`,
  },
  {
    href: "/privacy-policy",
    name: "Privacy Policy",
    color: `rgba(30, 30, 30, ${TAB_OPACITY})`,
  },
];

export type MenuPage = SitePage & { icon: string };

/** The navbar's tabs, in order. */
export const menuPages = pages.filter(
  (page): page is MenuPage => page.icon !== undefined,
);

/** Pages linked only from the footer. */
export const footerPages = pages.filter((page) => page.icon === undefined);

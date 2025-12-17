/**
 * Navigation configuration for the application.
 * Add, remove, or modify navigation items here.
 */

export interface NavItem {
  /** Display label for the navigation item */
  label: string;
  /** Route path (use React Router path format) */
  to: string;
  /** Optional icon component or element */
  icon?: React.ReactNode;
  /** Whether this item should only show when authenticated */
  requiresAuth?: boolean;
  /** Whether this item should only show when NOT authenticated */
  guestOnly?: boolean;
  /** Child navigation items for dropdowns */
  children?: NavItem[];
}

/**
 * Main navigation items displayed in the header.
 * Modify this array to change the primary navigation.
 */
export const mainNavItems: NavItem[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Features",
    to: "/features",
  },
  {
    label: "About",
    to: "/about",
  },
];

/**
 * Footer navigation organized by sections.
 */
export interface FooterSection {
  title: string;
  items: NavItem[];
}

export const footerNavSections: FooterSection[] = [
  {
    title: "Product",
    items: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

/**
 * Social media links for the footer.
 */
export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "twitter" | "linkedin" | "discord";
}

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: "github",
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: "twitter",
  },
  {
    label: "Discord",
    href: "https://discord.com",
    icon: "discord",
  },
];

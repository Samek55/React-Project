import { NavItem } from "../types";

// ─── NAVIGATION CONFIG ───────────────────────────────────────────────────────
// Footer navigation items — `footer: false` hides the item from the bottom bar
// but keeps it accessible via the drawer. Each item maps a key to a page.

export const navigationItems: NavItem[] = [
  { key: "exchange", label: "Exchange", drawerLabel: "Exchange to EV", icon: "swap-horizontal-outline", svgIcon: "exchange" },
  { key: "buy", label: "Buy", drawerLabel: "Buy Used Car", icon: "key-outline" },
  { key: "sell", label: "Sell", drawerLabel: "Sell Used Car", icon: "cash-outline", svgIcon: "carSide" },
  { key: "testdrive", label: "Test Drive", drawerLabel: "Free Test Drive", icon: "car-sport-outline" },
  { key: "branches", label: "Dealers", drawerLabel: "Dealers", icon: "business-outline" },
  { key: "faqs", label: "FAQs", drawerLabel: "FAQs", icon: "help-circle-outline", svgIcon: "graphql", footer: false },
  { key: "about", label: "About", drawerLabel: "About NEPAL Motor", icon: "information-circle-outline", svgIcon: "steering", footer: false },
];

// Items shown in the bottom footer bar (excludes FAQs and About)
export const footerNavItems: NavItem[] = navigationItems.filter((item) => item.footer !== false);

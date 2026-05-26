// ─── SHARED TYPES ─────────────────────────────────────────────────────────────

/** A file asset selected via ImagePicker or the browser file API. */
export interface FileAsset {
  uri: string;
  name: string;
  type: string;
  file?: File;
}

/** The shape of the exchange / sell / buy form state. */
export interface FormState {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  year: string;
  vehicleType: string;
  model: string;
  brand: string;
  color: string;
  kmDriven: string;
  document: FileAsset[];
  photo: FileAsset[];
  evBrand: string;
  finance: string;
  transmission: string;
  accident: string;
  fuelType: string;
  features: string[];
  notes: string;
  budget: string;
  sellingPrice: string;
}

/** Valid keys for the legal policy pages. */
export type PolicyKey = "terms" | "privacy" | "refund" | "disclaimer";

/** A single navigation item (footer + drawer). */
export interface NavItem {
  key: string;
  label: string;
  drawerLabel?: string;
  icon: string;
  svgIcon?: string;
  footer?: boolean;
}

/** A single FAQ question/answer pair. */
export interface FAQItem {
  question: string;
  answer: string;
}

/** A named group of FAQ items. */
export interface FAQSection {
  title: string;
  items: FAQItem[];
}

/** A single glossary term and its definition. */
export interface GlossaryEntry {
  title: string;
  definition: string;
}

/** An onboarding carousel slide. */
export interface OnboardingSlide {
  type: string;
  image: any;
  title: string;
  body: string;
  metric: string;
  detail: string;
  aspectRatio: number;
  resizeMode?: string;
}

/** A legal policy document with title and full content. */
export interface Policy {
  title: string;
  content: string;
}

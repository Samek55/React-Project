/**
 * Exact labels for the Airtable "Interested EV Brand" single-select field.
 * Keep in sync with the Dealers / Vehicle Listings base in Airtable.
 */
export const INTERESTED_EV_BRAND_OPTIONS = [
  "Tata Nexon EV",
  "Tata Tigor EV",
  "Tata Punch EV",
  "BYD Atto 3",
  "BYD Dolphin",
  "BYD e6",
  "MG ZS EV",
  "MG4 EV",
  "MG S5 EV",
  "Neta V",
  "Neta U",
  "Neta X",
  "Hyundai Kona Electric",
  "Hyundai Ioniq 5",
  "Hyundai Creta EV",
  "Kia EV6",
  "Kia EV9",
  "Kia Niro EV",
  "I need suggestion",
  "Other",
] as const;

export type InterestedEvBrand = (typeof INTERESTED_EV_BRAND_OPTIONS)[number];

/** Default when sell form does not ask for EV brand. */
export const SELL_FORM_EV_BRAND = "I need suggestion" as const;

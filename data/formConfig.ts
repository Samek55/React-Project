import { FormState } from "../types";

// ─── VEHICLE FEATURES LIST ───────────────────────────────────────────────────
// Selectable vehicle features shown in the multi-select feature picker.

export const features: string[] = [
  "Basic",
  "A/C",
  "4WD",
  "ABS",
  "Airbags",
  "Power Steering",
  "Power Windows",
  "Central Locking",
  "Music System",
  "Alloy Wheels",
  "Fog Lamps",
  "Sunroof",
  "Leather Seats",
  "Reverse Camera",
  "Cruise Control",
  "Keyless Entry"
];

// ─── FORM STATE TEMPLATE ─────────────────────────────────────────────────────
// Default blank form values. Used to initialise and reset all three forms
// (exchange, sell, buy). Shared structure covers all field variants.
export const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  city: "Kathmandu",
  year: "",
  vehicleType: "Hatchback",
  model: "",
  brand: "",
  color: "",
  kmDriven: "",
  document: [],
  photo: [],
  evBrand: "",
  finance: "",
  transmission: "",
  accident: "",
  fuelType: "Petrol",
  features: [],
  notes: "",
  budget: "",
  sellingPrice: ""
};

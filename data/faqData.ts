import { FAQSection } from "../types";

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
// Grouped FAQ content displayed in the FAQsPage component.
// Each section maps to a filter chip in the UI.

export const faqSectionData: FAQSection[] = [
  {
    title: "Car Exchange Page FAQs",
    items: [
      { question: "How does the car exchange process work?", answer: "We evaluate your current petrol, diesel, or used vehicle and provide a fair market value that can be adjusted toward your next vehicle purchase, including EV cars." },
      { question: "Can I exchange my petrol or diesel car for an electric vehicle?", answer: "Yes, we specialize in exchanging petrol and diesel vehicles for modern electric vehicles with professional valuation and paperwork support." },
      { question: "How long does the vehicle exchange process take?", answer: "Most car exchanges can be completed within a few hours after inspection, document verification, and final agreement." },
      { question: "Do you provide valuation for all car brands?", answer: "Yes, we evaluate cars from most major brands, including hatchbacks, sedans, SUVs, and premium vehicles." },
      { question: "Is vehicle inspection required before exchange?", answer: "Yes, a professional inspection helps determine the vehicle's market value based on condition, mileage, service history, and demand." }
    ]
  },
  {
    title: "General FAQs",
    items: [
      { question: "Why should I choose your company for used car exchange services?", answer: "We provide transparent pricing, verified documentation, professional inspections, and hassle-free ownership transfer services." },
      { question: "Do you assist with ownership transfer and paperwork?", answer: "Yes, our team manages the complete documentation process, including ownership transfer and legal paperwork." },
      { question: "Are your used cars inspected before listing for sale?", answer: "Yes, every used car goes through a professional inspection process to ensure quality, reliability, and transparency." },
      { question: "Can I finance a used car purchase?", answer: "Yes, financing options may be available depending on the vehicle and customer eligibility." },
      { question: "Do you buy cars directly from owners?", answer: "Yes, we purchase used cars directly from owners after inspection and valuation." }
    ]
  },
  {
    title: "Sell Used Car FAQs",
    items: [
      { question: "What documents are required to sell my used car?", answer: "Typically, you need the registration certificate, insurance papers, citizenship/license copy, tax clearance, and service records if available." },
      { question: "How is the selling price of my car determined?", answer: "The price is based on brand, model, condition, mileage, service history, market demand, and inspection results." },
      { question: "Can I sell a financed or loan vehicle?", answer: "Yes, financed vehicles can be sold after proper coordination with the financing institution and loan clearance procedures." }
    ]
  },
  {
    title: "Buy Used Car FAQs",
    items: [
      { question: "Are the used cars verified and quality checked?", answer: "Yes, all vehicles are professionally inspected and verified before being listed for sale to ensure customer confidence." },
      { question: "Can I test drive a used car before purchasing?", answer: "Yes, customers can schedule a test drive to check the vehicle's condition, comfort, and performance before making a decision." }
    ]
  },
  {
    title: "Branches FAQs",
    items: [
      { question: "Do you have multiple branches for car exchange and used car services?", answer: "Yes, we operate through multiple branches to provide convenient vehicle exchange, buying, and selling services across different locations." },
      { question: "Can I visit any branch for vehicle inspection or valuation?", answer: "Yes, customers can visit the nearest branch for professional inspection, valuation, and consultation services." }
    ]
  }
];

export const faqSections: FAQSection[] = [
  { title: "All FAQs", items: faqSectionData.flatMap((s) => s.items) },
  ...faqSectionData
];

export const faqChipMap: Record<string, string> = {
  "All": "All FAQs",
  "Exchange": "Car Exchange Page FAQs",
  "General": "General FAQs",
  "Sell": "Sell Used Car FAQs",
  "Buy": "Buy Used Car FAQs"
};

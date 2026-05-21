export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

const LAST_UPDATED = "May 21, 2026";

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  description:
    "Terms governing use of NEPAL Motor website, forms, and vehicle exchange, buy, and sell services.",
  lastUpdated: LAST_UPDATED,
  intro:
    "These Terms of Service (“Terms”) govern your access to and use of the NEPAL Motor website, mobile experience, inquiry forms, and related services (collectively, the “Services”). By using our Services or submitting any form, you agree to these Terms. If you do not agree, please do not use the Services.",
  sections: [
    {
      heading: "1. About NEPAL Motor",
      paragraphs: [
        "NEPAL Motor provides a platform and branch network to help customers exchange, buy, and sell used vehicles, including support for petrol, diesel, hybrid, and electric vehicles. Listings, valuations, inspections, and transactions may be fulfilled through NEPAL Motor and authorized partner dealers.",
      ],
    },
    {
      heading: "2. Eligibility and account responsibility",
      paragraphs: [
        "You must provide accurate, complete, and current information when using our forms or communicating with our team. You are responsible for all activity conducted using your contact details or submitted documents.",
      ],
    },
    {
      heading: "3. Inquiries and submissions",
      paragraphs: [
        "Form submissions (including exchange, sell, buy, test drive, and dealer applications) do not constitute a binding offer or purchase contract until confirmed in writing by NEPAL Motor or an authorized representative after inspection, documentation review, and mutual agreement.",
        "We may contact you by phone, email, or messaging apps using the details you provide. You consent to such communication for the purpose of processing your request.",
      ],
    },
    {
      heading: "4. Vehicle information and inspections",
      paragraphs: [
        "Descriptions, photos, valuations, and market estimates are indicative and subject to physical inspection, document verification, and applicable laws. Final pricing and vehicle condition are determined only after professional assessment.",
      ],
    },
    {
      heading: "5. Prohibited conduct",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Submit false, misleading, or fraudulent information or documents",
        "Upload malware, spam, or unrelated content through our forms",
        "Attempt to access systems or data without authorization",
        "Use the Services for unlawful purposes under the laws of Nepal",
      ],
    },
    {
      heading: "6. Intellectual property",
      paragraphs: [
        "The NEPAL Motor name, logo, website content, and materials are owned by or licensed to NEPAL Motor. You may not copy, modify, or distribute our content without prior written permission.",
      ],
    },
    {
      heading: "7. Third-party services",
      paragraphs: [
        "Our Services may reference or link to third parties (for example financing partners, insurers, or branch dealers). We are not responsible for third-party products, terms, or actions unless expressly stated in a written agreement.",
      ],
    },
    {
      heading: "8. Disclaimers",
      paragraphs: [
        "The Services are provided on an “as is” and “as available” basis. To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement. See our Disclaimer page for additional limitations.",
      ],
    },
    {
      heading: "9. Limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by applicable law, NEPAL Motor and its affiliates, officers, employees, and partners shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the Services. Our total liability for any claim relating to the Services shall not exceed the amount you paid to us for the specific transaction giving rise to the claim, or NPR 10,000 if no such payment applies.",
      ],
    },
    {
      heading: "10. Changes and termination",
      paragraphs: [
        "We may update these Terms at any time by posting a revised version with a new “Last updated” date. Continued use of the Services after changes constitutes acceptance. We may suspend or refuse access if you violate these Terms.",
      ],
    },
    {
      heading: "11. Governing law",
      paragraphs: [
        "These Terms are governed by the laws of Nepal. Disputes shall be subject to the exclusive jurisdiction of the competent courts in Nepal, unless otherwise required by mandatory law.",
      ],
    },
    {
      heading: "12. Contact",
      paragraphs: [
        "For questions about these Terms, contact NEPAL Motor through the helpline or branch details listed on our website.",
      ],
    },
  ],
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How NEPAL Motor collects, uses, and protects personal information submitted through our website and forms.",
  lastUpdated: LAST_UPDATED,
  intro:
    "NEPAL Motor (“we,” “us,” or “our”) respects your privacy. This Privacy Policy explains what information we collect when you use our website and forms, how we use it, and the choices you have.",
  sections: [
    {
      heading: "1. Information we collect",
      paragraphs: ["We may collect the following categories of information:"],
      bullets: [
        "Identity and contact data: name, phone number, email address, city",
        "Vehicle and transaction data: brand, model, year, mileage, fuel type, budget, finance preference, notes",
        "Documents and media you upload: registration copies, photos, showroom images",
        "Technical data: device type, browser, approximate usage data, and form submission timestamps",
      ],
    },
    {
      heading: "2. How we use information",
      paragraphs: ["We use personal information to:"],
      bullets: [
        "Process and respond to your exchange, sell, buy, test drive, or dealer inquiries",
        "Conduct valuations, inspections, and ownership transfer support",
        "Communicate with you about your request and related services",
        "Improve our website, forms, and customer experience",
        "Comply with legal obligations and prevent fraud or abuse",
      ],
    },
    {
      heading: "3. Legal basis",
      paragraphs: [
        "We process your information based on your consent (including when you agree to our policies on forms), performance of services you request, our legitimate interests in operating a secure marketplace, and compliance with applicable law.",
      ],
    },
    {
      heading: "4. Sharing of information",
      paragraphs: [
        "We may share information with authorized branch partners, inspectors, and service providers who assist with valuations, documentation, storage, or customer support. We require such parties to use data only for the purposes we specify.",
        "We may also disclose information when required by law, court order, or government authority, or to protect the rights, safety, and security of NEPAL Motor, our customers, and the public.",
      ],
    },
    {
      heading: "5. Data retention",
      paragraphs: [
        "We retain personal information for as long as needed to fulfill the purposes described in this policy, including record-keeping for transactions, disputes, and legal compliance. When data is no longer required, we take reasonable steps to delete or anonymize it.",
      ],
    },
    {
      heading: "6. Security",
      paragraphs: [
        "We implement reasonable administrative, technical, and organizational measures to protect your information. No method of transmission or storage is completely secure; please avoid submitting passwords or highly sensitive credentials through our forms.",
      ],
    },
    {
      heading: "7. Your rights and choices",
      paragraphs: [
        "Depending on applicable law, you may request access, correction, or deletion of your personal information, or withdraw consent where processing is consent-based. Contact us using the details on our website to make a request. We may need to verify your identity before responding.",
      ],
    },
    {
      heading: "8. Cookies and analytics",
      paragraphs: [
        "We may use cookies or similar technologies and analytics tools to understand how visitors use our website. You can adjust browser settings to limit cookies; some features may not function properly without them.",
      ],
    },
    {
      heading: "9. Children’s privacy",
      paragraphs: [
        "Our Services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.",
      ],
    },
    {
      heading: "10. International transfers",
      paragraphs: [
        "Your information is primarily processed in Nepal. If data is transferred to service providers in other countries, we take steps to ensure appropriate safeguards consistent with applicable law.",
      ],
    },
    {
      heading: "11. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top indicates when changes were posted. Material changes will be reflected on this page.",
      ],
    },
    {
      heading: "12. Contact",
      paragraphs: [
        "For privacy-related questions, contact NEPAL Motor through the helpline or branch information published on our website.",
      ],
    },
  ],
};

export const refundPolicy: LegalDocument = {
  title: "Refund Policy",
  description:
    "Refund and cancellation guidelines for fees and payments related to NEPAL Motor services.",
  lastUpdated: LAST_UPDATED,
  intro:
    "This Refund Policy describes when refunds may be available for payments made to NEPAL Motor or through our authorized branches for vehicle-related services. Vehicle purchase and sale terms are confirmed separately in your transaction documents.",
  sections: [
    {
      heading: "1. Scope",
      paragraphs: [
        "This policy applies to service fees, booking deposits, inspection charges, documentation fees, or similar amounts collected by NEPAL Motor where a refund is requested. It does not replace warranties, transfer agreements, or financing terms provided by third parties.",
      ],
    },
    {
      heading: "2. Non-refundable items",
      paragraphs: ["The following are generally non-refundable once services have been performed:"],
      bullets: [
        "Completed vehicle inspections and valuation reports",
        "Government charges, taxes, or transfer fees paid on your behalf",
        "Third-party costs (insurance, finance processing, towing) already incurred",
        "Services explicitly agreed as non-refundable in writing",
      ],
    },
    {
      heading: "3. Eligible refunds",
      paragraphs: [
        "A refund may be considered if NEPAL Motor cancels a paid service before delivery, collects a duplicate payment in error, or cannot complete an agreed paid service due to reasons within our control.",
        "Deposits held for a pending transaction may be refunded if the transaction does not proceed and no non-refundable work has been completed, subject to any written deposit terms you accepted.",
      ],
    },
    {
      heading: "4. Vehicle transaction cancellations",
      paragraphs: [
        "If a vehicle sale, purchase, or exchange is cancelled after mutual written agreement, refunds of amounts paid toward that transaction will be handled according to the signed sale or exchange terms, minus documented costs already incurred.",
      ],
    },
    {
      heading: "5. How to request a refund",
      paragraphs: [
        "Submit a refund request within 14 days of the payment date (or within 7 days of service completion, if later) by contacting the branch or helpline listed on our website. Include your name, phone number, payment reference, date, and reason for the request.",
      ],
    },
    {
      heading: "6. Processing time",
      paragraphs: [
        "Approved refunds are typically processed within 7–15 business days to the original payment method where possible. Bank or mobile-wallet processing times may vary.",
      ],
    },
    {
      heading: "7. Disputes",
      paragraphs: [
        "If you disagree with a refund decision, contact NEPAL Motor management with supporting documents. We will review the matter in good faith and respond within a reasonable timeframe.",
      ],
    },
    {
      heading: "8. Policy updates",
      paragraphs: [
        "We may revise this Refund Policy at any time. The version posted on our website with the current “Last updated” date applies to new requests.",
      ],
    },
  ],
};

export const disclaimer: LegalDocument = {
  title: "Disclaimer",
  description:
    "Important limitations regarding information, valuations, and use of the NEPAL Motor website.",
  lastUpdated: LAST_UPDATED,
  intro:
    "The information on the NEPAL Motor website and forms is provided for general guidance only. Please read this Disclaimer carefully before relying on any content or submitting a request.",
  sections: [
    {
      heading: "1. No professional advice",
      paragraphs: [
        "Content on our website does not constitute legal, tax, financial, or mechanical advice. You should obtain independent professional advice before making vehicle purchase, sale, finance, or registration decisions.",
      ],
    },
    {
      heading: "2. Accuracy of information",
      paragraphs: [
        "While we strive to keep information accurate and up to date, we do not warrant that descriptions, prices, availability, images, or specifications are complete, current, or error-free. Vehicle details are confirmed only after inspection and document verification.",
      ],
    },
    {
      heading: "3. Valuations and estimates",
      paragraphs: [
        "Online or verbal valuations, market ranges, and budget guidance are estimates only. Final offers may differ based on physical condition, accident history, service records, demand, and regulatory requirements.",
      ],
    },
    {
      heading: "4. Third-party content and links",
      paragraphs: [
        "References to manufacturers, financiers, insurers, or external websites are for convenience. NEPAL Motor does not control and is not responsible for third-party content, products, or policies.",
      ],
    },
    {
      heading: "5. Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, NEPAL Motor shall not be liable for any loss or damage arising from reliance on website content, delayed responses, technical interruptions, or actions taken based on preliminary information before a signed agreement.",
      ],
    },
    {
      heading: "6. User submissions",
      paragraphs: [
        "You are responsible for the accuracy of information and documents you submit. NEPAL Motor may decline or terminate processing of submissions that appear incomplete, inconsistent, or fraudulent.",
      ],
    },
    {
      heading: "7. Changes",
      paragraphs: [
        "We may update this Disclaimer without prior notice. Continued use of the website constitutes acceptance of the current version.",
      ],
    },
  ],
};

import { SiteShell } from "./SiteShell";
import type { LegalDocument } from "@/lib/legal-content";

type LegalDocumentViewProps = {
  document: LegalDocument;
};

export function LegalDocumentView({ document: doc }: LegalDocumentViewProps) {
  return (
    <SiteShell title={doc.title} variant="form">
      <article className="space-y-6 pb-6 text-[14px] leading-relaxed text-slate-700">
        <p className="text-[12px] text-zinc-500">
          Last updated: {doc.lastUpdated}
        </p>
        <p>{doc.intro}</p>
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-2 text-[16px] font-bold text-slate-900">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-2">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="list-disc space-y-1.5 pl-5">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>
    </SiteShell>
  );
}

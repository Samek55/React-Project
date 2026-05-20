import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "../SiteShell";
import {
  HELPLINE_TEL,
} from "@/lib/site-content";
import {
  IconCallOutline,
  IconCashOutline,
  IconFlagOutline,
  IconKeyOutline,
  IconPeopleOutline,
  IconShieldCheck,
  IconStarOutline,
  IconSwapHorizontal,
  IconTrendingUp,
} from "./AboutIcons";

export const metadata: Metadata = {
  title: "About | Nepal Motor",
  description:
    "Learn about NEPAL Motor — trusted used car exchange, buy, and sell services in Nepal.",
};

const stats = [
  { value: "3+", label: "Branches" },
  { value: "500+", label: "Cars Sold" },
  { value: "100%", label: "Verified" },
  { value: "24/7", label: "Support" },
] as const;

const services = [
  {
    Icon: IconSwapHorizontal,
    title: "Exchange to EV",
    desc: "Trade your petrol or diesel vehicle for a modern electric car with guided valuation and full exchange support.",
  },
  {
    Icon: IconCashOutline,
    title: "Sell Used Car",
    desc: "Get a genuine market-based valuation, professional inspection, and hassle-free ownership transfer.",
  },
  {
    Icon: IconKeyOutline,
    title: "Buy Used Car",
    desc: "Browse inspected pre-owned vehicles with verified documents and branch-backed purchase guidance.",
  },
] as const;

const values = [
  { Icon: IconShieldCheck, label: "Transparency" },
  { Icon: IconStarOutline, label: "Quality" },
  { Icon: IconPeopleOutline, label: "Trust" },
  { Icon: IconTrendingUp, label: "Value" },
] as const;

const missionText =
  "To make the used vehicle market more organized, secure, and convenient by offering professional support, technical evaluation, and end-to-end assistance throughout every stage of the vehicle journey.";

export default function AboutPage() {
  return (
    <SiteShell title="About" activeNav="about" variant="form">
      <div className="space-y-5 pb-2">
        <section className="rounded-[20px] border border-sky-200 bg-sky-50 px-5 py-8 text-center">
          <Image
            src="/logo.jpeg"
            alt=""
            width={72}
            height={72}
            className="mx-auto mb-3.5 h-[72px] w-[72px] rounded-full border-2 border-sky-700 object-cover"
            priority
          />
          <p className="text-[26px] font-black text-sky-800">NEPAL Motor</p>
          <p className="mt-2 px-2 text-[14px] leading-relaxed text-slate-700">
            Nepal&apos;s trusted platform for used car exchange, buying, and
            selling
          </p>
        </section>

        <div className="flex gap-2.5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col items-center rounded-[14px] border border-slate-200 bg-white py-3.5 shadow-[0_2px_6px_rgba(7,89,133,0.07)]"
            >
              <span className="text-[22px] font-black text-sky-800">
                {s.value}
              </span>
              <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <section className="flex gap-3.5 rounded-[14px] border border-slate-200 bg-white p-4 shadow-[0_2px_6px_rgba(7,89,133,0.06)]">
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-sky-50">
            <IconFlagOutline className="h-[22px] w-[22px]" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-extrabold text-sky-950">
              Our Mission
            </h2>
            <p className="mt-1.5 text-[13px] leading-5 text-slate-600">
              {missionText}
            </p>
          </div>
        </section>

        <h2 className="text-[17px] font-black text-slate-900">What We Offer</h2>
        <div className="space-y-2.5">
          {services.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-3.5 rounded-[14px] border border-slate-200 bg-white p-4 shadow-[0_2px_6px_rgba(7,89,133,0.06)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50">
                <Icon className="h-[22px] w-[22px]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-extrabold text-sky-800">
                  {title}
                </h3>
                <p className="mt-1 text-[13px] leading-[19px] text-slate-600">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-[17px] font-black text-slate-900">Our Values</h2>
        <div className="flex flex-wrap gap-2.5">
          {values.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex min-w-[44%] flex-1 flex-col items-center gap-2 rounded-[14px] border border-slate-200 bg-white p-3.5 shadow-[0_1px_4px_rgba(7,89,133,0.05)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[13px] font-extrabold text-sky-950">
                {label}
              </span>
            </div>
          ))}
        </div>

        <a
          href={HELPLINE_TEL}
          className="flex items-center justify-center gap-2.5 rounded-[14px] bg-sky-800 py-4 font-extrabold text-white shadow-[0_4px_10px_rgba(7,89,133,0.3)] transition-colors hover:bg-sky-950"
        >
          <IconCallOutline className="h-[18px] w-[18px]" />
          <span className="text-base">Get in Touch</span>
        </a>
      </div>
    </SiteShell>
  );
}

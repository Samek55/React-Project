import { OnboardingSlide } from "../types";

// ─── ONBOARDING SLIDE DATA ───────────────────────────────────────────────────
// Three slides shown to first-time users before the main app loads.

const exchangeImage = require("../assets/car-exchange.png");
const sellImage = require("../assets/sell-used-car.png");
const buyImage = require("../assets/buy-used-car.png");

export const onboardingSlides: OnboardingSlide[] = [
  {
    type: "exchange",
    image: exchangeImage,
    title: "Exchange to EV",
    body: "Get rid of your petrol or diesel car and move into a brand new EV with guided valuation and exchange support.",
    metric: "Brand new EV path",
    detail: "Car exchange",
    aspectRatio: 1
  },
  {
    type: "sell",
    image: sellImage,
    title: "Sell Used Car",
    body: "Get genuine valuation of your car with verified vehicle details, document review, and branch-backed support.",
    metric: "Genuine valuation",
    detail: "Used car selling",
    aspectRatio: 1
  },
  {
    type: "buy",
    image: buyImage,
    title: "Buy Used Car",
    body: "Find hassle free car options with inspected vehicles, clear guidance, and smooth ownership assistance.",
    metric: "Hassle free options",
    detail: "Used car buying",
    aspectRatio: 1.48,
    resizeMode: "contain"
  }
];

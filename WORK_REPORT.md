# NEPAL Motor — Work Report

**Project:** NEPAL Motor Android Application
**Platform:** Android (primary) · Expo Web (development preview)
**Package:** `com.pracas.nepalmotor`
**Developer:** Samek Shahi
**Period:** 15 May 2026 → 24 May 2026 (Live on Google Play Store)

---

## 1. Project Overview

NEPAL Motor is a mobile-first React Native application built with Expo for the
NEPAL Motor vehicle marketplace. The app allows customers to submit inquiries for:

- **Exchange to EV** — trade in a petrol/diesel vehicle for an electric car
- **Sell Used Car** — list a used vehicle for sale with full inspection details
- **Buy Used Car** — request to buy a pre-owned vehicle with budget and preferences
- **Free Test Drive** — schedule a test drive for any listed vehicle
- **Become a Dealer** — apply to become a NEPAL Motor authorized dealer

Additional pages include a Glossary of automotive terms, FAQs, an About page,
and full legal policy documents (Terms, Privacy, Refund Policy, Disclaimer).

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Expo | SDK 51 |
| Runtime | React Native | 0.74.5 |
| UI Library | React | 18.2.0 |
| Icons | Expo Vector Icons (Ionicons) | 14.0.3 |
| SVG | React Native SVG | 15.2.0 |
| Image Picker | Expo Image Picker | 15.1.0 |
| Storage | React Native Async Storage | 1.23.1 |
| Safe Area | React Native Safe Area Context | 4.10.5 |
| Fonts | Expo Font | 12.0.10 |
| Environment | React Native Dotenv | 3.4.11 |
| Language | JavaScript (ES2022) with TypeScript config |
| Build | Android Gradle 8.10.2 · Kotlin 1.9.23 |
| JS Engine | Hermes (enabled) |

---

## 3. Development Timeline

### Day 1 — 15 May 2026 · Project Start
- Set up React Native Expo project from scratch
- Built the initial Exchange to EV inquiry form with all core fields:
  vehicle details, contact information, document upload, feature selection

### Day 2 — 16 May 2026 · Core Forms & Android Build
- Refined form interactions, validation, and spacing
- Fixed mobile navigation bar and call button
- Implemented inline field validation (phone format, email regex, year range)
- Integrated the Nepal Motor full-flag launcher icon
- Generated first Android release APK (`com.broadpress.nepalmotor` initial build)
- Updated README with project documentation

### Day 3 — 17 May 2026 · Submission & Multi-form
- Fixed mobile form submission (multipart upload was failing on native)
- Resolved features handling in FormData (server required multiple field formats)
- Added sell and buy form variants sharing the same form state structure
- Built the initial release APK and prepared the release package

### Day 4 — 18 May 2026 · API Reliability & Airtable
- Implemented three-endpoint fallback chain for vehicle submission
  (www subdomain → no subdomain → fallback URL)
- Confirmed features are sent in all expected formats to the API
- Fixed vehicle upload submission for both document and photo fields
- Bumped Android version codes for each release build
- Switched to the confirmed working vehicle submission endpoint

### Day 5 — 19 May 2026 · TypeScript, Glossary & Design
- Added Expo TypeScript configuration (`tsconfig.json`)
- Fixed Expo Image Picker TypeScript compatibility
- Fixed TypeScript and release Proguard/obfuscation configuration
- Restored Android multi-architecture device support (armeabi-v7a, arm64-v8a, x86, x86_64)
- Redesigned onboarding carousel, splash screen, and drawer navigation
- Expanded the Glossary from basic terms to 10 terms per letter (A–Z)
  with a grid-based alphabet selector

### Day 6 — 20 May 2026 · Navigation Polish & New Pages
- Added drawer navigation (hamburger menu) with primary and secondary links
- Refined drawer height, positioning, and scroll behaviour across multiple iterations
- Fixed splash screen double-show bug and onboarding skip button position
- Added FAQs page with filter chips and accordion expand/collapse
- Added safe-area bottom insets for footer tab bar on notched devices
- Renamed "Branches" to "Dealers" in navigation
- Added city dropdown filter to Dealers page
- Routed Buy Used Car and Test Drive forms to their own API endpoints
- Updated vehicle color options

### Day 7 — 21 May 2026 · About Page & Legal
- Built the About page (hero, stats, mission, services, values, CTA)
- Updated dealer status submission and dealer API endpoint
- Bumped Android version to current release

### Day 8 — 22 May 2026 · Legal Agreement & Navigation
- Added legal agreement checkbox (Terms, Privacy, Refund, Disclaimer) to all forms
- Policy names are tappable links that navigate to the full policy page
- Hardware Android back button returns from policy pages to the previous form
- Refined app navigation ordering
- Updated README for current feature set
- Bumped Android version code

### Day 9 — 23 May 2026 · Dealer Form & Screenshots
- Replaced the Dealers listing page with a "Become a Dealer" application form
  (original page archived in `_archive/DealersPage.js`)
- Updated drawer navigation to reflect the new dealer form
- Updated app-level navigation layout
- Generated Play Store screenshots for all seven main app screens

### Day 10 — 24 May 2026 · Repository Cleanup & Code Quality
- Removed 28 large binary files (APK/AAB/ZIP) from git tracking (~967 MB freed)
- Rewrote git history to purge binary blobs — repository shrunk from 1,041 MB to 12 MB
- Updated `.gitignore` with proper exclusions for build artifacts
- Removed unused `AIRTABLE_TOKEN` import and dead constants
- Fixed Android deep link scheme to match app package ID
- Made year validation dynamic (no longer hardcoded to 2026)
- Synced `app.json` version to match Android `versionName`
- Added comprehensive JSDoc comments and section dividers throughout `App.js`
- Wrote this work report

---

## 4. Key Features Implemented

### Forms
| Feature | Exchange | Sell | Buy | Test Drive | Dealer |
|---|:---:|:---:|:---:|:---:|:---:|
| Name / Phone / Email | ✅ | ✅ | ✅ | ✅ | ✅ |
| City selector | ✅ | ✅ | ✅ | ✅ | ✅ |
| Vehicle type / brand / model | ✅ | ✅ | ✅ | ✅ | — |
| Year & KM driven | ✅ | ✅ | — | — | — |
| Fuel type & transmission | ✅ | ✅ | ✅ | ✅ | — |
| Feature multi-select | ✅ | ✅ | ✅ | ✅ | — |
| Document upload (≤5 files) | ✅ | ✅ | — | — | — |
| Photo upload (≤5 files) | ✅ | ✅ | — | — | ✅ |
| EV brand preference | ✅ | — | — | — | — |
| Budget / Selling price | — | ✅ | ✅ | — | — |
| Finance interest | ✅ | — | ✅ | ✅ | — |
| Legal agreement | ✅ | ✅ | ✅ | ✅ | ✅ |
| Company name | — | — | — | — | ✅ |

### Validation Rules
- Full Name: required
- Phone: required, exactly 10 digits
- Email: optional, validated against RFC-style regex on blur
- Year: required (Exchange/Sell), range 1981 – current year (dynamic)
- Vehicle Model: required, alphabets only
- Vehicle Brand: required
- Color, Transmission, Fuel Type: required dropdowns
- EV Brand: required for Exchange form
- Finance: required for Exchange, Buy, Test Drive
- Budget: required for Buy form
- Documents + Photos: required for Exchange and Sell
- Policy agreement: required on all forms

### Navigation
- **Footer tab bar** — 5 tabs (Exchange, Buy, Sell, Dealers, Test Drive)
- **Hamburger drawer** — full nav including About, FAQs, Glossary, Contact
- **Hardware back button** — Android back returns from policy pages to the form
- **Policy page links** — inline tappable text in the agreement row

### Other Pages
- **Onboarding** — 3-slide carousel, persisted once completed
- **FAQs** — filterable accordion (Exchange, General, Sell, Buy, Branches)
- **Glossary** — A–Z automotive terms with alphabet grid selector
- **About** — hero, stats, mission, services, values, call CTA
- **Legal pages** — Terms of Service, Privacy Policy, Refund Policy, Disclaimer

---

## 5. Android Build Configuration

| Setting | Value |
|---|---|
| Application ID | `com.pracas.nepalmotor` |
| Min SDK | 23 (Android 6.0 Marshmallow) |
| Target SDK | 35 (Android 15) |
| Compile SDK | 35 |
| Version Code | 45 |
| Version Name | 1.0.45 |
| JS Engine | Hermes |
| Architectures | armeabi-v7a, arm64-v8a, x86, x86_64 |
| Proguard | Enabled for release |
| Resource shrinking | Enabled for release |
| Signing | Release keystore via `keystore.properties` |

---

## 6. API Endpoints

| Endpoint | Method | Form | Format |
|---|---|---|---|
| `/api/vehicle-listings` | POST | Exchange / Sell | Multipart FormData |
| `/api/vehicle-submission` | POST | Exchange / Sell (fallback) | Multipart FormData |
| `/api/buy-used-cars` | POST | Buy Used Car | JSON |
| `/api/test-drive` | POST | Free Test Drive | JSON |
| `/api/become-a-dealer` | POST | Dealer Application | Multipart FormData |

All endpoints are hosted at `www.nepalmotor.com`. Exchange and Sell submissions
use a three-endpoint fallback chain to handle CDN/redirect edge cases.

---

## 7. File Structure

```
NEPAL Motor/
├── App.js                          Main application (single-file architecture)
├── app.json                        Expo config: name, version, icons, plugins
├── package.json                    npm scripts and dependencies
├── package-lock.json               Locked dependency tree
├── babel.config.js                 Babel with react-native-dotenv plugin
├── tsconfig.json                   TypeScript config (JS with type checking off)
├── .env.example                    Environment variable template
├── .env                            Local secrets (git-ignored)
├── .gitignore                      Excludes binaries, logs, secrets, generated files
├── README.md                       Project setup and build instructions
├── WORK_REPORT.md                  This document
├── screenshot.js                   Puppeteer script for generating screenshots
│
├── assets/                         App icons and form imagery
│   ├── nepal-motor-icon-safe.png   App launcher icon (safe zone cropped)
│   ├── nepal-motor-adaptive-foreground-safe.png
│   ├── nepal-flag-logo.jpeg        Brand logo used in header and splash
│   ├── car-exchange.png            Onboarding slide image
│   ├── sell-used-car.png           Onboarding slide image
│   └── buy-used-car.png            Onboarding slide image
│
├── android/                        Native Android project
│   ├── app/
│   │   ├── build.gradle            App-level Gradle config (version, signing, SDK)
│   │   ├── proguard-rules.pro      Release code shrinking rules
│   │   ├── debug.keystore          Debug signing keystore
│   │   └── src/main/
│   │       ├── AndroidManifest.xml Permissions, activities, deep link scheme
│   │       ├── java/com/pracas/nepalmotor/
│   │       │   ├── MainActivity.kt
│   │       │   └── MainApplication.kt
│   │       └── res/                Launcher icons and splash resources
│   ├── build.gradle                Root Gradle config
│   ├── gradle.properties           Build flags (Hermes, Proguard, architectures)
│   └── settings.gradle             Module and autolinking configuration
│
├── release/                        Play Store submission assets (git-tracked)
│   ├── screenshots/                Seven Play Store screenshots (PNG)
│   ├── feature-graphic.html        512×512 feature graphic source
│   ├── about-mockup.*              Design mockup files
│   ├── ds*.html / ps*.html         Device and Play Store screenshot templates
│   └── *.css / *.js                Screenshot styling utilities
│
└── _archive/
    └── DealersPage.js              Original dealers listing page (replaced by form)
```

---

## 8. Environment Variables

| Variable | Description | Required |
|---|---|---|
| `AIRTABLE_TOKEN` | Airtable personal access token | No (future use) |

The `.env` file is git-ignored. Copy `.env.example` to `.env` to configure locally.

---

## 9. Release Process

### Building the APK / AAB

```powershell
# Set environment variables
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_HOME = $sdk
$env:ANDROID_SDK_ROOT = $sdk
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:Path = "$sdk\platform-tools;$sdk\emulator;$env:Path"

# Build release AAB (for Play Store)
cd android
.\gradlew.bat bundleRelease --console=plain

# Build release APK (for direct install / testing)
.\gradlew.bat assembleRelease --console=plain
```

Output locations:
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- APK: `android/app/build/outputs/apk/release/app-release.apk`

### Verifying the Build

```powershell
# Confirm package name before sharing
& "$env:LOCALAPPDATA\Android\Sdk\build-tools\34.0.0\aapt.exe" dump badging release\NEPAL-Motor-release.apk
# Expected: package: name='com.pracas.nepalmotor'
```

### Play Store Submission Checklist

- [x] Release AAB generated and signed with upload keystore
- [x] `versionCode` incremented (currently 45)
- [x] `versionName` updated (currently 1.0.45)
- [x] Play Store screenshots prepared (7 screens, PNG)
- [x] Feature graphic prepared (`release/feature-graphic.html`)
- [x] App description, short description, and keywords written
- [x] Privacy Policy URL provided to Play Store
- [x] Content rating questionnaire completed
- [x] Target audience set (18+)
- [x] App category set (Tools / Automotive)
- [x] Release notes written for the version

---

## 10. Known Limitations & Future Work

| Item | Notes |
|---|---|
| iOS not released | Project configured for Android only; iOS build not attempted |
| Single JS file | `App.js` contains all components (~4,300 lines); can be split into separate component files as the project grows |
| No offline support | All form submissions require an active internet connection |
| Node.js v24 in use | Expo 51 officially supports up to Node 20; currently working but may need attention on future upgrades |
| Dealer listing | `_archive/DealersPage.js` contains the original live dealer listing page; can be restored if Airtable integration is needed |

---

## 11. Commit Summary

| Date | Commits | Focus |
|---|---|---|
| 15 May 2026 | 1 | Initial app scaffold and Exchange form |
| 16 May 2026 | 7 | Form polish, validation, launcher icon, first APK |
| 17 May 2026 | 5 | Multipart upload fix, sell/buy forms, release build |
| 18 May 2026 | 8 | API fallback chain, Airtable features, version bumps |
| 19 May 2026 | 6 | TypeScript config, Glossary expansion, onboarding redesign |
| 20 May 2026 | 17 | Drawer nav, FAQs, safe area, buy/test-drive routing |
| 21 May 2026 | 4 | About page, dealer endpoint, version bump |
| 22 May 2026 | 3 | Legal agreement checkbox, nav refinement, README |
| 23 May 2026 | 4 | Dealer form, screenshots, nav updates |
| 24 May 2026 | 2 | Repository cleanup, code quality, comments |
| **Total** | **57** | |

---

*Report prepared by Samek Shahi · NEPAL Motor · 24 May 2026*

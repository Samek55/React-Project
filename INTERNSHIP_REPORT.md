# Internship Daily Progress Report
### NEPAL Motor — React Native Application

---

## Candidate Information

| Field | Details |
|-------|---------|
| **Name** | Samek Shahi |
| **Expertise / Role** | React Native Developer Intern |
| **Project** | NEPAL Motor (Android Application and IOS Application) |
| **Tech Stack** | React Native · Expo SDK 54 · TypeScript · EAS Build · Node.js |
| **Internship Start** | 20 May 2026 |
| **Internship Duration** | 3 Months |
| **Daily Session** | 11:00 AM – 2:00 PM (Nepal Standard Time) |
| **Supervisor / Mentor** | Dipak Bohara |
| **Organization** | NEPAL Motor |

---

## Project Overview

**NEPAL Motor** is a production-grade mobile application built with React Native and Expo SDK 54 for the NEPAL Motor vehicle marketplace in Nepal. The application is live on the Google Play Store under the package identifier `com.pracas.nepalmotor` and serves thousands of real users across Nepal who are looking to exchange, buy, or sell vehicles — including a special Exchange to EV program promoting electric vehicle adoption.

The app is built using a **bare React Native + Expo workflow**, meaning it has a native `android/` directory for full control over the build process, while still leveraging the Expo ecosystem for tooling, asset management, and cloud builds via EAS (Expo Application Services).

**Core Service Features:**
- Exchange to EV — Trade in old petrol vehicles for electric vehicles
- Sell Used Car — Submit vehicle details and photos for listing
- Buy Used Car — Browse and inquire about available vehicles
- Free Test Drive — Book a test drive at a NEPAL Motor showroom
- Become a Dealer — Apply for a dealership partnership
- Glossary — Automotive terminology reference
- FAQs — Common customer questions
- Admin Login — Secure in-app administrator authentication portal

---

## Daily Logs

---

## Week 1 — 20 May to 26 May 2026 (Wednesday – Tuesday)

---

### Day 1 — 20 May 2026 (Wednesday)

**Progress:**
The first day of the internship was dedicated entirely to onboarding and environment setup. I began by cloning the NEPAL Motor repository from the organization's version control system and installing all required Node.js dependencies using `npm install`. Once the environment was ready, I launched the Metro bundler and verified the app ran correctly in the Expo Go client on an Android device.

Following that, I spent several hours systematically exploring the entire codebase. I studied the top-level directory structure — understanding the role of each folder including `screens/`, `components/`, `data/`, `constants/`, `styles/`, `assets/`, and `android/`. I traced the complete navigation flow from the root `App.tsx` through the `DrawerNavigation` and `FooterNav` components, understanding how users move between the five main service forms and the utility screens (FAQs, Glossary, About, Legal pages).

I also read through all five service form screens — Exchange to EV, Buy Used Car, Sell Used Car, Free Test Drive, and Become a Dealer — to understand their input fields, validation logic, and API submission patterns. By end of session, I had a clear mental model of the full app architecture.

**Learning:**
Gained a deep understanding of the architecture of a production-scale React Native application. Learned how Expo manages the development workflow using Metro bundler and how hot-reloading accelerates the development cycle. Understood the importance of separating concerns across layers — screens handle user-facing logic, components handle reusable UI, data files handle static content, constants centralize configuration, and styles centralize design tokens. This separation makes large codebases maintainable and testable.

**Skills Gained:**
React Native project architecture · Expo bare workflow structure · Metro bundler setup · codebase navigation and reading unfamiliar code systematically

**Message to Mentor:**
I am very excited to start contributing to a live production application that serves real users. The codebase is well-structured and the separation of concerns is clear, which made onboarding much easier than I expected. I look forward to making my first code contribution tomorrow.

---

### Day 2 — 21 May 2026 (Thursday)

**Progress:**
Today I began the first major technical task of the internship: migrating the entire codebase from JavaScript to TypeScript. I started by auditing all existing `.js` and `.jsx` files across the repository, documenting which files would require type annotations and which had complex prop structures that needed dedicated interfaces.

I then began the migration incrementally — starting with the simplest utility files and constants, then moving on to shared components, and finally the screen-level files. For each file, I added explicit TypeScript type annotations to all function parameters, return types, `useState` variables, and `useRef` instances. For components, I defined `interface` blocks for all incoming props. I converted all `.js` files to `.ts` and all `.jsx` files to `.tsx`.

By end of session, I had migrated approximately 40% of the codebase. The TypeScript compiler was already catching several implicit `any` types and incorrect prop shapes that had been silently ignored in JavaScript — confirming the value of the migration.

**Learning:**
Gained hands-on experience with TypeScript in a React Native context. Learned the key differences between TypeScript-specific patterns (interfaces, type aliases, generics, union types) and plain JavaScript. Understood how typing component props with interfaces makes it immediately clear what data a component expects, which dramatically reduces integration bugs. Also learned that TypeScript's strict mode forces you to handle `null` and `undefined` cases explicitly — something JavaScript silently ignores until runtime.

**Skills Gained:**
TypeScript — component prop interfaces, `useState` typing, function return types, type annotations for React Native components and hooks

**Message to Mentor:**
The TypeScript migration is more involved than I initially expected — each file requires careful thought about what types each variable and function should carry. However, even on day one of the migration, the TypeScript compiler has already caught several subtle type mismatches that would have been difficult to debug at runtime. The investment is clearly worth it.

---

### Day 3 — 22 May 2026 (Friday)

**Progress:**
Continued the TypeScript migration, focusing today on the more complex parts of the codebase: the navigation components (`DrawerNavigation.tsx`, `Header.tsx`, `FooterNav.tsx`) and the form screens with complex state management. These files required defining multiple interfaces — for navigation props, drawer items, form state objects, and API response shapes.

In parallel, I set up the TypeScript configuration file (`tsconfig.json`) at the project root. I configured it with `"strict": true` to enable the full suite of TypeScript checks, set `"jsx": "react-native"` for React Native compatibility, and configured path aliases so imports remain clean across the project. I also updated `babel.config.js` to include the `@babel/plugin-transform-typescript` plugin, which allows Babel (used by Metro) to strip TypeScript types at build time.

After these configuration changes, I resolved all remaining TypeScript compile-time errors that the strict configuration surfaced — primarily around optional chaining on potentially-null navigation references and missing return types on callback functions.

**Learning:**
Learned how to configure TypeScript from scratch in an Expo project, which involves coordinating between three different configuration files: `tsconfig.json` (TypeScript compiler), `babel.config.js` (Babel/Metro bundler), and `app.json` (Expo configuration). Understood that Expo uses Babel to strip TypeScript types at build time rather than using the TypeScript compiler directly for transpilation — meaning `tsconfig.json` is used for type-checking only, not for generating JavaScript output. This is an important nuance that distinguishes React Native TypeScript setup from standard Node.js TypeScript projects.

**Skills Gained:**
TypeScript — `tsconfig.json` with `strict: true`, Babel TypeScript integration, path alias configuration, resolving compile-time errors in navigation and form components

**Message to Mentor:**
Setting up the TypeScript configuration correctly required understanding how Expo, Metro, and Babel interact. I initially made the mistake of trying to use `ts-node` for compilation, which is not compatible with React Native's Babel-based build pipeline. Understanding the correct architecture helped me configure everything properly.

---

### Day 4 — 23 May 2026 (Saturday)

**Progress:**
Completed the full TypeScript migration today. All remaining `.js` and `.jsx` files across the entire repository were converted to `.ts` and `.tsx`. This included the data files in `data/`, the API utility functions in `utils/`, and the constants file. Every function, hook, component, and module in the codebase now has explicit TypeScript type annotations.

After the migration was complete, I ran the TypeScript compiler in `--noEmit` mode to perform a full type check across the entire project and resolved every remaining type error. The project compiled cleanly with zero errors and zero warnings.

In the second half of the session, I rewrote the `README.md` from scratch. The new README documents the full TypeScript app structure, the folder organization and the purpose of each directory, step-by-step environment setup instructions for new developers, how to run the project on Android and web, how to configure environment variables, and a short overview of the app's features. This serves as the official onboarding document for any future developer joining the project.

**Learning:**
Practiced writing clear, professional technical documentation targeted at developers who are unfamiliar with the codebase. Understood the key principle that good documentation answers "what is this for and how do I get started?" in the minimum number of words — without hiding essential steps. Learned how to structure a README with a clear hierarchy: project overview → prerequisites → setup → folder structure → features → scripts → deployment.

**Skills Gained:**
TypeScript — full production codebase migration, zero-error compilation · Documentation — README writing for developer onboarding, folder structure documentation, environment setup guides

**Message to Mentor:**
Writing the README forced me to think about the project from the perspective of a developer who has never seen it before. I realized that many steps I had memorized during setup were not written down anywhere, and a new developer would have struggled to get started. Keeping documentation accurate and complete is just as important as writing good code.

---

### Day 5 — 24 May 2026 (Sunday)

**Progress:**
Today was dedicated to comprehensive testing of the entire application following the TypeScript migration. I systematically tested every screen and every user flow to ensure the migration had not introduced any regressions or behavioral changes.

The testing covered: all five service form screens (verifying inputs, validation, and form submission), the navigation drawer (open/close, active state highlighting, link routing), the footer tab bar (active tab switching), all legal pages (Terms, Privacy, Refund, Disclaimer), the FAQs accordion, the Glossary filter, and the About page. I tested on both the Android Expo Go client and the web browser.

During testing, I found and resolved three remaining edge-case TypeScript errors in the navigation configuration — specifically around how the `activeTab` prop was being narrowed to a union type but the comparison values in the drawer were using string literals that were not part of the union. I corrected the type definitions to accurately reflect the allowed values and added exhaustive type guards.

**Learning:**
Learned the importance of systematic, screen-by-screen regression testing after a large refactor. Without a formal test suite, manual testing must be disciplined and thorough — and I developed a personal checklist methodology to ensure no screen or flow is skipped. Also deepened my understanding of TypeScript union types and how narrowing works in conditional expressions — the TypeScript compiler's error messages, while initially cryptic, are precise guides to the exact location and nature of each type mismatch.

**Skills Gained:**
TypeScript — union type narrowing, exhaustive type guards, resolving edge-case compile errors in navigation props · Systematic regression testing methodology for React Native applications

**Message to Mentor:**
Testing after a large refactor is just as critical as the refactor itself. I now see that every significant code change should be followed by a full manual test of all affected flows — not just the code that was directly modified. I will apply this discipline to all future work on the project.

---

### Day 6 — 25 May 2026 (Monday)

**Progress:**
Today was a research and planning day focused on the next major feature: OTP (One-Time Password) phone verification for the service form submissions. Currently, users can submit forms without any phone verification, which means the phone numbers provided are unvalidated and could be fake, reducing the quality of leads for the business.

I researched how OTP verification is typically implemented in React Native mobile apps — studying the UX patterns used by major apps (masked phone number display, six-digit code entry, countdown-based resend button, maximum attempt limits). I then studied the existing NEPAL Motor backend API documentation to understand the available OTP endpoints: `POST /api/otp/send` (which sends an OTP to a given phone number) and `POST /api/otp/verify` (which verifies the code entered by the user).

I also planned the component architecture for the OTP flow: a modal overlay that would intercept the normal form submission, capture the phone number, trigger the OTP send, display the code entry screen, and only allow the actual form submission to proceed after successful verification. I documented this plan before writing any code.

**Learning:**
Understood the security rationale behind OTP verification in mobile form submissions — it prevents spam submissions with fake contact numbers, ensures leads have real phone numbers that the business can actually contact, and improves overall data quality. Also learned the UX best practices for OTP flows: always mask the phone number (e.g. show `98****34` instead of the full number) to confirm the number without fully exposing it, always provide a countdown timer before the resend button becomes active to prevent abuse, and always show clear error messages distinguishing between wrong code, expired code, and too many attempts.

**Skills Gained:**
API Integration — understanding RESTful OTP API patterns, request/response structures for phone verification flows · Mobile security best practices for form submission

**Message to Mentor:**
Taking a full research day before starting implementation was the right call. Understanding the backend API structure, the UX patterns, and the security requirements before writing a single line of code meant I could plan a clean component architecture rather than building it incrementally and having to refactor.

---

### Day 7 — 26 May 2026 (Tuesday)

**Progress:**
With the research complete, I began building the OTP verification modal component today. The component is implemented as a React Native `Modal` with `transparent={true}` and an animated slide-up entry, overlaying the current screen rather than navigating to a new screen.

The modal has two internal screens that transition between each other using a shared `step` state variable:

**Step 1 — Phone Entry:** Displays a labeled `TextInput` for the user to enter their phone number, a "Send OTP" button, and explanatory copy. The phone number field uses `keyboardType="phone-pad"` to show the numeric keyboard on mobile.

**Step 2 — Code Entry:** Displays the masked phone number (e.g. `98XXXXXX34` — showing only the first two and last two digits), a six-digit OTP input field, a "Verify" button, and a countdown-based "Resend OTP" button. The OTP field uses `maxLength={6}`, `keyboardType="number-pad"`, and auto-focuses when Step 2 becomes active using a `TextInput` ref and `setTimeout` delay to account for the animation.

I also built the phone number masking utility function as a pure TypeScript helper: it takes the full phone number string and returns the masked version, handling both 10-digit and shorter numbers gracefully.

**Learning:**
Gained significant experience building multi-step modal flows in React Native. Learned how to use `useRef<TextInput>(null)` combined with `ref.current?.focus()` inside a `setTimeout` to auto-focus an input after a modal transition animation completes — the `setTimeout` delay is necessary because the focus call must happen after the JavaScript thread has processed the animation frame. Also learned the technique for masking phone numbers using string slicing and character replacement, and why showing only a few digits (rather than none) gives users enough information to confirm their number is correct without exposing the full number.

**Skills Gained:**
React Native UI — multi-step modal with `step` state, `TextInput` ref management, programmatic auto-focus with `setTimeout`, phone number masking utility function, `keyboardType` configuration

**Message to Mentor:**
Building the OTP modal from scratch rather than using a third-party library gave me a deep understanding of how React Native handles modal layering, keyboard management, and focus control between input fields. These are fundamental skills that will help me build any complex interactive UI in the future.

---

## Week 2 — 27 May to 02 June 2026 (Wednesday – Tuesday)

---

### Day 8 — 27 May 2026 (Wednesday)

**Progress:**
Today I integrated the OTP modal with the live backend API and implemented the complete request lifecycle for both the Send OTP and Verify OTP flows.

**Send OTP flow:** On button press, the phone number is validated (must be 10 digits, must start with 98 or 97 for Nepal numbers). If valid, a loading spinner replaces the button text, the `POST /api/otp/send` request is made, and on success the modal transitions to Step 2. The countdown timer for the resend button starts immediately — 60 seconds, counting down to zero, after which the "Resend OTP" button becomes active.

**Verify OTP flow:** On entering the six-digit code and pressing "Verify", a loading spinner is shown, and the `POST /api/otp/verify` request is made with the phone number and code. On success, the modal closes and the parent form's actual submission function is called, completing the form submission with a verified phone number attached.

The countdown timer was implemented using `setInterval` inside a `useEffect`. The effect sets up an interval that decrements a `countdown` state variable every second. When `countdown` reaches zero, the interval is cleared. Critically, the `useEffect` returns a cleanup function that calls `clearInterval` — this ensures the timer is stopped and the interval reference is garbage-collected when the modal unmounts, preventing a memory leak.

**Learning:**
Learned to manage the complete lifecycle of multiple concurrent async API calls within a single React Native component — handling the loading state (`isLoading` boolean), success state (step transition or modal close), and error state (error message display) for each API call independently. Implemented countdown timers using `setInterval` in `useEffect` and learned why the cleanup function is essential: without it, if the user closes the modal before the timer finishes, the interval continues running in the background, calling `setState` on an unmounted component, which causes a React warning and can lead to memory leaks in long-running sessions.

**Skills Gained:**
API Integration — async OTP send/verify HTTP requests, loading state management per API call · React Native UI — countdown timer with `setInterval`, step-based state machine for multi-screen modal

**Challenge & Solution:**
The OTP resend countdown timer was continuing to run after the modal was closed, calling `setState` on an unmounted component. Fixed by returning `() => clearInterval(intervalRef.current)` as the cleanup function from the `useEffect` that set up the timer — React calls this cleanup function automatically when the component unmounts, stopping the interval and preventing the memory leak.

**Message to Mentor:**
Implementing the countdown timer taught me one of the most important React patterns: always clean up side effects in `useEffect`. Memory leaks caused by unconsumed intervals and event listeners are one of the most common performance problems in long-running React Native apps, and I now have a clear mental model of how to prevent them.

---

### Day 9 — 28 May 2026 (Thursday)

**Progress:**
Today I focused exclusively on hardening the OTP flow with comprehensive error handling. Previously, any failed API call showed only a generic "Something went wrong" message, which gives users no actionable information. I replaced all generic error messages with specific, contextual messages for each failure scenario.

The error scenarios I handled:

- **Wrong OTP code:** "Incorrect code. Please check and try again."
- **Expired OTP:** "This code has expired. Please request a new one."
- **Too many wrong attempts:** "Too many incorrect attempts. Please request a new OTP."
- **OTP send failure (server error):** "Could not send OTP. Please try again in a moment."
- **Network failure (no internet):** "No internet connection. Please check your network and try again."
- **Phone number already verified:** "This number is already verified."

Each error message is displayed in an inline error banner inside the modal — a View with a light red background (`#FEF2F2`), a red border, a warning icon, and red text. The banner appears below the input field and above the action button, so the user can see both the error and the relevant input at the same time without scrolling.

I also ensured the phone number remains masked throughout the entire Step 2 screen for all states (normal, loading, error, and success) — verifying that no code path accidentally displayed the unmasked number.

**Learning:**
Understood the critical importance of specific, actionable error messages in mobile UX. A vague error message frustrates the user and often leads them to abandon the form entirely — they have no idea whether to try again, check their phone, wait, or contact support. A specific message like "This code has expired. Please request a new one." immediately tells the user exactly what to do next. This is the standard expected in production applications and something I will apply to every UI I build going forward. Also deepened my understanding of conditional rendering patterns in React Native for showing/hiding error states.

**Skills Gained:**
React Native UI — contextual error state rendering with inline banners, conditional `StyleSheet` application for error states, privacy-safe data display across all component states

**Message to Mentor:**
After implementing specific error messages, I realize that good error handling is actually more important than the happy path for real-world user trust. Most users will eventually encounter an error — and how the app communicates that error determines whether they trust the app enough to try again or give up entirely.

---

### Day 10 — 29 May 2026 (Friday)

**Progress:**
Today I implemented auto-dismiss behaviour for all success confirmation messages across the five service form screens (Exchange to EV, Sell Used Car, Buy Used Car, Free Test Drive, Become a Dealer). Previously, after a successful form submission, a success banner appeared on screen and stayed there permanently until the user navigated away — there was no automatic dismissal.

The implementation uses a `useEffect` that watches the `submissionSuccess` state variable. When it transitions to `true` (i.e., the API call succeeds and the form is submitted), the effect sets a `setTimeout` for 3000 milliseconds (3 seconds). After 3 seconds, `setSubmissionSuccess(false)` is called, which hides the banner and resets the form back to its empty state, ready for another submission. The `useEffect` cleanup function cancels the timeout if the component unmounts before the 3 seconds elapse — preventing a `setState` call on an unmounted component (the same memory leak pattern I fixed in Day 8).

I applied this pattern consistently across all five form screens, extracting the logic into a shared utility hook `useAutoReset(value, delay)` to avoid duplicating the `setTimeout` + cleanup code in five separate places.

**Learning:**
Learned how to combine `setTimeout` with `useState` for time-delayed UI state transitions, and how to encapsulate this into a reusable custom hook using the `useEffect` + cleanup pattern. Understanding custom hooks deeply — that they are simply functions that call other hooks — unlocked a new level of code reuse and abstraction for me. The `useAutoReset` hook can now be used in any screen that needs time-delayed state resets, not just these five forms.

**Skills Gained:**
React Native UI — timed UI state transitions with `setTimeout` + `useState` · Custom React hooks — `useAutoReset` for reusable timed state reset logic · `useEffect` cleanup for `setTimeout` references

**Message to Mentor:**
This task taught me the power of custom hooks. Instead of copy-pasting the same `setTimeout` + `useEffect` pattern into five different screens, extracting it into a single `useAutoReset` hook means that if we ever need to change the dismiss delay (from 3 seconds to 5 seconds, for example), we change it in one place and it applies everywhere automatically.

---

### Day 11 — 30 May 2026 (Saturday)

**Progress:**
Today I identified and fixed a usability gap in the legal pages — Terms of Service, Privacy Policy, Refund Policy, and Disclaimer. These four pages were accessible via the drawer navigation but had no visible back navigation button. On Android, users could use the hardware back button to return to the previous screen. However, on iOS and web, there is no hardware back button, meaning users who navigated to a legal page had no visible way to return to the app — they were effectively trapped on the legal page unless they already knew about the gesture-based navigation.

I added a back button to the header of each legal page. The button uses an `Ionicons` left-arrow icon (`arrow-back-outline`) and is positioned in the left side of the header using the screen's `headerLeft` option in the navigation configuration. Pressing it calls `navigation.goBack()` to return the user to the previous screen. The button styling (color, size, hit area) matches the existing header style conventions used elsewhere in the app.

I also added `accessibilityLabel="Go back"` and `accessibilityRole="button"` to the button for screen reader compatibility.

**Learning:**
Gained experience implementing header-level navigation controls in Expo's navigation system. More importantly, understood the fundamental cross-platform design principle: never assume the user has a hardware back button. iOS users (and web users) rely entirely on in-app navigation affordances — any screen that does not provide a visible back button or swipe gesture is a dead end for those users. Going forward, I will always test navigation on iOS (or in web) as well as Android to catch these gaps.

**Skills Gained:**
React Native UI — `headerLeft` navigation option, back button implementation with `navigation.goBack()`, accessibility attributes · Cross-platform UX design — designing for iOS, Android, and web simultaneously

**Message to Mentor:**
This fix highlighted an important principle I will carry forward: always design for all platforms from the start. The legal pages had been in the app for a long time without anyone noticing the iOS/web navigation gap — probably because most of the testing was done on Android. Testing on multiple platforms simultaneously catches these issues early.

---

### Day 12 — 31 May 2026 (Sunday)

**Progress:**
Today I performed the major SDK upgrade — migrating the entire project from **Expo SDK 53 to Expo SDK 54**. This was a significant undertaking that required careful planning to avoid breaking the production codebase.

I started by reading the official Expo SDK 54 release notes and migration guide in full, identifying every breaking change that could affect the NEPAL Motor project. The most significant breaking changes for our project were:

1. **`expo-image-picker`** — The `launchImageLibraryAsync` and `launchCameraAsync` APIs changed their return type structure. The `cancelled` property was renamed to `canceled` (American spelling). All usages in the Sell Used Car and Exchange to EV screens required updating.

2. **`react-native-safe-area-context`** — The `SafeAreaView` import path changed. Updated all usages across the screen files.

3. **React Native version bump** — SDK 54 ships with React Native 0.74, which required updating the `android/build.gradle` and `android/app/build.gradle` files with new Gradle and build tools versions.

After making all the required changes, I ran the Metro bundler and verified every screen loaded correctly. I then tested all five service forms end-to-end, including image upload flows, to confirm the `expo-image-picker` changes worked correctly.

**Learning:**
Learned the complete process for performing a major SDK upgrade in a production React Native project: (1) Read the release notes first to identify all breaking changes before touching any code. (2) Make changes methodically, one breaking change at a time. (3) Test the affected feature immediately after each change, not all at the end. This incremental approach makes it much easier to identify which change caused a regression if one occurs. (4) After all changes, perform a full regression test of every screen and flow.

**Skills Gained:**
Expo SDK — SDK 53→54 migration, React Native 0.74 compatibility, `app.json` configuration, `expo-image-picker` API changes, dependency version management in `package.json` and Gradle files

**Message to Mentor:**
SDK upgrades are one of the more nerve-wracking tasks in mobile development because so many things can break at once. Reading the migration guide thoroughly before starting — rather than just running `npm update` and seeing what breaks — made this upgrade much smoother than it could have been. I now have a reliable, repeatable process for future SDK upgrades.

---

### Day 13 — 01 June 2026 (Monday)

**Progress:**
Today I redesigned the navigation drawer UI after receiving feedback that the drawer felt cluttered and the items were too small to read and tap comfortably on small-screen Android devices (which are very common in Nepal).

I made the following specific changes:

- **Drawer height:** Increased from `screenHeight * 0.80` to `screenHeight * 0.83` to give more vertical space for the menu items, reducing the feeling of cramped content.
- **Icon size:** All navigation icons (both SVG-based custom icons and Ionicons) were increased from their previous size to a consistent **24px** across all primary and secondary navigation items.
- **Text size:** The navigation item label font size was increased from 15px to **16px** with `fontWeight: "600"` for better legibility on AMOLED displays common in mid-range Android phones.
- **Item spacing:** The `drawerItem` style was updated with `paddingVertical: 9`, `paddingHorizontal: 12`, and `gap: 12` between icon and label — reducing excessive whitespace while keeping items comfortably tappable (minimum 44px touch target maintained per Android accessibility guidelines).
- **Section layout:** The primary items section uses `flex: 6` and the secondary items section uses `flex: 4` with `justifyContent: "space-evenly"` on both, ensuring items are distributed proportionally regardless of screen height.

**Learning:**
Gained a strong practical understanding of mobile UI/UX design principles in the context of real Android devices. The key insight is that the "correct" font size and icon size is not a fixed number — it depends on the screen density (DPI) and the distance at which users hold their device. On small-screen, high-DPI Android devices (very common in Nepal's mid-range market segment), slightly larger text and icons significantly improve usability. Also learned how `flex` ratios and `justifyContent: "space-evenly"` work together to create adaptive layouts that respond correctly to different screen heights without requiring pixel-level hardcoding.

**Skills Gained:**
UX / UI Design — responsive drawer layout with `flex` ratios, `justifyContent: "space-evenly"`, icon sizing guidelines, touch target sizing for Android accessibility · React Native StyleSheet — conditional active state styles, hover styles for web compatibility

**Message to Mentor:**
Redesigning the drawer forced me to think about the actual users of this app — people using affordable Android phones in Nepal — rather than the high-resolution simulator I use during development. Designing for the target device makes a real difference in usability, and I will always try to test on lower-end physical devices before finalizing any UI.

---

### Day 14 — 02 June 2026 (Tuesday)

**Progress:**
Today I designed and built the **Admin Login screen** from scratch. Previously, tapping "Admin Login" in the navigation drawer opened the NEPAL Motor website in the phone's browser — which was a poor experience that took users outside the app and required them to navigate a full website just to log in. The new Admin Login screen provides a native, in-app authentication experience.

The screen design uses a card-based layout centered on the screen with the following elements, from top to bottom:

1. **NEPAL Motor Logo** — The new M-in-circle teal logo inside a circular white container with a subtle shadow, displayed at 80×80px.
2. **Brand name** — "NEPAL Motor" in large, bold teal (`#0E7490`) text.
3. **ADMIN badge** — A small pill-shaped badge with a teal background and white "ADMIN" text, clearly indicating this is a restricted-access screen.
4. **Email field** — A labeled `TextInput` with `keyboardType="email-address"` and `autoCapitalize="none"`.
5. **Password field** — A labeled `TextInput` with `secureTextEntry` toggled by a show/hide eye icon button (`Ionicons` `eye-outline` / `eye-off-outline`) rendered as a `Pressable` inside the input's right side.
6. **Sign In button** — A full-width teal button with white bold text and rounded corners, showing an `ActivityIndicator` spinner while the API call is in progress.

The entire form is wrapped in a `KeyboardAvoidingView` with `behavior="padding"` to ensure the keyboard does not cover the input fields on iOS.

**Learning:**
Gained extensive experience designing professional authentication screens in React Native. Learned how to implement a password visibility toggle using `secureTextEntry={!passwordVisible}` and a `Pressable` icon button that updates the `passwordVisible` state variable. Understood that the eye icon must be placed inside the input's bounding area — achieved by using a `View` with `flexDirection: "row"` containing the `TextInput` (with `flex: 1`) and the `Pressable` icon, giving the illusion of a single input field with an embedded button. Also learned how `KeyboardAvoidingView` works and why its behavior differs between iOS (`"padding"`) and Android (`"height"`).

**Skills Gained:**
React Native UI — authentication screen design, `secureTextEntry` password visibility toggle, card layout with `shadowColor`/`elevation`, `KeyboardAvoidingView` for keyboard-safe forms, ADMIN badge pill component

**Message to Mentor:**
Building the Admin Login screen from scratch was one of the most creatively satisfying tasks so far. Having full control over the UI — and being able to match it precisely to the NEPAL Motor brand — felt very different from modifying existing components. I am proud of how the final design looks and functions.

---

## Week 3 — 03 June to 09 June 2026 (Wednesday – Tuesday)

---

### Day 15 — 03 June 2026 (Wednesday)

**Progress:**
Today I implemented client-side form validation on the Admin Login screen. Without validation, users could press the Sign In button with an empty email field, an invalid email format, or a very short password — all of which would result in unnecessary API calls that would predictably fail. Client-side validation catches these cases before a network request is made, improving both UX and server load.

The validation logic I implemented:

1. **Email presence check:** If the email field is empty, show "Please enter your email address."
2. **Email format check:** If the email does not match the regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, show "Please enter a valid email address."
3. **Password presence check:** If the password field is empty, show "Please enter your password."
4. **Password minimum length check:** If the password is fewer than 6 characters, show "Password must be at least 6 characters."

All validation runs on the "Sign In" button press — not on every keystroke. Validating on-submit is the standard for authentication forms because it avoids showing error messages prematurely (e.g. showing "invalid email" while the user is still typing "user@gm" before finishing "user@gmail.com").

If validation fails, a styled error banner appears above the Sign In button — a `View` with `backgroundColor: "#FEF2F2"`, a `#DC2626` red left border, an alert circle icon, and the error message in red text. This banner is visually distinct from the form fields and clearly draws the user's attention.

**Learning:**
Learned the best practices for mobile form validation — specifically why on-submit validation is preferred over on-change validation for authentication forms. Also learned how to use regular expressions for email format validation in TypeScript (the `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` regex is a widely used, reasonably robust email format check that covers 99% of valid email addresses without being overly strict). Understood how to conditionally apply `StyleSheet` styles for error states — giving the relevant input a red border when its validation fails — to provide additional visual feedback beyond the error banner.

**Skills Gained:**
React Native UI — on-submit form validation, email regex validation, password length check, conditional error state styling with `StyleSheet`, inline error banner component

**Message to Mentor:**
Writing validation logic seems straightforward — check if the field is empty, check if the format is correct — but designing the right user feedback for each case requires real thought. The goal is to tell the user exactly what is wrong and exactly how to fix it, in the minimum number of words. "Invalid input" is not helpful. "Please enter a valid email address." is helpful.

---

### Day 16 — 04 June 2026 (Thursday)

**Progress:**
Today I connected the Admin Login screen to the live backend authentication API and implemented the complete end-to-end authentication flow with all three states handled explicitly.

**API Integration:** On pressing Sign In (after validation passes), a `POST` request is sent to `/api/admin/login` with a JSON body containing `{ email, password }`. The `Content-Type: application/json` header is set. The response is parsed as JSON and the `status` field is checked to distinguish success from failure.

**Loading state:** While the request is in flight, `isLoading` is set to `true`, which disables the Sign In button (to prevent duplicate submissions), hides the button label, and shows an `ActivityIndicator` spinner inside the button. The email and password fields are also set to `editable={false}` during loading to prevent the user from modifying their input while the request is pending.

**Success state:** On a successful response (HTTP 200 with `status: "success"`), the form is replaced by a full-screen success view — a large green checkmark icon, "Sign In Successful" heading, a brief confirmation message, and a "Back to App" button. This confirms the action unambiguously without any ambiguity about whether the request went through.

**Error state:** On a failed response (wrong credentials, server error, or network failure), `isLoading` is set back to `false`, the error message from the API response is displayed in the error banner (or a generic fallback message if the API provides no specific message), and the form remains interactive so the user can correct their credentials and try again.

I also implemented Android hardware back button support using `BackHandler` from `react-native` — pressing the hardware back button on the Admin Login screen returns the user to the previous screen in the navigation stack.

**Learning:**
Gained real-world experience with the complete lifecycle of an authenticated API call in React Native. Learned that handling three states — loading, success, and error — is the minimum required for a production-grade API integration. Applications that only handle the success case leave users confused when things go wrong, and applications that do not show loading state create uncertainty about whether their button press was registered. Also learned how `BackHandler` works on Android and why it requires both adding and removing the event listener in a `useEffect` to avoid duplicate handlers accumulating over multiple renders.

**Skills Gained:**
API Integration — admin authentication `POST` request, three-state API lifecycle (loading / success / error), JSON response parsing, `BackHandler` for Android hardware back button

**Message to Mentor:**
Building the complete API integration — from the button press through loading, success, and error states — gave me a clear mental model of how every API call in a mobile app should be structured. I will apply this three-state pattern to every API integration I work on in the future.

---

### Day 17 — 05 June 2026 (Friday)

**Progress:**
Today I set up the complete **EAS Build** (Expo Application Services) pipeline for generating Android APK and AAB files from the cloud, eliminating the need for a local Android Studio build environment.

**EAS Configuration:** I created and configured `eas.json` at the project root with three build profiles:
- `development` — builds a debug APK for local testing with the Expo Dev Client
- `preview` — builds a release APK (`.apk` file) for direct installation and internal testing
- `production` — builds a release AAB (`.aab` file) for uploading to the Google Play Store

I linked the project to the correct EAS account (`mr.ded/nepal-motor`) by verifying the `owner`, `slug`, and `projectId` fields in `app.json` matched the EAS project configuration.

**Build Failure Diagnosis:** The first build attempt failed at the "Install dependencies" step. I fetched the build log via the EAS GraphQL API (the log is Brotli-compressed NDJSON format, decoded using `curl --compressed`) and analyzed it line by line. The error indicated that several transitive dependencies (`@jest/types`, `@types/istanbul-reports`, `@types/yargs`) were listed in the local `package-lock.json` (generated by npm v11) but were not recognized by the EAS build server which runs npm v10 — a version incompatibility in the lockfile format.

**Root cause:** The `package-lock.json` had been generated with a `puppeteer` devDependency installed locally. `puppeteer` pulls in many transitive dependencies that npm v10 resolves differently. The fix was two-fold: (1) remove `puppeteer` from `devDependencies` in `package.json` (it was not used in the project — it had been added during an earlier experiment), and (2) set the `EAS_BUILD_SKIP_LOCKFILE_CHECK=1` environment variable in the EAS build environment to bypass the lockfile format check while the team transitions to a compatible npm version.

After these fixes, the build succeeded and produced a signed APK.

**Learning:**
Learned how to configure EAS Build end-to-end for a bare-workflow React Native project — a process that involves coordinating `eas.json` build profiles, `app.json` project identifiers, and EAS account authentication. Understood the critical difference between Expo managed workflow (Expo controls the native code) and bare workflow (the developer controls the `android/` directory). Gained valuable experience reading and interpreting cloud build logs — specifically learning that EAS build logs are served in Brotli-compressed format via a signed URL and must be decoded before they can be read as text. This log-reading skill is essential for diagnosing any future cloud build failures.

**Skills Gained:**
EAS Build — `eas.json` build profile configuration (development / preview / production), EAS account linking, cloud build log decoding · Debugging — npm lockfile version incompatibility diagnosis, transitive dependency analysis · Git — incremental commits with descriptive messages at each milestone

**Challenge & Solution:**
EAS Build "Install dependencies" step failed with errors about missing transitive dependencies from `@jest/types`, `@types/istanbul-reports`, and `@types/yargs`. Root cause: the `package-lock.json` was generated by local npm v11, which resolved `puppeteer`'s transitive dependencies differently than npm v10 on the EAS build server. Fix: (1) removed `puppeteer` from `devDependencies` in `package.json` since it was unused, (2) set `EAS_BUILD_SKIP_LOCKFILE_CHECK=1` in the EAS build environment variables, (3) re-triggered the build, which succeeded.

**Message to Mentor:**
Diagnosing a cloud build failure by fetching and reading compressed binary build logs was one of the most technically challenging things I have done in this internship. The process required understanding HTTP content encoding (Brotli), the EAS GraphQL API, and NDJSON log format — none of which I had worked with before. Successfully diagnosing and fixing the issue gave me a lot of confidence in my debugging abilities.

---

### Day 18 — 06 June 2026 (Saturday)

**Progress:**
Today I replaced the old Nepal flag logo throughout the entire app with the new **NEPAL Motor M-in-circle teal logo** that the design team had finalized. The logo appears in five locations across the app: the header bar, the navigation drawer, the About page, the Splash screen, and the new Admin Login screen.

**Reusable LogoImage component:** Rather than placing the raw `<Image>` tag with separate style properties in each location (which would require duplicating the cropping and sizing logic everywhere), I created a reusable `LogoImage` component in `components/icons/LogoImage.tsx`. The component accepts a `size` prop and renders the logo at the correct scale for that size.

**Zoom-in cropping:** The source JPEG image file had approximately 6% white padding around the circular logo, meaning the teal border of the M-in-circle logo did not fill the circular `View` container at the edges — leaving a thin white gap that looked unpolished. To fix this, the `LogoImage` component renders the `Image` at `SCALE = 1.14` times the container size (i.e. 14% larger than the container), then clips the overflow using `overflow: "hidden"` on the parent `View`. This zooms the image in just enough for the teal border to fill the circular edge without any white gap, while keeping the M symbol perfectly centered and undistorted.

**New app icon assets:** I also generated three new 1024×1024px PNG asset files for the Expo configuration: `nm-logo-icon.png` (square app icon), `nm-logo-splash.png` (white-background splash screen version), and `nm-logo-adaptive-fg.png` (Android adaptive icon foreground layer). All three were updated in `app.json` to point to the new files.

**Learning:**
Learned how to build a reusable image component in React Native that zooms into an image without distortion using overflow clipping — a technique that is much more robust than manually cropping the source image, because it works at any size. Understood how Expo manages app icons, splash screens, and Android adaptive icons through `app.json` — specifically that the `icon` field provides the square app icon, `splash.image` provides the splash screen background, and `android.adaptiveIcon.foregroundImage` provides the foreground layer for Android's adaptive icon system (which allows the launcher to apply different shapes — circle, squircle, rounded square — depending on the device manufacturer). Also learned that Expo Go caches assets by filename — renaming the asset files (from `nepal-motor-icon.png` to `nm-logo-icon.png`) forced Expo Go to download the new versions on next launch.

**Skills Gained:**
React Native UI — reusable `LogoImage` component, `overflow: "hidden"` with transform scale for zoom-cropping, circular image container · Documentation — `app.json` asset management for app icon, splash screen, and Android adaptive icon

**Challenge & Solution:**
(1) The JPEG logo had ~6% white padding that prevented the teal border from filling the circular container, leaving a visible white gap at the edges. Fixed by rendering the `Image` at `SCALE = 1.14` times the container dimensions inside a `View` with `overflow: "hidden"` — zooming the image until the teal border fills the edge while keeping the center perfectly aligned. (2) Expo Go was still displaying the old Nepal flag logo from its local cache after the asset files were replaced. Fixed by renaming the asset files (Expo Go caches by filename, so a new filename forces a fresh download regardless of file content).

**Message to Mentor:**
Logo replacement seems like a simple visual task but it involved solving two non-obvious technical problems: the white padding gap and the Expo Go asset caching behavior. Both solutions required understanding how React Native's layout system and Expo's asset pipeline work at a deeper level. I now know to anticipate these kinds of subtle issues in future logo or asset replacement tasks.

---

### Day 19 — 07 June 2026 (Sunday)

**Progress:**
The final day of this week was focused on UI polish, version management, and the full APK release pipeline for **Android APK v1.0.56**.

**Footer navigation bar height:** Based on usability feedback from testing on a physical device, the footer tab bar touch targets felt too small — it was easy to miss the tap area on smaller Android screens. I increased `minHeight` from its previous value to **74** and added `paddingBottom: 12` to create more comfortable, larger tap targets for the five footer navigation icons. This change was applied in `styles/index.ts` in the `footerNav` style object.

**Drawer final adjustments:** Made final size adjustments to the navigation drawer — icon size confirmed at **24px** and navigation item text size confirmed at **16px** — based on testing feedback. These are the final, signed-off values for the v1.0.56 release.

**Version management:** Updated `versionCode` from 55 to **56** and `versionName` from `"1.0.55"` to **`"1.0.56"`** in `android/app/build.gradle`. Also updated the `version` field in `app.json` to `"1.0.56"` for Expo metadata consistency.

**APK release:** Triggered the EAS Build `preview` profile to generate the signed release APK. Monitored the build progress via the EAS dashboard. After the build succeeded (build ID `43f112f9`), downloaded the signed APK file (`NEPAL-Motor.apk`) to the local machine. Verified the APK installs and launches correctly on a physical Android device.

**Changelog:** Updated `fastlane/metadata/android/en-US/changelogs/40.txt` with entries for all changes introduced in v1.0.56, including the drawer UI refinements, new logo, Admin Login screen, and footer navigation height increase — each with the date 07 Jun 2026.

**Internship documentation:** Compiled and finalized this internship daily progress report covering all 19 days of work.

**Learning:**
Learned the complete APK release workflow for a bare-workflow React Native project: incrementing both `versionCode` (integer, must increase monotonically for Play Store) and `versionName` (human-readable string) in `build.gradle`, verifying the `version` in `app.json` is consistent, triggering the EAS cloud build, monitoring build logs, downloading the signed APK, verifying the install on a physical device, and updating the changelog. Understanding this full pipeline — from code to installable APK — is an essential skill for any Android React Native developer.

**Skills Gained:**
UX / UI Design — footer tab bar `minHeight` and `paddingBottom` for accessible touch targets, drawer icon and text size finalization · Documentation — fastlane changelog format, internship report compilation · EAS Build — version management in `build.gradle` and `app.json`, full release pipeline execution

**Message to Mentor:**
Releasing a real, signed Android APK at the end of this internship period was the most rewarding moment of the entire experience. Seeing all the features — OTP verification, Admin Login, the new logo, the refined drawer and footer — compiled into a single installable file that runs on a real device brought everything together. I am grateful for the trust and the opportunity to contribute to a live production application, and I look forward to continuing this work.

---

---

### Day 20 — 08 June 2026 (Monday)

**Progress:**
Today was focused on two major deliverables: implementing the Phase 1 push notification segmentation system and releasing the new APK build v1.0.57.

**Push notification segmentation:** The HR team specified three notification targeting requirements — dealer application alerts to admins only, booking notifications to dealers filtered by their area, and public announcements to all users. I implemented the client-side tagging logic across three service files and two screens:

- **`services/notifications.native.ts`** — Added three exported helper functions: `setUserTag(key, value)`, `setUserTags(tags)`, and `removeUserTag(key)`. Each wraps the OneSignal v5 `User.addTag` / `User.addTags` / `User.removeTag` API in a try-catch to prevent crashes on devices where the native module is not available (e.g. Expo Go). Also added `User` to the mock fallback object so the fallback doesn't throw when `setUserTag` is called before the real module loads.
- **`services/notifications.web.ts`** — Added matching no-op stub implementations for all three helpers so the web build compiles without errors.
- **`services/notifications.ts`** — Added `declare` stub exports so TypeScript can resolve the helpers from the shared import path (`../services/notifications`) which Metro routes to the correct `.native.ts` or `.web.ts` file at runtime.
- **`screens/AdminLoginScreen.tsx`** — Added `setUserTag("role", "admin")` call immediately after a successful login response, before setting the success state. This tags the admin's device in OneSignal so it appears in the "Admin" segment.
- **`screens/DealerPage.tsx`** — Added `setUserTag("role", "dealer")` and `setUserTag("area", submittedForm.city.toLowerCase())` calls after a successful dealer application submission. The city is lowercased for consistent matching (e.g. `"Kathmandu"` → `"kathmandu"`).

**OneSignal dashboard — segment setup:** Created two custom segments in the OneSignal dashboard for the NepalMotor app: **Admin** (filter: User Tag `role = admin`) and **Dealer** (filter: User Tag `role = dealer`). Verified the free plan segment limit and confirmed that the existing default **Subscribed Users** segment covers the "announce to everyone" use case without requiring a custom segment. Area-specific dealer segments (e.g. Dealers – Kathmandu) are deferred to Phase 2 when backend automation and a paid plan are in place.

**Feature graphic chip fix:** Identified a visual defect in the Google Play Store feature graphic — the pill-shaped chips for "Exchange to EV" and "Buy & Sell Cars" had their text touching the chip border because the fixed chip width (`CHW = 112px`) was too narrow for the longer text strings. Fixed by increasing `CHW` from `112` to `136` in `scripts/make-feature-graphic.mjs` and regenerating the graphic. All three chips now have consistent padding matching the "Find Dealers" chip.

**APK release v1.0.57:** Bumped `versionName` from `1.0.56` to `1.0.57` and `versionCode` from `46` to `47` in both `app.json` and `android/app/build.gradle`. Created changelog file `fastlane/metadata/android/en-US/changelogs/47.txt` documenting the push notification features. Triggered the EAS production build — EAS remote versioning applied versionCode `57` (incrementing from its own remote counter of `56`). Also backfilled missing dates `(07 Jun 2026)` into all undated bullet points in `changelogs/40.txt` for consistency.

**Learning:**
Gained a deep understanding of how OneSignal's device tagging system works: tags are key-value pairs stored per device on OneSignal's servers, written silently in the background when the `User.addTag` API is called. Tags persist across app sessions and are used to filter audiences when sending notifications — either via the dashboard (for manual sends) or via the REST API (for automated server-side sends). Understanding this architecture made it clear why no dashboard setup is needed for the tagging to work — the tags accumulate automatically as real users log in and register — and segments only need to be created when you're ready to start sending.

Also understood the distinction between Phase 1 (client-side tagging + manual dashboard sends, no backend required) and Phase 2 (server-triggered notifications using the OneSignal REST API with `filters` targeting dealers by area at booking submission time). Phasing the implementation this way allowed the HR team's requirements to be met immediately without requiring backend changes.

**Skills Gained:**
OneSignal SDK v5 — `User.addTag`, `User.addTags`, `User.removeTag`, device tagging for audience segmentation · React Native platform resolution — Metro `.native.ts` / `.web.ts` file resolution, `declare` stubs for TypeScript compatibility · Push notification strategy — segment design, Phase 1 vs Phase 2 planning · EAS Build — remote version management, `versionCode` vs EAS remote counter · Node.js image generation — Sharp compositing, SVG chip layout, pixel-level padding fixes

**Challenge & Solution:**
The OneSignal free plan has a segment limit, which was hit immediately after creating the Admin and Dealer segments — preventing the creation of area-specific dealer segments (Dealers – Kathmandu, etc.). Solution: deferred area-specific segments to Phase 2 (backend + paid plan). For Phase 1, booking notifications can be sent to the broader "Dealer" segment (all dealers), which is sufficient while the user base is small. The tagging code for `area` is already in place so no code changes will be needed when the segments are created later.

**Message to Mentor:**
Implementing the push notification segmentation made me think carefully about the difference between what the code does and what the product does. The code writes tags to OneSignal — but the product delivers the right notification to the right person at the right moment. Phasing the work correctly (client-side tagging now, automated server sends later) means the business gets value immediately without waiting for the full backend implementation. I found this kind of technical-product thinking very rewarding.

---

<!-- ============================================================ -->
<!-- ADD NEW DAYS BELOW — COPY THE TEMPLATE AND FILL IT IN       -->
<!-- ============================================================ -->

---

### Day [N] — [DD Month YYYY] ([Weekday])

**Progress:**
[Describe what you worked on today in detail. What did you build, fix, or research? What files did you modify? What decisions did you make and why? Be specific — mention file names, component names, API endpoints, or configuration settings where relevant. Aim for 3–5 sentences minimum.]

**Learning:**
[What did you learn from today's work? What concept, tool, or skill did you gain or deepen? Explain the "why" behind the learning — not just what you did, but what it taught you about how the system works. Aim for 2–4 sentences.]

**Skills Gained:**
[Which skill area, and what specifically within it? e.g. TypeScript — union types, narrowing · React Native UI — modal focus management · API Integration — three-state loading/success/error · Expo SDK — asset pipeline · EAS Build — build profiles · UX/UI Design — touch target sizing · Git — commit message discipline · Debugging — log analysis · Documentation — changelog format]

**Challenge & Solution:** *(remove this line if no notable challenge today)*
[Describe the specific problem you encountered — what symptoms you observed, what you investigated, what the root cause turned out to be, and exactly how you fixed it.]

**Message to Mentor:**
[A short, genuine message — a reflection on what you found interesting or difficult, a question you're thinking about, something that surprised you, or an expression of gratitude. 2–3 sentences.]

---

<!-- END OF DAILY LOGS -->

---

## Final Note

Dear Mentor,

This internship on the NEPAL Motor React Native project has been one of the most formative experiences of my early career as a developer. Over the course of these 20 days, I progressed from setting up a development environment and reading an unfamiliar codebase, to independently delivering production-ready features — OTP phone verification, the Admin Login screen, the new NEPAL Motor logo across all screens, drawer and footer UI refinements, a complete EAS Build and APK release pipeline, and a Phase 1 push notification segmentation system.

Each task challenged me in a different way: TypeScript migration taught me the value of type safety and documentation; OTP implementation taught me API integration and `useEffect` cleanup patterns; the Admin Login screen taught me authentication UX design; the EAS Build setup taught me how to diagnose and resolve cloud build failures by reading compressed binary logs; and the logo replacement taught me that even visually simple tasks can involve non-obvious technical challenges.

I am deeply grateful for the guidance, trust, and the opportunity to contribute to a live production application that serves real users in Nepal. I look forward to continuing to grow as a developer in the weeks ahead.

**Thank you.**

*Samek Shahi — React Native Developer Intern*
*NEPAL Motor Pvt. Ltd. | 20 May 2026 – Present*

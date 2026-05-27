# NEPAL Motor

NEPAL Motor is a mobile-first React Native app built with Expo for vehicle exchange, used-car buying and selling, test-drive requests, and dealer applications. The app is structured in TypeScript with reusable data, screen, navigation, form, icon, utility, and style modules.

The project supports Expo web previews during development and includes a native Android project for release builds.

## Overview

- **App name:** `NEPAL Motor`
- **Android package:** `com.pracas.nepalmotor`
- **Expo app version:** `1.0.55`
- **Primary platform:** Android
- **Development preview:** Expo web
- **Source entry:** `App.tsx`

## Key Features

- Exchange to EV, sell used car, buy used car, free test-drive, and dealer application forms
- Phone OTP verification before final form submission
- Terms of Service, Privacy Policy, Refund Policy, and Disclaimer pages
- Required legal agreement checkbox before submitting customer forms
- A-Z automotive glossary page
- FAQ, About, onboarding, splash, drawer navigation, and footer tab navigation screens
- Vehicle details for type, year, model, brand, color, fuel, transmission, finance, features, and notes
- Inline validation for required fields, phone number, email format, vehicle year, and policy agreement
- Upload support for vehicle documents, vehicle photos, and dealer showroom photos
- Multiple file selection with upload limits
- Single-open dropdown behavior across vehicle request forms
- API response handling for buy-used-car and test-drive submissions
- Expo web preview and native Android build support
- Custom NEPAL Motor app icon and release assets

## Technology Stack

- Expo SDK 53
- React Native 0.79
- React 19
- TypeScript
- Expo Image Picker
- Expo Status Bar
- Expo Vector Icons
- React Native Async Storage
- React Native Safe Area Context
- React Native SVG
- React Native Web

## Requirements

Install the following before running or building the project:

- Node.js
- npm
- Android Studio
- Android SDK
- Android Studio JBR or a compatible Java runtime

## Installation

```bash
npm install
```

## Development Commands

Start the Expo web preview with a cleared cache:

```bash
npm run start
```

Start the Expo web preview:

```bash
npm run web
```

Run the Android app:

```bash
npm run android
```

Run the iOS app:

```bash
npm run ios
```

Run a TypeScript check:

```bash
npx tsc --noEmit
```

## Web Export

Create a production web export:

```bash
npx expo export --platform web
```

Expo writes the exported web build to:

```text
dist/
```

## Android Release Build

The native Android project is located in:

```text
android/
```

To build a release APK on Windows PowerShell:

```powershell
$sdk="$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_HOME=$sdk
$env:ANDROID_SDK_ROOT=$sdk
$env:JAVA_HOME="C:\Program Files\Android\Android Studio\jbr"
$env:Path="$sdk\platform-tools;$sdk\emulator;$env:Path"
cd android
.\gradlew.bat assembleRelease --console=plain
```

The generated APK is written to:

```text
android/app/build/outputs/apk/release/app-release.apk
```

## Project Structure

```text
App.tsx                       Root app state, navigation, OTP flow, and form orchestration
app.json                      Expo configuration and app identity
assets/                       App icons, onboarding, and service images
components/                   Reusable OTP, icon, navigation, and form UI components
data/                         Constants, options, legal policies, FAQ, glossary, and form config
screens/                      Feature screens and page-level UI
styles/                       Shared React Native StyleSheet
types/                        Shared TypeScript interfaces and types
utils/                        Form submission and string helper functions
android/                      Native Android project
release/                      Release mockups, screenshots, and supporting assets
package.json                  npm scripts and dependencies
package-lock.json             Locked dependency versions
tsconfig.json                 TypeScript compiler configuration
babel.config.js               Babel configuration
```

## API Endpoints

Runtime endpoint constants live in:

```text
data/constants.ts
```

Current form flows post to NEPAL Motor API routes for vehicle submission, buy-used-car requests, test-drive requests, dealer applications, and OTP send/verify.

## Launcher Icon

The Android launcher icon uses the NEPAL Motor safe icon assets. If the icon does not update after installing a new build, uninstall the previous app from the device and install the APK again.

## Release Notes

- Build outputs such as APK, AAB, ZIP, and native build folders are ignored by Git.
- Keep signing keys and local environment files out of the repository.
- Android release version is currently `1.0.55` / version code `55`.
- Android builds use legacy native-library packaging for Google Play 16 KB page-size compatibility.
- For production distribution, configure a proper release keystore instead of relying on debug signing.

# NEPAL Motor Exchange Form

NEPAL Motor Exchange Form is a mobile-first React Native application built with Expo. It collects customer vehicle exchange, sell, buy, test-drive, and dealer requests, including contact details, vehicle information, uploaded documents, photos, and selected vehicle features.

The project supports Expo web previews during development and includes a native Android project for release APK generation.

## Overview

- **App name:** `NEPAL Motor`
- **Android package:** `com.pracas.nepalmotor`
- **Expo version:** `1.0.0`
- **Android version:** `1.0.45`
- **Android version code:** `45`
- **Primary platform:** Android
- **Development preview:** Expo web

## Key Features

- Customer exchange, sell, buy, and free test-drive request forms
- Dealer application form and dealer listing page
- Dealer listing sync from Airtable when an `AIRTABLE_TOKEN` is configured
- Terms of Service, Privacy Policy, Refund Policy, and Disclaimer pages
- Required agreement checkbox before inquiry form submission
- Vehicle details including type, year, model, brand, color, fuel, transmission, and kilometers driven
- Inline validation for required fields, phone numbers, email format, and vehicle year
- Numeric constraints for phone number and vehicle year
- Upload support for vehicle documents and photos
- Multiple file selection with a five-file limit
- Feature selection interface for vehicle options
- Mobile-friendly layout and spacing
- Custom full-flag NEPAL Motor launcher icon
- Release ZIP prepared for APK sharing

## Technology Stack

- [Expo](https://expo.dev/) SDK 51
- React Native 0.74
- React 18
- Expo Font
- Expo Image Picker
- Expo Status Bar
- Expo Vector Icons
- React Native Async Storage
- React Native Dotenv
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

## Environment Variables

Create a local `.env` file from the example file:

```powershell
Copy-Item .env.example .env
```

Set the Airtable personal access token used by the dealer listing sync:

```text
AIRTABLE_TOKEN=your_airtable_personal_access_token_here
```

The `.env` file is ignored by Git so secrets are not committed.

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

## Release Package

The shareable release archive is:

```text
release/NEPAL-Motor-release.zip
```

The archive contains:

```text
NEPAL-Motor-release.apk
```

Before sharing a release, verify the APK identity:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\build-tools\34.0.0\aapt.exe" dump badging release\NEPAL-Motor-release.apk
```

Expected package:

```text
com.pracas.nepalmotor
```

## Project Structure

```text
App.js                         Main React Native application
app.json                       Expo configuration and app identity
assets/                        App icon and image assets
android/                       Native Android project
dist/                          Generated web export output
release/                       Packaged APK release archive
.env.example                   Example local environment configuration
package.json                   npm scripts and dependencies
package-lock.json              Locked dependency versions
babel.config.js                Babel configuration
```

## Launcher Icon

The Android launcher icon uses a full-flag NEPAL Motor visual. If the icon does not update after installing a new build, uninstall the previous app from the device and install the APK again.

## Notes for Release Sharing

- Share `release/NEPAL-Motor-release.zip` when sending the Android build.
- The loose APK is build output and does not need to be committed separately.
- The release APK currently uses the debug signing configuration from the native Android project. For production distribution, replace it with a proper release keystore.

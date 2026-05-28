/**
 * App.tsx — NEPAL Motor
 *
 * Root component and application state manager.
 * All logic, data, and UI has been separated into dedicated files:
 *
 *   data/          — constants, options, formConfig, navigationConfig,
 *                    onboardingData, legalPolicies, faqData, glossaryData
 *   utils/         — formHelpers, stringHelpers
 *   styles/        — index.ts (full StyleSheet)
 *   components/ui/ — Label, TextField, SelectField, UploadField, AgreementRow
 *   components/icons/ — NavSvgIcons, HelplineIcon, ServiceIllustration
 *   components/navigation/ — Header, FooterNavigation, DrawerNavigation
 *   components/    — OTPModal
 *   screens/       — FAQsPage, AboutPage, SplashScreen, OnboardingScreen,
 *                    BuyUsedCarPage, PolicyPage, DealerPage, TestDrivePage,
 *                    GlossaryPage
 *
 * Platform:  Android (primary) · Expo Web (development preview)
 * SDK:       Expo 53 · React Native 0.79 · React 19
 * Package:   com.pracas.nepalmotor
 * Version:   1.0.55
 */

import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

// ─── Data ────────────────────────────────────────────────────────────────────
import {
  OTP_LENGTH,
  OTP_RESEND_COOLDOWN,
  onboardingStorageKey,
  sendOtpEndpoint,
  verifyOtpEndpoint
} from "./data/constants";
import { colors, cities, vehicleTypes, evBrands, financeOptions, transmissions, accidents, fuelTypes, fuelTypesWithEV } from "./data/options";
import { features, emptyForm } from "./data/formConfig";

// ─── Utils ───────────────────────────────────────────────────────────────────
import { alphabetOnly, alphabetPattern } from "./utils/stringHelpers";
import { postVehicleSubmission, submissionErrorMessage } from "./utils/formHelpers";

// ─── Types ───────────────────────────────────────────────────────────────────
import { FormState, PolicyKey } from "./types";

// ─── Styles ──────────────────────────────────────────────────────────────────
import styles from "./styles";

// ─── UI Components ───────────────────────────────────────────────────────────
import Label from "./components/ui/Label";
import TextField from "./components/ui/TextField";
import SelectField from "./components/ui/SelectField";
import UploadField from "./components/ui/UploadField";
import AgreementRow from "./components/ui/AgreementRow";

// ─── Navigation Components ───────────────────────────────────────────────────
import Header from "./components/navigation/Header";
import FooterNavigation from "./components/navigation/FooterNavigation";
import DrawerNavigation from "./components/navigation/DrawerNavigation";

// ─── OTP Modal ───────────────────────────────────────────────────────────────
import OTPModal from "./components/OTPModal";

// ─── Screens ─────────────────────────────────────────────────────────────────
import FAQsPage from "./screens/FAQsPage";
import AboutPage from "./screens/AboutPage";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import PolicyPage from "./screens/PolicyPage";
import DealerPage from "./screens/DealerPage";
import TestDrivePage from "./screens/TestDrivePage";
import GlossaryPage from "./screens/GlossaryPage";

// ─── Types ───────────────────────────────────────────────────────────────────
type AppPhase = "loading" | "onboarding" | "main";
type FormKey = "exchange" | "sell" | "buy";
interface FormsState {
  exchange: FormState;
  sell: FormState;
  buy: FormState;
}

// ─── ROOT APP COMPONENT ───────────────────────────────────────────────────────

/**
 * App — root component and application state manager.
 *
 * State:
 *  - appPhase       : "loading" | "onboarding" | "main"
 *  - drawerOpen     : controls drawer visibility
 *  - headerHeight   : measured height of the Header for layout offsets
 *  - forms          : { exchange, sell, buy } — each holding emptyForm shape
 *  - activeFooterTab: currently visible page key
 *  - previousTab    : last non-policy tab (used for hardware back button)
 *  - errors         : field-level validation error map
 *  - termsAgreed    : whether the user has ticked the policy agreement
 *
 * Lifecycle:
 *  1. On mount → reads AsyncStorage / localStorage for onboarding flag
 *  2. Shows SplashScreen during load, OnboardingScreen if first visit
 *  3. Enters main app with Exchange tab active by default
 *
 * Form submission:
 *  - Exchange / Sell  → multipart FormData via postVehicleSubmission
 *  - Buy              → JSON POST to buy-used-cars endpoint
 *  - Test Drive       → JSON POST in TestDrivePage (self-contained)
 *  - Dealer           → multipart FormData in DealerPage (self-contained)
 */
export default function App() {
  const [appPhase, setAppPhase] = useState<AppPhase>("loading");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(88);
  const [forms, setForms] = useState<FormsState>({
    exchange: emptyForm,
    sell: emptyForm,
    buy: emptyForm
  });
  const [featurePickerOpen, setFeaturePickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const featurePickerRef = useRef<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Per-form agreement state — switching tabs never wipes another form's checkbox
  const [termsAgreedMap, setTermsAgreedMap] = useState<Record<string, boolean>>({
    exchange: false, sell: false, buy: false
  });
  const [activeFooterTab, setActiveFooterTab] = useState("exchange");
  const [previousTab, setPreviousTab] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  // ── OTP verification state ─────────────────────────────────────────────────
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpPhone, setOtpPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(""); // "sending" | "verifying" | ""
  const [otpResendSeconds, setOtpResendSeconds] = useState(0);
  // Holds the actual form-submission function to run after OTP is verified
  const pendingSubmitRef = useRef<(() => Promise<void>) | null>(null);
  // Timer ref so the countdown interval can be cleared on unmount / resend
  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSellForm = activeFooterTab === "sell";
  const isBuyForm = activeFooterTab === "buy";
  const isExchangeForm = activeFooterTab === "exchange";
  const formKey: FormKey = isSellForm ? "sell" : isBuyForm ? "buy" : "exchange";
  const form = forms[formKey];
  const availableFeatures = features.filter((feature) => !form.features.includes(feature));
  // Derived per-form agreement helpers (depends on formKey so declared here)
  const termsAgreed = termsAgreedMap[formKey] ?? false;
  const setTermsAgreed = (val: boolean | ((prev: boolean) => boolean)) =>
    setTermsAgreedMap(m => ({ ...m, [formKey]: typeof val === "function" ? val(m[formKey] ?? false) : val }));

  useEffect(() => {
    const loadOnboardingState = async () => {
      let onboardingComplete = false;

      if (Platform.OS === "web" && typeof window !== "undefined") {
        onboardingComplete = (window as any).localStorage?.getItem(onboardingStorageKey) === "true";
      } else {
        onboardingComplete = (await AsyncStorage.getItem(onboardingStorageKey)) === "true";
      }

      setAppPhase(onboardingComplete ? "main" : "onboarding");
    };

    loadOnboardingState().catch(() => setAppPhase("onboarding"));
  }, []);

  useEffect(() => {
    if (!featurePickerOpen || typeof document === "undefined") {
      return undefined;
    }

    const handleClickOutside = (event: any) => {
      const node = featurePickerRef.current;
      if (node?.contains && !node.contains(event.target)) {
        setFeaturePickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [featurePickerOpen]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      // OTP modal takes highest priority — back should cancel it, not background the app
      if (otpVisible) {
        handleOTPCancel();
        return true;
      }
      if (policyPageKeys.includes(activeFooterTab) && previousTab !== null) {
        setActiveFooterTab(previousTab);
        setPreviousTab(null);
        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({ y: 0, animated: true });
        });
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [activeFooterTab, previousTab, otpVisible]);

  // Updates a single field in the active form and clears any status message
  const update = (key: keyof FormState, value: any) => {
    setForms((current) => ({
      ...current,
      [formKey]: {
        ...current[formKey],
        [key]: value
      }
    }));
    setMessage("");
    setMessageType("");
    setSubmitting(false);
  };

  const toggleFeature = (feature: string) => {
    setForms((current) => {
      const selected = current[formKey].features.includes(feature);
      return {
        ...current,
        [formKey]: {
          ...current[formKey],
          features: selected
            ? current[formKey].features.filter((item) => item !== feature)
            : [...current[formKey].features, feature]
        }
      };
    });
  };

  // ── Feature picker + dropdown collapse ───────────────────────────────────
  // dropdownSignal is passed as `closeSignal` to every SelectField. When it
  // increments, all SelectFields close except the one that just opened (which
  // guards itself via justOpenedRef in SelectField.tsx).
  // closeFeaturePicker is already wired to every TextField's onFocus and the
  // ScrollView's onScrollBeginDrag, so tapping ANY text input or scrolling
  // automatically collapses any open SelectField dropdown too.
  const [dropdownSignal, setDropdownSignal] = useState(0);
  const closeFeaturePicker = () => {
    setFeaturePickerOpen(false);
    setDropdownSignal((s) => s + 1);
  };

  const clearForm = () => {
    setForms((current) => ({
      ...current,
      [formKey]: emptyForm
    }));
    setMessage("");
    setMessageType("");
    setSubmitting(false);
    setErrors({});
    setTermsAgreed(false);
  };

  // Keys that correspond to legal policy pages (not main nav tabs)
  const policyPageKeys = ["terms", "privacy", "refund", "disclaimer"];

  /**
   * Changes the active tab and resets transient UI state.
   * Tracks the previous tab when navigating into a policy page so the
   * Android hardware back button can return to the correct form.
   */
  const changeFooterTab = (tab: string) => {
    closeFeaturePicker();
    setDrawerOpen(false);
    setErrors({});
    setMessage("");
    setMessageType("");
    setSubmitting(false);
    const isGoingToPolicy = policyPageKeys.includes(tab);
    if (isGoingToPolicy) {
      setPreviousTab(activeFooterTab);
    } else {
      setPreviousTab(null);
    }
    setActiveFooterTab(tab);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    });
  };

  /**
   * Marks onboarding as complete in persistent storage and advances
   * appPhase to "main". The finally block guarantees the app always
   * transitions even if storage write fails.
   */
  const completeOnboarding = async () => {
    try {
      if (Platform.OS === "web" && typeof window !== "undefined") {
        (window as any).localStorage?.setItem(onboardingStorageKey, "true");
      } else {
        await AsyncStorage.setItem(onboardingStorageKey, "true");
      }
    } finally {
      setAppPhase("main");
    }
  };

  // ── OTP helper functions ───────────────────────────────────────────────────

  /** Starts the 30-second resend countdown. Clears any existing timer first. */
  const startResendCountdown = () => {
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    setOtpResendSeconds(OTP_RESEND_COOLDOWN);
    resendTimerRef.current = setInterval(() => {
      setOtpResendSeconds((s) => {
        if (s <= 1) {
          clearInterval(resendTimerRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  /**
   * Called by any form's submit handler after validation passes.
   * Sends an OTP to the phone number and shows the verification modal.
   * The actual form submission is stored in pendingSubmitRef and only
   * called once the user verifies the correct code.
   */
  const requestOTP = async (phone: string, onVerified: () => Promise<void>) => {
    pendingSubmitRef.current = onVerified;
    setOtpPhone(phone);
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    setOtpError("");
    setOtpLoading("sending");
    setOtpVisible(true);

    try {
      const resp = await fetch(sendOtpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone })
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || data.success === false) {
        setOtpError(data.message || "Failed to send OTP. Please try again.");
      } else {
        startResendCountdown();
      }
    } catch {
      setOtpError("Network error. Please check your connection and try again.");
    } finally {
      setOtpLoading("");
    }
  };

  /** Updates a single digit slot in the OTP digit array. */
  const handleOTPDigitChange = (digit: string, index: number) => {
    setOtpDigits((prev) => {
      const updated = [...prev];
      updated[index] = digit;
      return updated;
    });
    setOtpError(""); // Clear error whenever the user edits a digit
  };

  /**
   * Called when the user taps "Verify & Submit".
   * Sends the entered code to the verify endpoint. On success, hides the
   * modal and calls the stored pending submission function.
   */
  const handleOTPVerify = async () => {
    const code = otpDigits.join("");
    if (code.length < OTP_LENGTH) return;

    setOtpLoading("verifying");
    setOtpError("");

    try {
      const resp = await fetch(verifyOtpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: otpPhone, otp: code })
      });
      const data = await resp.json();

      if (data.valid) {
        // OTP correct — close modal, then fire the real form submission
        if (resendTimerRef.current) clearInterval(resendTimerRef.current);
        setOtpVisible(false);
        setOtpLoading("");
        await pendingSubmitRef.current?.();
      } else {
        // Wrong code — clear boxes and show error
        setOtpDigits(Array(OTP_LENGTH).fill(""));
        setOtpError(data.message || "Incorrect code. Please try again.");
        setOtpLoading("");
      }
    } catch {
      setOtpError("Verification failed. Please try again.");
      setOtpLoading("");
    }
  };

  /** Resends the OTP to the same phone number and resets the countdown. */
  const handleOTPResend = async () => {
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    setOtpError("");
    setOtpLoading("sending");

    try {
      const resp = await fetch(sendOtpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: otpPhone })
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || data.success === false) {
        setOtpError(data.message || "Failed to resend OTP. Please try again.");
      } else {
        startResendCountdown();
      }
    } catch {
      setOtpError("Network error. Please check your connection and try again.");
    } finally {
      setOtpLoading("");
    }
  };

  /** Cancels OTP flow — hides modal and clears all OTP state. */
  const handleOTPCancel = () => {
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    setOtpVisible(false);
    setOtpLoading("");
    setOtpError("");
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    setOtpResendSeconds(0); // reset so reopening the modal starts clean
    pendingSubmitRef.current = null;
  };

  const pickFile = async (key: "document" | "photo") => {
    const targetFormKey = formKey;
    const existingFiles = forms[targetFormKey][key];
    const remainingSlots = Math.max(0, 5 - existingFiles.length);

    if (remainingSlots === 0) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: remainingSlots,
      quality: 0.9
    });

    if (result.canceled) {
      return;
    }

    setForms((current) => {
      const existingFiles = current[targetFormKey][key];
      const remainingSlots = Math.max(0, 5 - existingFiles.length);
      const selectedFiles = result.assets.slice(0, remainingSlots).map((asset) => ({
        name: (asset as any)?.fileName || (asset as any)?.name || asset?.uri?.split("/").pop() || "Selected image",
        uri: asset?.uri,
        type: (asset as any)?.mimeType || "image/jpeg",
        file: (asset as any)?.file
      }));

      return {
        ...current,
        [targetFormKey]: {
          ...current[targetFormKey],
          [key]: [...existingFiles, ...selectedFiles].slice(0, 5)
        }
      };
    });
  };

  const removeFile = (key: "document" | "photo", index: number) => {
    setForms((current) => ({
      ...current,
      [formKey]: {
        ...current[formKey],
        [key]: current[formKey][key].filter((_, fileIndex) => fileIndex !== index)
      }
    }));
  };

  const clearFiles = (key: "document" | "photo") => {
    setForms((current) => ({
      ...current,
      [formKey]: {
        ...current[formKey],
        [key]: []
      }
    }));
  };

  const submit = async () => {
    if (submitting) {
      return;
    }

    setFeaturePickerOpen(false);
    setMessage("");
    setMessageType("");
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = "Enter a valid email address";

    if (!form.phone || form.phone.length !== 10)
      newErrors.phone = "Enter valid 10-digit phone number";

    if (!isBuyForm && !form.year) newErrors.year = "Year is required";

    if (!form.model.trim())
      newErrors.model = "Vehicle Model is required";
    else if (!alphabetPattern.test(form.model.trim()))
      newErrors.model = "Vehicle Model can only contain alphabets";

    if (!form.brand.trim())
      newErrors.brand = "Vehicle Brand is required";

    if (!form.color)
      newErrors.color = "Vehicle Color is required";

    if (!isBuyForm && !form.kmDriven.trim())
      newErrors.kmDriven = "KM Driven is required";

    if (!isBuyForm && !form.document.length)
      newErrors.document = "Upload vehicle document";

    if (!isBuyForm && !form.photo.length)
      newErrors.photo = "Upload vehicle photo";

    if (!form.transmission)
      newErrors.transmission = "Transmission / Gear is required";

    if (!form.fuelType)
      newErrors.fuelType = "Fuel Type is required";

    if (isExchangeForm && !form.evBrand)
      newErrors.evBrand = "Interested EV Brand is required";

    if ((isExchangeForm || isBuyForm) && !form.finance)
      newErrors.finance = "Finance selection is required";

    if (isBuyForm && !form.budget.trim())
      newErrors.budget = "Budget in NPR is required";

    if (!isBuyForm) {
      const year = Number(form.year);
      const currentYear = new Date().getFullYear();
      if (form.year && (year < 1981 || year > currentYear)) {
        newErrors.year = `Year must be between 1981 and ${currentYear}`;
      }
    }

    if (!termsAgreed) {
      newErrors.termsAgreed = "You must agree to the Terms of Service, Privacy Policy, Refund Policy, and Disclaimer";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      });
      return;
    }

    // Capture derived values now — the async OTP flow may take seconds
    // and closures should not rely on state that could change between taps.
    const submittedFormKey = formKey;
    const submittedIsSellForm = isSellForm;
    const submittedIsBuyForm = isBuyForm;
    const submittedForm = form;

    // Gate the real API call behind phone-number OTP verification.
    // requestOTP sends the code via Sparrow SMS, shows the modal, and calls
    // the callback only after the user enters the correct 6-digit code.
    await requestOTP(submittedForm.phone, async () => {
      setSubmitting(true);
      try {
        if (submittedIsBuyForm) {
          const buyResp = await fetch("https://nepalmotor.com/api/buy-used-cars", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: submittedForm.fullName.trim(),
              email: submittedForm.email.trim(),
              phone: submittedForm.phone.trim(),
              city: submittedForm.city,
              vehicleType: submittedForm.vehicleType,
              vehicleModel: submittedForm.model.trim(),
              vehicleBrand: submittedForm.brand.trim(),
              vehicleColor: submittedForm.color,
              transmission: submittedForm.transmission,
              fuelType: submittedForm.fuelType,
              features: submittedForm.features,
              budget: submittedForm.budget.trim(),
              finance: submittedForm.finance,
              notes: submittedForm.notes.trim(),
            }),
          });
          if (!buyResp.ok) {
            const data = await buyResp.json().catch(() => ({}));
            throw new Error(data?.message || `Submission failed (${buyResp.status})`);
          }
        } else {
          const apiResponse = await postVehicleSubmission(submittedForm, submittedIsSellForm, { isBuyForm: false });
          console.log("API RESPONSE:", apiResponse);
          console.log("attachments:", apiResponse.received?.attachments);
          if (apiResponse.warning || apiResponse.warnings) {
            console.warn("API warning:", apiResponse.warning || apiResponse.warnings);
          }
        }

        setMessageType("success");
        setMessage(
          submittedIsBuyForm
            ? "Thank you! Your buy used car request has been submitted."
            : submittedIsSellForm
            ? "Thank you! Your sell used car request has been submitted."
            : "Thank you! Your exchange request has been submitted."
        );
        setForms((current) => ({
          ...current,
          [submittedFormKey]: emptyForm
        }));
        setTermsAgreedMap(m => ({ ...m, [submittedFormKey]: false }));
        setErrors({});
      } catch (error) {
        setMessageType("error");
        setMessage(submissionErrorMessage(error));
      } finally {
        setSubmitting(false);
      }
    });
  };

  if (appPhase === "loading") {
    return <SafeAreaProvider><SplashScreen /></SafeAreaProvider>;
  }

  if (appPhase === "onboarding") {
    return <SafeAreaProvider><OnboardingScreen onDone={completeOnboarding} /></SafeAreaProvider>;
  }

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" />
      <Header
        onOpenDrawer={() => setDrawerOpen(true)}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        showBack={policyPageKeys.includes(activeFooterTab)}
        onBack={() => {
          setActiveFooterTab(previousTab || "exchange");
          setPreviousTab(null);
          requestAnimationFrame(() => {
            scrollRef.current?.scrollTo({ y: 0, animated: true });
          });
        }}
      />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.container, { paddingTop: headerHeight + 8 }]}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={closeFeaturePicker}
      >
        {/* ── Stateless screens — conditional render is fine ────────────── */}
        {activeFooterTab === "faqs" && <FAQsPage />}
        {activeFooterTab === "about" && <AboutPage />}
        {activeFooterTab === "glossary" && <GlossaryPage />}
        {policyPageKeys.includes(activeFooterTab) && (
          <PolicyPage policyKey={activeFooterTab as PolicyKey} />
        )}

        {/* ── Form screens — always mounted so filled data is never lost ── */}
        {/* DealerPage: shown for both "dealer" and legacy "branches" keys  */}
        <View style={{ display: (activeFooterTab === "dealer" || activeFooterTab === "branches") ? "flex" : "none" }}>
          <DealerPage onNavigate={changeFooterTab} onRequestOTP={requestOTP} />
        </View>

        <View style={{ display: activeFooterTab === "testdrive" ? "flex" : "none" }}>
          <TestDrivePage onNavigate={changeFooterTab} onRequestOTP={requestOTP} />
        </View>

        {/* ── Main exchange / sell / buy form ──────────────────────────── */}
        <View style={{ display: !["faqs","about","glossary","dealer","branches","testdrive",...policyPageKeys].includes(activeFooterTab) ? "flex" : "none" }}>
          <>
        <Pressable onPress={closeFeaturePicker}>
          <Text allowFontScaling={false} style={styles.title}>{isSellForm ? "Sell Used Car" : isBuyForm ? "Buy Used Car" : "Exchange to EV"}</Text>
        </Pressable>

        <TextField
          label="Full Name"
          required
          value={form.fullName}
          error={errors.fullName}
          onFocus={closeFeaturePicker}
          onChangeText={(value) => update("fullName", value)}
        />
        <TextField
          label="Email"
          value={form.email}
          keyboardType="email-address"
          error={errors.email}
          onFocus={closeFeaturePicker}
          onChangeText={(value) => { update("email", value); setErrors((e) => ({ ...e, email: "" })); }}
          onBlur={() => {
            const val = form.email.trim();
            if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
              setErrors((e) => ({ ...e, email: "Enter a valid email address" }));
            }
          }}
        />
        <TextField
          label="Phone"
          required
          value={form.phone}
          error={errors.phone}
          keyboardType="phone-pad"
          maxLength={10}
          onFocus={closeFeaturePicker}
          onChangeText={(value) => {
            const onlyNumbers = value.replace(/[^0-9]/g, "");
            update("phone", onlyNumbers);
          }}
        />
        <SelectField
          label="City"
          required
          value={form.city}
          options={cities}
          onOpen={closeFeaturePicker} closeSignal={dropdownSignal}
          onChange={(value) => update("city", value)}
        />
        {!isBuyForm ? (
          <TextField
            label="Year of Manufacture"
            required
            value={form.year}
            placeholder="2007"
            keyboardType="numeric"
            maxLength={4}
            error={errors.year}
            onFocus={closeFeaturePicker}
            onChangeText={(value) => {
              const onlyNumbers = value.replace(/[^0-9]/g, "").slice(0, 4);
              update("year", onlyNumbers);
              const year = Number(onlyNumbers);
              setErrors((current) => ({
                ...current,
                year:
                  onlyNumbers.length === 4 && (year < 1981 || year > new Date().getFullYear())
                    ? `Year must be between 1981 and ${new Date().getFullYear()}`
                    : ""
              }));
            }}
          />
        ) : null}
        <SelectField
          label="Vehicle Type"
          required
          value={form.vehicleType}
          options={vehicleTypes}
          onOpen={closeFeaturePicker} closeSignal={dropdownSignal}
          onChange={(value) => update("vehicleType", value)}
        />
        <TextField
          label="Vehicle Model"
          required
          value={form.model}
          error={errors.model}
          placeholder="Santro"
          onFocus={closeFeaturePicker}
          onChangeText={(value) => {
            const onlyAlphabets = alphabetOnly(value);
            update("model", onlyAlphabets);
            setErrors((current) => ({
              ...current,
              model:
                value === onlyAlphabets
                  ? ""
                  : "Vehicle Model can only contain alphabets"
            }));
          }}
        />
        <TextField
          label="Vehicle Brand"
          required
          value={form.brand}
          error={errors.brand}
          placeholder="Hyundai"
          onFocus={closeFeaturePicker}
          onChangeText={(value) => update("brand", value)}
        />
        <SelectField
          label="Vehicle Color"
          required
          value={form.color}
          error={errors.color}
          options={colors}
          onOpen={closeFeaturePicker} closeSignal={dropdownSignal}
          onChange={(value) => update("color", value)}
        />
        {!isBuyForm ? (
          <>
            <TextField
              label="KM Driven"
              required
              value={form.kmDriven}
              error={errors.kmDriven}
              keyboardType="numeric"
              onFocus={closeFeaturePicker}
              onChangeText={(value) => update("kmDriven", value)}
            />
            <UploadField
              label="Upload Vehicle Document"
              value={form.document}
              error={errors.document}
              onRemove={(index) => removeFile("document", index)}
              onClear={() => clearFiles("document")}
              onPress={() => {
                closeFeaturePicker();
                pickFile("document");
              }}
            />
            <UploadField
              label="Upload Vehicle Photo"
              value={form.photo}
              error={errors.photo}
              onRemove={(index) => removeFile("photo", index)}
              onClear={() => clearFiles("photo")}
              onPress={() => {
                closeFeaturePicker();
                pickFile("photo");
              }}
            />
          </>
        ) : null}
        <SelectField
          label="Transmission / Gear"
          required
          value={form.transmission}
          error={errors.transmission}
          options={transmissions}
          onOpen={closeFeaturePicker} closeSignal={dropdownSignal}
          onChange={(value) => update("transmission", value)}
        />
        {isExchangeForm ? (
          <SelectField
            label="Accidents"
            value={form.accident}
            options={accidents}
            onOpen={closeFeaturePicker} closeSignal={dropdownSignal}
            onChange={(value) => update("accident", value)}
          />
        ) : null}
        <SelectField
          label="Fuel Type"
          required
          value={form.fuelType}
          error={errors.fuelType}
          options={isSellForm || isBuyForm ? fuelTypesWithEV : fuelTypes}
          onOpen={closeFeaturePicker} closeSignal={dropdownSignal}
          onChange={(value) => update("fuelType", value)}
        />

        {featurePickerOpen ? (
          <Pressable style={styles.featurePickerOverlay} onPress={closeFeaturePicker} />
        ) : null}

        <View ref={featurePickerRef} style={[styles.field, featurePickerOpen && styles.featureFieldOpen]}>
          <Label>Features</Label>
          <View style={styles.featureBox}>
            <Pressable
              style={styles.addButton}
              onPress={() => {
                Keyboard.dismiss();
                setFeaturePickerOpen(true);
              }}
            >
              <Ionicons name="add" size={23} color="#222222" />
            </Pressable>
            <View style={styles.featureList}>
              {form.features.length ? (
                form.features.map((feature) => (
                  <Pressable
                    key={feature}
                    onPress={() => toggleFeature(feature)}
                    style={[styles.feature, styles.featureSelected]}
                  >
                    <Text style={styles.featureText}>{feature} x</Text>
                  </Pressable>
                ))
              ) : (
                <Text style={styles.featurePlaceholder}>Tap + to add (Basic, A/C, 4WD, ...)</Text>
              )}
            </View>
          </View>
          {featurePickerOpen ? (
            <View style={styles.featureDropdown}>
              <ScrollView nestedScrollEnabled style={styles.featureOptions}>
                {availableFeatures.length ? (
                  availableFeatures.map((feature) => (
                    <Pressable
                      key={feature}
                      onPress={() => toggleFeature(feature)}
                      style={styles.featureOption}
                    >
                      <Text style={styles.featureOptionText}>
                        {feature}
                      </Text>
                    </Pressable>
                  ))
                ) : (
                  <View style={styles.featureOption}>
                    <Text style={styles.featureOptionTextMuted}>All features selected</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          ) : null}
        </View>

        {isSellForm ? (
          <TextField
            label="Expected Selling Price in NPR"
            value={form.sellingPrice}
            keyboardType="numeric"
            onFocus={closeFeaturePicker}
            onChangeText={(value) => update("sellingPrice", value.replace(/[^0-9]/g, ""))}
          />
        ) : null}

        {isExchangeForm ? (
          <SelectField
            label="Interested EV Brand"
            required
            value={form.evBrand}
            error={errors.evBrand}
            options={evBrands}
            onOpen={closeFeaturePicker} closeSignal={dropdownSignal}
            onChange={(value) => update("evBrand", value)}
          />
        ) : null}

        {isBuyForm ? (
          <TextField
            label="Budget in NPR"
            required
            value={form.budget}
            error={errors.budget}
            keyboardType="numeric"
            onFocus={closeFeaturePicker}
            onChangeText={(value) => update("budget", value.replace(/[^0-9]/g, ""))}
          />
        ) : null}

        {(isExchangeForm || isBuyForm) ? (
          <SelectField
            label="Are you looking for Finance?"
            required
            value={form.finance}
            error={errors.finance}
            options={financeOptions}
            onOpen={closeFeaturePicker} closeSignal={dropdownSignal}
            onChange={(value) => update("finance", value)}
          />
        ) : null}

        <TextField
          label="Notes"
          value={form.notes}
          multiline
          onFocus={closeFeaturePicker}
          onChangeText={(value) => update("notes", value)}
        />

        {message ? (
          <View style={[styles.messageBox, messageType === "success" ? styles.successBox : styles.errorBox]}>
            <Text style={[styles.messageText, messageType === "success" ? styles.successText : styles.errorText]}>
              {message}
            </Text>
          </View>
        ) : null}

        <AgreementRow
          agreed={termsAgreed}
          onToggle={() => setTermsAgreed((t) => !t)}
          error={errors.termsAgreed}
          onNavigate={changeFooterTab}
        />

        <View style={styles.actions}>
          <Pressable
            style={[styles.clearButton, submitting && styles.clearButtonDisabled]}
            onPress={submitting ? undefined : clearForm}
          >
            {({ hovered }: any) => (
              <>
                <Ionicons name="refresh" size={18} color={submitting ? "#93c5fd" : "#006ffd"} />
                <Text style={[styles.clearText, submitting && styles.clearTextDisabled, hovered && !submitting && styles.clearTextHover]}>
                  Clear form
                </Text>
              </>
            )}
          </Pressable>
          <Pressable
            style={({ hovered }: any) => [
              styles.submitButton,
              hovered && !submitting && styles.submitButtonHover,
              submitting && styles.submitButtonDisabled
            ]}
            onPress={submit}
            disabled={submitting}
          >
            <Text style={styles.submitText}>{submitting ? "Submitting..." : "Submit"}</Text>
          </Pressable>
        </View>

          </>
        </View>
      </ScrollView>
      <FooterNavigation
        activeTab={activeFooterTab}
        onChange={changeFooterTab}
      />
      <DrawerNavigation
        activeTab={activeFooterTab}
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelect={changeFooterTab}
        headerHeight={headerHeight}
      />

      {/* OTP verification modal — rendered above the drawer so it is always on top */}
      <OTPModal
        visible={otpVisible}
        phone={otpPhone}
        digits={otpDigits}
        onChangeDigit={handleOTPDigitChange}
        onVerify={handleOTPVerify}
        onResend={handleOTPResend}
        onCancel={handleOTPCancel}
        loading={otpLoading}
        error={otpError}
        resendSeconds={otpResendSeconds}
      />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

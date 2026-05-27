import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cities, vehicleTypes, colors, transmissions, fuelTypesWithEV, financeOptions } from "../data/options";
import { features } from "../data/formConfig";
import { alphabetOnly } from "../utils/stringHelpers";
import { PolicyKey } from "../types";
import TextField from "../components/ui/TextField";
import SelectField from "../components/ui/SelectField";
import AgreementRow from "../components/ui/AgreementRow";
import styles from "../styles";

interface TestDriveForm {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  vehicleType: string;
  model: string;
  brand: string;
  color: string;
  transmission: string;
  accident: string;
  fuelType: string;
  features: string[];
  finance: string;
  notes: string;
}

interface TestDrivePageProps {
  onNavigate: (key: PolicyKey) => void;
  onRequestOTP: (phone: string, callback: () => Promise<void>) => Promise<void>;
}

/**
 * TestDrivePage — Free Test Drive request form.
 * Collects customer contact info and the vehicle they want to test drive.
 * Submits as JSON (not multipart) to the test-drive endpoint.
 * Includes a multi-select feature picker for desired vehicle features.
 */
export default function TestDrivePage({ onNavigate, onRequestOTP }: TestDrivePageProps) {
  const emptyTestDrive: TestDriveForm = {
    fullName: "", email: "", phone: "", city: "Kathmandu",
    vehicleType: "Hatchback", model: "", brand: "", color: "",
    transmission: "", accident: "", fuelType: "Petrol",
    features: [], finance: "", notes: ""
  };

  const [form, setForm] = useState<TestDriveForm>(emptyTestDrive);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [featurePickerOpen, setFeaturePickerOpen] = useState(false);
  const [dropdownSignal, setDropdownSignal] = useState(0);
  const featurePickerRef = useRef<View>(null);
  const availableFeatures = features.filter((f) => !form.features.includes(f));
  const messageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the auto-dismiss timer on unmount to avoid state updates on an
  // unmounted component.
  useEffect(() => () => { if (messageTimerRef.current) clearTimeout(messageTimerRef.current); }, []);

  const update = (key: keyof TestDriveForm, value: any) => setForm((c) => ({ ...c, [key]: value }));
  // Collapses the feature picker AND increments dropdownSignal so any open
  // SelectField dropdown also closes. Wired to SelectField.onOpen and every
  // TextField.onFocus, so tapping any input collapses open dropdowns.
  const closeFeaturePicker = () => {
    setFeaturePickerOpen(false);
    setDropdownSignal((s) => s + 1);
  };
  const toggleFeature = (feature: string) => {
    setForm((c) => ({
      ...c,
      features: c.features.includes(feature)
        ? c.features.filter((f) => f !== feature)
        : [...c.features, feature]
    }));
  };

  const submit = async () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = "Enter a valid email address";
    if (!form.phone || form.phone.length !== 10)
      newErrors.phone = "Enter valid 10-digit phone number";
    if (!form.model.trim()) newErrors.model = "Vehicle Model is required";
    if (!form.brand.trim()) newErrors.brand = "Vehicle Brand is required";
    if (!form.color) newErrors.color = "Vehicle Color is required";
    if (!form.transmission) newErrors.transmission = "Transmission / Gear is required";
    if (!form.fuelType) newErrors.fuelType = "Fuel Type is required";
    if (!form.finance) newErrors.finance = "Finance selection is required";
    if (!termsAgreed) newErrors.termsAgreed = "You must agree to the Terms of Service, Privacy Policy, Refund Policy, and Disclaimer";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    // Capture form snapshot now so the callback has stable data even if
    // the user navigates away while waiting for OTP.
    const submittedForm = { ...form };

    // Gate the actual API call behind OTP verification
    await onRequestOTP(submittedForm.phone, async () => {
      setSubmitting(true);
      try {
        const resp = await fetch("https://nepalmotor.com/api/test-drive", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: submittedForm.fullName.trim(),
            email: submittedForm.email.trim(),
            phone: submittedForm.phone.trim(),
            city: submittedForm.city,
            vehicle: `${submittedForm.brand.trim()} ${submittedForm.model.trim()}`,
            vehicleType: submittedForm.vehicleType,
            vehicleBrand: submittedForm.brand.trim(),
            vehicleModel: submittedForm.model.trim(),
            vehicleColor: submittedForm.color,
            transmission: submittedForm.transmission,
            fuelType: submittedForm.fuelType,
            features: submittedForm.features,
            finance: submittedForm.finance,
            notes: submittedForm.notes.trim(),
          }),
        });
        if (!resp.ok) {
          const data = await resp.json().catch(() => ({}));
          throw new Error(data?.message || `Submission failed (${resp.status})`);
        }
        setMessage("Your test drive request has been submitted!");
        setMessageType("success");
        setForm(emptyTestDrive);
        setTermsAgreed(false);
        setErrors({});
        // Auto-dismiss the success banner after 4 seconds
        if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
        messageTimerRef.current = setTimeout(() => setMessage(""), 4000);
      } catch {
        setMessage("Submission failed. Please try again.");
        setMessageType("error");
      } finally {
        setSubmitting(false);
      }
    });
  };

  return (
    <View>
      <Text allowFontScaling={false} style={styles.title}>Free Test Drive</Text>
      <TextField label="Full Name" required value={form.fullName} error={errors.fullName} onFocus={closeFeaturePicker} onChangeText={(v) => update("fullName", v)} />
      <TextField
        label="Email"
        value={form.email}
        keyboardType="email-address"
        error={errors.email}
        onFocus={closeFeaturePicker}
        onChangeText={(v) => { update("email", v); setErrors((e) => ({ ...e, email: "" })); }}
        onBlur={() => {
          const val = form.email.trim();
          if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            setErrors((e) => ({ ...e, email: "Enter a valid email address" }));
          }
        }}
      />
      <TextField
        label="Phone" required value={form.phone} keyboardType="phone-pad" maxLength={10}
        error={errors.phone} onFocus={closeFeaturePicker}
        onChangeText={(v) => update("phone", v.replace(/[^0-9]/g, ""))}
      />
      <SelectField label="City" required value={form.city} options={cities} onOpen={closeFeaturePicker} closeSignal={dropdownSignal} onChange={(v) => update("city", v)} />
      <SelectField label="Vehicle Type" required value={form.vehicleType} options={vehicleTypes} onOpen={closeFeaturePicker} closeSignal={dropdownSignal} onChange={(v) => update("vehicleType", v)} />
      <TextField
        label="Vehicle Model" required value={form.model} error={errors.model} placeholder="Santro"
        onFocus={closeFeaturePicker}
        onChangeText={(v) => {
          const only = alphabetOnly(v);
          update("model", only);
          setErrors((c) => ({ ...c, model: v === only ? "" : "Vehicle Model can only contain alphabets" }));
        }}
      />
      <TextField label="Vehicle Brand" required value={form.brand} error={errors.brand} placeholder="Hyundai" onFocus={closeFeaturePicker} onChangeText={(v) => update("brand", v)} />
      <SelectField label="Vehicle Color" required value={form.color} error={errors.color} options={colors.map((c) => c === "Other" ? "Any" : c)} onOpen={closeFeaturePicker} closeSignal={dropdownSignal} onChange={(v) => update("color", v)} />
      <SelectField label="Transmission / Gear" required value={form.transmission} error={errors.transmission} options={transmissions} onOpen={closeFeaturePicker} closeSignal={dropdownSignal} onChange={(v) => update("transmission", v)} />
      <SelectField label="Fuel Type" required value={form.fuelType} error={errors.fuelType} options={fuelTypesWithEV} onOpen={closeFeaturePicker} closeSignal={dropdownSignal} onChange={(v) => update("fuelType", v)} />

      {featurePickerOpen ? (
        <Pressable style={styles.featurePickerOverlay} onPress={closeFeaturePicker} />
      ) : null}
      <View ref={featurePickerRef} style={[styles.field, featurePickerOpen && styles.featureFieldOpen]}>
        <Text allowFontScaling={false} style={styles.label}>Features</Text>
        <View style={styles.featureBox}>
          <Pressable style={styles.addButton} onPress={() => { Keyboard.dismiss(); setFeaturePickerOpen(true); }}>
            <Ionicons name="add" size={23} color="#222222" />
          </Pressable>
          <View style={styles.featureList}>
            {form.features.length ? (
              form.features.map((feature) => (
                <Pressable key={feature} onPress={() => toggleFeature(feature)} style={[styles.feature, styles.featureSelected]}>
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
                  <Pressable key={feature} onPress={() => toggleFeature(feature)} style={styles.featureOption}>
                    <Text style={styles.featureOptionText}>{feature}</Text>
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

      <SelectField label="Are you looking for Finance?" required value={form.finance} error={errors.finance} options={financeOptions} onOpen={closeFeaturePicker} closeSignal={dropdownSignal} onChange={(v) => update("finance", v)} />
      <TextField label="Notes" value={form.notes} multiline onFocus={closeFeaturePicker} onChangeText={(v) => update("notes", v)} />

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
        onNavigate={onNavigate}
      />
      <View style={styles.actions}>
        <Pressable
          style={[styles.clearButton, submitting && styles.clearButtonDisabled]}
          disabled={submitting}
          onPress={() => { setForm(emptyTestDrive); setTermsAgreed(false); setErrors({}); setMessage(""); }}
        >
          {({ hovered }: any) => (
            <>
              <Ionicons name="refresh" size={18} color={submitting ? "#93c5fd" : "#006ffd"} />
              <Text style={[styles.clearText, submitting && styles.clearTextDisabled, hovered && !submitting && styles.clearTextHover]}>Clear form</Text>
            </>
          )}
        </Pressable>
        <Pressable
          style={({ hovered }: any) => [styles.submitButton, hovered && !submitting && styles.submitButtonHover, submitting && styles.submitButtonDisabled]}
          onPress={submit}
          disabled={submitting}
        >
          <Text style={styles.submitText}>{submitting ? "Submitting..." : "Submit"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

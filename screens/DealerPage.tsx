import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { cities } from "../data/options";
import { dealerEndpoint } from "../data/constants";
import { appendUpload } from "../utils/formHelpers";
import { PolicyKey, FileAsset } from "../types";
import TextField from "../components/ui/TextField";
import SelectField from "../components/ui/SelectField";
import UploadField from "../components/ui/UploadField";
import AgreementRow from "../components/ui/AgreementRow";
import styles from "../styles";

interface DealerForm {
  fullName: string;
  companyName: string;
  city: string;
  phone: string;
  photo: FileAsset[];
}

interface DealerPageProps {
  onNavigate: (key: PolicyKey) => void;
  onRequestOTP: (phone: string, callback: () => Promise<void>) => Promise<void>;
}

/**
 * DealerPage — "Become a Dealer" application form.
 * Collects full name, company name, city, phone, and optional showroom
 * photos, then POSTs to the dealer endpoint. Requires policy agreement.
 */
export default function DealerPage({ onNavigate, onRequestOTP }: DealerPageProps) {
  const [form, setForm] = useState<DealerForm>({ fullName: "", companyName: "", city: "Kathmandu", phone: "", photo: [] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  const update = (key: keyof DealerForm, value: any) => setForm((c) => ({ ...c, [key]: value }));

  const pickPhoto = async () => {
    const slots = Math.max(0, 5 - form.photo.length);
    if (!slots) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: slots,
      quality: 0.9
    });
    if (result.canceled) return;
    const picked: FileAsset[] = result.assets.slice(0, slots).map((a) => ({
      name: a?.fileName || a?.uri?.split("/").pop() || "photo.jpg",
      uri: a?.uri,
      type: a?.mimeType || "image/jpeg",
      file: (a as any)?.file
    }));
    setForm((c) => ({ ...c, photo: [...c.photo, ...picked].slice(0, 5) }));
  };

  const submit = async () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!form.phone || form.phone.length !== 10)
      newErrors.phone = "Enter valid 10-digit phone number";
    if (!termsAgreed) newErrors.termsAgreed = "You must agree to the Terms of Service, Privacy Policy, Refund Policy, and Disclaimer";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    // Capture form snapshot now so the callback has stable data even if
    // the user navigates away while waiting for OTP.
    const submittedForm = { ...form };

    // Gate the actual API call behind OTP verification
    await onRequestOTP(submittedForm.phone, async () => {
      setSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("fullName", submittedForm.fullName.trim());
        formData.append("companyName", submittedForm.companyName.trim());
        formData.append("city", submittedForm.city);
        formData.append("phone", submittedForm.phone.trim());
        formData.append("requestType", "Become a Dealer");
        submittedForm.photo.forEach((f) => appendUpload(formData, "photos", f));
        await fetch(dealerEndpoint, { method: "POST", body: formData });
        setMessage("Your dealer application has been submitted!");
        setMessageType("success");
        setForm({ fullName: "", companyName: "", city: "Kathmandu", phone: "", photo: [] });
        setTermsAgreed(false);
        setErrors({});
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
      <Text allowFontScaling={false} style={styles.title}>Become a Dealer</Text>
      <TextField
        label="Full Name"
        required
        value={form.fullName}
        error={errors.fullName}
        onChangeText={(v) => update("fullName", v)}
      />
      <TextField
        label="Company Name"
        required
        value={form.companyName}
        error={errors.companyName}
        onChangeText={(v) => update("companyName", v)}
      />
      <SelectField
        label="City"
        value={form.city}
        options={cities}
        onChange={(v) => update("city", v)}
      />
      <TextField
        label="Phone"
        required
        value={form.phone}
        keyboardType="phone-pad"
        maxLength={10}
        error={errors.phone}
        onChangeText={(v) => update("phone", v.replace(/[^0-9]/g, ""))}
      />
      <UploadField
        label="Showroom / Office Photo"
        value={form.photo}
        onRemove={(i) => setForm((c) => ({ ...c, photo: c.photo.filter((_, idx) => idx !== i) }))}
        onClear={() => update("photo", [])}
        onPress={pickPhoto}
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
        onNavigate={onNavigate}
      />
      <View style={styles.actions}>
        <Pressable
          style={[styles.clearButton, submitting && styles.clearButtonDisabled]}
          disabled={submitting}
          onPress={() => { setForm({ fullName: "", companyName: "", city: "Kathmandu", phone: "", photo: [] }); setTermsAgreed(false); setErrors({}); setMessage(""); }}
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

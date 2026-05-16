import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

const nepalFlagLogo = require("./assets/nepal-flag-logo.jpeg");

const colors = ["White", "Silver", "Black", "Grey", "Red", "Blue", "Other"];
const cities = [
  "Itahari",
  "Kathmandu",
  "Pokhara",
  "Lalitpur",
  "Bharatpur",
  "Biratnagar",
  "Birgunj",
  "Butwal",
  "Dharan",
  "Hetauda",
  "Nepalgunj",
  "Other"
];
const vehicleTypes = ["Hatchback", "Sedan", "SUV", "Compact SUV", "Van", "Pickup", "I don't know"];
const evBrands = ["BYD", "Tata", "MG", "Hyundai", "Kia", "Neta", "Deepal", "Other"];
const financeOptions = ["Yes", "No"];
const transmissions = ["Automatic", "Manual", "Semi Automatic"];
const accidents = ["Yes", "No", "Few Times", "Many Times", "I don't know", "Other"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG", "Other"];
const features = [
  "Basic",
  "A/C",
  "4WD",
  "ABS",
  "Airbags",
  "Power steering",
  "Power windows",
  "Central locking",
  "Music system",
  "Alloy wheels",
  "Fog lamps",
  "Sunroof",
  "Leather seats",
  "Reverse camera",
  "Cruise control",
  "Keyless entry"
];

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "Kathmandu",
  year: "",
  vehicleType: "Hatchback",
  model: "",
  brand: "",
  color: "",
  kmDriven: "",
  document: "",
  photo: "",
  evBrand: "",
  finance: "",
  transmission: "",
  accident: "",
  fuelType: "Petrol",
  features: [],
  notes: ""
};

function Label({ children, required }) {
  return (
    <Text style={styles.label}>
      {children}
      {required ? <Text style={styles.required}> *</Text> : null}
    </Text>
  );
}

function TextField({ label, value, onChangeText, required, multiline, keyboardType, helper, placeholder }) {
  return (
    <View style={styles.field}>
      <Label required={required}>{label}</Label>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholderTextColor="#9ca3af"
        style={[styles.input, multiline && styles.notes]}
      />
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

function SelectField({ label, value, required, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.field}>
      <Label required={required}>{label}</Label>
      <Pressable style={styles.select} onPress={() => setOpen((current) => !current)}>
        {value ? (
          <Text style={styles.selectChip}>{value}</Text>
        ) : (
          <Text style={styles.selectPlaceholder}>Select...</Text>
        )}
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#6b7280" />
      </Pressable>

      {open ? (
        <View style={styles.dropdown}>
          <ScrollView nestedScrollEnabled style={styles.dropdownScroll}>
            {options.map((option) => {
              const selected = value === option;
              return (
              <Pressable
                key={option}
                style={[styles.dropdownItem, selected && styles.dropdownItemSelected]}
                onPress={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <Text style={[styles.dropdownText, selected && styles.dropdownTextSelected]}>{option}</Text>
              </Pressable>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

function UploadField({ label, value, onPress }) {
  const isImage = value?.type?.startsWith("image/");
  const displayName = value?.name || "";

  return (
    <View style={styles.field}>
      <Label>{label}</Label>
      <Pressable style={styles.upload} onPress={onPress}>
        <Ionicons name="cloud-upload-outline" size={18} color="#1f2937" />
        <Text style={styles.uploadText}>
          Drop files here or <Text style={styles.browseText}>browse</Text>
        </Text>
      </Pressable>
      {value ? (
        <View style={styles.filePreview}>
          {isImage ? (
            <Image source={{ uri: value.uri }} style={styles.fileThumb} />
          ) : (
            <View style={styles.fileDoc}>
              <Text style={styles.fileDocText}>PDF</Text>
            </View>
          )}
          <Text style={styles.fileName} numberOfLines={1}>
            {displayName}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.navCard}>
        <View style={styles.brand}>
          <Image source={nepalFlagLogo} style={styles.logo} />
          <Text style={styles.brandText} numberOfLines={1}>
            NEPAL Motor
          </Text>
        </View>
        <Pressable
          style={({ hovered }) => [styles.phoneButton, hovered && styles.phoneButtonHover]}
          hitSlop={12}
        >
          {({ hovered }) => (
            <>
              <Ionicons name="call-outline" size={30} color="#111827" />
              {hovered ? (
                <View style={styles.phoneTooltip}>
                  <Text style={styles.phoneTooltipText}>Call +977 9800000000</Text>
                </View>
              ) : null}
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [featurePickerOpen, setFeaturePickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage("");
    setMessageType("");
  };

  const toggleFeature = (feature) => {
    setForm((current) => {
      const selected = current.features.includes(feature);
      return {
        ...current,
        features: selected
          ? current.features.filter((item) => item !== feature)
          : [...current.features, feature]
      };
    });
  };

  const clearForm = () => {
    setForm(emptyForm);
    setMessage("");
    setMessageType("");
  };

  const pickFile = async (key, type) => {
    const result = await DocumentPicker.getDocumentAsync({
      type,
      copyToCacheDirectory: true,
      multiple: false
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    update(key, {
      name: asset?.name || "Selected file",
      uri: asset?.uri,
      type: asset?.mimeType || ""
    });
  };

  const submit = () => {
    setFeaturePickerOpen(false);
    const requiredFields = [
      "fullName",
      "phone",
      "city",
      "year",
      "vehicleType",
      "model",
      "brand",
      "color",
      "kmDriven",
      "transmission",
      "fuelType",
      "evBrand",
      "finance"
    ];
    const missingRequiredField = requiredFields.some((key) => {
      const value = form[key];
      return Array.isArray(value) ? !value.length : !String(value || "").trim();
    });

    if (missingRequiredField) {
      setMessageType("error");
      setMessage("Please fill in all required fields.");
      return;
    }

    setMessageType("success");
    setMessage("Thank you! Your exchange request has been submitted.");
    setForm(emptyForm);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Header />
        <Text style={styles.title}>Exchange to EV</Text>

        <TextField
          label="Full Name"
          required
          value={form.fullName}
          onChangeText={(value) => update("fullName", value)}
        />
        <TextField
          label="Email"
          value={form.email}
          keyboardType="email-address"
          onChangeText={(value) => update("email", value)}
        />
        <TextField
          label="Phone"
          required
          value={form.phone}
          keyboardType="phone-pad"
          onChangeText={(value) => update("phone", value)}
        />
        <SelectField
          label="City"
          required
          value={form.city}
          options={cities}
          onChange={(value) => update("city", value)}
        />
        <TextField
          label="Year of Manufacture"
          required
          value={form.year}
          placeholder="2007"
          keyboardType="numeric"
          onChangeText={(value) => update("year", value)}
        />
        <SelectField
          label="Vehicle Type"
          required
          value={form.vehicleType}
          options={vehicleTypes}
          onChange={(value) => update("vehicleType", value)}
        />
        <TextField
          label="Vehicle Model"
          required
          value={form.model}
          placeholder="Santro"
          onChangeText={(value) => update("model", value)}
        />
        <TextField
          label="Vehicle Brand"
          required
          value={form.brand}
          placeholder="Hyundai"
          onChangeText={(value) => update("brand", value)}
        />
        <SelectField
          label="Vehicle Color"
          required
          value={form.color}
          options={colors}
          onChange={(value) => update("color", value)}
        />
        <TextField
          label="KM Driven"
          required
          value={form.kmDriven}
          keyboardType="numeric"
          onChangeText={(value) => update("kmDriven", value)}
        />
        <UploadField
          label="Upload Vehicle Document"
          value={form.document}
          onPress={() => pickFile("document", "*/*")}
        />
        <UploadField
          label="Upload Vehicle Photo"
          value={form.photo}
          onPress={() => pickFile("photo", "image/*")}
        />
        <SelectField
          label="Transmission / Gear"
          required
          value={form.transmission}
          options={transmissions}
          onChange={(value) => update("transmission", value)}
        />
        <SelectField
          label="Accidents"
          value={form.accident}
          options={accidents}
          onChange={(value) => update("accident", value)}
        />
        <SelectField
          label="Fuel Type"
          required
          value={form.fuelType}
          options={fuelTypes}
          onChange={(value) => update("fuelType", value)}
        />

        <View style={styles.field}>
          <Label>Features</Label>
          <View style={styles.featureBox}>
            <Pressable style={styles.addButton} onPress={() => setFeaturePickerOpen(true)}>
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
                    <Text style={styles.featureText}>{feature}</Text>
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
                {features.map((feature) => {
                  const selected = form.features.includes(feature);
                  return (
                    <Pressable
                      key={feature}
                      onPress={() => toggleFeature(feature)}
                      style={[styles.featureOption, selected && styles.featureOptionSelected]}
                    >
                      <Text style={[styles.featureOptionText, selected && styles.featureOptionTextSelected]}>
                        {feature}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          ) : null}
        </View>

        <SelectField
          label="Interested EV Brand"
          required
          value={form.evBrand}
          options={evBrands}
          onChange={(value) => update("evBrand", value)}
        />
        <SelectField
          label="Are you looking for Finance?"
          required
          value={form.finance}
          options={financeOptions}
          onChange={(value) => update("finance", value)}
        />

        <TextField
          label="Notes"
          value={form.notes}
          multiline
          onChangeText={(value) => update("notes", value)}
        />

        {message ? (
          <View style={[styles.messageBox, messageType === "success" ? styles.successBox : styles.errorBox]}>
            <Text style={[styles.messageText, messageType === "success" ? styles.successText : styles.errorText]}>
              {message}
            </Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          <Pressable style={styles.clearButton} onPress={clearForm}>
            {({ hovered }) => (
              <>
                <Ionicons name="refresh" size={18} color="#006ffd" />
                <Text style={[styles.clearText, hovered && styles.clearTextHover]}>Clear form</Text>
              </>
            )}
          </Pressable>
          <Pressable style={({ hovered }) => [styles.submitButton, hovered && styles.submitButtonHover]} onPress={submit}>
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          Do not submit passwords through this form. <Text style={styles.report}>Report malicious form</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    backgroundColor: "#ffffff",
    marginBottom: 38
  },
  navCard: {
    width: "100%",
    maxWidth: 564,
    minHeight: 80,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4
  },
  brand: {
    minWidth: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingRight: 12
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  brandText: {
    flexShrink: 1,
    color: "#020617",
    fontSize: 34,
    fontWeight: "800"
  },
  phoneButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative"
  },
  phoneButtonHover: {
    backgroundColor: "#f2f2f2"
  },
  phoneTooltip: {
    position: "absolute",
    top: 50,
    right: 0,
    minWidth: 174,
    borderRadius: 6,
    backgroundColor: "#111827",
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    zIndex: 50
  },
  phoneTooltipText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700"
  },
  container: {
    width: "100%",
    maxWidth: 564,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 80
  },
  title: {
    color: "#020617",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 42,
    paddingBottom: 26,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede"
  },
  field: {
    marginBottom: 34
  },
  label: {
    fontSize: 15,
    color: "#020617",
    fontWeight: "400",
    marginBottom: 9
  },
  required: {
    color: "#c2185b",
    fontWeight: "400"
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 8,
    paddingHorizontal: 11,
    backgroundColor: "#ffffff",
    color: "#020617",
    fontSize: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  notes: {
    height: 92,
    paddingTop: 10,
    textAlignVertical: "top"
  },
  helper: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 6
  },
  select: {
    height: 52,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 8,
    paddingHorizontal: 11,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  selectChip: {
    color: "#075985",
    fontSize: 15,
    fontWeight: "700",
    borderRadius: 5,
    backgroundColor: "#e5f3ff",
    paddingHorizontal: 10,
    paddingVertical: 7,
    overflow: "hidden"
  },
  selectPlaceholder: {
    color: "#9ca3af",
    fontSize: 18
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#dedede",
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#ffffff",
    maxHeight: 260,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  dropdownScroll: {
    maxHeight: 260
  },
  dropdownItem: {
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff"
  },
  dropdownItemSelected: {
    backgroundColor: "#f8fafc"
  },
  dropdownText: {
    color: "#020617",
    fontSize: 18
  },
  dropdownTextSelected: {
    fontWeight: "700"
  },
  upload: {
    height: 125,
    borderWidth: 1,
    borderColor: "#dedede",
    borderStyle: "dashed",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
    shadowOpacity: 0,
    elevation: 0
  },
  uploadText: {
    color: "#475569",
    fontSize: 15
  },
  browseText: {
    color: "#006ffd",
    textDecorationLine: "underline"
  },
  filePreview: {
    width: 134,
    height: 134,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 6,
    backgroundColor: "#ffffff",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  fileThumb: {
    width: "100%",
    height: 92,
    resizeMode: "cover"
  },
  fileDoc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fileDocText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "700"
  },
  fileName: {
    width: "100%",
    color: "#334155",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 6,
    paddingVertical: 8
  },
  featureBox: {
    minHeight: 43,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  addButton: {
    width: 31,
    height: 31,
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center"
  },
  featureList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 7
  },
  featurePlaceholder: {
    color: "#9ca3af",
    fontSize: 17
  },
  feature: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f4f4f5"
  },
  featureSelected: {
    backgroundColor: "#dbeafe"
  },
  featureText: {
    color: "#111827",
    fontSize: 13
  },
  featureDropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#dedede",
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  featureOptions: {
    maxHeight: 258
  },
  featureOption: {
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff"
  },
  featureOptionSelected: {
    backgroundColor: "#f8fafc"
  },
  featureOptionText: {
    color: "#020617",
    fontSize: 18
  },
  featureOptionTextSelected: {
    fontWeight: "700"
  },
  actions: {
    marginTop: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingRight: 16,
    cursor: "pointer"
  },
  clearText: {
    color: "#006ffd",
    fontSize: 15
  },
  clearTextHover: {
    textDecorationLine: "underline"
  },
  submitButton: {
    backgroundColor: "#111318",
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    cursor: "pointer"
  },
  submitButtonHover: {
    backgroundColor: "#2b2d31"
  },
  submitText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700"
  },
  messageBox: {
    marginTop: 16,
    marginBottom: 4,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 13
  },
  successBox: {
    borderColor: "#bbf7d0",
    backgroundColor: "#f0fdf4"
  },
  errorBox: {
    borderColor: "#fecaca",
    backgroundColor: "#fff1f2"
  },
  messageText: {
    fontSize: 16
  },
  successText: {
    color: "#008236"
  },
  errorText: {
    color: "#dc2626"
  },
  footer: {
    color: "#475569",
    fontSize: 13,
    marginTop: 55
  },
  report: {
    textDecorationLine: "underline"
  }
});

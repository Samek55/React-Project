import React, { useState } from "react";
import {
  Alert,
  Modal,
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

const colors = ["White", "Silver", "Black", "Grey", "Red", "Blue", "Other"];
const cities = ["Kathmandu", "Pokhara", "Biratnagar", "Itahari", "Other"];
const vehicleTypes = ["Hatchback", "Sedan", "SUV", "Compact SUV", "Van", "Pickup", "I don't know"];
const evBrands = ["BYD", "Tata", "MG", "Hyundai", "Kia", "Neta", "Deepal", "Other"];
const financeOptions = ["Yes", "No", "Please Suggest"];
const transmissions = ["Automatic", "Manual", "Semi Automatic"];
const accidents = ["Yes", "No", "Few Times", "Many Times", "I don't know", "Other"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG", "Other"];
const features = [
  "AC",
  "Power Steering",
  "Power Window",
  "ABS",
  "Airbag",
  "Reverse Camera",
  "Alloy Wheel",
  "Central Lock",
  "Touch Screen",
  "Bluetooth",
  "Sunroof",
  "Parking Sensor",
  "Leather Seat",
  "Keyless Entry",
  "Cruise Control",
  "Heated Seat"
];

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "Kathmandu",
  year: "2007",
  vehicleType: "Hatchback",
  model: "Santro",
  brand: "Hyundai",
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

function TextField({ label, value, onChangeText, required, multiline, keyboardType, helper }) {
  return (
    <View style={styles.field}>
      <Label required={required}>{label}</Label>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
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
      <Pressable style={styles.select} onPress={() => setOpen(true)}>
        <Text style={[styles.selectText, !value && styles.muted]}>{value}</Text>
        <Ionicons name="chevron-down" size={18} color="#8b95a1" />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>{label}</Text>
            {options.map((option) => (
              <Pressable
                key={option}
                style={styles.menuItem}
                onPress={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <Text style={styles.menuText}>{option}</Text>
                {value === option ? <Ionicons name="checkmark" size={20} color="#111827" /> : null}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

function UploadField({ label, value, onPress }) {
  return (
    <View style={styles.field}>
      <Label>{label}</Label>
      <Pressable style={styles.upload} onPress={onPress}>
        <Ionicons name="cloud-upload-outline" size={18} color="#1f2937" />
        <Text style={styles.uploadText}>{value || "Drop files here or browse"}</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [featurePickerOpen, setFeaturePickerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSubmitted(false);
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
    setSubmitted(false);
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

    update(key, result.assets[0]?.name || "Selected file");
  };

  const submit = () => {
    setSubmitted(true);
    setFeaturePickerOpen(false);
    setForm(emptyForm);
    Alert.alert("Submitted", "Your form has been submitted.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
          onChangeText={(value) => update("model", value)}
        />
        <TextField
          label="Vehicle Brand"
          required
          value={form.brand}
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
          label="Interested EV Brand"
          required
          value={form.evBrand}
          options={evBrands}
          onChange={(value) => update("evBrand", value)}
        />
        <SelectField
          label="Are you looking for Finance ?"
          required
          value={form.finance}
          options={financeOptions}
          onChange={(value) => update("finance", value)}
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
              {form.features.map((feature) => (
                <Pressable
                  key={feature}
                  onPress={() => toggleFeature(feature)}
                  style={[styles.feature, styles.featureSelected]}
                >
                  <Text style={styles.featureText}>{feature}</Text>
                </Pressable>
              ))}
            </View>
          </View>
          {featurePickerOpen ? (
            <View style={styles.featureDropdown}>
              <View style={styles.featureDropdownHeader}>
                <Text style={styles.featureDropdownTitle}>Select Features</Text>
                <Pressable onPress={() => setFeaturePickerOpen(false)} hitSlop={10}>
                  <Ionicons name="close" size={19} color="#475569" />
                </Pressable>
              </View>
              <View style={styles.featureOptions}>
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
                      {selected ? <Ionicons name="checkmark" size={16} color="#0f172a" /> : null}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}
        </View>

        <TextField
          label="Notes"
          value={form.notes}
          multiline
          onChangeText={(value) => update("notes", value)}
        />

        <View style={styles.actions}>
          <Pressable style={styles.clearButton} onPress={clearForm}>
            <Ionicons name="refresh" size={18} color="#006ffd" />
            <Text style={styles.clearText}>Clear form</Text>
          </Pressable>
          <Pressable style={styles.submitButton} onPress={submit}>
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </View>

        {submitted ? (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={20} color="#166534" />
            <Text style={styles.successText}>Your form has been submitted.</Text>
          </View>
        ) : null}

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
  container: {
    width: "100%",
    maxWidth: 1384,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 80
  },
  title: {
    color: "#020617",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18
  },
  field: {
    marginBottom: 18
  },
  label: {
    fontSize: 15,
    color: "#020617",
    fontWeight: "700",
    marginBottom: 9
  },
  required: {
    color: "#c2185b",
    fontWeight: "400"
  },
  input: {
    height: 43,
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
    height: 43,
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
  selectText: {
    color: "#020617",
    fontSize: 15
  },
  muted: {
    color: "#ffffff"
  },
  upload: {
    height: 82,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  uploadText: {
    color: "#475569",
    fontSize: 15
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
    gap: 7
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
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  featureDropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  featureDropdownTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700"
  },
  featureOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  featureOption: {
    minHeight: 34,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f8fafc"
  },
  featureOptionSelected: {
    borderColor: "#93c5fd",
    backgroundColor: "#dbeafe"
  },
  featureOptionText: {
    color: "#334155",
    fontSize: 13
  },
  featureOptionTextSelected: {
    color: "#0f172a",
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
    paddingRight: 16
  },
  clearText: {
    color: "#006ffd",
    fontSize: 15
  },
  submitButton: {
    backgroundColor: "#111318",
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  submitText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700"
  },
  successBox: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 8,
    backgroundColor: "#f0fdf4",
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  successText: {
    color: "#166534",
    fontSize: 15,
    fontWeight: "700"
  },
  footer: {
    color: "#475569",
    fontSize: 13,
    marginTop: 55
  },
  report: {
    textDecorationLine: "underline"
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.2)",
    justifyContent: "center",
    padding: 24
  },
  menu: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  },
  menuTitle: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  menuItem: {
    minHeight: 44,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  menuText: {
    color: "#111827",
    fontSize: 15
  }
});

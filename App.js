import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

const nepalFlagLogo = require("./assets/nepal-flag-logo.jpeg");
const phoneNumber = "+9779800000000";

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

const alphabetOnly = (value) => value.replace(/[^A-Za-z ]/g, "");
const alphabetPattern = /^[A-Za-z ]+$/;
const footerNavItems = [
  { key: "exchange", label: "Car Exchange", icon: "swap-horizontal-outline" },
  { key: "faqs", label: "FAQs", icon: "git-network-outline" },
  { key: "sell", label: "Sell Used Car", icon: "car-sport-outline" },
  { key: "about", label: "About us", icon: "speedometer-outline" },
  { key: "branches", label: "Branches", icon: "location-outline" }
];
const faqSections = [
  {
    title: "Car Exchange Page FAQs",
    items: [
      {
        question: "How does the car exchange process work?",
        answer: "We evaluate your current petrol, diesel, or used vehicle and provide a fair market value that can be adjusted toward your next vehicle purchase, including EV cars."
      },
      {
        question: "Can I exchange my petrol or diesel car for an electric vehicle?",
        answer: "Yes, we specialize in exchanging petrol and diesel vehicles for modern electric vehicles with professional valuation and paperwork support."
      },
      {
        question: "How long does the vehicle exchange process take?",
        answer: "Most car exchanges can be completed within a few hours after inspection, document verification, and final agreement."
      },
      {
        question: "Do you provide valuation for all car brands?",
        answer: "Yes, we evaluate cars from most major brands, including hatchbacks, sedans, SUVs, and premium vehicles."
      },
      {
        question: "Is vehicle inspection required before exchange?",
        answer: "Yes, a professional inspection helps determine the vehicle's market value based on condition, mileage, service history, and demand."
      }
    ]
  },
  {
    title: "General FAQs",
    items: [
      {
        question: "Why should I choose your company for used car exchange services?",
        answer: "We provide transparent pricing, verified documentation, professional inspections, and hassle-free ownership transfer services."
      },
      {
        question: "Do you assist with ownership transfer and paperwork?",
        answer: "Yes, our team manages the complete documentation process, including ownership transfer and legal paperwork."
      },
      {
        question: "Are your used cars inspected before listing for sale?",
        answer: "Yes, every used car goes through a professional inspection process to ensure quality, reliability, and transparency."
      },
      {
        question: "Can I finance a used car purchase?",
        answer: "Yes, financing options may be available depending on the vehicle and customer eligibility."
      },
      {
        question: "Do you buy cars directly from owners?",
        answer: "Yes, we purchase used cars directly from owners after inspection and valuation."
      }
    ]
  },
  {
    title: "Sell Used Car FAQs",
    items: [
      {
        question: "What documents are required to sell my used car?",
        answer: "Typically, you need the registration certificate, insurance papers, citizenship/license copy, tax clearance, and service records if available."
      },
      {
        question: "How is the selling price of my car determined?",
        answer: "The price is based on brand, model, condition, mileage, service history, market demand, and inspection results."
      },
      {
        question: "Can I sell a financed or loan vehicle?",
        answer: "Yes, financed vehicles can be sold after proper coordination with the financing institution and loan clearance procedures."
      }
    ]
  },
  {
    title: "Buy Used Car FAQs",
    items: [
      {
        question: "Are the used cars verified and quality checked?",
        answer: "Yes, all vehicles are professionally inspected and verified before being listed for sale to ensure customer confidence."
      },
      {
        question: "Can I test drive a used car before purchasing?",
        answer: "Yes, customers can schedule a test drive to check the vehicle's condition, comfort, and performance before making a decision."
      }
    ]
  },
  {
    title: "Branches FAQs",
    items: [
      {
        question: "Do you have multiple branches for car exchange and used car services?",
        answer: "Yes, we operate through multiple branches to provide convenient vehicle exchange, buying, and selling services across different locations."
      },
      {
        question: "Can I visit any branch for vehicle inspection or valuation?",
        answer: "Yes, customers can visit the nearest branch for professional inspection, valuation, and consultation services."
      }
    ]
  }
];
const branches = [
  {
    name: "Dongol Automobiles",
    location: "Itahari",
    contact: "Suman Dongol",
    phone: "9852024365"
  },
  {
    name: "Auto Palace",
    location: "Biratnagar",
    contact: "Raju Khatri",
    phone: "9852031716"
  },
  {
    name: "Santosh DYB",
    location: "Kathmandu",
    contact: "Kafindra Bhattarai",
    phone: "9852041927"
  }
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
  document: [],
  photo: [],
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

function TextField({
  label,
  value,
  onChangeText,
  required,
  multiline,
  keyboardType,
  helper,
  placeholder,
  onFocus,
  maxLength,
  error
}) {
  return (
    <View style={styles.field}>
      <Label required={required}>{label}</Label>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        onFocus={onFocus}
        maxLength={maxLength}
        placeholderTextColor="#9ca3af"
        style={[styles.input, multiline && styles.notes]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

function SelectField({ label, value, required, options, onChange, onOpen }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.field}>
      <Label required={required}>{label}</Label>
      <Pressable
        style={styles.select}
        onPress={() => {
          Keyboard.dismiss();
          onOpen?.();
          setOpen((current) => !current);
        }}
      >
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

function UploadField({ label, value = [], onPress, error }) {
  return (
    <View style={styles.field}>
      <Label>{label}</Label>

      <Pressable style={styles.upload} onPress={onPress}>
        <Ionicons name="cloud-upload-outline" size={18} color="#1f2937" />
        <Text style={styles.uploadText}>
          Upload up to 5 files <Text style={styles.browseText}>browse</Text>
        </Text>
      </Pressable>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {value.length > 0 && (
        <View style={{ marginTop: 10 }}>
          {value.map((file, index) => {
            const isImage = file?.type?.startsWith("image/");

            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#dedede",
                  borderRadius: 6
                }}
              >
                {isImage ? (
                  <Image
                    source={{ uri: file.uri }}
                    style={{ width: 40, height: 40, borderRadius: 6 }}
                  />
                ) : (
                  <View style={styles.fileDoc}>
                    <Text style={styles.fileDocText}>DOC</Text>
                  </View>
                )}

                <Text
                  numberOfLines={1}
                  style={{ marginLeft: 10, flex: 1 }}
                >
                  {file.name}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function FooterNavigation({ activeTab, onChange }) {
  return (
    <View style={styles.footerNavShell}>
      <View style={styles.footerNav}>
        {footerNavItems.map((item) => {
          const active = activeTab === item.key;

          return (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              onPress={() => onChange(item.key)}
              style={({ hovered }) => [
                styles.footerNavItem,
                hovered && styles.footerNavItemHover,
                active && styles.footerNavItemActive
              ]}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={active ? "#075985" : "#64748b"}
              />
              <Text
                numberOfLines={2}
                style={[styles.footerNavText, active && styles.footerNavTextActive]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function FAQsPage() {
  let faqNumber = 1;

  return (
    <View>
      <Text style={styles.title}>FAQs</Text>
      {faqSections.map((section) => (
        <View key={section.title} style={styles.faqSection}>
          <Text style={styles.faqSectionTitle}>{section.title}</Text>
          {section.items.map((item) => {
            const number = faqNumber;
            faqNumber += 1;

            return (
              <View key={item.question} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>
                  {number}. {item.question}
                </Text>
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

function BranchesPage() {
  return (
    <View>
      <Text style={styles.title}>Branches</Text>
      <View style={styles.branchList}>
        {branches.map((branch) => (
          <View key={branch.phone} style={styles.branchCard}>
            <View style={styles.branchIcon}>
              <Ionicons name="location-outline" size={24} color="#075985" />
            </View>
            <View style={styles.branchContent}>
              <Text style={styles.branchName}>{branch.name}</Text>
              <Text style={styles.branchLocation}>{branch.location}</Text>
              <Text style={styles.branchContact}>{branch.contact}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Call ${branch.contact}`}
                onPress={() => Linking.openURL(`tel:${branch.phone}`)}
                style={({ hovered }) => [styles.branchPhone, hovered && styles.branchPhoneHover]}
              >
                <Ionicons name="call-outline" size={16} color="#075985" />
                <Text style={styles.branchPhoneText}>{branch.phone}</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function AboutPage() {
  return (
    <View>
      <Text style={styles.title}>About NEPAL Motor</Text>
      <View style={styles.aboutBox}>
        <Text style={styles.aboutText}>
          NEPAL Motor helps customers exchange, buy, and sell used cars with transparent valuation, professional inspection, verified documentation, and ownership transfer support.
        </Text>
        <Text style={styles.aboutText}>
          We support petrol, diesel, and electric vehicle services, including car exchange toward EV options, direct used car selling, and branch-based consultation for inspection and valuation.
        </Text>
      </View>
    </View>
  );
}

function Header() {
  const callNepalMotor = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

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
          accessibilityRole="button"
          accessibilityLabel="Call NEPAL Motor"
          hitSlop={12}
          onPress={callNepalMotor}
        >
          {({ hovered }) => (
            <>
              <Ionicons name="headset-outline" size={30} color="#111827" />
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
  const [forms, setForms] = useState({
    exchange: emptyForm,
    sell: emptyForm
  });
  const [featurePickerOpen, setFeaturePickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [yearError, setYearError] = useState("");
  const featurePickerRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [activeFooterTab, setActiveFooterTab] = useState("exchange");
  const scrollRef = useRef(null);
  const isSellForm = activeFooterTab === "sell";
  const formKey = isSellForm ? "sell" : "exchange";
  const form = forms[formKey];
  const availableFeatures = features.filter((feature) => !form.features.includes(feature));

  useEffect(() => {
    if (!featurePickerOpen || typeof document === "undefined") {
      return undefined;
    }

    const handleClickOutside = (event) => {
      const node = featurePickerRef.current;
      if (node?.contains && !node.contains(event.target)) {
        setFeaturePickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [featurePickerOpen]);

  const update = (key, value) => {
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

  const toggleFeature = (feature) => {
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

  const closeFeaturePicker = () => {
    if (featurePickerOpen) {
      setFeaturePickerOpen(false);
    }
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
  };

  const changeFooterTab = (tab) => {
    closeFeaturePicker();
    setErrors({});
    setMessage("");
    setMessageType("");
    setSubmitting(false);
    setActiveFooterTab(tab);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    });
  };

  const pickFile = async (key, type) => {
    const result = await DocumentPicker.getDocumentAsync({
      type,
      copyToCacheDirectory: true,
      multiple: true
    });

    if (result.canceled) {
      return;
    }

    const selectedFiles = result.assets.slice(0, 5).map((asset) => ({
      name: asset?.name || "Selected file",
      uri: asset?.uri,
      type: asset?.mimeType || ""
    }));

    setForms((current) => ({
      ...current,
      [formKey]: {
        ...current[formKey],
        [key]: [...current[formKey][key], ...selectedFiles].slice(0, 5)
      }
    }));
  };

  const submit = () => {
    if (submitting) {
      return;
    }

    setFeaturePickerOpen(false);
    setMessage("");
    setMessageType("");
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";

    if (!form.phone || form.phone.length !== 10)
      newErrors.phone = "Enter valid 10-digit phone number";

    if (!form.year) newErrors.year = "Year is required";

    if (!form.model.trim())
      newErrors.model = "Vehicle Model is required";
    else if (!alphabetPattern.test(form.model.trim()))
      newErrors.model = "Vehicle Model can only contain alphabets";

    if (!form.brand.trim())
      newErrors.brand = "Vehicle Brand is required";

    if (!form.kmDriven.trim())
      newErrors.kmDriven = "KM Driven is required";

    if (!form.document.length)
      newErrors.document = "Upload vehicle document";

    if (!isSellForm && !form.photo.length)
      newErrors.photo = "Upload vehicle photo";

    const year = Number(form.year);

    if (form.year && (year < 1981 || year > 2026)) {
      newErrors.year = "Year must be between 1981 and 2026";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      });
      return;
    }

    setSubmitting(true);
    const submittedFormKey = formKey;
    const submittedIsSellForm = isSellForm;
    setTimeout(() => {
    setSubmitting(false);
    setMessageType("success");
    setMessage(
      submittedIsSellForm
        ? "Thank you! Your sell used car request has been submitted."
        : "Thank you! Your exchange request has been submitted."
    );
    setForms((current) => ({
      ...current,
      [submittedFormKey]: emptyForm
    }));
    setErrors({});
  }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={closeFeaturePicker}
      >
        <Header />
        {activeFooterTab === "faqs" ? (
          <FAQsPage />
        ) : activeFooterTab === "branches" ? (
          <BranchesPage />
        ) : activeFooterTab === "about" ? (
          <AboutPage />
        ) : (
          <>
        <Pressable onPress={closeFeaturePicker}>
          <Text style={styles.title}>{isSellForm ? "Sell Any Car" : "Exchange to EV"}</Text>
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
          onFocus={closeFeaturePicker}
          onChangeText={(value) => update("email", value)}
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
          onOpen={closeFeaturePicker}
          onChange={(value) => update("city", value)}
        />
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
                onlyNumbers.length === 4 && (year < 1981 || year > 2026)
                  ? "Year must be between 1981 and 2026"
                  : ""
            }));
          }}
        />
        <SelectField
          label="Vehicle Type"
          required
          value={form.vehicleType}
          options={vehicleTypes}
          onOpen={closeFeaturePicker}
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
          options={colors}
          onOpen={closeFeaturePicker}
          onChange={(value) => update("color", value)}
        />
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
          onPress={() => {
            closeFeaturePicker();
            pickFile("document", "*/*");
          }}
        />
        {!isSellForm ? (
          <UploadField
            label="Upload Vehicle Photo"
            value={form.photo}
            error={errors.photo}
            onPress={() => {
              closeFeaturePicker();
              pickFile("photo", "image/*");
            }}
          />
        ) : null}
        <SelectField
          label="Transmission / Gear"
          required
          value={form.transmission}
          options={transmissions}
          onOpen={closeFeaturePicker}
          onChange={(value) => update("transmission", value)}
        />
        {!isSellForm ? (
          <SelectField
            label="Accidents"
            value={form.accident}
            options={accidents}
            onOpen={closeFeaturePicker}
            onChange={(value) => update("accident", value)}
          />
        ) : null}
        <SelectField
          label="Fuel Type"
          required
          value={form.fuelType}
          options={fuelTypes}
          onOpen={closeFeaturePicker}
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
                    <Text style={styles.featureText}>{feature} ×</Text>
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

        {!isSellForm ? (
          <>
            <SelectField
              label="Interested EV Brand"
              required
              value={form.evBrand}
              options={evBrands}
              onOpen={closeFeaturePicker}
              onChange={(value) => update("evBrand", value)}
            />
            <SelectField
              label="Are you looking for Finance?"
              required
              value={form.finance}
              options={financeOptions}
              onOpen={closeFeaturePicker}
              onChange={(value) => update("finance", value)}
            />
          </>
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

        <View style={styles.actions}>
          <Pressable
            style={[styles.clearButton, submitting && styles.clearButtonDisabled]}
            onPress={submitting ? undefined : clearForm}
          >
            {({ hovered }) => (
              <>
                <Ionicons name="refresh" size={18} color={submitting ? "#93c5fd" : "#006ffd"} />
                <Text style={[styles.clearText, submitting && styles.clearTextDisabled, hovered && !submitting && styles.clearTextHover]}>
                  Clear form
                </Text>
              </>
            )}
          </Pressable>
          <Pressable
            style={({ hovered }) => [
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

        <Text style={styles.footer}>
          Do not submit passwords through this form. <Text style={styles.report}>Report malicious form</Text>
        </Text>
          </>
        )}
      </ScrollView>
      <FooterNavigation
        activeTab={activeFooterTab}
        onChange={changeFooterTab}
      />
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
    paddingHorizontal: 8,
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
    gap: 8,
    paddingRight: 4
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
    fontSize: 30,
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
    position: "relative",
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 146
  },
  title: {
    color: "#020617",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 42,
    paddingBottom: 26,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede"
  },
  field: {
    marginBottom: 34
  },
  featurePickerOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2
  },
  featureFieldOpen: {
    position: "relative",
    zIndex: 3
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
    backgroundColor: "#ffffff"
  },
  featureOptionText: {
    color: "#020617",
    fontSize: 18
  },
  featureOptionTextMuted: {
    color: "#9ca3af",
    fontSize: 18
  },
  featureOptionTextSelected: {
    color: "#9ca3af",
    fontWeight: "400"
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
  clearButtonDisabled: {
    cursor: "default"
  },
  clearText: {
    color: "#006ffd",
    fontSize: 15
  },
  clearTextDisabled: {
    color: "#93c5fd"
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
  submitButtonDisabled: {
    backgroundColor: "#6b6b6b",
    cursor: "default"
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
  faqSection: {
    marginBottom: 28
  },
  faqSectionTitle: {
    color: "#075985",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12
  },
  faqItem: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  faqQuestion: {
    color: "#020617",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
    marginBottom: 7
  },
  faqAnswer: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 21
  },
  branchList: {
    gap: 12
  },
  branchCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 14,
    flexDirection: "row",
    gap: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  branchIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#e5f3ff",
    alignItems: "center",
    justifyContent: "center"
  },
  branchContent: {
    flex: 1,
    minWidth: 0
  },
  branchName: {
    color: "#020617",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 3
  },
  branchLocation: {
    color: "#075985",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8
  },
  branchContact: {
    color: "#334155",
    fontSize: 14,
    marginBottom: 10
  },
  branchPhone: {
    alignSelf: "flex-start",
    minHeight: 34,
    borderRadius: 6,
    backgroundColor: "#e5f3ff",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  branchPhoneHover: {
    backgroundColor: "#dbeafe"
  },
  branchPhoneText: {
    color: "#075985",
    fontSize: 14,
    fontWeight: "800"
  },
  aboutBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  aboutText: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12
  },
  footerNavShell: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 8,
    paddingHorizontal: 18,
    alignItems: "center"
  },
  footerNav: {
    width: "100%",
    maxWidth: 564,
    minHeight: 72,
    paddingHorizontal: 8,
    paddingTop: 7,
    paddingBottom: 7,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 18,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12
  },
  footerNavItem: {
    flex: 1,
    minHeight: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    gap: 4
  },
  footerNavItemActive: {
    backgroundColor: "#e0f2fe"
  },
  footerNavItemHover: {
    backgroundColor: "#f8fafc"
  },
  footerNavText: {
    color: "#64748b",
    fontSize: 9,
    lineHeight: 11,
    textAlign: "center",
    fontWeight: "800"
  },
  footerNavTextActive: {
    color: "#075985"
  },
  report: {
    textDecorationLine: "underline"
  },
  errorText: {
    color: "#dc2626",
    fontSize: 13,
    marginTop: 6
  },
});

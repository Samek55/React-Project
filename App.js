import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Keyboard
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Ellipse, Line, Path, Rect, Text as SvgText } from "react-native-svg";

const nepalFlagLogo = require("./assets/nepal-flag-logo.jpeg");
const exchangeImage = require("./assets/car-exchange.png");
const sellImage = require("./assets/sell-used-car.png");
const buyImage = require("./assets/buy-used-car.png");
const phoneNumber = "+9779852024365";
const vehicleListingsEndpoint = "https://www.nepalmotor.com/api/vehicle-listings";
const vehicleSubmissionEndpoint = "https://www.nepalmotor.com/api/vehicle-submission";
const vehicleSubmissionEndpointFallback = "https://nepalmotor.com/api/vehicle-submission";
const dealerEndpoint = "https://www.nepalmotor.com/api/become-a-dealer";

const colors = ["White", "Black", "Silver", "Gray", "Red", "Blue", "Green", "Other"];
const cities = [
  "Itahari",
  "Kathmandu",
  "Pokhara",
  "Lalitpur",
  "Bharatpur",
  "Biratnagar",
  "Other"
];
const vehicleTypes = ["Hatchback", "Sedan", "SUV", "Crossover", "Pickup", "Van", "Other"];
const evBrands = ["BYD", "Tesla", "Nissan", "Hyundai", "MG", "Tata", "Mahindra", "Other"];
const financeOptions = ["Yes", "No"];
const transmissions = ["Manual", "Automatic", "Semi Automatic", "CVT", "Other"];
const accidents = ["No", "Minor", "Major", "Prefer not to say"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "CNG", "LPG", "Other"];
const fuelTypesWithEV = ["Petrol", "Diesel", "EV", "Hybrid", "CNG", "LPG", "Other"];
const features = [
  "Basic",
  "A/C",
  "4WD",
  "ABS",
  "Airbags",
  "Power Steering",
  "Power Windows",
  "Central Locking",
  "Music System",
  "Alloy Wheels",
  "Fog Lamps",
  "Sunroof",
  "Leather Seats",
  "Backup Camera",
  "Cruise Control",
  "Keyless Entry"
];

const alphabetOnly = (value) => value.replace(/[^A-Za-z ]/g, "");
const alphabetPattern = /^[A-Za-z ]+$/;
const navigationItems = [
  { key: "exchange", label: "Exchange", drawerLabel: "Exchange to EV", icon: "swap-horizontal-outline", svgIcon: "exchange" },
  { key: "faqs", label: "FAQs", drawerLabel: "FAQs", icon: "help-circle-outline", svgIcon: "graphql" },
  { key: "sell", label: "Sell", drawerLabel: "Sell Used Car", icon: "cash-outline", svgIcon: "carSide" },
  { key: "about", label: "About", drawerLabel: "About NEPAL Motor", icon: "information-circle-outline", svgIcon: "steering" },
  { key: "branches", label: "Dealers", drawerLabel: "Dealers", icon: "location-outline", svgIcon: "locationPin" },
  { key: "buy", label: "Buy", drawerLabel: "Buy Used Car", icon: "key-outline", footer: false },
];
const footerNavItems = navigationItems.filter((item) => item.footer !== false);
const onboardingStorageKey = "nepalMotorOnboardingComplete";
const onboardingSlides = [
  {
    type: "exchange",
    image: exchangeImage,
    title: "Exchange to EV",
    body: "Get rid of your petrol or diesel car and move into a brand new EV with guided valuation and exchange support.",
    metric: "Brand new EV path",
    detail: "Car exchange",
    aspectRatio: 1
  },
  {
    type: "sell",
    image: sellImage,
    title: "Sell Used Car",
    body: "Get genuine valuation of your car with verified vehicle details, document review, and branch-backed support.",
    metric: "Genuine valuation",
    detail: "Used car selling",
    aspectRatio: 1
  },
  {
    type: "buy",
    image: buyImage,
    title: "Buy Used Car",
    body: "Find hassle free car options with inspected vehicles, clear guidance, and smooth ownership assistance.",
    metric: "Hassle free options",
    detail: "Used car buying",
    aspectRatio: 1.48,
    resizeMode: "contain"
  }
];
const faqSectionData = [
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
const faqSections = [
  { title: "All FAQs", items: faqSectionData.flatMap((s) => s.items) },
  ...faqSectionData
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
  notes: "",
  budget: "",
  sellingPrice: ""
};

const appendUpload = (formData, fieldName, file) => {
  if (Platform.OS === "web" && file.file) {
    formData.append(fieldName, file.file, file.name || "photo.jpg");
    return;
  }

  formData.append(fieldName, {
    uri: file.uri,
    name: file.name || "photo.jpg",
    type: file.type || "image/jpeg"
  });
};

const appendFeatureFields = (formData, featuresValue) => {
  const featuresText = featuresValue.join(", ");

  if (!featuresValue.length) {
    formData.append("features", "");
    formData.append("Features", "");
    formData.append("vehicleFeatures", "");
    formData.append("additionalFeatures", "");
    formData.append("featuresCsv", "");
    formData.append("featuresJson", "[]");
    return;
  }

  formData.append("features", featuresText);
  formData.append("Features", featuresText);
  formData.append("vehicleFeatures", featuresText);
  formData.append("additionalFeatures", featuresText);
  formData.append("featuresCsv", featuresText);
  formData.append("featuresJson", JSON.stringify(featuresValue));
  featuresValue.forEach((feature) => {
    formData.append("features[]", feature);
  });
};

const buildVehicleSubmission = (form, isSellForm, options = {}) => {
  const formData = new FormData();
  const isBuyForm = options.isBuyForm || false;
  const evBrandValue =
    options.evBrand !== undefined
      ? options.evBrand
      : (isSellForm || isBuyForm)
        ? "Other"
        : form.evBrand;
  const financeValue = isSellForm ? "No" : form.finance;
  const accidentValue = (isSellForm || isBuyForm) ? "No" : form.accident || "No";
  const requestType = isSellForm ? "Sell Used Car" : isBuyForm ? "Buy Used Car" : "Exchange to EV";

  formData.append("fullName", form.fullName.trim());
  formData.append("email", form.email.trim());
  formData.append("phone", form.phone.trim());
  formData.append("city", form.city);
  if (!isBuyForm) formData.append("year", form.year.trim());
  formData.append("vehicleType", form.vehicleType);
  formData.append("vehicleBrand", form.brand.trim());
  formData.append("vehicleModel", form.model.trim());
  formData.append("vehicleColor", form.color);
  if (!isBuyForm) formData.append("kmDriven", form.kmDriven.trim());
  formData.append("transmission", form.transmission);
  formData.append("fuelType", form.fuelType);
  formData.append("evBrand", evBrandValue);
  formData.append("ev_brand", evBrandValue);
  formData.append("EV Brand", evBrandValue);
  formData.append("Interested EV Brand", evBrandValue);
  formData.append("interestedEvBrand", evBrandValue);
  formData.append("interested_ev_brand", evBrandValue);
  formData.append("preferredEvBrand", evBrandValue);
  formData.append("finance", financeValue);
  formData.append("accidents", accidentValue);
  formData.append("requestType", requestType);
  formData.append("notes", form.notes.trim());
  if (isBuyForm && form.budget.trim()) formData.append("budget", form.budget.trim());
  if (isSellForm && form.sellingPrice.trim()) formData.append("sellingPrice", form.sellingPrice.trim());

  appendFeatureFields(formData, form.features);
  if (!isBuyForm) {
    form.document.forEach((file) => appendUpload(formData, "documents", file));
    form.photo.forEach((file) => appendUpload(formData, "photos", file));
  }

  return formData;
};

const postVehicleSubmission = async (form, isSellForm, options = {}) => {
  const endpoints = [
    vehicleListingsEndpoint,
    vehicleSubmissionEndpoint,
    vehicleSubmissionEndpointFallback
  ];

  let lastError;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: buildVehicleSubmission(form, isSellForm, options)
      });

      const responseText = await response.text();

      let responseBody = {};
      try {
        responseBody = responseText ? JSON.parse(responseText) : {};
      } catch {
        responseBody = { raw: responseText };
      }

      console.log("API ENDPOINT:", endpoint);
      console.log("API RESPONSE:", responseBody);
      console.log("attachments:", responseBody.received?.attachments);

      if (!response.ok) {
        throw new Error(
          `Submission failed (${response.status}): ${
            responseBody?.message ||
            responseBody?.error?.message ||
            responseBody?.error ||
            responseText ||
            "No response body"
          }`
        );
      }

      return responseBody;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Network request failed");
};

const submissionErrorMessage = (error) => {
  return error?.message || String(error) || "Submission failed. Please try again.";
};

function Label({ children, required }) {
  return (
    <Text allowFontScaling={false} style={styles.label}>
      {children}
      {required ? <Text allowFontScaling={false} style={styles.required}> *</Text> : null}
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
        allowFontScaling={false}
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
      {error ? <Text allowFontScaling={false} style={styles.errorText}>{error}</Text> : null}
      {helper ? <Text allowFontScaling={false} style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

function SelectField({ label, value, required, options, onChange, onOpen, error }) {
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
          <Text allowFontScaling={false} style={styles.selectChip}>{value}</Text>
        ) : (
          <Text allowFontScaling={false} style={styles.selectPlaceholder}>Select...</Text>
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
                <Text allowFontScaling={false} style={[styles.dropdownText, selected && styles.dropdownTextSelected]}>{option}</Text>
              </Pressable>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
      {error ? <Text allowFontScaling={false} style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function UploadField({ label, value = [], onPress, onRemove, onClear, error }) {
  return (
    <View style={styles.field}>
      <View style={styles.uploadLabelRow}>
        <Label>{label}</Label>
        {value.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Clear ${label}`}
            hitSlop={8}
            onPress={onClear}
            style={styles.clearUploadButton}
          >
            <Ionicons name="trash-outline" size={15} color="#dc2626" />
            <Text allowFontScaling={false} style={styles.clearUploadText}>Clear all</Text>
          </Pressable>
        ) : null}
      </View>

      <Pressable style={styles.upload} onPress={onPress}>
        <Ionicons name="cloud-upload-outline" size={18} color="#1f2937" />
        <Text allowFontScaling={false} style={styles.uploadText}>
          Upload up to 5 files <Text allowFontScaling={false} style={styles.browseText}>browse</Text>
        </Text>
      </Pressable>
      {error ? <Text allowFontScaling={false} style={styles.errorText}>{error}</Text> : null}

      {value.length > 0 && (
        <View style={styles.filePreviewList}>
          {value.map((file, index) => {
            const isImage = file?.type?.startsWith("image/");

            return (
              <View
                key={`${file?.uri || file?.name || "file"}-${index}`}
                style={styles.filePreview}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${file.name || "selected file"}`}
                  hitSlop={8}
                  onPress={() => onRemove?.(index)}
                  style={styles.fileRemove}
                >
                  <Ionicons name="close" size={14} color="#475569" />
                </Pressable>
                {isImage ? (
                  <Image
                    source={{ uri: file.uri }}
                    style={styles.fileThumb}
                  />
                ) : (
                  <View style={styles.fileDoc}>
                    <Text allowFontScaling={false} style={styles.fileDocText}>DOC</Text>
                  </View>
                )}

                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  style={styles.fileName}
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

function renderNavSvgIcon(svgIcon, color, size = 22) {
  if (svgIcon === "exchange") {
    return (
      <Svg width={size} height={size} viewBox="-3.5 0 32 32">
        <Path
          fill={color}
          d="M21.75 20.469h2.531c0.75 0 0.875 0.438 0.344 0.938l-3.688 3.719c-0.313 0.344-0.906 0.344-1.25 0l-3.719-3.719c-0.5-0.5-0.375-0.938 0.375-0.938h2.531v-9.188c-0.125-1.281-1.188-2.25-2.5-2.25-1.344 0-2.438 1.031-2.5 2.344v9.25c-0.094 1.938-1.25 3.656-2.875 4.531-0.75 0.375-1.563 0.563-2.469 0.563s-1.688-0.188-2.438-0.563c-1.656-0.875-2.844-2.594-2.906-4.563v-9.063h-2.5c-0.75 0-0.906-0.406-0.375-0.906l3.688-3.719c0.344-0.344 0.938-0.344 1.25 0l3.719 3.719c0.531 0.5 0.375 0.906-0.375 0.906h-2.5v9.094c0.063 1.313 1.094 2.375 2.438 2.375s2.469-1.125 2.469-2.469v-9.156c0.094-1.969 1.219-3.625 2.875-4.5 0.75-0.375 1.594-0.594 2.5-0.594s1.719 0.219 2.5 0.594c1.594 0.844 2.719 2.469 2.875 4.375v9.219z"
        />
      </Svg>
    );
  }
  if (svgIcon === "carSide") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path fillRule="evenodd" clipRule="evenodd" d="M8.71454 16.826C8.7177 17.7092 8.20137 18.5073 7.40665 18.8476C6.61193 19.1878 5.6956 19.0031 5.08554 18.3797C4.47547 17.7563 4.29202 16.8172 4.62085 16.0008C4.94968 15.1845 5.72591 14.652 6.58709 14.652C7.15029 14.6509 7.69084 14.8794 8.08981 15.2871C8.48879 15.6948 8.71351 16.2483 8.71454 16.826Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <Path fillRule="evenodd" clipRule="evenodd" d="M19.1636 16.826C19.1667 17.7092 18.6504 18.5073 17.8557 18.8476C17.061 19.1878 16.1446 19.0031 15.5346 18.3797C14.9245 17.7563 14.7411 16.8172 15.0699 16.0008C15.3987 15.1845 16.1749 14.652 17.0361 14.652C17.5993 14.6509 18.1399 14.8794 18.5388 15.2871C18.9378 15.6948 19.1625 16.2483 19.1636 16.826Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <Path fill={color} d="M2.61096 9.99042C2.46815 10.3792 2.66758 10.8102 3.05639 10.953C3.44521 11.0958 3.87618 10.8964 4.01899 10.5076L2.61096 9.99042ZM4.0628 8.213L3.36486 7.93844C3.36278 7.94374 3.36075 7.94907 3.35879 7.95442L4.0628 8.213ZM9.79678 5.75C10.211 5.75 10.5468 5.41421 10.5468 5C10.5468 4.58579 10.211 4.25 9.79678 4.25V5.75ZM3.31498 10.999C3.72919 10.999 4.06498 10.6632 4.06498 10.249C4.06498 9.83479 3.72919 9.499 3.31498 9.499V10.999ZM2.0387 10.249L2.033 10.999H2.0387V10.249ZM1.28976 10.5605L1.82287 11.0881L1.82287 11.0881L1.28976 10.5605ZM0.974976 11.324L0.224976 11.3186V11.324H0.974976ZM0.224976 13C0.224976 13.4142 0.560762 13.75 0.974976 13.75C1.38919 13.75 1.72498 13.4142 1.72498 13H0.224976ZM3.31498 9.499C2.90076 9.499 2.56498 9.83479 2.56498 10.249C2.56498 10.6632 2.90076 10.999 3.31498 10.999V9.499ZM9.79678 10.999C10.211 10.999 10.5468 10.6632 10.5468 10.249C10.5468 9.83479 10.211 9.499 9.79678 9.499V10.999ZM17.5236 10.5076C17.6664 10.8964 18.0974 11.0958 18.4862 10.953C18.875 10.8102 19.0744 10.3792 18.9316 9.99042L17.5236 10.5076ZM17.4798 8.213L18.1838 7.95442C18.1818 7.94907 18.1798 7.94374 18.1777 7.93844L17.4798 8.213ZM9.79678 4.25C9.38256 4.25 9.04678 4.58579 9.04678 5C9.04678 5.41421 9.38256 5.75 9.79678 5.75V4.25ZM18.2276 10.999C18.6418 10.999 18.9776 10.6632 18.9776 10.249C18.9776 9.83479 18.6418 9.499 18.2276 9.499V10.999ZM9.79678 9.499C9.38256 9.499 9.04678 9.83479 9.04678 10.249C9.04678 10.6632 9.38256 10.999 9.79678 10.999V9.499ZM18.2276 9.499C17.8134 9.499 17.4776 9.83479 17.4776 10.249C17.4776 10.6632 17.8134 10.999 18.2276 10.999V9.499ZM21.3622 10.249L21.3622 10.999L21.3672 10.999L21.3622 10.249ZM22.425 11.324L23.175 11.324L23.175 11.3186L22.425 11.324ZM21.675 13C21.675 13.4142 22.0108 13.75 22.425 13.75C22.8392 13.75 23.175 13.4142 23.175 13H21.675ZM14.9087 17.576C15.3229 17.576 15.6587 17.2402 15.6587 16.826C15.6587 16.4118 15.3229 16.076 14.9087 16.076V17.576ZM8.71453 16.076C8.30031 16.076 7.96453 16.4118 7.96453 16.826C7.96453 17.2402 8.30031 17.576 8.71453 17.576V16.076ZM19.1636 16.076C18.7494 16.076 18.4136 16.4118 18.4136 16.826C18.4136 17.2402 18.7494 17.576 19.1636 17.576V16.076ZM21.3613 16.826L21.367 16.076H21.3613V16.826ZM22.1102 16.5145L21.5771 15.9869L21.5771 15.9869L22.1102 16.5145ZM22.425 15.751L23.175 15.7564V15.751H22.425ZM23.175 13C23.175 12.5858 22.8392 12.25 22.425 12.25C22.0108 12.25 21.675 12.5858 21.675 13H23.175ZM4.45963 17.576C4.87384 17.576 5.20963 17.2402 5.20963 16.826C5.20963 16.4118 4.87384 16.076 4.45963 16.076V17.576ZM2.0387 16.826L2.0387 16.076L2.033 16.076L2.0387 16.826ZM0.974976 15.751L0.224956 15.751L0.224995 15.7564L0.974976 15.751ZM1.72498 13C1.72498 12.5858 1.38919 12.25 0.974976 12.25C0.560762 12.25 0.224976 12.5858 0.224976 13H1.72498ZM10.5468 5C10.5468 4.58579 10.211 4.25 9.79678 4.25C9.38256 4.25 9.04678 4.58579 9.04678 5H10.5468ZM9.04678 10.249C9.04678 10.6632 9.38256 10.999 9.79678 10.999C10.211 10.999 10.5468 10.6632 10.5468 10.249H9.04678ZM0.974976 12.25C0.560762 12.25 0.224976 12.5858 0.224976 13C0.224976 13.4142 0.560762 13.75 0.974976 13.75V12.25ZM2.91815 13.75C3.33236 13.75 3.66815 13.4142 3.66815 13C3.66815 12.5858 3.33236 12.25 2.91815 12.25V13.75ZM22.425 13.75C22.8392 13.75 23.175 13.4142 23.175 13C23.175 12.5858 22.8392 12.25 22.425 12.25V13.75ZM20.3999 12.25C19.9857 12.25 19.6499 12.5858 19.6499 13C19.6499 13.4142 19.9857 13.75 20.3999 13.75V12.25ZM4.01899 10.5076L4.76681 8.47158L3.35879 7.95442L2.61096 9.99042L4.01899 10.5076ZM4.76074 8.48756C5.12559 7.5601 5.49128 6.87863 5.94824 6.42712C6.37329 6.00714 6.91377 5.75 7.74245 5.75V4.25C6.53923 4.25 5.6138 4.64886 4.89396 5.36013C4.20602 6.03987 3.74784 6.9649 3.36486 7.93844L4.76074 8.48756ZM7.74245 5.75H9.79678V4.25H7.74245V5.75ZM3.31498 9.499H2.0387V10.999H3.31498V9.499ZM2.0444 9.49902C1.55922 9.49533 1.09635 9.6897 0.756637 10.033L1.82287 11.0881C1.88214 11.0282 1.95808 10.9984 2.033 10.999L2.0444 9.49902ZM0.756637 10.033C0.41756 10.3757 0.22844 10.8385 0.224995 11.3186L1.72496 11.3294C1.72563 11.235 1.76297 11.1486 1.82287 11.0881L0.756637 10.033ZM0.224976 11.324V13H1.72498V11.324H0.224976ZM3.31498 10.999H9.79678V9.499H3.31498V10.999ZM18.9316 9.99042L18.1838 7.95442L16.7758 8.47158L17.5236 10.5076L18.9316 9.99042ZM18.1777 7.93844C17.7947 6.9649 17.3366 6.03987 16.6486 5.36013C15.9288 4.64886 15.0033 4.25 13.8001 4.25V5.75C14.6288 5.75 15.1693 6.00714 15.5943 6.42712C16.0513 6.87863 16.417 7.5601 16.7818 8.48756L18.1777 7.93844ZM13.8001 4.25H9.79678V5.75H13.8001V4.25ZM18.2276 9.499H9.79678V10.999H18.2276V9.499ZM18.2276 10.999H21.3622V9.499H18.2276V10.999ZM21.3672 10.999C21.5182 10.998 21.6735 11.1277 21.675 11.3294L23.175 11.3186C23.1678 10.3248 22.3719 9.49226 21.3572 9.49902L21.3672 10.999ZM21.675 11.324V13H23.175V11.324H21.675ZM14.9087 16.076H8.71453V17.576H14.9087V16.076ZM19.1636 17.576H21.3613V16.076H19.1636V17.576ZM21.3555 17.576C21.8407 17.5797 22.3036 17.3853 22.6433 17.042L21.5771 15.9869C21.5178 16.0468 21.4419 16.0766 21.367 16.076L21.3555 17.576ZM22.6433 17.042C22.9824 16.6993 23.1715 16.2365 23.175 15.7564L21.675 15.7456C21.6743 15.84 21.637 15.9264 21.5771 15.9869L22.6433 17.042ZM23.175 15.751V13H21.675V15.751H23.175ZM4.45963 16.076H2.0387V17.576H4.45963V16.076ZM2.033 16.076C1.95808 16.0766 1.88214 16.0468 1.82287 15.9869L0.756638 17.042C1.09635 17.3853 1.55922 17.5797 2.0444 17.576L2.033 16.076ZM1.82287 15.9869C1.76297 15.9264 1.72563 15.84 1.72496 15.7456L0.224995 15.7564C0.22844 16.2365 0.41756 16.6993 0.756638 17.042L1.82287 15.9869ZM1.72498 15.751V13H0.224976V15.751H1.72498ZM9.04678 5V10.249H10.5468V5H9.04678ZM0.974976 13.75H2.91815V12.25H0.974976V13.75ZM22.425 12.25H20.3999V13.75H22.425V12.25Z" />
      </Svg>
    );
  }
  return null;
}

function FooterNavigation({ activeTab, onChange }) {
  const insets = useSafeAreaInsets();
  const renderFooterIcon = (item, color) => {
    if (item.svgIcon === "exchange" || item.svgIcon === "carSide") {
      return renderNavSvgIcon(item.svgIcon, color, 22);
    }

    if (item.svgIcon === "graphql") {
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path
            fill={color}
            d="M14.051 2.751l4.935 2.85c.816-.859 2.173-.893 3.032-.077.148.14.274.301.377.477.589 1.028.232 2.339-.796 2.928-.174.1-.361.175-.558.223v5.699c1.146.273 1.854 1.423 1.58 2.569-.048.204-.127.4-.232.581-.592 1.023-1.901 1.374-2.927.782-.196-.113-.375-.259-.526-.429l-4.905 2.832c.372 1.124-.238 2.335-1.361 2.706-.217.071-.442.108-.67.108-1.181.001-2.139-.955-2.14-2.136 0-.205.029-.41.088-.609l-4.936-2.847c-.816.854-2.171.887-3.026.07-.854-.816-.886-2.171-.07-3.026.283-.297.646-.506 1.044-.603l.001-5.699c-1.15-.276-1.858-1.433-1.581-2.584.047-.198.123-.389.224-.566.592-1.024 1.902-1.374 2.927-.782.177.101.339.228.48.377l4.938-2.85C9.613 1.612 10.26.423 11.39.088 11.587.029 11.794 0 12 0c1.181-.001 2.139.954 2.14 2.134.001.209-.03.418-.089.617zm-.515.877c-.019.021-.037.039-.058.058l6.461 11.19c.026-.009.056-.016.082-.023V9.146c-1.145-.283-1.842-1.442-1.558-2.588.006-.024.012-.049.019-.072l-4.946-2.858zm-3.015.059l-.06-.06-4.946 2.852c.327 1.135-.327 2.318-1.461 2.645-.026.008-.051.014-.076.021v5.708l.084.023 6.461-11.19-.002.001zm2.076.507c-.39.112-.803.112-1.192 0l-6.46 11.189c.294.283.502.645.6 1.041h12.911c.097-.398.307-.761.603-1.044L12.597 4.194zm.986 16.227l4.913-2.838c-.015-.047-.027-.094-.038-.142H5.542l-.021.083 4.939 2.852c.388-.404.934-.653 1.54-.653.627 0 1.19.269 1.583.698z"
          />
        </Svg>
      );
    }

    if (item.svgIcon === "steering") {
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path
            fill={color}
            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zM8 13l-3.938.001A8.004 8.004 0 0 0 11 19.938V16a3 3 0 0 1-3-3zm11.938.001L16 13a3 3 0 0 1-3 3l.001 3.938a8.004 8.004 0 0 0 6.937-6.937zM12 4a8.001 8.001 0 0 0-7.938 7H8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h3.938A8.001 8.001 0 0 0 12 4z"
          />
        </Svg>
      );
    }

    if (item.svgIcon === "locationPin") {
      return (
        <Svg width={22} height={22} viewBox="0 0 32 32">
          <Path
            fill={color}
            d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"
          />
        </Svg>
      );
    }

    return <Ionicons name={item.icon} size={22} color={color} />;
  };

  return (
    <View style={[styles.footerNavShell, { bottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.footerNav}>
        {footerNavItems.map((item) => {
          const active = activeTab === item.key;
          const iconColor = active ? "#075985" : "#64748b";

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
              {renderFooterIcon(item, iconColor)}
              <Text
                allowFontScaling={false}
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

const faqChipMap = {
  "All": "All FAQs",
  "Exchange": "Car Exchange Page FAQs",
  "General": "General FAQs",
  "Sell": "Sell Used Car FAQs",
  "Buy": "Buy Used Car FAQs"
};

function FAQsPage() {
  const [openKey, setOpenKey] = useState(null);
  const [activeChip, setActiveChip] = useState("All");
  const totalCount = faqSections.flatMap((s) => s.items).length;

  const visibleSections = faqSections.filter((s) => s.title === faqChipMap[activeChip]);

  return (
    <View style={styles.faqPage}>
      <Text allowFontScaling={false} style={styles.faqPageTitle}>
        Frequently Asked{"\n"}Questions
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.faqChipsRow}
        style={styles.faqChipsScroll}
      >
        {Object.keys(faqChipMap).map((chip) => {
          const active = activeChip === chip;
          return (
            <Pressable
              key={chip}
              onPress={() => { setActiveChip(chip); setOpenKey(null); }}
              style={[styles.faqChip, active && styles.faqChipActive]}
            >
              <Text allowFontScaling={false} style={[styles.faqChipText, active && styles.faqChipTextActive]}>
                {chip}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {visibleSections.map((section, sIdx) => (
        <View key={section.title}>
          <View style={styles.faqSectionHeader}>
            <View style={styles.faqSectionAccent} />
            <Text allowFontScaling={false} style={styles.faqSectionTitle}>
              {section.title.replace(" Page FAQs", "").replace(" FAQs", "")}
            </Text>
          </View>
          {section.items.map((item, iIdx) => {
            const key = `${sIdx}-${iIdx}`;
            const expanded = openKey === key;
            return (
              <Pressable
                key={item.question}
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                onPress={() => setOpenKey(expanded ? null : key)}
                style={({ pressed, hovered }) => [
                  styles.faqItem,
                  expanded && styles.faqItemActive,
                  (pressed || hovered) && !expanded && styles.faqItemHover
                ]}
              >
                <View style={styles.faqQuestionRow}>
                  <Text allowFontScaling={false} style={[styles.faqQuestion, expanded && styles.faqQuestionExpanded]}>
                    {item.question}
                  </Text>
                  <View style={[styles.faqChevron, expanded && styles.faqChevronActive]}>
                    <Ionicons
                      name={expanded ? "chevron-up" : "chevron-down"}
                      size={18}
                      color={expanded ? "#ffffff" : "#075985"}
                    />
                  </View>
                </View>
                {expanded ? (
                  <Text allowFontScaling={false} style={styles.faqAnswer}>
                    {item.answer}
                  </Text>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

function BranchesPage() {
  const cities = ["All", ...Array.from(new Set(branches.map((b) => b.location)))];
  const [selectedCity, setSelectedCity] = React.useState("All");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const filtered = selectedCity === "All" ? branches : branches.filter((b) => b.location === selectedCity);

  return (
    <View>
      <Text style={styles.title}>Dealers</Text>

      {/* City dropdown */}
      <View style={styles.cityDropdownWrap}>
        <Text style={styles.cityDropdownLabel}>Filter by City</Text>
        <Pressable
          style={styles.cityDropdownBtn}
          onPress={() => setDropdownOpen((o) => !o)}
        >
          <Text style={styles.cityDropdownBtnText}>{selectedCity}</Text>
          <Ionicons name={dropdownOpen ? "chevron-up-outline" : "chevron-down-outline"} size={18} color="#075985" />
        </Pressable>
        {dropdownOpen && (
          <View style={styles.cityDropdownList}>
            {cities.map((city) => (
              <Pressable
                key={city}
                style={[styles.cityDropdownOption, selectedCity === city && styles.cityDropdownOptionActive]}
                onPress={() => { setSelectedCity(city); setDropdownOpen(false); }}
              >
                <Text style={[styles.cityDropdownOptionText, selectedCity === city && styles.cityDropdownOptionTextActive]}>
                  {city}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.branchList}>
        {filtered.map((branch) => (
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
        {filtered.length === 0 && (
          <Text style={styles.cityDropdownEmpty}>No dealers found in {selectedCity}.</Text>
        )}
      </View>
    </View>
  );
}

function AboutPage() {
  const stats = [
    { value: "3+", label: "Branches" },
    { value: "100%", label: "Verified" },
    { value: "24/7", label: "Support" },
  ];

  const services = [
    {
      svgIcon: "exchange",
      title: "Exchange to EV",
      desc: "Trade your petrol or diesel vehicle for a modern electric car with guided valuation and full exchange support."
    },
    {
      svgIcon: "carSide",
      title: "Sell Used Car",
      desc: "Get a genuine market-based valuation, professional inspection, and hassle-free ownership transfer."
    },
    {
      icon: "key-outline",
      title: "Buy Used Car",
      desc: "Browse inspected pre-owned vehicles with verified documents and branch-backed purchase guidance."
    }
  ];

  const values = [
    { icon: "shield-checkmark-outline", label: "Transparency" },
    { icon: "star-outline", label: "Quality" },
    { icon: "people-outline", label: "Trust" },
    { icon: "trending-up-outline", label: "Value" },
  ];

  return (
    <View style={styles.aboutPage}>

      {/* Hero */}
      <View style={styles.aboutHero}>
        <Image source={nepalFlagLogo} style={styles.aboutHeroLogo} />
        <Text allowFontScaling={false} style={styles.aboutHeroName}>NEPAL Motor</Text>
        <Text allowFontScaling={false} style={styles.aboutHeroTagline}>
          Nepal's trusted platform for used car exchange, buying, and selling
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.aboutStatsRow}>
        {stats.map((s) => (
          <View key={s.label} style={styles.aboutStatCard}>
            <Text allowFontScaling={false} style={styles.aboutStatValue}>{s.value}</Text>
            <Text allowFontScaling={false} style={styles.aboutStatLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Mission */}
      <View style={styles.aboutMission}>
        <View style={styles.aboutMissionIconWrap}>
          <Ionicons name="flag-outline" size={22} color="#075985" />
        </View>
        <View style={{ flex: 1 }}>
          <Text allowFontScaling={false} style={styles.aboutMissionTitle}>Our Mission</Text>
          <Text allowFontScaling={false} style={styles.aboutMissionText}>
            To make the used vehicle market more organized, secure, and convenient by offering professional support, technical evaluation, and end-to-end assistance throughout every stage of the vehicle journey.
          </Text>
        </View>
      </View>

      {/* Services */}
      <Text allowFontScaling={false} style={styles.aboutSectionTitle}>What We Offer</Text>
      {services.map((s) => (
        <View key={s.title} style={styles.aboutServiceCard}>
          <View style={styles.aboutServiceIcon}>
            {s.svgIcon ? renderNavSvgIcon(s.svgIcon, "#075985", 22) : <Ionicons name={s.icon} size={22} color="#075985" />}
          </View>
          <View style={{ flex: 1 }}>
            <Text allowFontScaling={false} style={styles.aboutServiceTitle}>{s.title}</Text>
            <Text allowFontScaling={false} style={styles.aboutServiceDesc}>{s.desc}</Text>
          </View>
        </View>
      ))}

      {/* Values */}
      <Text allowFontScaling={false} style={styles.aboutSectionTitle}>Our Values</Text>
      <View style={styles.aboutValuesRow}>
        {values.map((v) => (
          <View key={v.label} style={styles.aboutValueCard}>
            <View style={styles.aboutValueIcon}>
              <Ionicons name={v.icon} size={20} color="#075985" />
            </View>
            <Text allowFontScaling={false} style={styles.aboutValueLabel}>{v.label}</Text>
          </View>
        ))}
      </View>

      {/* Contact CTA */}
      <Pressable
        style={({ hovered }) => [styles.aboutCTA, hovered && styles.aboutCTAHover]}
        onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
      >
        <Ionicons name="call-outline" size={18} color="#ffffff" />
        <Text allowFontScaling={false} style={styles.aboutCTAText}>Get in Touch</Text>
      </Pressable>

    </View>
  );
}

function HelplineIcon({ color = "#111827", size = 30 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <Path
        fill={color}
        d="M459.473,398.099h-53.08c-4.58,0-8.294,3.713-8.294,8.294c0,4.58,3.713,8.294,8.294,8.294h28.889c-4.915,5.56-10.064,10.848-15.408,15.881c-3.054-1.818-6.321-3.261-9.776-4.298l-60.388-18.116l-16.037-24.054c-1.264-1.896-3.253-3.189-5.5-3.574c-0.65-0.112-1.305-0.135-1.953-0.092v-26.185l4.516-3.763c8.114-6.761,13.5-16.228,15.169-26.655l1.033-6.456h6.375c14.329,0,25.987-11.658,25.987-25.987v-17.693c0-12.723-9.193-23.333-21.285-25.552l8.067-50.423c3.664-22.897-2.864-46.149-17.91-63.793c-15.046-17.645-36.974-27.766-60.163-27.766h-64.019c-23.189,0-45.118,10.119-60.164,27.764s-21.574,40.896-17.91,63.793l8.067,50.423c-12.091,2.22-21.284,12.831-21.284,25.554v17.693c0,14.329,11.658,25.987,25.987,25.987h6.375l1.033,6.456c1.669,10.428,7.055,19.894,15.169,26.655l4.516,3.764v26.185c-0.648-0.044-1.303-0.02-1.953,0.092c-2.247,0.386-4.236,1.678-5.5,3.574l-16.037,24.054l-60.388,18.116c-3.441,1.033-6.702,2.465-9.751,4.276c-1.833-1.724-3.653-3.469-5.441-5.256C41.491,380.071,16.587,319.949,16.587,256c0-38.695,9.443-77.13,27.307-111.148c2.13-4.055,0.568-9.07-3.487-11.199c-4.056-2.13-9.069-0.568-11.199,3.487C10.101,173.527,0,214.629,0,256c0,68.38,26.628,132.668,74.981,181.019S187.62,512,256,512c75.775,0,146.373-32.824,195.179-90.364v37.837c0,4.58,3.713,8.294,8.294,8.294c4.58,0,8.294-3.713,8.294-8.294v-53.08C467.767,401.813,464.053,398.099,459.473,398.099z M334.39,415.077l-35.816,50.142l-29.034-23.227l55.194-41.397L334.39,415.077z M362.713,273.693v17.693c0,5.183-4.216,9.4-9.4,9.4h-3.721l5.8-36.253C359.578,265.484,362.713,269.226,362.713,273.693z M158.687,300.786c-5.183,0-9.4-4.217-9.4-9.4v-17.693c0-4.468,3.135-8.21,7.32-9.16l5.801,36.253H158.687z M170.714,247.706l-8.418-52.608c-2.895-18.095,2.264-36.469,14.152-50.411c11.89-13.942,29.218-21.94,47.542-21.94h64.019c18.324,0,35.652,7.996,47.542,21.94c11.889,13.942,17.049,32.318,14.152,50.411l-7.611,47.568l-7.109-49.766c-0.347-2.435-1.758-4.589-3.851-5.882c-2.091-1.293-4.65-1.59-6.982-0.813c-0.783,0.26-78.934,26.113-130.077,26.113c-3.142,0-6.013,1.775-7.418,4.585l-15.401,30.802H170.714z M182.473,321.209l-9.107-56.915h3.013c3.142,0,6.013-1.775,7.418-4.585l15.439-30.877c42.921-1.229,98.679-17.104,120.711-23.887l7.461,52.227c0.584,4.086,4.083,7.12,8.211,7.12h3.013l-6.374,39.841c-1.936,2.177-22.082,23.193-76.259,23.193c-4.58,0-8.294,3.713-8.294,8.294c0,4.58,3.713,8.294,8.294,8.294c34.771,0,57.522-7.973,71.388-15.672c-1.673,3.64-4.145,6.895-7.27,9.5l-35.506,29.589c-3.272,2.727-7.421,4.229-11.681,4.229h-33.863c-4.26,0-8.409-1.502-11.681-4.229l-35.506-29.589C186.85,333.549,183.508,327.677,182.473,321.209z M187.265,400.595l55.194,41.397l-29.034,23.227l-35.816-50.142L187.265,400.595z M247.706,495.254c-52.257-1.768-101.599-20.211-141.896-52.794c0.289-0.096,0.566-0.216,0.858-0.303l57.565-17.269l40.784,57.099c1.324,1.853,3.353,3.081,5.609,3.394c0.379,0.053,0.761,0.079,1.14,0.079c1.872,0,3.702-0.634,5.181-1.818l30.759-24.607V495.254z M202.367,391.188v-23.116l14.401,12.002c6.247,5.206,14.167,8.074,22.3,8.074h33.863c8.132,0,16.052-2.867,22.3-8.074l14.401-12.002v23.116L256,431.413L202.367,391.188z M264.294,495.257v-36.22l30.759,24.607c1.479,1.183,3.309,1.818,5.181,1.818c0.379,0,0.761-0.025,1.14-0.079c2.257-0.313,4.285-1.54,5.609-3.394l40.784-57.099l57.565,17.269c0.316,0.094,0.626,0.2,0.937,0.306C366.247,474.844,316.779,493.476,264.294,495.257z"
      />
      <Path
        fill={color}
        d="M437.019,74.981C388.668,26.628,324.38,0,256,0c-40.549,0-79.333,9.206-115.277,27.364c-30.38,15.347-57.772,36.991-79.902,63.007V52.527c0-4.58-3.713-8.294-8.294-8.294c-4.58,0-8.294,3.713-8.294,8.294v53.08c0,4.58,3.713,8.294,8.294,8.294h53.08c4.58,0,8.294-3.713,8.294-8.294c0-4.58-3.713-8.294-8.294-8.294H76.771c20.1-22.646,44.508-41.544,71.431-55.143C181.805,25.194,218.074,16.587,256,16.587c63.949,0,124.071,24.903,169.291,70.122c45.219,45.22,70.122,105.341,70.122,169.291c0,38.695-9.443,77.13-27.307,111.148c-2.13,4.055-0.568,9.07,3.487,11.199c1.231,0.646,2.549,0.952,3.848,0.952c2.984,0,5.866-1.615,7.349-4.44C501.899,338.473,512,297.371,512,256C512,187.62,485.372,123.332,437.019,74.981z"
      />
    </Svg>
  );
}

function SplashScreen() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1300,
      useNativeDriver: false
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.splashScreen}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.splashContent}>
        <Image source={nepalFlagLogo} style={styles.splashLogo} />
      </View>
      <View style={styles.splashLoadingTrack}>
        <Animated.View
          style={[
            styles.splashLoadingBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"]
              })
            }
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

function BuyUsedCarPage() {
  const buyHighlights = [
    {
      icon: "shield-checkmark-outline",
      title: "Verified Options",
      body: "Browse used cars supported by inspection, condition review, and clear vehicle details."
    },
    {
      icon: "document-text-outline",
      title: "Clear Paperwork",
      body: "Get help with ownership transfer, document checks, and purchase guidance."
    },
    {
      icon: "call-outline",
      title: "Branch Support",
      body: "Talk with NEPAL Motor branches for viewing, valuation, and final purchase support."
    }
  ];

  return (
    <View>
      <Text style={styles.title}>Buy Used Car</Text>
      <View style={styles.buyHero}>
        <View style={styles.buyHeroIcon}>
          <Ionicons name="key-outline" size={34} color="#ffffff" />
        </View>
        <Text allowFontScaling={false} style={styles.buyHeroTitle}>
          Hassle free car option
        </Text>
        <Text allowFontScaling={false} style={styles.buyHeroText}>
          Choose inspected used cars with branch-backed guidance, transparent support, and smoother ownership transfer.
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Call NEPAL Motor for used car buying"
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          style={({ hovered }) => [styles.buyHeroButton, hovered && styles.buyHeroButtonHover]}
        >
          <Ionicons name="call-outline" size={18} color="#ffffff" />
          <Text allowFontScaling={false} style={styles.buyHeroButtonText}>Call for options</Text>
        </Pressable>
      </View>

      <View style={styles.buyHighlightList}>
        {buyHighlights.map((item) => (
          <View key={item.title} style={styles.buyHighlightCard}>
            <View style={styles.buyHighlightIcon}>
              <Ionicons name={item.icon} size={22} color="#075985" />
            </View>
            <View style={styles.buyHighlightContent}>
              <Text allowFontScaling={false} style={styles.buyHighlightTitle}>{item.title}</Text>
              <Text allowFontScaling={false} style={styles.buyHighlightBody}>{item.body}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function ServiceIllustration({ type }) {
  if (type === "sell") {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 320 220">
        <Rect x="38" y="44" width="88" height="82" rx="10" fill="#dbeafe" />
        <Rect x="144" y="58" width="102" height="68" rx="10" fill="#e0e7ff" />
        <Circle cx="80" cy="38" r="22" fill="#ffe4e6" stroke="#fb7185" strokeWidth="4" />
        <Circle cx="132" cy="26" r="28" fill="#ffe4e6" stroke="#fb7185" strokeWidth="4" />
        <TextSvg x="73" y="47" text="$" size={26} color="#ef4444" />
        <TextSvg x="123" y="38" text="$" size={30} color="#ef4444" />
        <Circle cx="236" cy="58" r="34" fill="#fecaca" stroke="#312e81" strokeWidth="5" />
        <Line x1="236" y1="58" x2="236" y2="34" stroke="#312e81" strokeWidth="4" strokeLinecap="round" />
        <Line x1="236" y1="58" x2="260" y2="62" stroke="#312e81" strokeWidth="4" strokeLinecap="round" />
        <Path d="M58 156h186c20 0 35-13 39-31l-50-11H96c-18 0-32 8-38 26z" fill="#6366f1" />
        <Path d="M96 116h72l22 34H70z" fill="#93c5fd" />
        <Circle cx="98" cy="158" r="19" fill="#1e293b" />
        <Circle cx="236" cy="158" r="19" fill="#1e293b" />
        <Path d="M82 102c13-16 31-16 44 0" fill="none" stroke="#f97316" strokeWidth="11" strokeLinecap="round" />
        <Path d="M96 106l28 24M154 130l31-24" stroke="#f97316" strokeWidth="12" strokeLinecap="round" />
      </Svg>
    );
  }

  if (type === "buy") {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 320 220">
        <Rect x="24" y="36" width="272" height="128" rx="34" fill="#d9f0ee" />
        <Path d="M58 138c7-44 35-72 82-72h68c35 0 59 25 67 72z" fill="#ef4444" />
        <Rect x="84" y="88" width="74" height="34" rx="5" fill="#cbd5e1" />
        <Rect x="168" y="88" width="62" height="34" rx="5" fill="#cbd5e1" />
        <Rect x="82" y="128" width="160" height="22" rx="8" fill="#1f2937" />
        <Circle cx="90" cy="156" r="20" fill="#111827" />
        <Circle cx="238" cy="156" r="20" fill="#111827" />
        <Circle cx="90" cy="156" r="8" fill="#cbd5e1" />
        <Circle cx="238" cy="156" r="8" fill="#cbd5e1" />
        <Path d="M132 58c23 15 40 15 58 0" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
        <Path d="M118 82l-32 34M202 82l34 34" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
        <Path d="M106 66l22 24M214 66l-22 24" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        <Circle cx="238" cy="42" r="21" fill="#ffffff" />
        <TextSvg x="230" y="51" text="$" size={25} color="#15803d" />
        <Path d="M267 38c11 0 17 12 9 20l-12 12" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        <Path d="M60 178h232" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
      </Svg>
    );
  }

  return (
    <Svg width="100%" height="100%" viewBox="0 0 320 220">
      <Ellipse cx="160" cy="108" rx="126" ry="88" fill="#f1e3d8" />
      <Rect x="70" y="50" width="136" height="82" rx="8" fill="#ead6ca" />
      <Circle cx="134" cy="47" r="30" fill="#e07658" stroke="#ffffff" strokeWidth="5" />
      <Path d="M144 72l26 30M154 82l-12 12" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
      <Path d="M122 40l12-12 13 13-12 12z" fill="#f7d5bd" />
      <Path d="M56 148c7-39 32-63 75-63h59c39 0 67 25 74 63z" fill="#df7657" />
      <Rect x="84" y="103" width="78" height="31" rx="4" fill="#26303a" />
      <Rect x="168" y="103" width="50" height="31" rx="4" fill="#26303a" />
      <Circle cx="98" cy="157" r="20" fill="#334155" />
      <Circle cx="238" cy="157" r="20" fill="#334155" />
      <Circle cx="98" cy="157" r="10" fill="#dfc8ad" />
      <Circle cx="238" cy="157" r="10" fill="#dfc8ad" />
      <Path d="M76 70c20-21 42-10 44 16" fill="none" stroke="#111827" strokeWidth="9" strokeLinecap="round" />
      <Path d="M80 92l35 29M206 74c23 10 39 27 48 51" stroke="#111827" strokeWidth="11" strokeLinecap="round" />
      <Path d="M112 122c27 7 55 7 83 0" stroke="#a85536" strokeWidth="9" strokeLinecap="round" />
    </Svg>
  );
}

function TextSvg({ x, y, text, size, color }) {
  return (
    <SvgText x={x} y={y} fill={color} fontSize={size} fontWeight="900">
      {text}
    </SvgText>
  );
}

function OnboardingScreen({ onDone }) {
  const { width, height: screenHeight } = useWindowDimensions();
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = onboardingSlides[slideIndex];
  const finalSlide = slideIndex === onboardingSlides.length - 1;
  const viewportWidth =
    Platform.OS === "web" && typeof window !== "undefined" ? window.innerWidth : width;
  const inset = Platform.OS === "web" ? 132 : 40;
  const contentWidth = Math.max(280, Math.min(viewportWidth, 564) - inset);
  const imageHeight = screenHeight * 0.44;

  const goNext = () => {
    if (finalSlide) {
      onDone();
      return;
    }
    setSlideIndex((i) => i + 1);
  };

  return (
    <SafeAreaView style={styles.onboardingScreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.onboardingCenter}>
        <View style={[styles.onboardingSkipRow, { width: contentWidth }]}>
          <Pressable onPress={onDone}>
            <Text allowFontScaling={false} style={styles.onboardingSkipText}>
              Skip
            </Text>
          </Pressable>
        </View>

        <View style={[styles.onboardingTextBlock, { width: contentWidth }]}>
          <Text allowFontScaling={false} style={styles.onboardingTitle}>
            {slide.title}
          </Text>
          <Text allowFontScaling={false} style={styles.onboardingBody}>
            {slide.body}
          </Text>
        </View>

        <View style={[styles.onboardingVisual, { height: imageHeight }]}>
          <Image
            source={slide.image}
            resizeMode={slide.resizeMode || "cover"}
            style={styles.onboardingImage}
          />
        </View>

        <View style={styles.onboardingDots}>
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.onboardingDot,
                index === slideIndex && styles.onboardingDotActive
              ]}
            />
          ))}
        </View>

        <Pressable
          style={styles.onboardingButton}
          onPress={goNext}
        >
          <Text allowFontScaling={false} style={styles.onboardingButtonText}>
            {finalSlide ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function DealerPage() {
  const [form, setForm] = useState({ fullName: "", companyName: "", city: "Kathmandu", phone: "", photo: [] });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const update = (key, value) => setForm((c) => ({ ...c, [key]: value }));

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
    const picked = result.assets.slice(0, slots).map((a) => ({
      name: a?.fileName || a?.uri?.split("/").pop() || "photo.jpg",
      uri: a?.uri,
      type: a?.mimeType || "image/jpeg",
      file: a?.file
    }));
    setForm((c) => ({ ...c, photo: [...c.photo, ...picked].slice(0, 5) }));
  };

  const submit = async () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!form.phone || form.phone.length !== 10)
      newErrors.phone = "Enter valid 10-digit phone number";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName.trim());
      formData.append("companyName", form.companyName.trim());
      formData.append("city", form.city);
      formData.append("phone", form.phone.trim());
      formData.append("requestType", "Become a Dealer");
      form.photo.forEach((f) => appendUpload(formData, "photos", f));
      await fetch(dealerEndpoint, { method: "POST", body: formData });
      setMessage("Your dealer application has been submitted!");
      setMessageType("success");
      setForm({ fullName: "", companyName: "", city: "Kathmandu", phone: "", photo: [] });
      setErrors({});
    } catch {
      setMessage("Submission failed. Please try again.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
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
      <View style={styles.actions}>
        <Pressable
          style={[styles.clearButton, submitting && styles.clearButtonDisabled]}
          disabled={submitting}
          onPress={() => { setForm({ fullName: "", companyName: "", city: "Kathmandu", phone: "", photo: [] }); setErrors({}); setMessage(""); }}
        >
          {({ hovered }) => (
            <>
              <Ionicons name="refresh" size={18} color={submitting ? "#93c5fd" : "#006ffd"} />
              <Text style={[styles.clearText, submitting && styles.clearTextDisabled, hovered && !submitting && styles.clearTextHover]}>Clear form</Text>
            </>
          )}
        </Pressable>
        <Pressable
          style={({ hovered }) => [styles.submitButton, hovered && !submitting && styles.submitButtonHover, submitting && styles.submitButtonDisabled]}
          onPress={submit}
          disabled={submitting}
        >
          <Text style={styles.submitText}>{submitting ? "Submitting..." : "Submit"}</Text>
        </Pressable>
      </View>
      <Text style={styles.footer}>
        Do not submit passwords through this form. <Text style={styles.report}>Report malicious form</Text>
      </Text>
    </View>
  );
}

function TestDrivePage() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", city: "Kathmandu",
    vehicleType: "Hatchback", model: "", brand: "", color: "",
    transmission: "", accident: "", fuelType: "Petrol",
    features: [], finance: "", notes: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [featurePickerOpen, setFeaturePickerOpen] = useState(false);
  const featurePickerRef = useRef(null);
  const availableFeatures = features.filter((f) => !form.features.includes(f));

  const update = (key, value) => setForm((c) => ({ ...c, [key]: value }));
  const closeFeaturePicker = () => setFeaturePickerOpen(false);
  const toggleFeature = (feature) => {
    setForm((c) => ({
      ...c,
      features: c.features.includes(feature)
        ? c.features.filter((f) => f !== feature)
        : [...c.features, feature]
    }));
  };

  const emptyTestDrive = {
    fullName: "", email: "", phone: "", city: "Kathmandu",
    vehicleType: "Hatchback", model: "", brand: "", color: "",
    transmission: "", accident: "", fuelType: "Petrol",
    features: [], finance: "", notes: ""
  };

  const submit = async () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.phone || form.phone.length !== 10)
      newErrors.phone = "Enter valid 10-digit phone number";
    if (!form.model.trim()) newErrors.model = "Vehicle Model is required";
    if (!form.brand.trim()) newErrors.brand = "Vehicle Brand is required";
    if (!form.color) newErrors.color = "Vehicle Color is required";
    if (!form.transmission) newErrors.transmission = "Transmission / Gear is required";
    if (!form.fuelType) newErrors.fuelType = "Fuel Type is required";
    if (!form.finance) newErrors.finance = "Finance selection is required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setSubmitting(true);
    try {
      await fetch("https://nepalmotor.com/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          city: form.city,
          vehicle: `${form.brand.trim()} ${form.model.trim()}`,
          vehicleType: form.vehicleType,
          vehicleBrand: form.brand.trim(),
          vehicleModel: form.model.trim(),
          vehicleColor: form.color,
          transmission: form.transmission,
          fuelType: form.fuelType,
          features: form.features,
          finance: form.finance,
          notes: form.notes.trim(),
        }),
      });
      setMessage("Your test drive request has been submitted!");
      setMessageType("success");
      setForm(emptyTestDrive);
      setErrors({});
    } catch {
      setMessage("Submission failed. Please try again.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View>
      <Text allowFontScaling={false} style={styles.title}>Free Test Drive</Text>
      <TextField label="Full Name" required value={form.fullName} error={errors.fullName} onFocus={closeFeaturePicker} onChangeText={(v) => update("fullName", v)} />
      <TextField label="Email" value={form.email} keyboardType="email-address" onFocus={closeFeaturePicker} onChangeText={(v) => update("email", v)} />
      <TextField
        label="Phone" required value={form.phone} keyboardType="phone-pad" maxLength={10}
        error={errors.phone} onFocus={closeFeaturePicker}
        onChangeText={(v) => update("phone", v.replace(/[^0-9]/g, ""))}
      />
      <SelectField label="City" required value={form.city} options={cities} onOpen={closeFeaturePicker} onChange={(v) => update("city", v)} />
      <SelectField label="Vehicle Type" required value={form.vehicleType} options={vehicleTypes} onOpen={closeFeaturePicker} onChange={(v) => update("vehicleType", v)} />
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
      <SelectField label="Vehicle Color" required value={form.color} error={errors.color} options={colors.map((c) => c === "Other" ? "Any" : c)} onOpen={closeFeaturePicker} onChange={(v) => update("color", v)} />
      <SelectField label="Transmission / Gear" required value={form.transmission} error={errors.transmission} options={transmissions} onOpen={closeFeaturePicker} onChange={(v) => update("transmission", v)} />
      <SelectField label="Fuel Type" required value={form.fuelType} error={errors.fuelType} options={fuelTypesWithEV} onOpen={closeFeaturePicker} onChange={(v) => update("fuelType", v)} />

      {featurePickerOpen ? (
        <Pressable style={styles.featurePickerOverlay} onPress={closeFeaturePicker} />
      ) : null}
      <View ref={featurePickerRef} style={[styles.field, featurePickerOpen && styles.featureFieldOpen]}>
        <Label>Features</Label>
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

      <SelectField label="Are you looking for Finance?" required value={form.finance} error={errors.finance} options={financeOptions} onOpen={closeFeaturePicker} onChange={(v) => update("finance", v)} />
      <TextField label="Notes" value={form.notes} multiline onFocus={closeFeaturePicker} onChangeText={(v) => update("notes", v)} />

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
          disabled={submitting}
          onPress={() => { setForm(emptyTestDrive); setErrors({}); setMessage(""); }}
        >
          {({ hovered }) => (
            <>
              <Ionicons name="refresh" size={18} color={submitting ? "#93c5fd" : "#006ffd"} />
              <Text style={[styles.clearText, submitting && styles.clearTextDisabled, hovered && !submitting && styles.clearTextHover]}>Clear form</Text>
            </>
          )}
        </Pressable>
        <Pressable
          style={({ hovered }) => [styles.submitButton, hovered && !submitting && styles.submitButtonHover, submitting && styles.submitButtonDisabled]}
          onPress={submit}
          disabled={submitting}
        >
          <Text style={styles.submitText}>{submitting ? "Submitting..." : "Submit"}</Text>
        </Pressable>
      </View>
      <Text style={styles.footer}>
        Do not submit passwords through this form. <Text style={styles.report}>Report malicious form</Text>
      </Text>
    </View>
  );
}

const glossaryData = {
  A: [
    { title: "Accident History", definition: "A record of any collisions, damages, or incidents involving a vehicle during its lifetime." },
    { title: "Asking Price", definition: "The listed selling price a vehicle owner is requesting for their used vehicle." },
    { title: "Airbag", definition: "A safety device that inflates rapidly during a collision to protect occupants from serious injury." },
    { title: "Anti-lock Braking System (ABS)", definition: "A safety system that prevents wheels from locking up during hard braking, maintaining steering control." },
    { title: "All-Wheel Drive (AWD)", definition: "A drivetrain system that powers all four wheels simultaneously for improved traction and stability." },
    { title: "After-market Parts", definition: "Vehicle components made by third-party manufacturers, not supplied by the original vehicle maker." },
    { title: "Auto Loan", definition: "A financial product that allows a buyer to purchase a vehicle by borrowing money and repaying in installments." },
    { title: "Annual Percentage Rate (APR)", definition: "The yearly cost of borrowing money for a vehicle purchase, expressed as a percentage of the loan amount." },
    { title: "Air Filter", definition: "A component that prevents dust and debris from entering the engine, ensuring clean combustion air." },
    { title: "Auction Vehicle", definition: "A vehicle sold through a public or dealer-only bidding process, often at below-market prices." }
  ],
  B: [
    { title: "Book Value", definition: "The estimated market value of a vehicle based on standard industry pricing guides." },
    { title: "Branch Support", definition: "In-person assistance offered at NEPAL Motor branches for valuation, inspection, and paperwork." },
    { title: "Brake Pads", definition: "Friction material that presses against the brake disc to slow or stop the vehicle." },
    { title: "Battery (EV)", definition: "The rechargeable energy storage unit that powers an electric vehicle's motor and systems." },
    { title: "Bumper-to-Bumper Warranty", definition: "A comprehensive warranty covering most vehicle components from the front to rear bumper for a set period." },
    { title: "Body Type", definition: "The structural and aesthetic design classification of a vehicle, such as sedan, SUV, hatchback, or pickup." },
    { title: "Brake Fluid", definition: "Hydraulic fluid that transfers braking force from the pedal to the brake components at each wheel." },
    { title: "Buy Here Pay Here (BHPH)", definition: "A dealership financing model where the dealer provides in-house loans directly to the buyer." },
    { title: "Bluebook Value", definition: "A widely used reference price for used vehicles based on make, model, year, mileage, and condition." },
    { title: "Build Year", definition: "The actual calendar year in which a specific vehicle unit was assembled at the manufacturing plant." }
  ],
  C: [
    { title: "Car Exchange", definition: "A transaction where an existing vehicle is traded in and its value is applied toward a new or different vehicle." },
    { title: "Chassis Number", definition: "A unique identification number stamped on a vehicle's frame used for registration and verification." },
    { title: "Condition Report", definition: "A documented assessment of a vehicle's physical and mechanical state at the time of inspection." },
    { title: "Certified Pre-owned (CPO)", definition: "A used vehicle that has passed a manufacturer-approved inspection and comes with an extended warranty." },
    { title: "Coolant", definition: "A liquid mixture circulated through the engine to regulate temperature and prevent overheating." },
    { title: "Catalytic Converter", definition: "An exhaust system component that reduces harmful emissions by converting pollutants into less harmful gases." },
    { title: "Curb Weight", definition: "The total weight of a fully equipped vehicle without passengers or cargo, measured in kilograms." },
    { title: "Clutch", definition: "A mechanical device in manual transmission vehicles that disengages the engine from the gearbox during gear changes." },
    { title: "Car Valuation", definition: "A professional estimate of a vehicle's current market worth based on its condition, age, and market demand." },
    { title: "Credit Score", definition: "A numerical rating of a buyer's creditworthiness used by lenders to determine vehicle loan eligibility and interest rates." }
  ],
  D: [
    { title: "Depreciation", definition: "The gradual reduction in a vehicle's value over time due to age, mileage, and wear." },
    { title: "Document Verification", definition: "The process of checking vehicle ownership papers, insurance, and registration for authenticity." },
    { title: "Down Payment", definition: "An upfront payment made at the start of a vehicle purchase, with the remainder financed over time." },
    { title: "Dealer License", definition: "An official permit authorizing a business or individual to legally buy and sell vehicles commercially." },
    { title: "Drivetrain", definition: "The system of components that generates power and delivers it to the wheels, including engine, transmission, and axles." },
    { title: "Dual Airbag", definition: "A safety configuration featuring separate airbags for both the driver and front passenger positions." },
    { title: "Diagnostic Scan", definition: "An electronic check of a vehicle's onboard computer systems to identify mechanical or electrical faults." },
    { title: "Drive Type", definition: "The configuration determining which wheels receive engine power: 2WD (two-wheel) or 4WD (four-wheel)." },
    { title: "Disc Brakes", definition: "A braking system using a rotating disc and caliper-mounted pads to slow the vehicle, offering superior stopping power." },
    { title: "Deductible", definition: "The amount a vehicle owner must pay out of pocket before their insurance coverage begins to pay a claim." }
  ],
  E: [
    { title: "Engine Capacity (CC)", definition: "The total volume of all cylinders in a vehicle's engine, measured in cubic centimeters (CC)." },
    { title: "EV (Electric Vehicle)", definition: "A vehicle powered entirely by an electric motor using rechargeable battery packs." },
    { title: "Exchange Value", definition: "The monetary credit offered for a trade-in vehicle when purchasing a new one." },
    { title: "Engine Oil", definition: "A lubricant circulated through engine components to reduce friction, cool parts, and prevent wear." },
    { title: "Exhaust System", definition: "The series of pipes and components that direct combustion gases away from the engine and out of the vehicle." },
    { title: "Emission Standards", definition: "Government regulations limiting the amount of pollutants a vehicle is permitted to release from its exhaust." },
    { title: "ECU (Engine Control Unit)", definition: "The onboard computer that manages and optimizes engine functions such as fuel injection, timing, and emissions." },
    { title: "Engine Overhaul", definition: "A major mechanical service that involves dismantling, inspecting, and rebuilding the engine to restore performance." },
    { title: "EV Charging Station", definition: "A fixed installation providing electrical power to recharge electric vehicle batteries at home or in public." },
    { title: "Extended Warranty", definition: "A service contract providing repair coverage beyond the original manufacturer's warranty period." }
  ],
  F: [
    { title: "Fair Market Value", definition: "The price a vehicle would realistically sell for between a willing buyer and seller in the open market." },
    { title: "Finance", definition: "A payment arrangement allowing a buyer to purchase a vehicle through installments over an agreed period." },
    { title: "Fuel Type", definition: "The category of fuel a vehicle consumes: Petrol, Diesel, Hybrid, CNG, LPG, or Electric." },
    { title: "Fleet Vehicle", definition: "A vehicle owned or managed by a company and used for business operations rather than private use." },
    { title: "Four-Wheel Drive (4WD)", definition: "A drivetrain system that sends engine power to all four wheels, typically used for off-road or rough terrain." },
    { title: "Front-Wheel Drive (FWD)", definition: "A drivetrain where engine power is delivered only to the front wheels, common in passenger cars." },
    { title: "Fuel Efficiency", definition: "A measure of how far a vehicle can travel on a given amount of fuel, typically expressed in km per liter." },
    { title: "Frame Damage", definition: "Structural damage to a vehicle's main chassis, which can compromise safety and significantly reduce resale value." },
    { title: "Finance Agreement", definition: "A legally binding contract between a lender and buyer outlining the terms, interest, and schedule of a vehicle loan." },
    { title: "Floor Price", definition: "The minimum acceptable selling price a seller will accept for a vehicle during negotiations." }
  ],
  G: [
    { title: "Genuine Valuation", definition: "An honest, accurate estimation of a vehicle's current market worth by a qualified professional." },
    { title: "Grey Market Vehicle", definition: "A vehicle imported through unofficial channels, not covered by authorized dealership warranty." },
    { title: "Ground Clearance", definition: "The distance between the lowest point of a vehicle's underbody and the road surface." },
    { title: "Gear Ratio", definition: "The ratio between the rotational speeds of the engine and wheels, affecting acceleration and fuel efficiency." },
    { title: "Gasoline", definition: "A refined petroleum-based fuel used in internal combustion engines; also known as petrol." },
    { title: "GPS Tracking", definition: "A satellite-based system installed in vehicles to monitor location, movement, and driving behavior in real time." },
    { title: "Gross Vehicle Weight (GVW)", definition: "The maximum allowable total weight of a vehicle including its own weight plus passengers and cargo." },
    { title: "Gearbox", definition: "The mechanical assembly containing a vehicle's gears, enabling the driver to change speed and torque output." },
    { title: "Gas Mileage", definition: "The distance a vehicle travels on a unit of fuel, used as a measure of fuel economy and running cost." },
    { title: "Grille", definition: "The front-facing panel on a vehicle that allows airflow into the engine compartment while protecting internal components." }
  ],
  H: [
    { title: "Hybrid Vehicle", definition: "A vehicle that uses both a conventional fuel engine and an electric motor to improve fuel efficiency." },
    { title: "Horsepower (HP)", definition: "A unit measuring an engine's power output; higher horsepower generally means faster acceleration." },
    { title: "High Mileage Vehicle", definition: "A used vehicle with a significantly high odometer reading, typically indicating heavier use and potential wear." },
    { title: "Hydraulic Brakes", definition: "A braking system that uses hydraulic pressure to apply force to the brake components at each wheel." },
    { title: "Hood", definition: "The hinged cover over the engine compartment at the front of the vehicle, providing access for maintenance." },
    { title: "Highway Fuel Economy", definition: "The measured fuel efficiency of a vehicle when driven at consistent speeds on open highway roads." },
    { title: "Heated Seats", definition: "A vehicle comfort feature that uses electrical heating elements embedded in seat cushions and backrests." },
    { title: "Head Unit", definition: "The central infotainment system in a vehicle's dashboard, managing audio, navigation, and connectivity features." },
    { title: "Heat Shield", definition: "A protective panel installed near hot engine or exhaust components to prevent heat damage to surrounding parts." },
    { title: "Hard Top", definition: "A vehicle body style featuring a fixed, rigid roof structure as opposed to a convertible soft-top design." }
  ],
  I: [
    { title: "Inspection Report", definition: "A formal document summarizing a vehicle's condition after a thorough professional evaluation." },
    { title: "Insurance Papers", definition: "Documents proving active vehicle insurance coverage, required during ownership transfer." },
    { title: "Installment", definition: "A fixed periodic payment made by a buyer to repay a vehicle loan over the agreed loan term." },
    { title: "Invoice Price", definition: "The price a dealer pays the manufacturer for a vehicle, often used as a starting point in price negotiations." },
    { title: "Immobilizer", definition: "An electronic anti-theft device that prevents the engine from starting without the correct key or code." },
    { title: "Idle Speed", definition: "The engine's rotational speed when a vehicle is running but not in motion, measured in RPM." },
    { title: "Import Duty", definition: "A government tax charged on vehicles brought into the country from abroad, affecting the on-road price." },
    { title: "Insurance Premium", definition: "The periodic amount paid to an insurer to maintain active coverage on a vehicle." },
    { title: "In-Car Entertainment (ICE)", definition: "Audio, video, and connectivity systems integrated into a vehicle for driver and passenger use." },
    { title: "Intake Manifold", definition: "An engine component that distributes the air-fuel mixture evenly to each cylinder for combustion." }
  ],
  J: [
    { title: "Junk Value", definition: "The residual price of a vehicle that is no longer driveable, sold for parts or scrap metal." },
    { title: "Jump Start", definition: "The process of starting a vehicle with a dead battery by connecting it to a charged battery using jumper cables." },
    { title: "Joint Ownership", definition: "A vehicle registered under two or more co-owners who share equal legal rights and responsibilities." },
    { title: "Junkyard", definition: "A facility that collects damaged or old vehicles, salvages usable parts, and recycles the remaining materials." },
    { title: "Jack Stand", definition: "A safety support device placed under a lifted vehicle to hold it securely during undercarriage maintenance." },
    { title: "Journey Log", definition: "A record of trips made in a vehicle, used for tracking mileage, fuel costs, and tax compliance." },
    { title: "Just-Sold Report", definition: "A market report documenting recently completed vehicle transactions to establish current pricing benchmarks." },
    { title: "Joint Vehicle Inspection", definition: "A pre-sale assessment conducted in the presence of both the buyer and seller to agree on vehicle condition." },
    { title: "J1772 Connector", definition: "A standardized electric vehicle charging plug used for Level 1 and Level 2 AC charging stations." },
    { title: "Jet Black Finish", definition: "A deep, high-gloss black paint color commonly featured on premium and luxury vehicle trims." }
  ],
  K: [
    { title: "KM Driven", definition: "The total distance a vehicle has traveled in kilometers, a key factor in determining resale value." },
    { title: "Keyless Entry", definition: "A system that allows a driver to unlock a vehicle without physically inserting a key, using a remote or proximity sensor." },
    { title: "Keyless Start", definition: "A feature enabling the driver to start the engine with a push-button while the key fob remains in their pocket." },
    { title: "Knock Sensor", definition: "An engine sensor that detects abnormal combustion (knocking) and signals the ECU to adjust timing accordingly." },
    { title: "Kilometer Per Liter (KMPL)", definition: "A fuel efficiency rating measuring how many kilometers a vehicle can travel on one liter of fuel." },
    { title: "Key Fob", definition: "A small electronic remote device used to lock, unlock, and sometimes start a vehicle from a short distance." },
    { title: "Kerbside Value", definition: "The assessed market value of a vehicle inspected as-is, without any repairs or preparation by the seller." },
    { title: "Kinetic Energy Recovery System (KERS)", definition: "A technology that captures energy during braking and stores it for reuse, improving overall vehicle efficiency." },
    { title: "K-turn (Three-Point Turn)", definition: "A standard driving maneuver used to reverse the direction of a vehicle in a limited space using three movements." },
    { title: "Kick Panel", definition: "The interior trim panel located at the base of the A-pillar near the driver or passenger footwell area." }
  ],
  L: [
    { title: "Lien", definition: "A legal claim placed on a vehicle by a lender until the associated loan is fully repaid." },
    { title: "Loan Clearance", definition: "Confirmation that all outstanding financial obligations on a vehicle have been settled before transfer." },
    { title: "List Price", definition: "The manufacturer's officially published retail price for a new vehicle before any discounts or negotiations." },
    { title: "Lease Agreement", definition: "A contract allowing a person to use a vehicle for a set period in exchange for monthly payments, without owning it." },
    { title: "Lubrication", definition: "The application of oil or grease to moving engine and mechanical parts to minimize friction and wear." },
    { title: "Liability Insurance", definition: "A mandatory vehicle insurance type covering costs if the insured driver causes injury or property damage to others." },
    { title: "Load Capacity", definition: "The maximum weight of passengers and cargo a vehicle is designed to safely carry, as specified by the manufacturer." },
    { title: "Lane Assist", definition: "A driver assistance feature that detects lane markings and alerts or steers the vehicle to stay within its lane." },
    { title: "LED Headlights", definition: "Energy-efficient vehicle lighting using light-emitting diodes that provide brighter illumination and longer lifespan." },
    { title: "Lemon Law", definition: "A consumer protection regulation requiring manufacturers to repair, replace, or refund defective vehicles." }
  ],
  M: [
    { title: "Market Value", definition: "The current price a vehicle would fetch based on prevailing demand, condition, and competition." },
    { title: "Mileage", definition: "The total distance a vehicle has covered, used to gauge usage and estimate remaining life." },
    { title: "Model Year", definition: "The calendar year in which a vehicle model was officially manufactured or released for sale." },
    { title: "Manual Transmission", definition: "A gearbox requiring the driver to manually select gears using a clutch pedal and gear lever." },
    { title: "Multi-point Inspection", definition: "A comprehensive vehicle checkup covering multiple systems including engine, brakes, tires, and electrical components." },
    { title: "Motor Insurance", definition: "A mandatory legal requirement that financially protects a vehicle owner from loss due to accidents or theft." },
    { title: "Make (Vehicle)", definition: "The brand or manufacturer of a vehicle, such as Toyota, Honda, Suzuki, or Hyundai." },
    { title: "Master Cylinder", definition: "The hydraulic component in the brake system that converts pedal force into hydraulic pressure." },
    { title: "Multi-airbag System", definition: "A vehicle safety configuration featuring multiple airbags to protect occupants from various collision angles." },
    { title: "Mpg / KMPL Rating", definition: "A standardized fuel efficiency metric comparing how far a vehicle travels per unit of fuel consumed." }
  ],
  N: [
    { title: "NEPAL Motor", definition: "A vehicle services company offering exchange to EV, used car buying, and used car selling with branch support." },
    { title: "No Claim Bonus", definition: "A discount on insurance renewal premiums earned for not making any claims during the policy period." },
    { title: "NCAP Rating", definition: "A safety score given to vehicles by the New Car Assessment Programme based on crash test performance." },
    { title: "Number Plate", definition: "An officially issued plate displaying a vehicle's unique registration number for identification and legal purposes." },
    { title: "Neutral Gear", definition: "A gearbox position where the engine is disconnected from the drivetrain, allowing the vehicle to roll freely." },
    { title: "Non-accidental Vehicle", definition: "A used vehicle with no recorded collision or accident history, generally commanding a higher resale price." },
    { title: "Non-refundable Deposit", definition: "An advance payment made to secure a vehicle purchase that is forfeited if the buyer withdraws from the deal." },
    { title: "Noise, Vibration, Harshness (NVH)", definition: "A measure of the unwanted sound, vibration, and roughness experienced inside a vehicle by its occupants." },
    { title: "Net Price", definition: "The final agreed selling price of a vehicle after all discounts, negotiations, and adjustments have been applied." },
    { title: "Night Vision System", definition: "An advanced driver aid using infrared cameras to detect pedestrians or hazards in low-light conditions." }
  ],
  O: [
    { title: "Odometer", definition: "An instrument in a vehicle that records and displays the total distance the vehicle has traveled." },
    { title: "Ownership Transfer", definition: "The legal process of changing a vehicle's registered ownership from seller to buyer through official paperwork." },
    { title: "On-road Price", definition: "The total cost of purchasing a vehicle including ex-showroom price, registration, insurance, and applicable taxes." },
    { title: "OBD Port (On-board Diagnostics)", definition: "A standardized plug on a vehicle used to connect diagnostic tools and read fault codes from the ECU." },
    { title: "Oil Change", definition: "A routine maintenance service replacing used engine oil and the oil filter to keep the engine running smoothly." },
    { title: "Original Equipment Manufacturer (OEM)", definition: "The company that originally manufactured a vehicle part or component, ensuring factory-spec quality and fit." },
    { title: "Open Market Value", definition: "The price a vehicle would command in a competitive, unrestricted market without artificial pricing influence." },
    { title: "Overhead Cam (OHC)", definition: "An engine design where the camshaft is mounted above the cylinder head, improving performance and efficiency." },
    { title: "Off-road Vehicle", definition: "A vehicle built with reinforced suspension, higher ground clearance, and 4WD for use on rough or unpaved terrain." },
    { title: "Option Package", definition: "A bundled set of factory-installed features or accessories offered as an upgrade over a vehicle's base model." }
  ],
  P: [
    { title: "Pre-owned Vehicle", definition: "A vehicle that has been previously registered and driven by at least one owner before resale." },
    { title: "Power of Attorney", definition: "A legal document that authorizes one person to conduct vehicle transactions on behalf of another." },
    { title: "Pre-purchase Inspection", definition: "A detailed mechanical and physical assessment of a used vehicle conducted by a professional before buying." },
    { title: "Paint Condition", definition: "The overall state of a vehicle's exterior paint, including any scratches, fading, oxidation, or repaint areas." },
    { title: "Parking Sensors", definition: "Ultrasonic or electromagnetic sensors on a vehicle that alert the driver to nearby obstacles when parking." },
    { title: "Power Steering", definition: "An assisted steering system that reduces the physical effort needed to turn the steering wheel." },
    { title: "Petrol Engine", definition: "An internal combustion engine that runs on petrol (gasoline), the most common fuel type in passenger vehicles." },
    { title: "Permanent Registration", definition: "A lifelong vehicle registration issued by transport authorities after initial temporary registration expires." },
    { title: "Performance Car", definition: "A vehicle engineered for superior acceleration, handling, and speed compared to standard passenger vehicles." },
    { title: "Proforma Invoice", definition: "A preliminary billing document issued by a seller to a buyer before the formal sale of a vehicle is completed." }
  ],
  Q: [
    { title: "Quality Inspection", definition: "A structured, professional review of a vehicle's mechanical components and physical condition." },
    { title: "Quiet Title", definition: "A legal process used to establish clear, undisputed ownership of a vehicle, removing any conflicting claims." },
    { title: "Quick Lube", definition: "A fast oil change and basic vehicle maintenance service completed in a short scheduled appointment." },
    { title: "Quarterly Service", definition: "Scheduled vehicle maintenance performed every three months to keep components in optimal working condition." },
    { title: "Qualified Technician", definition: "A certified mechanic with formal training and authorization to inspect, repair, or certify vehicles." },
    { title: "Quarter Panel", definition: "The body panel on a vehicle covering the area between the rear door and the trunk on each side." },
    { title: "Quick Release Steering", definition: "A removable steering wheel mechanism used in performance and racing vehicles for easy driver exit." },
    { title: "Quick Charge (EV)", definition: "A fast-charging method for electric vehicles using high-powered DC current to significantly reduce charging time." },
    { title: "Quote (Insurance)", definition: "An estimated insurance premium provided by an insurer based on a vehicle's details and the driver's profile." },
    { title: "Quattro System", definition: "Audi's proprietary all-wheel-drive technology that continuously distributes power across all four wheels." }
  ],
  R: [
    { title: "Registration Certificate (RC)", definition: "An official government document that confirms a vehicle's registration and the identity of its owner." },
    { title: "Resale Value", definition: "The amount a vehicle can realistically be sold for in the used car market at a given time." },
    { title: "Road Tax", definition: "A government-mandated tax paid annually to legally operate a vehicle on public roads." },
    { title: "Recall (Manufacturer)", definition: "An official notice from a manufacturer to return a vehicle for repair of a defect that may affect safety." },
    { title: "Rear-Wheel Drive (RWD)", definition: "A drivetrain configuration where engine power is delivered only to the rear wheels." },
    { title: "Radiator", definition: "A heat exchanger that cools the engine by transferring heat from coolant fluid to the surrounding air." },
    { title: "Reconditioned Vehicle", definition: "A used vehicle that has been repaired, cleaned, and restored to a better working condition before resale." },
    { title: "Running Costs", definition: "The ongoing expenses of operating a vehicle, including fuel, insurance, maintenance, and road tax." },
    { title: "Roadworthiness Certificate", definition: "An official certification that a vehicle meets the minimum safety and technical standards for road use." },
    { title: "Repossession (Repo)", definition: "The legal recovery of a vehicle by a lender when a borrower fails to maintain their loan repayments." }
  ],
  S: [
    { title: "Service History", definition: "A documented record of all maintenance, servicing, and repairs performed on a vehicle over time." },
    { title: "Salvage Title", definition: "A certificate indicating a vehicle has been declared a total loss and may require significant repair." },
    { title: "Suspension System", definition: "The network of springs, shocks, and linkages connecting a vehicle's body to its wheels for ride comfort." },
    { title: "Spare Parts", definition: "Replacement components kept in stock to repair or maintain a vehicle when original parts wear out or fail." },
    { title: "Showroom Condition", definition: "A description of a used vehicle that appears pristine and well-maintained, resembling a new vehicle on display." },
    { title: "Steering Column", definition: "The shaft connecting the steering wheel to the steering mechanism, transmitting the driver's turning input." },
    { title: "Safety Rating", definition: "A score assigned to a vehicle based on its performance in standardized crash tests and safety assessments." },
    { title: "Seatbelt", definition: "A safety restraint device worn by vehicle occupants to prevent injury during sudden stops or collisions." },
    { title: "Supercharger (EV)", definition: "A high-speed DC charging station designed to rapidly replenish an electric vehicle's battery pack." },
    { title: "Second Owner", definition: "A vehicle whose registration has transferred to a second individual, typically reducing its resale price." }
  ],
  T: [
    { title: "Tax Clearance", definition: "A certificate confirming that all applicable road taxes and fees on a vehicle have been paid in full." },
    { title: "Trade-in", definition: "Exchanging a current vehicle toward payment for a new or different vehicle at a dealership." },
    { title: "Transmission", definition: "The mechanical system that transfers engine power to the wheels; types include Manual, Automatic, and CVT." },
    { title: "Turbocharger", definition: "A forced induction device that compresses intake air to boost engine power and improve fuel efficiency." },
    { title: "Test Drive", definition: "A trial run of a vehicle conducted by a prospective buyer to evaluate its performance, comfort, and condition." },
    { title: "Torque", definition: "A measure of rotational force produced by an engine, affecting a vehicle's ability to accelerate and haul loads." },
    { title: "Towing Capacity", definition: "The maximum weight a vehicle is rated to safely tow behind it, as specified by the manufacturer." },
    { title: "Transfer of Ownership", definition: "The formal legal procedure by which a vehicle's registered title is transferred from one owner to another." },
    { title: "Tire Tread Depth", definition: "The measurement of remaining rubber on a tire's surface, indicating grip level and when replacement is needed." },
    { title: "Top-up Insurance", definition: "An additional insurance policy purchased to extend coverage beyond a standard motor insurance plan." }
  ],
  U: [
    { title: "Used Vehicle", definition: "A vehicle that has been previously owned and operated and is being offered for resale." },
    { title: "Undercarriage", definition: "The structural components underneath a vehicle including the frame, axles, and suspension parts." },
    { title: "Upholstery", definition: "The interior fabric, leather, or vinyl covering of a vehicle's seats, door panels, and headliner." },
    { title: "Used Car Warranty", definition: "A guarantee provided by the seller or dealer covering certain repairs on a pre-owned vehicle for a limited period." },
    { title: "Under-hood Inspection", definition: "A check of engine bay components including fluids, belts, hoses, and battery as part of vehicle evaluation." },
    { title: "Unibody Construction", definition: "A vehicle design where the body and frame are integrated into a single structural unit for lighter weight and rigidity." },
    { title: "Unused Loan Balance", definition: "The remaining principal owed on a vehicle finance agreement that has not yet been repaid." },
    { title: "Upcycled Parts", definition: "Salvaged vehicle components that have been refurbished and resold for reuse in other vehicles." },
    { title: "Urban Fuel Economy", definition: "The measured fuel efficiency of a vehicle under city driving conditions with frequent stops and lower speeds." },
    { title: "Under-inflation (Tire)", definition: "A condition where a tire's air pressure falls below the manufacturer's recommended level, affecting safety and economy." }
  ],
  V: [
    { title: "Valuation", definition: "The process of professionally estimating a vehicle's current fair market worth before sale or exchange." },
    { title: "Vehicle Identification Number (VIN)", definition: "A unique 17-character alphanumeric code assigned to every vehicle for identification and record-keeping." },
    { title: "Vehicle History Report", definition: "A detailed record of a used vehicle's past including ownership, accidents, service, and title information." },
    { title: "Valid Insurance", definition: "An active and legally compliant vehicle insurance policy required for registration and road use." },
    { title: "Vehicle Weight", definition: "The total mass of a vehicle including its standard equipment, measured in kilograms." },
    { title: "Value-Added Tax (VAT)", definition: "A government tax applied to vehicle purchases and parts, increasing the final transaction cost." },
    { title: "Vendor Finance", definition: "A financing arrangement where the seller of the vehicle directly provides a loan to the buyer." },
    { title: "Vehicle Registration", definition: "The official government process of recording a vehicle's ownership and assigning it a unique number plate." },
    { title: "Variable Valve Timing (VVT)", definition: "An engine technology that adjusts the timing of intake and exhaust valves to optimize performance and efficiency." },
    { title: "Variation Order", definition: "A formal amendment to a vehicle sales or service contract reflecting changes agreed upon after the original signing." }
  ],
  W: [
    { title: "Warranty", definition: "A guarantee covering specific vehicle repairs for a set period, offered by the manufacturer or dealership." },
    { title: "Write-off", definition: "A vehicle declared a total loss by an insurance company due to severe damage or repair costs exceeding value." },
    { title: "Wear and Tear", definition: "The gradual deterioration of vehicle components through normal use over time, expected in any used vehicle." },
    { title: "Wholesale Price", definition: "The price at which dealers buy vehicles in bulk or at auction, typically lower than the retail selling price." },
    { title: "Windshield", definition: "The laminated safety glass panel at the front of a vehicle providing visibility and structural support to the roof." },
    { title: "Wheelbase", definition: "The distance between the centers of the front and rear axles, affecting a vehicle's stability and interior space." },
    { title: "Water-cooled Engine", definition: "An engine that uses liquid coolant circulated through a radiator to regulate operating temperature." },
    { title: "Wiper System", definition: "The motorized blades and mechanism on a vehicle's windshield that clear rain, dust, and debris for visibility." },
    { title: "Wheel Alignment", definition: "The adjustment of a vehicle's wheel angles to ensure straight tracking, even tire wear, and precise steering." },
    { title: "Working Capital Loan (Auto)", definition: "A short-term loan used by vehicle dealers to finance inventory purchases until vehicles are sold." }
  ],
  X: [
    { title: "Ex-showroom Price", definition: "The manufacturer's listed price of a vehicle at the dealership, before registration, insurance, or road taxes." },
    { title: "Xenon Headlights", definition: "High-intensity discharge (HID) lights providing significantly brighter illumination than standard halogen bulbs." },
    { title: "Extended Range EV (XEV)", definition: "An electric vehicle equipped with a small backup combustion engine to extend range beyond battery capacity." },
    { title: "X-ray Inspection", definition: "A non-invasive scanning technique used to detect hidden structural damage or welding repairs in a vehicle." },
    { title: "Extra-urban Fuel Economy", definition: "A vehicle's fuel efficiency measured during highway and out-of-town driving at sustained higher speeds." },
    { title: "Exchange Program", definition: "A structured trade-in scheme by dealers or manufacturers allowing owners to upgrade their vehicle model." },
    { title: "Exhaust Emission Test", definition: "A regulated test measuring the level of harmful pollutants emitted from a vehicle's exhaust pipe." },
    { title: "X-Country Vehicle", definition: "A vehicle designed to perform reliably both on paved roads and challenging off-road terrain conditions." },
    { title: "Cross-traffic Alert", definition: "A sensor-based safety feature that warns the driver of approaching vehicles when reversing out of a space." },
    { title: "Xtra Load Tires (XL)", definition: "Reinforced tires rated to carry heavier loads than standard tires of the same size designation." }
  ],
  Y: [
    { title: "Year of Manufacture", definition: "The specific calendar year in which the vehicle was produced at the factory." },
    { title: "Year of Registration", definition: "The calendar year in which a vehicle was first officially registered with transport authorities." },
    { title: "Yellow Plate (Commercial)", definition: "A license plate designation used in Nepal to identify vehicles registered for commercial passenger or cargo use." },
    { title: "Year-end Depreciation", definition: "The calculated reduction in a vehicle's book value assessed at the close of each financial year." },
    { title: "Yearly Maintenance Plan", definition: "A service agreement covering all scheduled maintenance tasks for a vehicle over a one-year period." },
    { title: "Yaw Control", definition: "A vehicle stability feature that counteracts spinning or sliding by selectively applying brakes to individual wheels." },
    { title: "Year-Model Difference", definition: "The distinction in features, technology, and value between consecutive annual production versions of a model." },
    { title: "Yellow Flag (Safety)", definition: "A caution signal used in vehicle testing and motorsport to indicate a hazard requiring reduced speed." },
    { title: "Yield Management (Auto)", definition: "A pricing strategy used by dealerships to adjust vehicle prices based on demand, inventory, and market timing." },
    { title: "Young Driver Insurance", definition: "A specialized motor insurance product tailored for new or younger drivers, often with higher premiums." }
  ],
  Z: [
    { title: "Zero Depreciation Cover", definition: "An insurance add-on that pays the full cost of parts replacement without deducting depreciation during a claim." },
    { title: "Zero Emission Vehicle (ZEV)", definition: "A vehicle that produces no direct exhaust emissions during operation, such as a battery electric vehicle." },
    { title: "Zero-down Finance", definition: "A vehicle loan arrangement with no upfront down payment required, covering the full purchase price." },
    { title: "Zero-kilometer Vehicle", definition: "A brand-new vehicle that has never been driven, registered, or previously owned by any individual." },
    { title: "Zero-rate Finance", definition: "A financing deal offering 0% interest over an agreed repayment term, making the total cost equal to the price." },
    { title: "Zone Pricing", definition: "A dealer pricing strategy where vehicle prices vary by geographic region based on local demand and competition." },
    { title: "Zero Emission Zone (ZEZ)", definition: "A designated urban area where only zero-emission vehicles are permitted to enter or operate." },
    { title: "Zoning Compliance", definition: "Ensuring a vehicle's commercial use or parking meets local authority rules for specific designated zones." },
    { title: "Zone of Inspection", definition: "The specific areas of a vehicle assessed during a pre-purchase examination, such as body, engine, and undercarriage." },
    { title: "Z-axis (Vehicle Dynamics)", definition: "The vertical axis of a vehicle used in suspension design and stability analysis to measure bounce and roll forces." }
  ]
};

function GlossaryPage() {
  const [activeLetter, setActiveLetter] = useState("A");
  const letterRows = [
    ["A","B","C","D","E","F"],
    ["G","H","I","J","K","L"],
    ["M","N","O","P","Q","R"],
    ["S","T","U","V","W","X"],
    ["Y","Z"]
  ];
  const terms = glossaryData[activeLetter] || [];

  return (
    <View style={styles.glossaryPage}>
      <Text allowFontScaling={false} style={styles.glossaryIntro}>
        Explore common used car, EV exchange, and auto market terms from A to Z.
      </Text>

      <View style={styles.glossaryAlphabetCard}>
        {letterRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.glossaryLetterRow}>
            {row.map((letter) => {
              const active = activeLetter === letter;
              return (
                <Pressable
                  key={letter}
                  onPress={() => setActiveLetter(letter)}
                  style={[styles.glossaryLetterBtn, active && styles.glossaryLetterBtnActive]}
                >
                  <Text allowFontScaling={false} style={[styles.glossaryLetterText, active && styles.glossaryLetterTextActive]}>
                    {letter}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <Text allowFontScaling={false} style={styles.glossaryActiveLetter}>{activeLetter}</Text>

      {terms.map((term, i) => (
        <View key={i} style={styles.glossaryCard}>
          <Text allowFontScaling={false} style={styles.glossaryTerm}>{term.title}</Text>
          <Text allowFontScaling={false} style={styles.glossaryDef}>{term.definition}</Text>
        </View>
      ))}
    </View>
  );
}

function DrawerNavigation({ activeTab, visible, onClose, onSelect, headerHeight = 88 }) {
  const { height: screenHeight } = useWindowDimensions();
  const drawerTop = headerHeight + 6;
  const drawerHeight = screenHeight - drawerTop - 85;

  if (!visible) {
    return null;
  }

  const callSupport = () => {
    Linking.openURL(`tel:${phoneNumber}`);
    onClose();
  };

  const primaryItems = [
    { label: "Home", icon: "home-outline", navKey: "exchange" },
    { label: "Exchange to EV", icon: "swap-horizontal-outline", svgIcon: "exchange", navKey: "exchange" },
    { label: "Sell Used Car", icon: "cash-outline", svgIcon: "carSide", navKey: "sell" },
    { label: "Buy Used Car", icon: "key-outline", navKey: "buy" },
    { label: "Contact", icon: "call-outline", action: callSupport },
  ];

  const secondaryItems = [
    { label: "About Us", icon: "information-circle-outline", navKey: "about" },
    { label: "Free Test Drive", icon: "car-sport-outline", navKey: "testdrive" },
    { label: "Become a Dealer", icon: "business-outline", navKey: "dealer" },
    { label: "FAQs", icon: "help-circle-outline", navKey: "faqs" },
    { label: "Glossary", icon: "book-outline", navKey: "glossary" },
  ];

  const handlePress = (item) => {
    if (item.action) {
      item.action();
    } else {
      onSelect(item.navKey);
      onClose();
    }
  };

  return (
    <View style={styles.drawerOverlay}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close drawer"
        onPress={onClose}
        style={styles.drawerScrim}
      />
      <View style={[styles.drawerPanel, { height: drawerHeight, marginTop: drawerTop }]}>
        <View style={styles.drawerHeader}>
          <Image source={nepalFlagLogo} style={styles.drawerLogo} />
          <Text allowFontScaling={false} numberOfLines={1} style={styles.drawerTitle}>
            NEPAL Motor
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close drawer"
            hitSlop={8}
            onPress={onClose}
            style={({ hovered }) => [styles.drawerClose, hovered && styles.drawerCloseHover]}
          >
            <Ionicons name="close" size={22} color="#334155" />
          </Pressable>
        </View>

        <View style={styles.drawerDivider} />

        <View style={styles.drawerBody}>
          <View style={[styles.drawerSection, { flex: 1, justifyContent: "space-evenly" }]}>
            {primaryItems.map((item, i) => {
              const active = item.navKey && activeTab === item.navKey && item.label !== "Home";
              return (
                <Pressable
                  key={i}
                  accessibilityRole="button"
                  onPress={() => handlePress(item)}
                  style={({ hovered }) => [
                    styles.drawerItem,
                    active && styles.drawerItemActive,
                    hovered && styles.drawerItemHover
                  ]}
                >
                  {item.svgIcon
                    ? renderNavSvgIcon(item.svgIcon, active ? "#075985" : "#475569", 20)
                    : <Ionicons name={item.icon} size={20} color={active ? "#075985" : "#475569"} />}
                  <Text
                    allowFontScaling={false}
                    style={[styles.drawerItemText, active && styles.drawerItemTextActive]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.drawerSectionDivider} />

          <View style={[styles.drawerSection, { flex: 1, justifyContent: "space-evenly" }]}>
            {secondaryItems.map((item, i) => {
              const active = item.navKey && activeTab === item.navKey;
              return (
                <Pressable
                  key={i}
                  accessibilityRole="button"
                  onPress={() => handlePress(item)}
                  style={({ hovered }) => [
                    styles.drawerItem,
                    active && styles.drawerItemActive,
                    hovered && styles.drawerItemHover
                  ]}
                >
                  {item.svgIcon
                    ? renderNavSvgIcon(item.svgIcon, active ? "#075985" : "#475569", 20)
                    : <Ionicons name={item.icon} size={20} color={active ? "#075985" : "#475569"} />}
                  <Text
                    allowFontScaling={false}
                    style={[styles.drawerItemText, active && styles.drawerItemTextActive]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.drawerAdminWrap}>
            <Pressable
              accessibilityRole="button"
              style={({ hovered }) => [styles.drawerAdminButton, hovered && styles.drawerAdminButtonHover]}
            >
              <Text allowFontScaling={false} style={styles.drawerAdminText}>Admin Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

function Header({ onOpenDrawer, onLayout }) {
  const callNepalMotor = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const statusBarHeight = StatusBar.currentHeight || 24;

  return (
    <View onLayout={onLayout} style={[styles.header, { paddingTop: statusBarHeight + 6 }]}>
      <View style={styles.navCard}>
        <View style={styles.brand}>
          <Image source={nepalFlagLogo} style={styles.logo} />
          <Text allowFontScaling={false} style={styles.brandText} numberOfLines={1}>
            NEPAL Motor
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            style={({ hovered }) => [styles.iconButton, hovered && styles.iconButtonHover]}
            accessibilityRole="button"
            accessibilityLabel="Call NEPAL Motor"
            hitSlop={10}
            onPress={callNepalMotor}
          >
            <Ionicons name="call-outline" size={24} color="#0f172a" />
          </Pressable>
          <Pressable
            style={({ hovered }) => [styles.iconButton, hovered && styles.iconButtonHover]}
            accessibilityRole="button"
            accessibilityLabel="Open navigation drawer"
            hitSlop={10}
            onPress={onOpenDrawer}
          >
            <Ionicons name="menu" size={26} color="#0f172a" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [appPhase, setAppPhase] = useState("loading");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(88);
  const [forms, setForms] = useState({
    exchange: emptyForm,
    sell: emptyForm,
    buy: emptyForm
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
  const isBuyForm = activeFooterTab === "buy";
  const isExchangeForm = activeFooterTab === "exchange";
  const formKey = isSellForm ? "sell" : isBuyForm ? "buy" : "exchange";
  const form = forms[formKey];
  const availableFeatures = features.filter((feature) => !form.features.includes(feature));

  useEffect(() => {
    const loadOnboardingState = async () => {
      let onboardingComplete = false;

      if (Platform.OS === "web" && typeof window !== "undefined") {
        onboardingComplete = window.localStorage?.getItem(onboardingStorageKey) === "true";
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
    setDrawerOpen(false);
    setErrors({});
    setMessage("");
    setMessageType("");
    setSubmitting(false);
    setActiveFooterTab(tab);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    });
  };

  const completeOnboarding = async () => {
    try {
      if (Platform.OS === "web" && typeof window !== "undefined") {
        window.localStorage?.setItem(onboardingStorageKey, "true");
      } else {
        await AsyncStorage.setItem(onboardingStorageKey, "true");
      }
    } finally {
      setAppPhase("main");
    }
  };

  const pickFile = async (key) => {
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
        name: asset?.fileName || asset?.name || asset?.uri?.split("/").pop() || "Selected image",
        uri: asset?.uri,
        type: asset?.mimeType || "image/jpeg",
        file: asset?.file
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

  const removeFile = (key, index) => {
    setForms((current) => ({
      ...current,
      [formKey]: {
        ...current[formKey],
        [key]: current[formKey][key].filter((_, fileIndex) => fileIndex !== index)
      }
    }));
  };

  const clearFiles = (key) => {
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
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";

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
      if (form.year && (year < 1981 || year > 2026)) {
        newErrors.year = "Year must be between 1981 and 2026";
      }
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
    const submittedIsBuyForm = isBuyForm;
    try {
      if (submittedIsBuyForm) {
        await fetch("https://nepalmotor.com/api/buy-used-cars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            city: form.city,
            vehicleType: form.vehicleType,
            vehicleModel: form.model.trim(),
            vehicleBrand: form.brand.trim(),
            vehicleColor: form.color,
            transmission: form.transmission,
            fuelType: form.fuelType,
            features: form.features,
            budget: form.budget.trim(),
            finance: form.finance,
            notes: form.notes.trim(),
          }),
        });
      } else {
        const apiResponse = await postVehicleSubmission(form, submittedIsSellForm, { isBuyForm: false });
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
      setErrors({});
    } catch (error) {
      setMessageType("error");
      setMessage(submissionErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (appPhase === "loading") {
    return <SafeAreaProvider>{null}</SafeAreaProvider>;
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
      />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.container, { paddingTop: headerHeight + 4 }]}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={closeFeaturePicker}
      >
        {activeFooterTab === "faqs" ? (
          <FAQsPage />
        ) : activeFooterTab === "branches" ? (
          <BranchesPage />
        ) : activeFooterTab === "about" ? (
          <AboutPage />
        ) : activeFooterTab === "dealer" ? (
          <DealerPage />
        ) : activeFooterTab === "testdrive" ? (
          <TestDrivePage />
        ) : activeFooterTab === "glossary" ? (
          <GlossaryPage />
        ) : (
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
                  onlyNumbers.length === 4 && (year < 1981 || year > 2026)
                    ? "Year must be between 1981 and 2026"
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
          error={errors.color}
          options={colors}
          onOpen={closeFeaturePicker}
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
          onOpen={closeFeaturePicker}
          onChange={(value) => update("transmission", value)}
        />
        {isExchangeForm ? (
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
          error={errors.fuelType}
          options={isSellForm || isBuyForm ? fuelTypesWithEV : fuelTypes}
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
            onOpen={closeFeaturePicker}
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
            onOpen={closeFeaturePicker}
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
      <DrawerNavigation
        activeTab={activeFooterTab}
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelect={changeFooterTab}
        headerHeight={headerHeight}
      />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 46
  },
  splashContent: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  splashLogo: {
    width: 160,
    height: 160,
    borderRadius: 80
  },
  splashTitle: {
    marginTop: 26,
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center"
  },
  splashSubtitle: {
    width: "100%",
    maxWidth: 280,
    marginTop: 12,
    color: "#e0f2fe",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 23,
    textAlign: "center"
  },
  splashServiceList: {
    width: "100%",
    maxWidth: 320,
    marginTop: 28,
    gap: 9
  },
  splashServiceItem: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1
  },
  splashServiceIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center"
  },
  splashServiceCopy: {
    flex: 1,
    minWidth: 0
  },
  splashServiceTitle: {
    color: "#020617",
    fontSize: 14,
    fontWeight: "900"
  },
  splashServiceText: {
    marginTop: 2,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700"
  },
  splashLoadingTrack: {
    width: 154,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e2e8f0",
    overflow: "hidden"
  },
  splashLoadingBar: {
    width: "70%",
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#075985"
  },
  onboardingScreen: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 28
  },
  onboardingSkipRow: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8
  },
  onboardingBrand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  onboardingLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  onboardingBrandText: {
    color: "#075985",
    fontSize: 18,
    fontWeight: "900"
  },
  onboardingSkipText: {
    color: "#075985",
    fontSize: 14,
    fontWeight: "800",
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  onboardingCenter: {
    flex: 1,
    justifyContent: "center"
  },
  onboardingTextBlock: {
    alignSelf: "center",
    marginBottom: 10,
    paddingHorizontal: 4
  },
  onboardingTitle: {
    color: "#075985",
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900"
  },
  onboardingBody: {
    marginTop: 12,
    color: "#075985",
    fontSize: 16,
    lineHeight: 24
  },
  onboardingVisual: {
    overflow: "hidden"
  },
  onboardingImage: {
    width: "100%",
    height: "100%"
  },
  onboardingDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    paddingVertical: 8
  },
  onboardingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cbd5e1"
  },
  onboardingDotActive: {
    width: 26,
    backgroundColor: "#075985"
  },
  onboardingButton: {
    width: 200,
    minHeight: 54,
    alignSelf: "center",
    marginTop: 2,
    borderRadius: 27,
    backgroundColor: "#075985",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#075985",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5
  },
  onboardingButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800"
  },
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 16,
    paddingTop: 0
  },
  drawerScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.48)"
  },
  drawerPanel: {
    width: "82%",
    maxWidth: 340,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    elevation: 20
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 14,
    paddingBottom: 10,
    gap: 10
  },
  drawerLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  drawerTitle: {
    flex: 1,
    color: "#075985",
    fontSize: 17,
    fontWeight: "900"
  },
  drawerClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  drawerCloseHover: {
    backgroundColor: "#e2e8f0"
  },
  drawerDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 14,
    marginVertical: 2
  },
  drawerSectionDivider: {
    height: 1,
    backgroundColor: "#d1d5db",
    marginHorizontal: 14,
    marginTop: 4,
    marginBottom: 4
  },
  drawerBody: {
    flex: 1,
    flexDirection: "column"
  },
  drawerSection: {
    paddingHorizontal: 8,
    paddingVertical: 0
  },
  drawerItem: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  drawerItemHover: {
    backgroundColor: "#e2e8f0"
  },
  drawerItemActive: {
    backgroundColor: "#dbeafe"
  },
  drawerItemText: {
    flex: 1,
    color: "#334155",
    fontSize: 15,
    fontWeight: "600"
  },
  drawerItemTextActive: {
    color: "#075985",
    fontWeight: "800"
  },
  drawerAdminWrap: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 6
  },
  drawerAdminButton: {
    minHeight: 52,
    alignSelf: "flex-start",
    paddingHorizontal: 30,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center"
  },
  drawerAdminButtonHover: {
    backgroundColor: "#e2e8f0"
  },
  drawerAdminText: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "700"
  },
  buyHero: {
    borderRadius: 8,
    backgroundColor: "#075985",
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginBottom: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4
  },
  buyHeroIcon: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  buyHeroTitle: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  buyHeroText: {
    marginTop: 9,
    color: "#e0f2fe",
    fontSize: 15,
    lineHeight: 23
  },
  buyHeroButton: {
    alignSelf: "flex-start",
    minHeight: 42,
    marginTop: 18,
    borderRadius: 6,
    backgroundColor: "#111318",
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  buyHeroButtonHover: {
    backgroundColor: "#2b2d31"
  },
  buyHeroButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800"
  },
  buyHighlightList: {
    gap: 12
  },
  buyHighlightCard: {
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
  buyHighlightIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#e5f3ff",
    alignItems: "center",
    justifyContent: "center"
  },
  buyHighlightContent: {
    flex: 1,
    minWidth: 0
  },
  buyHighlightTitle: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 4
  },
  buyHighlightBody: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 21
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    alignItems: "center",
    zIndex: 10
  },
  navCard: {
    width: "100%",
    maxWidth: 564,
    minHeight: 64,
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 18,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  iconButton: {
    padding: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  iconButtonHover: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8
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
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  brandText: {
    flexShrink: 1,
    color: "#020617",
    fontSize: 25,
    fontWeight: "800"
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
    paddingBottom: 128
  },
  title: {
    color: "#020617",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 34,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede"
  },
  field: {
    marginBottom: 28
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
    fontSize: 14,
    color: "#020617",
    fontWeight: "400",
    marginBottom: 8
  },
  required: {
    color: "#c2185b",
    fontWeight: "400"
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 0,
    backgroundColor: "#ffffff",
    color: "#020617",
    fontSize: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  notes: {
    height: 82,
    paddingTop: 10,
    textAlignVertical: "top"
  },
  helper: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 6
  },
  select: {
    height: 48,
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
    fontSize: 14,
    fontWeight: "700",
    borderRadius: 5,
    backgroundColor: "#e5f3ff",
    paddingHorizontal: 9,
    paddingVertical: 6,
    overflow: "hidden"
  },
  selectPlaceholder: {
    color: "#9ca3af",
    fontSize: 15
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
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff"
  },
  dropdownItemSelected: {
    backgroundColor: "#f8fafc"
  },
  dropdownText: {
    color: "#020617",
    fontSize: 16
  },
  dropdownTextSelected: {
    fontWeight: "700"
  },
  uploadLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  clearUploadButton: {
    minHeight: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: "#fef2f2"
  },
  clearUploadText: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "700"
  },
  upload: {
    height: 108,
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
    fontSize: 14
  },
  browseText: {
    color: "#006ffd",
    textDecorationLine: "underline"
  },
  filePreviewList: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
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
  fileRemove: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center"
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
    minHeight: 40,
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
    width: 29,
    height: 29,
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
    fontSize: 15
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
    fontSize: 12
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
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff"
  },
  featureOptionSelected: {
    backgroundColor: "#ffffff"
  },
  featureOptionText: {
    color: "#020617",
    fontSize: 16
  },
  featureOptionTextMuted: {
    color: "#9ca3af",
    fontSize: 16
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
  faqPage: {
    paddingTop: 16
  },
  faqPageTitle: {
    color: "#075985",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 38,
    marginBottom: 6
  },
  faqPageSubtitle: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 24
  },
  faqChipsScroll: {
    marginBottom: 28
  },
  faqChipsRow: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 4
  },
  faqChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  faqChipActive: {
    backgroundColor: "#075985",
    borderColor: "#075985"
  },
  faqChipText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "700"
  },
  faqChipTextActive: {
    color: "#ffffff"
  },
  faqSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
    marginTop: 8
  },
  faqSectionAccent: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: "#075985"
  },
  faqSectionTitle: {
    color: "#0c4a6e",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
    textTransform: "uppercase"
  },
  faqItem: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    backgroundColor: "#ffffff",
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 10,
    shadowColor: "#075985",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    cursor: "pointer"
  },
  faqItemActive: {
    borderColor: "#075985",
    backgroundColor: "#f0f9ff",
    shadowOpacity: 0.14
  },
  faqItemHover: {
    borderColor: "#bae6fd",
    backgroundColor: "#f8fbff"
  },
  faqQuestionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  faqQuestion: {
    flex: 1,
    color: "#1e293b",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22
  },
  faqQuestionExpanded: {
    color: "#075985"
  },
  faqChevron: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  faqChevronActive: {
    backgroundColor: "#075985"
  },
  faqAnswer: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0f2fe"
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
  cityDropdownWrap: {
    marginBottom: 16,
    zIndex: 10
  },
  cityDropdownLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  cityDropdownBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: "#ffffff"
  },
  cityDropdownBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a"
  },
  cityDropdownList: {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  cityDropdownOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9"
  },
  cityDropdownOptionActive: {
    backgroundColor: "#e5f3ff"
  },
  cityDropdownOptionText: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "500"
  },
  cityDropdownOptionTextActive: {
    color: "#075985",
    fontWeight: "700"
  },
  cityDropdownEmpty: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 15,
    paddingVertical: 24
  },
  aboutPage: {
    marginTop: -16,
    paddingBottom: 16
  },
  aboutHero: {
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#bae6fd",
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginBottom: 16
  },
  aboutHeroLogo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#075985",
    marginBottom: 14
  },
  aboutHeroName: {
    color: "#075985",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 8
  },
  aboutHeroTagline: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    paddingHorizontal: 8
  },
  aboutStatsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20
  },
  aboutStatCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#075985",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  aboutStatValue: {
    color: "#075985",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 3
  },
  aboutStatLabel: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  aboutMission: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 24,
    shadowColor: "#075985",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  aboutMissionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  aboutMissionTitle: {
    color: "#0c4a6e",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 6
  },
  aboutMissionText: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 20
  },
  aboutSectionTitle: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 14
  },
  aboutServiceCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 10,
    shadowColor: "#075985",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  aboutServiceIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  aboutServiceTitle: {
    color: "#075985",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4
  },
  aboutServiceDesc: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 19
  },
  aboutValuesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 28
  },
  aboutValueCard: {
    flex: 1,
    minWidth: "44%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 14,
    alignItems: "center",
    gap: 8,
    shadowColor: "#075985",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  aboutValueIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center"
  },
  aboutValueLabel: {
    color: "#0c4a6e",
    fontSize: 13,
    fontWeight: "800"
  },
  aboutCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#075985",
    borderRadius: 14,
    paddingVertical: 16,
    shadowColor: "#075985",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  aboutCTAHover: {
    backgroundColor: "#0c4a6e"
  },
  aboutCTAText: {
    color: "#ffffff",
    fontSize: 16,
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
    minHeight: 64,
    paddingHorizontal: 7,
    paddingTop: 6,
    paddingBottom: 6,
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
    minHeight: 50,
    borderRadius: 12,
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
    fontSize: 8.5,
    lineHeight: 10,
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
  glossaryPage: {
    paddingTop: 8
  },
  glossaryIntro: {
    textAlign: "center",
    color: "#475569",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 24,
    paddingHorizontal: 8
  },
  glossaryAlphabetCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  glossaryLetterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8
  },
  glossaryLetterRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8
  },
  glossaryLetterBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center"
  },
  glossaryLetterBtnActive: {
    backgroundColor: "#075985"
  },
  glossaryLetterText: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "700"
  },
  glossaryLetterTextActive: {
    color: "#ffffff"
  },
  glossaryActiveLetter: {
    textAlign: "center",
    color: "#075985",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 16
  },
  glossaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 12,
    shadowColor: "#075985",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  glossaryTerm: {
    color: "#0c4a6e",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6
  },
  glossaryDef: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 22
  }
});

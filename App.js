import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Linking,
  Platform,
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
import Svg, { Path } from "react-native-svg";

const nepalFlagLogo = require("./assets/nepal-flag-logo.jpeg");
const phoneNumber = "+9779800000000";
const vehicleSubmissionEndpoint = "https://www.nepalmotor.com/api/vehicle-submission";
const vehicleSubmissionEndpointFallback = "https://nepalmotor.com/api/vehicle-submission";

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
const vehicleTypes = ["Hatchback", "Sedan", "SUV", "Crossover", "Pickup", "Van", "Two-wheeler", "Other"];
const evBrands = ["BYD", "Tesla", "Nissan", "Hyundai", "MG", "Tata", "Mahindra", "Other"];
const financeOptions = ["Yes", "No"];
const transmissions = ["Manual", "Automatic", "CVT", "Other"];
const accidents = ["No", "Minor", "Major", "Prefer not to say"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "CNG", "LPG", "Other"];
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
  { key: "exchange", label: "Exchange", svgIcon: "exchange" },
  { key: "faqs", label: "FAQs", svgIcon: "graphql" },
  { key: "sell", label: "Sell", svgIcon: "carSide" },
  { key: "about", label: "About", svgIcon: "steering" },
  { key: "branches", label: "Branches", svgIcon: "locationPin" }
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
  featuresValue.forEach((feature) => {
    formData.append("features", feature);
  });
};

const buildVehicleSubmission = (form, isSellForm, options = {}) => {
  const formData = new FormData();
  const evBrandValue =
    options.evBrand !== undefined
      ? options.evBrand
      : isSellForm
        ? "Other"
        : form.evBrand;
  const financeValue = isSellForm ? "No" : form.finance;
  const accidentValue = isSellForm ? "No" : form.accident || "No";

  formData.append("fullName", form.fullName.trim());
  formData.append("email", form.email.trim());
  formData.append("phone", form.phone.trim());
  formData.append("city", form.city);
  formData.append("year", form.year.trim());
  formData.append("vehicleType", form.vehicleType);
  formData.append("vehicleBrand", form.brand.trim());
  formData.append("vehicleModel", form.model.trim());
  formData.append("vehicleColor", form.color);
  formData.append("kmDriven", form.kmDriven.trim());
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
  formData.append("requestType", isSellForm ? "Sell Used Car" : "Exchange to EV");
  formData.append("notes", form.notes.trim());

  appendFeatureFields(formData, form.features);
  form.document.forEach((file) => appendUpload(formData, "documents", file));
  form.photo.forEach((file) => appendUpload(formData, "photos", file));

  return formData;
};

const postVehicleSubmission = async (form, isSellForm) => {
  const endpoints = [
    vehicleSubmissionEndpoint,
    vehicleSubmissionEndpointFallback
  ];

  let lastError;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: buildVehicleSubmission(form, isSellForm)
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

function FooterNavigation({ activeTab, onChange }) {
  const renderFooterIcon = (item, color) => {
    if (item.svgIcon === "exchange") {
      return (
        <Svg width={22} height={22} viewBox="-3.5 0 32 32">
          <Path
            fill={color}
            d="M21.75 20.469h2.531c0.75 0 0.875 0.438 0.344 0.938l-3.688 3.719c-0.313 0.344-0.906 0.344-1.25 0l-3.719-3.719c-0.5-0.5-0.375-0.938 0.375-0.938h2.531v-9.188c-0.125-1.281-1.188-2.25-2.5-2.25-1.344 0-2.438 1.031-2.5 2.344v9.25c-0.094 1.938-1.25 3.656-2.875 4.531-0.75 0.375-1.563 0.563-2.469 0.563s-1.688-0.188-2.438-0.563c-1.656-0.875-2.844-2.594-2.906-4.563v-9.063h-2.5c-0.75 0-0.906-0.406-0.375-0.906l3.688-3.719c0.344-0.344 0.938-0.344 1.25 0l3.719 3.719c0.531 0.5 0.375 0.906-0.375 0.906h-2.5v9.094c0.063 1.313 1.094 2.375 2.438 2.375s2.469-1.125 2.469-2.469v-9.156c0.094-1.969 1.219-3.625 2.875-4.5 0.75-0.375 1.594-0.594 2.5-0.594s1.719 0.219 2.5 0.594c1.594 0.844 2.719 2.469 2.875 4.375v9.219z"
          />
        </Svg>
      );
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

    if (item.svgIcon === "carSide") {
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.71454 16.826C8.7177 17.7092 8.20137 18.5073 7.40665 18.8476C6.61193 19.1878 5.6956 19.0031 5.08554 18.3797C4.47547 17.7563 4.29202 16.8172 4.62085 16.0008C4.94968 15.1845 5.72591 14.652 6.58709 14.652C7.15029 14.6509 7.69084 14.8794 8.08981 15.2871C8.48879 15.6948 8.71351 16.2483 8.71454 16.826Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.1636 16.826C19.1667 17.7092 18.6504 18.5073 17.8557 18.8476C17.061 19.1878 16.1446 19.0031 15.5346 18.3797C14.9245 17.7563 14.7411 16.8172 15.0699 16.0008C15.3987 15.1845 16.1749 14.652 17.0361 14.652C17.5993 14.6509 18.1399 14.8794 18.5388 15.2871C18.9378 15.6948 19.1625 16.2483 19.1636 16.826Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fill={color}
            d="M2.61096 9.99042C2.46815 10.3792 2.66758 10.8102 3.05639 10.953C3.44521 11.0958 3.87618 10.8964 4.01899 10.5076L2.61096 9.99042ZM4.0628 8.213L3.36486 7.93844C3.36278 7.94374 3.36075 7.94907 3.35879 7.95442L4.0628 8.213ZM9.79678 5.75C10.211 5.75 10.5468 5.41421 10.5468 5C10.5468 4.58579 10.211 4.25 9.79678 4.25V5.75ZM3.31498 10.999C3.72919 10.999 4.06498 10.6632 4.06498 10.249C4.06498 9.83479 3.72919 9.499 3.31498 9.499V10.999ZM2.0387 10.249L2.033 10.999H2.0387V10.249ZM1.28976 10.5605L1.82287 11.0881L1.82287 11.0881L1.28976 10.5605ZM0.974976 11.324L0.224976 11.3186V11.324H0.974976ZM0.224976 13C0.224976 13.4142 0.560762 13.75 0.974976 13.75C1.38919 13.75 1.72498 13.4142 1.72498 13H0.224976ZM3.31498 9.499C2.90076 9.499 2.56498 9.83479 2.56498 10.249C2.56498 10.6632 2.90076 10.999 3.31498 10.999V9.499ZM9.79678 10.999C10.211 10.999 10.5468 10.6632 10.5468 10.249C10.5468 9.83479 10.211 9.499 9.79678 9.499V10.999ZM17.5236 10.5076C17.6664 10.8964 18.0974 11.0958 18.4862 10.953C18.875 10.8102 19.0744 10.3792 18.9316 9.99042L17.5236 10.5076ZM17.4798 8.213L18.1838 7.95442C18.1818 7.94907 18.1798 7.94374 18.1777 7.93844L17.4798 8.213ZM9.79678 4.25C9.38256 4.25 9.04678 4.58579 9.04678 5C9.04678 5.41421 9.38256 5.75 9.79678 5.75V4.25ZM18.2276 10.999C18.6418 10.999 18.9776 10.6632 18.9776 10.249C18.9776 9.83479 18.6418 9.499 18.2276 9.499V10.999ZM9.79678 9.499C9.38256 9.499 9.04678 9.83479 9.04678 10.249C9.04678 10.6632 9.38256 10.999 9.79678 10.999V9.499ZM18.2276 9.499C17.8134 9.499 17.4776 9.83479 17.4776 10.249C17.4776 10.6632 17.8134 10.999 18.2276 10.999V9.499ZM21.3622 10.249L21.3622 10.999L21.3672 10.999L21.3622 10.249ZM22.425 11.324L23.175 11.324L23.175 11.3186L22.425 11.324ZM21.675 13C21.675 13.4142 22.0108 13.75 22.425 13.75C22.8392 13.75 23.175 13.4142 23.175 13H21.675ZM14.9087 17.576C15.3229 17.576 15.6587 17.2402 15.6587 16.826C15.6587 16.4118 15.3229 16.076 14.9087 16.076V17.576ZM8.71453 16.076C8.30031 16.076 7.96453 16.4118 7.96453 16.826C7.96453 17.2402 8.30031 17.576 8.71453 17.576V16.076ZM19.1636 16.076C18.7494 16.076 18.4136 16.4118 18.4136 16.826C18.4136 17.2402 18.7494 17.576 19.1636 17.576V16.076ZM21.3613 16.826L21.367 16.076H21.3613V16.826ZM22.1102 16.5145L21.5771 15.9869L21.5771 15.9869L22.1102 16.5145ZM22.425 15.751L23.175 15.7564V15.751H22.425ZM23.175 13C23.175 12.5858 22.8392 12.25 22.425 12.25C22.0108 12.25 21.675 12.5858 21.675 13H23.175ZM4.45963 17.576C4.87384 17.576 5.20963 17.2402 5.20963 16.826C5.20963 16.4118 4.87384 16.076 4.45963 16.076V17.576ZM2.0387 16.826L2.0387 16.076L2.033 16.076L2.0387 16.826ZM0.974976 15.751L0.224956 15.751L0.224995 15.7564L0.974976 15.751ZM1.72498 13C1.72498 12.5858 1.38919 12.25 0.974976 12.25C0.560762 12.25 0.224976 12.5858 0.224976 13H1.72498ZM10.5468 5C10.5468 4.58579 10.211 4.25 9.79678 4.25C9.38256 4.25 9.04678 4.58579 9.04678 5H10.5468ZM9.04678 10.249C9.04678 10.6632 9.38256 10.999 9.79678 10.999C10.211 10.999 10.5468 10.6632 10.5468 10.249H9.04678ZM0.974976 12.25C0.560762 12.25 0.224976 12.5858 0.224976 13C0.224976 13.4142 0.560762 13.75 0.974976 13.75V12.25ZM2.91815 13.75C3.33236 13.75 3.66815 13.4142 3.66815 13C3.66815 12.5858 3.33236 12.25 2.91815 12.25V13.75ZM22.425 13.75C22.8392 13.75 23.175 13.4142 23.175 13C23.175 12.5858 22.8392 12.25 22.425 12.25V13.75ZM20.3999 12.25C19.9857 12.25 19.6499 12.5858 19.6499 13C19.6499 13.4142 19.9857 13.75 20.3999 13.75V12.25ZM4.01899 10.5076L4.76681 8.47158L3.35879 7.95442L2.61096 9.99042L4.01899 10.5076ZM4.76074 8.48756C5.12559 7.5601 5.49128 6.87863 5.94824 6.42712C6.37329 6.00714 6.91377 5.75 7.74245 5.75V4.25C6.53923 4.25 5.6138 4.64886 4.89396 5.36013C4.20602 6.03987 3.74784 6.9649 3.36486 7.93844L4.76074 8.48756ZM7.74245 5.75H9.79678V4.25H7.74245V5.75ZM3.31498 9.499H2.0387V10.999H3.31498V9.499ZM2.0444 9.49902C1.55922 9.49533 1.09635 9.6897 0.756637 10.033L1.82287 11.0881C1.88214 11.0282 1.95808 10.9984 2.033 10.999L2.0444 9.49902ZM0.756637 10.033C0.41756 10.3757 0.22844 10.8385 0.224995 11.3186L1.72496 11.3294C1.72563 11.235 1.76297 11.1486 1.82287 11.0881L0.756637 10.033ZM0.224976 11.324V13H1.72498V11.324H0.224976ZM3.31498 10.999H9.79678V9.499H3.31498V10.999ZM18.9316 9.99042L18.1838 7.95442L16.7758 8.47158L17.5236 10.5076L18.9316 9.99042ZM18.1777 7.93844C17.7947 6.9649 17.3366 6.03987 16.6486 5.36013C15.9288 4.64886 15.0033 4.25 13.8001 4.25V5.75C14.6288 5.75 15.1693 6.00714 15.5943 6.42712C16.0513 6.87863 16.417 7.5601 16.7818 8.48756L18.1777 7.93844ZM13.8001 4.25H9.79678V5.75H13.8001V4.25ZM18.2276 9.499H9.79678V10.999H18.2276V9.499ZM18.2276 10.999H21.3622V9.499H18.2276V10.999ZM21.3672 10.999C21.5182 10.998 21.6735 11.1277 21.675 11.3294L23.175 11.3186C23.1678 10.3248 22.3719 9.49226 21.3572 9.49902L21.3672 10.999ZM21.675 11.324V13H23.175V11.324H21.675ZM14.9087 16.076H8.71453V17.576H14.9087V16.076ZM19.1636 17.576H21.3613V16.076H19.1636V17.576ZM21.3555 17.576C21.8407 17.5797 22.3036 17.3853 22.6433 17.042L21.5771 15.9869C21.5178 16.0468 21.4419 16.0766 21.367 16.076L21.3555 17.576ZM22.6433 17.042C22.9824 16.6993 23.1715 16.2365 23.175 15.7564L21.675 15.7456C21.6743 15.84 21.637 15.9264 21.5771 15.9869L22.6433 17.042ZM23.175 15.751V13H21.675V15.751H23.175ZM4.45963 16.076H2.0387V17.576H4.45963V16.076ZM2.033 16.076C1.95808 16.0766 1.88214 16.0468 1.82287 15.9869L0.756638 17.042C1.09635 17.3853 1.55922 17.5797 2.0444 17.576L2.033 16.076ZM1.82287 15.9869C1.76297 15.9264 1.72563 15.84 1.72496 15.7456L0.224995 15.7564C0.22844 16.2365 0.41756 16.6993 0.756638 17.042L1.82287 15.9869ZM1.72498 15.751V13H0.224976V15.751H1.72498ZM9.04678 5V10.249H10.5468V5H9.04678ZM0.974976 13.75H2.91815V12.25H0.974976V13.75ZM22.425 12.25H20.3999V13.75H22.425V12.25Z"
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
    <View style={styles.footerNavShell}>
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

function FAQsPage() {
  const flatFaqs = faqSections.flatMap((section) => section.items);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <View style={styles.faqPage}>
      <Text allowFontScaling={false} style={styles.faqPageTitle}>
        Frequently Asked Questions
      </Text>
      {flatFaqs.map((item, index) => {
        const expanded = openFaqIndex === index;

        return (
          <Pressable
            key={item.question}
            accessibilityRole="button"
            accessibilityState={{ expanded }}
            onPress={() => setOpenFaqIndex(expanded ? null : index)}
            style={({ pressed, hovered }) => [
              styles.faqItem,
              (pressed || hovered) && styles.faqItemActive
            ]}
          >
            <Text allowFontScaling={false} style={styles.faqQuestion}>
              {index + 1}. {item.question}
            </Text>
            {expanded ? (
              <Text allowFontScaling={false} style={styles.faqAnswer}>
                {item.answer}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
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
          NEPAL Motor helps customers exchange, buy, and sell used cars through a trusted, transparent, and customer-focused process designed to simplify every stage of vehicle ownership and resale. The company provides fair and market-based vehicle valuation, detailed professional inspection services, verified documentation checks, and complete ownership transfer assistance to ensure safe, reliable, and hassle-free transactions for both buyers and sellers.
        </Text>
        <Text style={styles.aboutText}>
          NEPAL Motor supports a wide range of automotive services for petrol, diesel, and electric vehicles, helping customers smoothly transition between traditional fuel vehicles and modern EV options. Customers can exchange their existing vehicles toward electric vehicles, directly sell used cars at competitive market value, or receive expert branch-based consultation for vehicle inspection, resale guidance, and valuation support.
        </Text>
        <Text style={styles.aboutText}>
          With a focus on transparency, reliability, and customer satisfaction, NEPAL Motor aims to make the used vehicle market more organized, secure, and convenient by offering professional support, technical evaluation, and end-to-end assistance throughout the complete buying, selling, and exchange journey.
        </Text>
      </View>
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

function Header() {
  const callNepalMotor = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.header}>
      <View style={styles.navCard}>
        <View style={styles.brand}>
          <Image source={nepalFlagLogo} style={styles.logo} />
          <Text allowFontScaling={false} style={styles.brandText} numberOfLines={1}>
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
              <HelplineIcon size={26} />
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
    const targetFormKey = formKey;
    const result = await DocumentPicker.getDocumentAsync({
      type,
      copyToCacheDirectory: true,
      multiple: true
    });

    if (result.canceled) {
      return;
    }

    setForms((current) => {
      const existingFiles = current[targetFormKey][key];
      const remainingSlots = Math.max(0, 5 - existingFiles.length);
      const selectedFiles = result.assets.slice(0, remainingSlots).map((asset) => ({
        name: asset?.name || "Selected file",
        uri: asset?.uri,
        type: asset?.mimeType || "application/octet-stream",
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

    if (!form.year) newErrors.year = "Year is required";

    if (!form.model.trim())
      newErrors.model = "Vehicle Model is required";
    else if (!alphabetPattern.test(form.model.trim()))
      newErrors.model = "Vehicle Model can only contain alphabets";

    if (!form.brand.trim())
      newErrors.brand = "Vehicle Brand is required";

    if (!form.color)
      newErrors.color = "Vehicle Color is required";

    if (!form.kmDriven.trim())
      newErrors.kmDriven = "KM Driven is required";

    if (!form.document.length)
      newErrors.document = "Upload vehicle document";

    if (!form.photo.length)
      newErrors.photo = "Upload vehicle photo";

    if (!form.transmission)
      newErrors.transmission = "Transmission / Gear is required";

    if (!form.fuelType)
      newErrors.fuelType = "Fuel Type is required";

    if (!isSellForm && !form.evBrand)
      newErrors.evBrand = "Interested EV Brand is required";

    if (!isSellForm && !form.finance)
      newErrors.finance = "Finance selection is required";

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
    try {
      const apiResponse = await postVehicleSubmission(form, submittedIsSellForm);
      console.log("API RESPONSE:", apiResponse);
      console.log("attachments:", apiResponse.received?.attachments);
      if (apiResponse.warning || apiResponse.warnings) {
        console.warn("API warning:", apiResponse.warning || apiResponse.warnings);
      }

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
    } catch (error) {
      setMessageType("error");
      setMessage(submissionErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
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
          <Text allowFontScaling={false} style={styles.title}>{isSellForm ? "Sell Any Car" : "Exchange to EV"}</Text>
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
          error={errors.color}
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
          onRemove={(index) => removeFile("document", index)}
          onClear={() => clearFiles("document")}
          onPress={() => {
            closeFeaturePicker();
            pickFile("document", "*/*");
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
            pickFile("photo", "image/*");
          }}
        />
        <SelectField
          label="Transmission / Gear"
          required
          value={form.transmission}
          error={errors.transmission}
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
          error={errors.fuelType}
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

        {!isSellForm ? (
          <>
            <SelectField
              label="Interested EV Brand"
              required
              value={form.evBrand}
              error={errors.evBrand}
              options={evBrands}
              onOpen={closeFeaturePicker}
              onChange={(value) => update("evBrand", value)}
            />
            <SelectField
              label="Are you looking for Finance?"
              required
              value={form.finance}
              error={errors.finance}
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
    marginBottom: 30
  },
  navCard: {
    width: "100%",
    maxWidth: 564,
    minHeight: 70,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 7,
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
  phoneButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
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
    paddingTop: 24,
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
    paddingTop: 20
  },
  faqPageTitle: {
    color: "#064e3b",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 35,
    marginBottom: 42
  },
  faqItem: {
    borderWidth: 1,
    borderColor: "#9fd8ca",
    borderRadius: 22,
    backgroundColor: "#ffffff",
    paddingHorizontal: 25,
    paddingVertical: 22,
    marginBottom: 30,
    shadowColor: "#047857",
    shadowOpacity: 0.12,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    cursor: "pointer"
  },
  faqItemActive: {
    borderColor: "#7cc8b7",
    shadowOpacity: 0.17
  },
  faqQuestion: {
    color: "#064e3b",
    fontSize: 21,
    fontWeight: "800",
    lineHeight: 27
  },
  faqAnswer: {
    color: "#050505",
    fontSize: 19,
    lineHeight: 31,
    marginTop: 14
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
});

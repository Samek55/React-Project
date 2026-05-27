import { Platform } from "react-native";
import {
  vehicleSubmissionEndpoint,
  vehicleSubmissionEndpointFallback
} from "../data/constants";
import { FileAsset, FormState } from "../types";

/**
 * Appends a single file to a FormData object.
 * Handles web (File object from browser) and native (URI from ImagePicker)
 * differently because the fetch API treats them differently per platform.
 */
export const appendUpload = (formData: FormData, fieldName: string, file: FileAsset): void => {
  if (Platform.OS === "web" && file.file) {
    formData.append(fieldName, file.file, file.name || "photo.jpg");
    return;
  }

  formData.append(fieldName, {
    uri: file.uri,
    name: file.name || "photo.jpg",
    type: file.type || "image/jpeg"
  } as any);
};

/**
 * Appends vehicle features to FormData in multiple field formats.
 * The server may expect features in different shapes (CSV string, JSON array,
 * repeated array fields). All formats are sent to ensure compatibility.
 */
export const appendFeatureFields = (formData: FormData, featuresValue: string[]): void => {
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

interface SubmissionOptions {
  isBuyForm?: boolean;
  evBrand?: string;
}

/**
 * Builds a FormData payload for vehicle exchange, sell, or buy submissions.
 */
export const buildVehicleSubmission = (
  form: FormState,
  isSellForm: boolean,
  options: SubmissionOptions = {}
): FormData => {
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

/**
 * Submits the vehicle form to the API with automatic endpoint fallback.
 */
export const postVehicleSubmission = async (
  form: FormState,
  isSellForm: boolean,
  options: SubmissionOptions = {}
): Promise<any> => {
  const endpoints = [
    vehicleSubmissionEndpoint,
    vehicleSubmissionEndpointFallback
  ];

  let lastError: Error | undefined;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: buildVehicleSubmission(form, isSellForm, options)
      });

      const responseText = await response.text();

      let responseBody: any = {};
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
      lastError = error as Error;
    }
  }

  throw lastError || new Error("Network request failed");
};

/**
 * Extracts a human-readable error message from a caught error.
 */
export const submissionErrorMessage = (error: unknown): string => {
  return (error as Error)?.message || String(error) || "Submission failed. Please try again.";
};

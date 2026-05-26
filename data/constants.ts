// ─── API ENDPOINTS & APP CONSTANTS ───────────────────────────────────────────

// Business contact number (used for call buttons throughout the app)
export const phoneNumber: string = "+9779852024365";

// API endpoints — postVehicleSubmission tries all three in order so that
// a CDN or www redirect issue never silently drops a form submission.
export const vehicleListingsEndpoint: string = "https://www.nepalmotor.com/api/vehicle-listings";
export const vehicleSubmissionEndpoint: string = "https://www.nepalmotor.com/api/vehicle-submission";
export const vehicleSubmissionEndpointFallback: string = "https://nepalmotor.com/api/vehicle-submission";
export const dealerEndpoint: string = "https://www.nepalmotor.com/api/become-a-dealer";

// ── OTP verification endpoints (Sparrow SMS, backend to implement) ──────────
// POST /api/send-otp    body: { phone }         → { success, message }
// POST /api/verify-otp  body: { phone, otp }    → { success, valid, message }
export const sendOtpEndpoint: string = "https://www.nepalmotor.com/api/send-otp";
export const verifyOtpEndpoint: string = "https://www.nepalmotor.com/api/verify-otp";
export const OTP_LENGTH: number = 4;           // Digits in the OTP code
export const OTP_RESEND_COOLDOWN: number = 30; // Seconds before the user can resend

// AsyncStorage / localStorage key used to track if onboarding has been shown
export const onboardingStorageKey: string = "nepalMotorOnboardingComplete";

import React, { useRef } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OTP_LENGTH } from "../data/constants";
import styles from "../styles";

interface OTPModalProps {
  visible: boolean;
  phone: string;
  digits: string[];
  onChangeDigit: (digit: string, index: number) => void;
  onVerify: () => void;
  onResend: () => void;
  onCancel: () => void;
  loading: string;
  error: string;
  resendSeconds: number;
}

/**
 * OTPModal — full-screen overlay for phone number verification.
 *
 * Shows after the user taps Submit on any form. An OTP is sent to their
 * phone via Sparrow SMS. They enter the 4-digit code here; on success the
 * actual form submission is executed by the parent via onVerify().
 *
 * UX details:
 *  - 4 individual digit boxes with auto-advance and backspace-to-go-back
 *  - Verify button auto-enabled when all 4 digits are filled
 *  - 30-second resend cooldown with live countdown
 *  - Phone number is masked (e.g. 98****4365) for display
 */
export default function OTPModal({
  visible,
  phone,
  digits,
  onChangeDigit,
  onVerify,
  onResend,
  onCancel,
  loading,
  error,
  resendSeconds
}: OTPModalProps) {
  // Refs for each digit input so we can move focus programmatically
  const inputRefs = useRef<(TextInput | null)[]>(Array(OTP_LENGTH).fill(null));

  if (!visible) return null;

  // Mask the middle digits of the phone for display: 98XXXXXX65 → 98****65
  const maskedPhone = phone
    ? `${phone.slice(0, 2)}****${phone.slice(-4)}`
    : "";

  const isComplete = digits.every((d) => d !== "");

  /**
   * Handles a digit being typed into one of the boxes.
   * Strips non-numeric chars, takes only the last character (handles paste),
   * and moves focus to the next box automatically.
   */
  const handleDigitChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    onChangeDigit(digit, index);
    // Auto-advance to next box when a digit is entered
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handles the backspace key.
   * If the current box is already empty, moves focus back to the previous
   * box and clears it so the user can correct a mistake naturally.
   */
  const handleKeyPress = ({ nativeEvent }: { nativeEvent: { key: string } }, index: number) => {
    if (nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      onChangeDigit("", index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  // A "send error" is one that arrives before the user has typed anything.
  // We must not colour the empty boxes red in that case — red borders should
  // only appear when the user submitted all digits and the code was wrong.
  const isSendError = error !== "" && !isComplete && digits.every((d) => d === "");

  return (
    <View style={styles.otpOverlay}>
      {/* Tapping the dark background cancels the modal */}
      <Pressable style={styles.otpScrim} onPress={onCancel} />

      <View style={styles.otpModal}>
        {/* Header row */}
        <View style={styles.otpHeader}>
          <Text allowFontScaling={false} style={styles.otpTitle}>Verify Your Number</Text>
          <Pressable
            onPress={onCancel}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Close OTP verification"
          >
            <Ionicons name="close" size={22} color="#334155" />
          </Pressable>
        </View>

        {/* Icon */}
        <View style={styles.otpIconWrap}>
          <Ionicons name="phone-portrait-outline" size={32} color="#075985" />
        </View>

        {/* Instruction text */}
        <Text allowFontScaling={false} style={styles.otpSubtitle}>
          A 4-digit verification code was sent to
        </Text>
        <Text allowFontScaling={false} style={styles.otpPhone}>+977 {maskedPhone}</Text>

        {/* Send-failure banner — shown above the boxes so the user knows to
            tap "Resend code" rather than thinking they entered a wrong digit */}
        {isSendError ? (
          <Text allowFontScaling={false} style={styles.otpError}>{error}</Text>
        ) : null}

        {/* 4-digit input boxes */}
        <View style={styles.otpBoxRow}>
          {digits.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => { inputRefs.current[i] = ref; }}
              style={[
                styles.otpBox,
                digit && styles.otpBoxFilled,
                // Only colour boxes red when the user has filled all of them
                // and the server rejected the code — not on a send failure.
                error && !isSendError && styles.otpBoxError
              ]}
              value={digit}
              onChangeText={(text) => handleDigitChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={2} // 2 so the OS shows a cursor; we slice to 1 in handler
              selectTextOnFocus
              allowFontScaling={false}
              accessibilityLabel={`OTP digit ${i + 1}`}
            />
          ))}
        </View>

        {/* Verification error — shown below the boxes when the code is wrong */}
        {error && !isSendError ? (
          <Text allowFontScaling={false} style={styles.otpError}>{error}</Text>
        ) : null}

        {/* Verify button — disabled until all 4 digits are filled */}
        <Pressable
          style={[
            styles.otpVerifyButton,
            (!isComplete || loading) && styles.otpVerifyButtonDisabled
          ]}
          onPress={onVerify}
          disabled={!isComplete || !!loading}
          accessibilityRole="button"
        >
          <Text allowFontScaling={false} style={styles.otpVerifyText}>
            {loading === "verifying" ? "Verifying..." : "Verify & Submit"}
          </Text>
        </Pressable>

        {/* Resend row — countdown or link */}
        <View style={styles.otpResendRow}>
          {resendSeconds > 0 ? (
            <Text allowFontScaling={false} style={styles.otpResendTimer}>
              Resend code in {resendSeconds}s
            </Text>
          ) : (
            <Pressable
              onPress={onResend}
              disabled={!!loading}
              accessibilityRole="button"
            >
              <Text allowFontScaling={false} style={styles.otpResendLink}>
                {loading === "sending" ? "Sending..." : "Resend code"}
              </Text>
            </Pressable>
          )}
        </View>

        <Text allowFontScaling={false} style={styles.otpNote}>
          Code expires in 10 minutes · Check your SMS messages
        </Text>
      </View>
    </View>
  );
}

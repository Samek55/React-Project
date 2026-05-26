import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../styles";
import Label from "./Label";

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  multiline?: boolean;
  keyboardType?: string;
  helper?: string;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  error?: string;
}

/**
 * TextField — single or multi-line text input with label, validation error,
 * and optional helper text displayed below the input.
 */
export default function TextField({
  label,
  value,
  onChangeText,
  required,
  multiline,
  keyboardType,
  helper,
  placeholder,
  onFocus,
  onBlur,
  maxLength,
  error
}: TextFieldProps) {
  return (
    <View style={styles.field}>
      <Label required={required}>{label}</Label>
      <TextInput
        allowFontScaling={false}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType as any}
        multiline={multiline}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxLength}
        placeholderTextColor="#9ca3af"
        style={[styles.input, multiline && styles.notes]}
      />
      {error ? <Text allowFontScaling={false} style={styles.errorText}>{error}</Text> : null}
      {helper ? <Text allowFontScaling={false} style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

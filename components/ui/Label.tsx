import React from "react";
import { Text } from "react-native";
import styles from "../../styles";

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
}

/**
 * Label — form field label with optional red asterisk for required fields.
 */
export default function Label({ children, required }: LabelProps) {
  return (
    <Text allowFontScaling={false} style={styles.label}>
      {children}
      {required ? <Text allowFontScaling={false} style={styles.required}> *</Text> : null}
    </Text>
  );
}

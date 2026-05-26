import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PolicyKey } from "../../types";
import styles from "../../styles";

interface AgreementRowProps {
  agreed: boolean;
  onToggle: () => void;
  error?: string;
  onNavigate: (key: PolicyKey) => void;
}

/**
 * AgreementRow — checkbox row requiring the user to agree to all four legal
 * policies before any form can be submitted.
 */
export default function AgreementRow({ agreed, onToggle, error, onNavigate }: AgreementRowProps) {
  return (
    <View style={styles.agreementWrap}>
      <View style={styles.agreementRow}>
        <Pressable
          onPress={onToggle}
          hitSlop={8}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreed }}
          style={styles.checkboxHitArea}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed ? <Ionicons name="checkmark" size={13} color="#ffffff" /> : null}
          </View>
        </Pressable>
        <Text allowFontScaling={false} style={styles.agreementText}>
          {"I agree to the "}
          <Text style={styles.policyLink} onPress={() => onNavigate("terms")}>Terms of Service</Text>
          {", "}
          <Text style={styles.policyLink} onPress={() => onNavigate("privacy")}>Privacy Policy</Text>
          {", "}
          <Text style={styles.policyLink} onPress={() => onNavigate("refund")}>Refund Policy</Text>
          {", and "}
          <Text style={styles.policyLink} onPress={() => onNavigate("disclaimer")}>Disclaimer</Text>
        </Text>
      </View>
      {error ? <Text allowFontScaling={false} style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

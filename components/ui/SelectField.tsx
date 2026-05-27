import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles";
import Label from "./Label";

interface SelectFieldProps {
  label: string;
  value: string;
  required?: boolean;
  options: string[];
  onChange: (value: string) => void;
  onOpen?: () => void;
  error?: string;
  /**
   * Increment this number from the parent whenever any dropdown opens.
   * Every SelectField that did NOT just open will automatically close,
   * preventing multiple dropdowns from being visible at the same time.
   */
  closeSignal?: number;
}

/**
 * SelectField — tappable dropdown selector with an inline option list.
 *
 * Pass the same `closeSignal` value (a counter state) to every SelectField
 * on the same screen and increment it inside each field's `onOpen` handler.
 * The field that triggered the increment is protected by `justOpenedRef`
 * and won't close itself; all others will close automatically.
 */
export default function SelectField({
  label,
  value,
  required,
  options,
  onChange,
  onOpen,
  error,
  closeSignal = 0
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  // Track the last signal value we acted on so we only react to changes.
  const prevSignalRef = useRef(closeSignal);
  // Set to true just before calling onOpen so the resulting signal increment
  // does NOT close this field (it was this field that caused the signal).
  const justOpenedRef = useRef(false);

  useEffect(() => {
    if (closeSignal !== prevSignalRef.current) {
      prevSignalRef.current = closeSignal;
      if (!justOpenedRef.current) {
        // Another field opened — close this one.
        setOpen(false);
      }
      // Always reset the guard after handling the signal.
      justOpenedRef.current = false;
    }
  }, [closeSignal]);

  return (
    <View style={styles.field}>
      <Label required={required}>{label}</Label>
      <Pressable
        style={styles.select}
        onPress={() => {
          Keyboard.dismiss();
          // Guard must be set BEFORE onOpen fires (which increments the signal).
          justOpenedRef.current = true;
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
                  <Text allowFontScaling={false} style={[styles.dropdownText, selected && styles.dropdownTextSelected]}>
                    {option}
                  </Text>
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

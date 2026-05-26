import React, { useState } from "react";
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
}

/**
 * SelectField — tappable dropdown selector with an inline option list.
 */
export default function SelectField({
  label,
  value,
  required,
  options,
  onChange,
  onOpen,
  error
}: SelectFieldProps) {
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

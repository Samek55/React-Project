import React from "react";
import { View, Text, Image, Pressable, StatusBar, Linking, LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { phoneNumber } from "../../data/constants";
import styles from "../../styles";

const nepalFlagLogo = require("../../assets/nepal-flag-logo.jpeg");

interface HeaderProps {
  onOpenDrawer: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
  showBack?: boolean;
  onBack?: () => void;
}

/**
 * Header — fixed top navigation bar with the NEPAL Motor logo/brand,
 * a call icon, and the hamburger menu button that opens the drawer.
 * When showBack is true (e.g. on policy pages), a ← back arrow replaces
 * the hamburger so users can return on both Android and iOS.
 * Uses onLayout to report its rendered height to the parent App so the
 * scroll view padding and drawer offset stay accurate across devices.
 */
export default function Header({ onOpenDrawer, onLayout, showBack = false, onBack }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const callNepalMotor = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // Use safe area top inset, reduced slightly for a more compact header
  const statusBarHeight = Math.max((insets.top || StatusBar.currentHeight || 24) - 6, 6);

  return (
    <View style={[styles.header, { paddingTop: statusBarHeight }]}>
      <View onLayout={onLayout} style={styles.navCard}>
        {showBack ? (
          <Pressable
            style={({ hovered }: any) => [styles.headerBackButton, hovered && styles.iconButtonHover]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={10}
            onPress={onBack}
          >
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
            <Text allowFontScaling={false} style={styles.headerBackText}>Back</Text>
          </Pressable>
        ) : (
          <View style={styles.brand}>
            <Image source={nepalFlagLogo} style={styles.logo as any} />
            <Text allowFontScaling={false} style={styles.brandText} numberOfLines={1}>
              NEPAL Motor
            </Text>
          </View>
        )}
        <View style={styles.headerActions}>
          <Pressable
            style={({ hovered }: any) => [styles.iconButton, hovered && styles.iconButtonHover]}
            accessibilityRole="button"
            accessibilityLabel="Call NEPAL Motor"
            hitSlop={10}
            onPress={callNepalMotor}
          >
            <Ionicons name="call-outline" size={24} color="#0f172a" />
          </Pressable>
          {!showBack && (
            <Pressable
              style={({ hovered }: any) => [styles.iconButton, hovered && styles.iconButtonHover]}
              accessibilityRole="button"
              accessibilityLabel="Open navigation drawer"
              hitSlop={10}
              onPress={onOpenDrawer}
            >
              <Ionicons name="menu" size={26} color="#0f172a" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

import React from "react";
import { View, Text, Image, Pressable, StatusBar, Linking, LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { phoneNumber } from "../../data/constants";
import styles from "../../styles";

const nepalFlagLogo = require("../../assets/nepal-flag-logo.jpeg");

interface HeaderProps {
  onOpenDrawer: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
}

/**
 * Header — fixed top navigation bar with the NEPAL Motor logo/brand,
 * a call icon, and the hamburger menu button that opens the drawer.
 * Uses onLayout to report its rendered height to the parent App so the
 * scroll view padding and drawer offset stay accurate across devices.
 */
export default function Header({ onOpenDrawer, onLayout }: HeaderProps) {
  const callNepalMotor = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const statusBarHeight = StatusBar.currentHeight || 24;

  return (
    <View onLayout={onLayout} style={[styles.header, { paddingTop: statusBarHeight }]}>
      <View style={styles.navCard}>
        <View style={styles.brand}>
          <Image source={nepalFlagLogo} style={styles.logo as any} />
          <Text allowFontScaling={false} style={styles.brandText} numberOfLines={1}>
            NEPAL Motor
          </Text>
        </View>
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
          <Pressable
            style={({ hovered }: any) => [styles.iconButton, hovered && styles.iconButtonHover]}
            accessibilityRole="button"
            accessibilityLabel="Open navigation drawer"
            hitSlop={10}
            onPress={onOpenDrawer}
          >
            <Ionicons name="menu" size={26} color="#0f172a" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

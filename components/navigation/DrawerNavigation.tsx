import React from "react";
import { View, Text, Pressable, Image, Linking, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { renderNavSvgIcon } from "../icons/NavSvgIcons";
import { phoneNumber } from "../../data/constants";
import styles from "../../styles";

const nepalFlagLogo = require("../../assets/nepal-flag-logo.jpeg");

interface DrawerItem {
  label: string;
  icon: string;
  svgIcon?: string;
  navKey?: string;
  action?: () => void;
}

interface DrawerNavigationProps {
  activeTab: string;
  visible: boolean;
  onClose: () => void;
  onSelect: (key: string) => void;
  headerHeight?: number;
}

/**
 * DrawerNavigation — slide-in side drawer menu.
 * Renders below the header (not from the top of screen) and sits above the
 * footer tab bar. Divided into primary nav links and secondary/utility links.
 * Tapping the scrim backdrop closes the drawer.
 */
export default function DrawerNavigation({ activeTab, visible, onClose, onSelect, headerHeight = 88 }: DrawerNavigationProps) {
  const { height: screenHeight } = useWindowDimensions();
  const drawerTop = headerHeight + 6;
  const drawerHeight = screenHeight - drawerTop - 85;

  if (!visible) {
    return null;
  }

  const callSupport = () => {
    Linking.openURL(`tel:${phoneNumber}`);
    onClose();
  };

  const primaryItems: DrawerItem[] = [
    { label: "Home", icon: "home-outline", navKey: "exchange" },
    { label: "Exchange to EV", icon: "swap-horizontal-outline", svgIcon: "exchange", navKey: "exchange" },
    { label: "Buy Used Car", icon: "key-outline", navKey: "buy" },
    { label: "Sell Used Car", icon: "cash-outline", svgIcon: "carSide", navKey: "sell" },
    { label: "Free Test Drive", icon: "car-sport-outline", navKey: "testdrive" },
    { label: "Become a Dealer", icon: "business-outline", navKey: "dealer" },
  ];

  const secondaryItems: DrawerItem[] = [
    { label: "About Us", icon: "information-circle-outline", navKey: "about" },
    { label: "FAQs", icon: "help-circle-outline", navKey: "faqs" },
    { label: "Glossary", icon: "book-outline", navKey: "glossary" },
    { label: "Contact", icon: "call-outline", action: callSupport },
  ];

  const handlePress = (item: DrawerItem) => {
    if (item.action) {
      item.action();
    } else if (item.navKey) {
      onSelect(item.navKey);
      onClose();
    }
  };

  return (
    <View style={styles.drawerOverlay}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close drawer"
        onPress={onClose}
        style={styles.drawerScrim}
      />
      <View style={[styles.drawerPanel, { height: drawerHeight, marginTop: drawerTop }]}>
        <View style={styles.drawerHeader}>
          <Image source={nepalFlagLogo} style={styles.drawerLogo as any} />
          <Text allowFontScaling={false} numberOfLines={1} style={styles.drawerTitle}>
            NEPAL Motor
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close drawer"
            hitSlop={8}
            onPress={onClose}
            style={({ hovered }: any) => [styles.drawerClose, hovered && styles.drawerCloseHover]}
          >
            <Ionicons name="close" size={22} color="#334155" />
          </Pressable>
        </View>

        <View style={styles.drawerDivider} />

        <View style={styles.drawerBody}>
          <View style={[styles.drawerSection, { flex: 6, justifyContent: "space-evenly" }]}>
            {primaryItems.map((item, i) => {
              const active = item.navKey && activeTab === item.navKey && item.label !== "Home";
              return (
                <Pressable
                  key={i}
                  accessibilityRole="button"
                  onPress={() => handlePress(item)}
                  style={({ hovered }: any) => [
                    styles.drawerItem,
                    active && styles.drawerItemActive,
                    hovered && styles.drawerItemHover
                  ]}
                >
                  {item.svgIcon
                    ? renderNavSvgIcon(item.svgIcon, active ? "#075985" : "#475569", 20)
                    : <Ionicons name={item.icon as any} size={20} color={active ? "#075985" : "#475569"} />}
                  <Text
                    allowFontScaling={false}
                    style={[styles.drawerItemText, active && styles.drawerItemTextActive]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.drawerSectionDivider} />

          <View style={[styles.drawerSection, { flex: 4, justifyContent: "space-evenly" }]}>
            {secondaryItems.map((item, i) => {
              const active = item.navKey && activeTab === item.navKey;
              return (
                <Pressable
                  key={i}
                  accessibilityRole="button"
                  onPress={() => handlePress(item)}
                  style={({ hovered }: any) => [
                    styles.drawerItem,
                    active && styles.drawerItemActive,
                    hovered && styles.drawerItemHover
                  ]}
                >
                  {item.svgIcon
                    ? renderNavSvgIcon(item.svgIcon, active ? "#075985" : "#475569", 20)
                    : <Ionicons name={item.icon as any} size={20} color={active ? "#075985" : "#475569"} />}
                  <Text
                    allowFontScaling={false}
                    style={[styles.drawerItemText, active && styles.drawerItemTextActive]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.drawerAdminWrap}>
            <Pressable
              accessibilityRole="button"
              style={({ hovered }: any) => [styles.drawerAdminButton, hovered && styles.drawerAdminButtonHover]}
            >
              <Text allowFontScaling={false} style={styles.drawerAdminText}>Admin Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

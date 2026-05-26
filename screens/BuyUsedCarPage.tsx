import React from "react";
import { View, Text, Pressable, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { phoneNumber } from "../data/constants";
import styles from "../styles";

/**
 * BuyUsedCarPage — informational hero section for the Buy Used Car tab.
 * Displays three feature highlight cards and a direct call button.
 * The actual buy inquiry form is rendered below this component in the
 * main scroll view when the "buy" tab is active.
 */
export default function BuyUsedCarPage() {
  const buyHighlights = [
    {
      icon: "shield-checkmark-outline",
      title: "Verified Options",
      body: "Browse used cars supported by inspection, condition review, and clear vehicle details."
    },
    {
      icon: "document-text-outline",
      title: "Clear Paperwork",
      body: "Get help with ownership transfer, document checks, and purchase guidance."
    },
    {
      icon: "call-outline",
      title: "Branch Support",
      body: "Talk with NEPAL Motor branches for viewing, valuation, and final purchase support."
    }
  ];

  return (
    <View>
      <Text style={styles.title}>Buy Used Car</Text>
      <View style={styles.buyHero}>
        <View style={styles.buyHeroIcon}>
          <Ionicons name="key-outline" size={34} color="#ffffff" />
        </View>
        <Text allowFontScaling={false} style={styles.buyHeroTitle}>
          Hassle free car option
        </Text>
        <Text allowFontScaling={false} style={styles.buyHeroText}>
          Choose inspected used cars with branch-backed guidance, transparent support, and smoother ownership transfer.
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Call NEPAL Motor for used car buying"
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          style={({ hovered }: any) => [styles.buyHeroButton, hovered && styles.buyHeroButtonHover]}
        >
          <Ionicons name="call-outline" size={18} color="#ffffff" />
          <Text allowFontScaling={false} style={styles.buyHeroButtonText}>Call for options</Text>
        </Pressable>
      </View>

      <View style={styles.buyHighlightList}>
        {buyHighlights.map((item) => (
          <View key={item.title} style={styles.buyHighlightCard}>
            <View style={styles.buyHighlightIcon}>
              <Ionicons name={item.icon as any} size={22} color="#075985" />
            </View>
            <View style={styles.buyHighlightContent}>
              <Text allowFontScaling={false} style={styles.buyHighlightTitle}>{item.title}</Text>
              <Text allowFontScaling={false} style={styles.buyHighlightBody}>{item.body}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

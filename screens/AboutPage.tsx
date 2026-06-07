import React from "react";
import { View, Text, Pressable, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { renderNavSvgIcon } from "../components/icons/NavSvgIcons";
import { phoneNumber } from "../data/constants";
import styles from "../styles";
import LogoImage from "../components/icons/LogoImage";

/**
 * AboutPage — company overview with hero logo, stats, mission statement,
 * services offered, core values, and a direct call-to-action button.
 */
export default function AboutPage() {
  const stats = [
    { value: "3+", label: "Branches" },
    { value: "100%", label: "Verified" },
    { value: "24/7", label: "Support" },
  ];

  const services = [
    {
      svgIcon: "exchange",
      title: "Exchange to EV",
      desc: "Trade your petrol or diesel vehicle for a modern electric car with guided valuation and full exchange support."
    },
    {
      svgIcon: "carSide",
      title: "Sell Used Car",
      desc: "Get a genuine market-based valuation, professional inspection, and hassle-free ownership transfer."
    },
    {
      icon: "key-outline",
      title: "Buy Used Car",
      desc: "Browse inspected pre-owned vehicles with verified documents and branch-backed purchase guidance."
    }
  ];

  const values = [
    { icon: "shield-checkmark-outline", label: "Transparency" },
    { icon: "star-outline", label: "Quality" },
    { icon: "people-outline", label: "Trust" },
    { icon: "trending-up-outline", label: "Value" },
  ];

  return (
    <View style={styles.aboutPage}>

      {/* Hero */}
      <View style={styles.aboutHero}>
        <LogoImage size={72} />
        <Text allowFontScaling={false} style={styles.aboutHeroName}>NEPAL Motor</Text>
        <Text allowFontScaling={false} style={styles.aboutHeroTagline}>
          Nepal's trusted platform for used car exchange, buying, and selling
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.aboutStatsRow}>
        {stats.map((s) => (
          <View key={s.label} style={styles.aboutStatCard}>
            <Text allowFontScaling={false} style={styles.aboutStatValue}>{s.value}</Text>
            <Text allowFontScaling={false} style={styles.aboutStatLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Mission */}
      <View style={styles.aboutMission}>
        <View style={styles.aboutMissionIconWrap}>
          <Ionicons name="flag-outline" size={22} color="#075985" />
        </View>
        <View style={{ flex: 1 }}>
          <Text allowFontScaling={false} style={styles.aboutMissionTitle}>Our Mission</Text>
          <Text allowFontScaling={false} style={styles.aboutMissionText}>
            To make the used vehicle market more organized, secure, and convenient by offering professional support, technical evaluation, and end-to-end assistance throughout every stage of the vehicle journey.
          </Text>
        </View>
      </View>

      {/* Services */}
      <Text allowFontScaling={false} style={styles.aboutSectionTitle}>What We Offer</Text>
      {services.map((s) => (
        <View key={s.title} style={styles.aboutServiceCard}>
          <View style={styles.aboutServiceIcon}>
            {s.svgIcon ? renderNavSvgIcon(s.svgIcon, "#075985", 22) : <Ionicons name={(s as any).icon} size={22} color="#075985" />}
          </View>
          <View style={{ flex: 1 }}>
            <Text allowFontScaling={false} style={styles.aboutServiceTitle}>{s.title}</Text>
            <Text allowFontScaling={false} style={styles.aboutServiceDesc}>{s.desc}</Text>
          </View>
        </View>
      ))}

      {/* Values */}
      <Text allowFontScaling={false} style={styles.aboutSectionTitle}>Our Values</Text>
      <View style={styles.aboutValuesRow}>
        {values.map((v) => (
          <View key={v.label} style={styles.aboutValueCard}>
            <View style={styles.aboutValueIcon}>
              <Ionicons name={v.icon as any} size={20} color="#075985" />
            </View>
            <Text allowFontScaling={false} style={styles.aboutValueLabel}>{v.label}</Text>
          </View>
        ))}
      </View>

      {/* Contact CTA */}
      <Pressable
        style={({ hovered }: any) => [styles.aboutCTA, hovered && styles.aboutCTAHover]}
        onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
      >
        <Ionicons name="call-outline" size={18} color="#ffffff" />
        <Text allowFontScaling={false} style={styles.aboutCTAText}>Get in Touch</Text>
      </Pressable>

    </View>
  );
}

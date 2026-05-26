import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { faqSections, faqChipMap } from "../data/faqData";
import styles from "../styles";

/**
 * FAQsPage — filterable accordion FAQ list.
 * Chip buttons at the top filter between "All", "Exchange", "General",
 * "Sell", and "Buy" sections. Tapping a question expands its answer.
 */
export default function FAQsPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeChip, setActiveChip] = useState("All");

  const visibleSections = faqSections.filter((s) => s.title === faqChipMap[activeChip]);

  return (
    <View style={styles.faqPage}>
      <Text allowFontScaling={false} style={styles.faqPageTitle}>
        Frequently Asked{"\n"}Questions
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.faqChipsRow}
        style={styles.faqChipsScroll}
      >
        {Object.keys(faqChipMap).map((chip) => {
          const active = activeChip === chip;
          return (
            <Pressable
              key={chip}
              onPress={() => { setActiveChip(chip); setOpenKey(null); }}
              style={[styles.faqChip, active && styles.faqChipActive]}
            >
              <Text allowFontScaling={false} style={[styles.faqChipText, active && styles.faqChipTextActive]}>
                {chip}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {visibleSections.map((section, sIdx) => (
        <View key={section.title}>
          <View style={styles.faqSectionHeader}>
            <View style={styles.faqSectionAccent} />
            <Text allowFontScaling={false} style={styles.faqSectionTitle}>
              {section.title.replace(" Page FAQs", "").replace(" FAQs", "")}
            </Text>
          </View>
          {section.items.map((item, iIdx) => {
            const key = `${sIdx}-${iIdx}`;
            const expanded = openKey === key;
            return (
              <Pressable
                key={item.question}
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                onPress={() => setOpenKey(expanded ? null : key)}
                style={({ pressed, hovered }: any) => [
                  styles.faqItem,
                  expanded && styles.faqItemActive,
                  (pressed || hovered) && !expanded && styles.faqItemHover
                ]}
              >
                <View style={styles.faqQuestionRow}>
                  <Text allowFontScaling={false} style={[styles.faqQuestion, expanded && styles.faqQuestionExpanded]}>
                    {item.question}
                  </Text>
                  <View style={[styles.faqChevron, expanded && styles.faqChevronActive]}>
                    <Ionicons
                      name={expanded ? "chevron-up" : "chevron-down"}
                      size={18}
                      color={expanded ? "#ffffff" : "#075985"}
                    />
                  </View>
                </View>
                {expanded ? (
                  <Text allowFontScaling={false} style={styles.faqAnswer}>
                    {item.answer}
                  </Text>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

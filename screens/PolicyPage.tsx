import React from "react";
import { View, Text } from "react-native";
import { policiesContent } from "../data/legalPolicies";
import { PolicyKey } from "../types";
import styles from "../styles";

interface PolicyPageProps {
  policyKey: PolicyKey;
}

/**
 * PolicyPage — renders a legal policy document (Terms, Privacy, Refund,
 * or Disclaimer) from the policiesContent map. Sections starting with a
 * number are rendered with a bold heading; other paragraphs are plain text.
 */
export default function PolicyPage({ policyKey }: PolicyPageProps) {
  const policy = policiesContent[policyKey];
  const paragraphs = policy.content.split("\n\n");
  return (
    <View style={styles.policyPage}>
      <Text allowFontScaling={false} style={styles.policyPageTitle}>{policy.title}</Text>
      {paragraphs.map((para, i) => {
        const newlineIndex = para.indexOf("\n");
        const isSection = /^\d+\./.test(para);
        if (isSection && newlineIndex !== -1) {
          const heading = para.slice(0, newlineIndex);
          const body = para.slice(newlineIndex + 1);
          return (
            <View key={i} style={styles.policySection}>
              <Text allowFontScaling={false} style={styles.policySectionHeading}>{heading}</Text>
              <Text allowFontScaling={false} style={styles.policySectionBody}>{body}</Text>
            </View>
          );
        }
        return (
          <Text key={i} allowFontScaling={false} style={styles.policyIntro}>{para}</Text>
        );
      })}
    </View>
  );
}

import React, { useState } from "react";
import { View, Text, Pressable, Image, StatusBar, Platform, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboardingSlides } from "../data/onboardingData";
import styles from "../styles";

interface OnboardingScreenProps {
  onDone: () => void;
}

/**
 * OnboardingScreen — three-slide intro carousel shown to first-time users.
 * Users can tap "Next" to advance, "Skip" to exit early, or "Get Started"
 * on the final slide. Completion is persisted so it only shows once.
 */
export default function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  const { width, height: screenHeight } = useWindowDimensions();
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = onboardingSlides[slideIndex];
  const finalSlide = slideIndex === onboardingSlides.length - 1;
  const viewportWidth =
    Platform.OS === "web" && typeof window !== "undefined" ? (window as any).innerWidth : width;
  const inset = Platform.OS === "web" ? 132 : 40;
  const contentWidth = Math.max(280, Math.min(viewportWidth, 564) - inset);
  const imageHeight = screenHeight * 0.44;

  const goNext = () => {
    if (finalSlide) {
      onDone();
      return;
    }
    setSlideIndex((i) => i + 1);
  };

  return (
    <SafeAreaView style={styles.onboardingScreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.onboardingCenter}>
        <View style={[styles.onboardingSkipRow, { width: contentWidth }]}>
          <Pressable onPress={onDone}>
            <Text allowFontScaling={false} style={styles.onboardingSkipText}>
              Skip
            </Text>
          </Pressable>
        </View>

        <View style={[styles.onboardingTextBlock, { width: contentWidth }]}>
          <Text allowFontScaling={false} style={styles.onboardingTitle}>
            {slide.title}
          </Text>
          <Text allowFontScaling={false} style={styles.onboardingBody}>
            {slide.body}
          </Text>
        </View>

        <View style={[styles.onboardingVisual, { height: imageHeight }]}>
          <Image
            source={slide.image}
            resizeMode={slide.resizeMode as any || "cover"}
            style={styles.onboardingImage as any}
          />
        </View>

        <View style={styles.onboardingDots}>
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.onboardingDot,
                index === slideIndex && styles.onboardingDotActive
              ]}
            />
          ))}
        </View>

        <Pressable
          style={styles.onboardingButton}
          onPress={goNext}
        >
          <Text allowFontScaling={false} style={styles.onboardingButtonText}>
            {finalSlide ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

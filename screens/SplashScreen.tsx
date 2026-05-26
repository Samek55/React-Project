import React, { useEffect, useRef } from "react";
import { Animated, Image, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import styles from "../styles";

const nepalFlagLogo = require("../assets/nepal-flag-logo.jpeg");

/**
 * SplashScreen — animated loading screen shown while the app checks
 * AsyncStorage for the onboarding completion flag.
 * A horizontal progress bar animates over 1.3 seconds then the root
 * App component transitions to onboarding or the main screen.
 */
export default function SplashScreen() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1300,
      useNativeDriver: false
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.splashScreen}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.splashContent}>
        <Image source={nepalFlagLogo} style={styles.splashLogo as any} />
      </View>
      <View style={styles.splashLoadingTrack}>
        <Animated.View
          style={[
            styles.splashLoadingBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"]
              })
            }
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

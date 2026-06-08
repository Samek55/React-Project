import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  body: string;
  onDismiss: () => void;
}

export default function NotificationBanner({ title, body, onDismiss }: Props) {
  const translateY = useRef(new Animated.Value(-120)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, []);

  const dismiss = () => {
    Animated.timing(translateY, {
      toValue: -120,
      duration: 250,
      useNativeDriver: true,
    }).start(onDismiss);
  };

  return (
    <Animated.View style={[styles.banner, { transform: [{ translateY }] }]}>
      <View style={styles.iconWrap}>
        <Ionicons name="notifications" size={20} color="#fff" />
      </View>
      <View style={styles.textWrap}>
        {title ? <Text style={styles.title} numberOfLines={1}>{title}</Text> : null}
        {body ? <Text style={styles.body} numberOfLines={2}>{body}</Text> : null}
      </View>
      <Pressable onPress={dismiss} hitSlop={12} style={styles.close}>
        <Ionicons name="close" size={18} color="#ffffffaa" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 16,
    left: 12,
    right: 12,
    zIndex: 9999,
    backgroundColor: "#1a6b5a",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff22",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  body: {
    color: "#ffffffcc",
    fontSize: 13,
    lineHeight: 18,
  },
  close: {
    marginLeft: 8,
    padding: 4,
  },
});

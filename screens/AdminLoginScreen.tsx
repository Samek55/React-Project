import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import LogoImage from "../components/icons/LogoImage";

export default function AdminLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  const validate = (): string => {
    if (!email.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSignIn = async () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const resp = await fetch("https://nepalmotor.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok) {
        setSuccess(true);
      } else {
        setError(data?.message || "Invalid email or password. Please try again.");
      }
    } catch {
      setError("Unable to connect. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={s.root}>
        <View style={s.successCard}>
          <Ionicons name="checkmark-circle" size={60} color="#16a34a" />
          <Text allowFontScaling={false} style={s.successTitle}>
            Signed in successfully
          </Text>
          <Text allowFontScaling={false} style={s.successSub}>
            Welcome back, admin.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={s.root}>
      {/* Brand */}
      <View style={s.brand}>
        <View style={s.logo}>
          <LogoImage size={72} />
        </View>
        <Text allowFontScaling={false} style={s.brandName}>
          NEPAL Motor
        </Text>
        <View style={s.badge}>
          <Text allowFontScaling={false} style={s.badgeText}>
            ADMIN
          </Text>
        </View>
      </View>

      {/* Card */}
      <View style={s.card}>
        <Text allowFontScaling={false} style={s.cardTitle}>
          Sign in to Admin Panel
        </Text>

        {error ? (
          <View style={s.errorBox}>
            <Ionicons
              name="alert-circle-outline"
              size={15}
              color="#b91c1c"
              style={{ marginRight: 6, marginTop: 1 }}
            />
            <Text allowFontScaling={false} style={s.errorText}>
              {error}
            </Text>
          </View>
        ) : null}

        {/* Email */}
        <View style={s.field}>
          <Text allowFontScaling={false} style={s.label}>
            Email address
          </Text>
          <TextInput
            allowFontScaling={false}
            style={[s.input, !!error && !password && s.inputError]}
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              setError("");
            }}
            placeholder="admin@nepalmotor.com"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            editable={!loading}
          />
        </View>

        {/* Password */}
        <View style={s.field}>
          <Text allowFontScaling={false} style={s.label}>
            Password
          </Text>
          <View style={s.passwordRow}>
            <TextInput
              ref={passwordRef}
              allowFontScaling={false}
              style={[s.input, s.passwordInput]}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setError("");
              }}
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
              editable={!loading}
            />
            <Pressable
              style={s.eyeBtn}
              onPress={() => setPasswordVisible((v) => !v)}
              hitSlop={8}
              disabled={loading}
            >
              <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#94a3b8"
              />
            </Pressable>
          </View>
        </View>

        {/* Submit */}
        <Pressable
          style={({ pressed }) => [
            s.submitBtn,
            (pressed || loading) && s.submitBtnPressed,
          ]}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text allowFontScaling={false} style={s.submitText}>
              Sign in
            </Text>
          )}
        </Pressable>
      </View>

      <Text allowFontScaling={false} style={s.footer}>
        © {new Date().getFullYear()} NEPAL Motor · Authorised access only
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: 560,
  },

  // Brand
  brand: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  brandName: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "900",
    color: "#020617",
    letterSpacing: -0.3,
  },
  badge: {
    marginTop: 5,
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#075985",
    letterSpacing: 1,
  },

  // Card
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    padding: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#020617",
    marginBottom: 20,
  },

  // Error banner
  errorBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: "#b91c1c",
    lineHeight: 18,
  },

  // Fields
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
    color: "#020617",
    fontSize: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  inputError: {
    borderColor: "#fca5a5",
  },
  passwordRow: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  // Submit
  submitBtn: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#075985",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#075985",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitBtnPressed: {
    backgroundColor: "#0c4a6e",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
  },

  // Footer
  footer: {
    marginTop: 24,
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
  },

  // Success state
  successCard: {
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 18,
    padding: 36,
    width: "100%",
    maxWidth: 380,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  successTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "800",
    color: "#14532d",
  },
  successSub: {
    marginTop: 6,
    fontSize: 14,
    color: "#166534",
  },
});

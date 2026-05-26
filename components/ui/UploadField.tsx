import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FileAsset } from "../../types";
import styles from "../../styles";
import Label from "./Label";

interface UploadFieldProps {
  label: string;
  value?: FileAsset[];
  onPress: () => void;
  onRemove?: (index: number) => void;
  onClear?: () => void;
  error?: string;
}

/**
 * UploadField — file upload area showing selected file thumbnails/previews.
 * Supports up to 5 files.
 */
export default function UploadField({ label, value = [], onPress, onRemove, onClear, error }: UploadFieldProps) {
  return (
    <View style={styles.field}>
      <View style={styles.uploadLabelRow}>
        <Label>{label}</Label>
        {value.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Clear ${label}`}
            hitSlop={8}
            onPress={onClear}
            style={styles.clearUploadButton}
          >
            <Ionicons name="trash-outline" size={15} color="#dc2626" />
            <Text allowFontScaling={false} style={styles.clearUploadText}>Clear all</Text>
          </Pressable>
        ) : null}
      </View>

      <Pressable style={styles.upload} onPress={onPress}>
        <Ionicons name="cloud-upload-outline" size={18} color="#1f2937" />
        <Text allowFontScaling={false} style={styles.uploadText}>
          Upload up to 5 files <Text allowFontScaling={false} style={styles.browseText}>browse</Text>
        </Text>
      </Pressable>
      {error ? <Text allowFontScaling={false} style={styles.errorText}>{error}</Text> : null}

      {value.length > 0 && (
        <View style={styles.filePreviewList}>
          {value.map((file, index) => {
            const isImage = file?.type?.startsWith("image/");
            return (
              <View key={`${file?.uri || file?.name || "file"}-${index}`} style={styles.filePreview}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${file.name || "selected file"}`}
                  hitSlop={8}
                  onPress={() => onRemove?.(index)}
                  style={styles.fileRemove}
                >
                  <Ionicons name="close" size={14} color="#475569" />
                </Pressable>
                {isImage ? (
                  <Image source={{ uri: file.uri }} style={styles.fileThumb as any} />
                ) : (
                  <View style={styles.fileDoc}>
                    <Text allowFontScaling={false} style={styles.fileDocText}>DOC</Text>
                  </View>
                )}
                <Text allowFontScaling={false} numberOfLines={1} style={styles.fileName}>
                  {file.name}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

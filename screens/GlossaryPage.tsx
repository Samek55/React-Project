import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { glossaryData } from "../data/glossaryData";
import styles from "../styles";

/**
 * GlossaryPage — A–Z automotive terminology reference.
 * An alphabet grid lets users jump to any letter; the selected letter's
 * terms are displayed as definition cards below the grid.
 */
export default function GlossaryPage() {
  const [activeLetter, setActiveLetter] = useState("A");
  const letterRows: string[][] = [
    ["A","B","C","D","E","F"],
    ["G","H","I","J","K","L"],
    ["M","N","O","P","Q","R"],
    ["S","T","U","V","W","X"],
    ["Y","Z"]
  ];
  const terms = glossaryData[activeLetter] || [];

  return (
    <View style={styles.glossaryPage}>
      <Text allowFontScaling={false} style={styles.glossaryIntro}>
        Explore common used car, EV exchange, and auto market terms from A to Z.
      </Text>

      <View style={styles.glossaryAlphabetCard}>
        {letterRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.glossaryLetterRow}>
            {row.map((letter) => {
              const active = activeLetter === letter;
              return (
                <Pressable
                  key={letter}
                  onPress={() => setActiveLetter(letter)}
                  style={[styles.glossaryLetterBtn, active && styles.glossaryLetterBtnActive]}
                >
                  <Text allowFontScaling={false} style={[styles.glossaryLetterText, active && styles.glossaryLetterTextActive]}>
                    {letter}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <Text allowFontScaling={false} style={styles.glossaryActiveLetter}>{activeLetter}</Text>

      {terms.map((term, i) => (
        <View key={i} style={styles.glossaryCard}>
          <Text allowFontScaling={false} style={styles.glossaryTerm}>{term.title}</Text>
          <Text allowFontScaling={false} style={styles.glossaryDef}>{term.definition}</Text>
        </View>
      ))}
    </View>
  );
}

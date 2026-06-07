import React from "react";
import { View, Image } from "react-native";

const source = require("../../assets/NEPAL Motor new logo 2.jpeg");

// The JPEG has ~6% white padding on each side, so scale up by 1.14
// to make the green circle border fill to the circular container edge.
const SCALE = 1.14;

interface Props {
  size: number;
}

export default function LogoImage({ size }: Props) {
  const scaled = size * SCALE;
  const offset = (size - scaled) / 2;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: "hidden" }}>
      <Image
        source={source}
        style={{ width: scaled, height: scaled, top: offset, left: offset, position: "absolute" }}
      />
    </View>
  );
}

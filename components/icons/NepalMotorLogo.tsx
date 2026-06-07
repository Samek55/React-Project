import React from "react";
import Svg, { Circle, Polyline } from "react-native-svg";

const LOGO_COLOR = "#2B7B6B";

interface Props {
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export default function NepalMotorLogo({ size = 50, color = LOGO_COLOR, backgroundColor = "white" }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Circle
        cx="100"
        cy="100"
        r="88"
        fill={backgroundColor}
        stroke={color}
        strokeWidth="9"
      />
      <Polyline
        points="26,153 62,13 100,88 138,40 174,150"
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeLinecap="butt"
      />
    </Svg>
  );
}

import React from "react";
import Svg, { Circle, Ellipse, Line, Path, Rect, Text as SvgText } from "react-native-svg";

interface TextSvgProps {
  x: number;
  y: number;
  text: string;
  size: number;
  color: string;
}

/**
 * TextSvg — thin wrapper around react-native-svg's Text element.
 * Provides a shorter API for rendering bold text inside SVG illustrations.
 */
export function TextSvg({ x, y, text, size, color }: TextSvgProps) {
  return (
    <SvgText x={x} y={y} fill={color} fontSize={size} fontWeight="900">
      {text}
    </SvgText>
  );
}

interface ServiceIllustrationProps {
  type: "sell" | "buy" | "exchange";
}

/**
 * ServiceIllustration — decorative SVG car illustration for each service type.
 * Renders a different scene depending on the `type` prop.
 */
export default function ServiceIllustration({ type }: ServiceIllustrationProps) {
  if (type === "sell") {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 320 220">
        <Rect x="38" y="44" width="88" height="82" rx="10" fill="#dbeafe" />
        <Rect x="144" y="58" width="102" height="68" rx="10" fill="#e0e7ff" />
        <Circle cx="80" cy="38" r="22" fill="#ffe4e6" stroke="#fb7185" strokeWidth="4" />
        <Circle cx="132" cy="26" r="28" fill="#ffe4e6" stroke="#fb7185" strokeWidth="4" />
        <TextSvg x={73} y={47} text="$" size={26} color="#ef4444" />
        <TextSvg x={123} y={38} text="$" size={30} color="#ef4444" />
        <Circle cx="236" cy="58" r="34" fill="#fecaca" stroke="#312e81" strokeWidth="5" />
        <Line x1="236" y1="58" x2="236" y2="34" stroke="#312e81" strokeWidth="4" strokeLinecap="round" />
        <Line x1="236" y1="58" x2="260" y2="62" stroke="#312e81" strokeWidth="4" strokeLinecap="round" />
        <Path d="M58 156h186c20 0 35-13 39-31l-50-11H96c-18 0-32 8-38 26z" fill="#6366f1" />
        <Path d="M96 116h72l22 34H70z" fill="#93c5fd" />
        <Circle cx="98" cy="158" r="19" fill="#1e293b" />
        <Circle cx="236" cy="158" r="19" fill="#1e293b" />
        <Path d="M82 102c13-16 31-16 44 0" fill="none" stroke="#f97316" strokeWidth="11" strokeLinecap="round" />
        <Path d="M96 106l28 24M154 130l31-24" stroke="#f97316" strokeWidth="12" strokeLinecap="round" />
      </Svg>
    );
  }

  if (type === "buy") {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 320 220">
        <Rect x="24" y="36" width="272" height="128" rx="34" fill="#d9f0ee" />
        <Path d="M58 138c7-44 35-72 82-72h68c35 0 59 25 67 72z" fill="#ef4444" />
        <Rect x="84" y="88" width="74" height="34" rx="5" fill="#cbd5e1" />
        <Rect x="168" y="88" width="62" height="34" rx="5" fill="#cbd5e1" />
        <Rect x="82" y="128" width="160" height="22" rx="8" fill="#1f2937" />
        <Circle cx="90" cy="156" r="20" fill="#111827" />
        <Circle cx="238" cy="156" r="20" fill="#111827" />
        <Circle cx="90" cy="156" r="8" fill="#cbd5e1" />
        <Circle cx="238" cy="156" r="8" fill="#cbd5e1" />
        <Path d="M132 58c23 15 40 15 58 0" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
        <Path d="M118 82l-32 34M202 82l34 34" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
        <Path d="M106 66l22 24M214 66l-22 24" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        <Circle cx="238" cy="42" r="21" fill="#ffffff" />
        <TextSvg x={230} y={51} text="$" size={25} color="#15803d" />
        <Path d="M267 38c11 0 17 12 9 20l-12 12" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        <Path d="M60 178h232" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
      </Svg>
    );
  }

  return (
    <Svg width="100%" height="100%" viewBox="0 0 320 220">
      <Ellipse cx="160" cy="108" rx="126" ry="88" fill="#f1e3d8" />
      <Rect x="70" y="50" width="136" height="82" rx="8" fill="#ead6ca" />
      <Circle cx="134" cy="47" r="30" fill="#e07658" stroke="#ffffff" strokeWidth="5" />
      <Path d="M144 72l26 30M154 82l-12 12" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
      <Path d="M122 40l12-12 13 13-12 12z" fill="#f7d5bd" />
      <Path d="M56 148c7-39 32-63 75-63h59c39 0 67 25 74 63z" fill="#df7657" />
      <Rect x="84" y="103" width="78" height="31" rx="4" fill="#26303a" />
      <Rect x="168" y="103" width="50" height="31" rx="4" fill="#26303a" />
      <Circle cx="98" cy="157" r="20" fill="#334155" />
      <Circle cx="238" cy="157" r="20" fill="#334155" />
      <Circle cx="98" cy="157" r="10" fill="#dfc8ad" />
      <Circle cx="238" cy="157" r="10" fill="#dfc8ad" />
      <Path d="M76 70c20-21 42-10 44 16" fill="none" stroke="#111827" strokeWidth="9" strokeLinecap="round" />
      <Path d="M80 92l35 29M206 74c23 10 39 27 48 51" stroke="#111827" strokeWidth="11" strokeLinecap="round" />
      <Path d="M112 122c27 7 55 7 83 0" stroke="#a85536" strokeWidth="9" strokeLinecap="round" />
    </Svg>
  );
}

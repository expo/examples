// Based on shader https://reactbits.dev/backgrounds/iridescence
import React from "react";
import {
  Canvas,
  Skia,
  Shader,
  Fill,
  useClock,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

const source = Skia.RuntimeEffect.Make(`
uniform vec3 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uSpeed;

vec4 main(vec2 fragCoord) {
  // Convert fragCoord to normalized coordinates
  vec2 vUv = fragCoord / uResolution.xy;
  
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;  
  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  
  d += uTime * 0.5 * uSpeed;
  
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  
  return vec4(col, 1.0);
}
`);

export default function Iridescence({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  ...props
}: {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  width?: number;
  height?: number;
}) {
  const clock = useClock();

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const width = props.width ?? screenWidth;
  const height = props.height ?? screenHeight;

  // Create uniforms using useDerivedValue from reanimated
  const uniforms = useDerivedValue(() => {
    return {
      uResolution: [width, height, width / height],
      uTime: clock.value / 1000,
      uColor: color,
      uAmplitude: amplitude,
      uSpeed: speed,
    };
  }, [clock, width, height]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
}

Iridescence.displayName = "Iridescence";

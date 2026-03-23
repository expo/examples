"use dom";

import React from "react";

interface ShaderCanvasProps {
  fragmentShader: string;
}

function ShaderCanvas({ fragmentShader }: ShaderCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let glsl: any;
    let cleanup = () => {};

    import("glslCanvas").then(({ default: GlslCanvas }) => {
      glsl = new GlslCanvas(canvas);
      const pixelRatio = window.devicePixelRatio || 1;

      try {
        glsl.load(fragmentShader);
        glsl.setUniform("u_resolution", [canvas.width, canvas.height]);
      } catch (e) {
        console.error("Shader compilation error:", e);
      }

      const resizeCanvas = () => {
        glsl.setUniform("u_resolution", [
          canvas.width * pixelRatio,
          canvas.height * pixelRatio,
        ]);
      };

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      cleanup = () => {
        window.removeEventListener("resize", resizeCanvas);
        glsl.destroy();
      };
    });

    return () => cleanup();
  }, [fragmentShader]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 8,
      }}
    />
  );
}

import "@bacons/apple-colors";

// Example usage with ContourShader
const dither = `
  #extension GL_OES_standard_derivatives : enable
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;

  const vec4 COLOR_DARK = vec4(174.0/255.0, 174.0/255.0, 178.0/255.0, 1.0);
  // // const vec4 COLOR_DARK = vec4(28.05/255.0, 28.05/255.0, 30.6/255.0, 1.0);
  const vec4 COLOR_LIGHT = vec4(242.05/255.0, 242.05/255.0, 247.6/255.0, 1.0);
  
  const float SPEED = 0.1;
  const float PIXEL_SIZE = 1.0;
  const float DITHER_SCALE = 1.0;

  const float ROT_SPEED = 0.1;
  const float WARP_INIT = 1.0;
  const float WARP_ITER = 2.112312321;
  const float WARP_AMPL = 3.1123123123;

  float getBayerValue(int index) {
          if (index == 0) return 0.0/16.0;
          if (index == 1) return 8.0/16.0;
          if (index == 2) return 2.0/16.0;
          if (index == 3) return 10.0/16.0;
          if (index == 4) return 12.0/16.0;
          if (index == 5) return 4.0/16.0;
          if (index == 6) return 14.0/16.0;
          if (index == 7) return 6.0/16.0;
          if (index == 8) return 3.0/16.0;
          if (index == 9) return 11.0/16.0;
          if (index == 10) return 1.0/16.0;
          if (index == 11) return 9.0/16.0;
          if (index == 12) return 15.0/16.0;
          if (index == 13) return 7.0/16.0;
          if (index == 14) return 13.0/16.0;
          if (index == 15) return 5.0/16.0;
          return 0.0;
  }

  vec2 transformUV(vec2 uv) {
          float angle = u_time * SPEED * ROT_SPEED;
          uv = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * uv;

          float t = u_time * SPEED;
          for (float i = WARP_INIT; i < WARP_ITER; i++) {
                  float iInv = 1.0 / i;

                  vec2 oscillation = vec2(
                          sin(i * 0.5 + t * 0.25) * cos(t + uv.y * 1.5),
                          cos(i * 0.7 + t * 0.35) * sin(t + uv.x * 1.2)
                  );

                  vec2 modulation = vec2(
                          0.2 * sin(t * 0.6 + uv.y * 3.0),
                          0.3 * cos(t * 0.8 + uv.x * 2.5)
                  );

                  uv += WARP_AMPL * iInv * (oscillation + modulation);
          }

          return uv;
  }

  float getDither(vec2 pos) {
          vec2 scaled = pos / PIXEL_SIZE * DITHER_SCALE;
          int index = int(mod(scaled.x, 4.0)) + int(mod(scaled.y, 4.0)) * 4;
          return getBayerValue(index);
  }

  void main() {
          vec2 pixelatedCoord =
                  floor(gl_FragCoord.xy / PIXEL_SIZE) * PIXEL_SIZE + PIXEL_SIZE / 2.0;
          vec2 uv = (2.0 * pixelatedCoord - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

          uv = transformUV(uv);

          float intensity = 0.5 + 0.5 * sin(u_time * SPEED - uv.x - uv.y);
          float threshold = getDither(gl_FragCoord.xy);

          gl_FragColor = mix(COLOR_DARK, COLOR_LIGHT, step(threshold, intensity));
  }
`;

const contour = `
          #extension GL_OES_standard_derivatives : enable
          precision mediump float;
          uniform vec2 u_resolution;
          uniform float u_time;

          // Control variables
          const float WAVE_SPEED = 150.0;      // Higher = slower
          const float WAVE_AMPLITUDE = 2.0;     // Wave height multiplier
          const vec3 COLOR_PRIMARY = vec3(0.8, 0.8, 0.8);    // Primary contour color
          const vec3 COLOR_SECONDARY = vec3(0.95, 0.95, 0.95); // Secondary contour color
          const float LINE_WIDTH = 0.5;         // Width of contour lines
          const float LINE_SPACING = 4000.0;    // Space between contour lines

          float wave(float x, float y, float k) 
          {
                          return sin(10.0*x+10.0*y) / 5.0 +
                                                   sin(20.0*x*k+15.0*y*k) / 3.0 +
                                                   sin(4.0*x+10.0*y) / -4.0 +
                                                   sin(y) / 2.0 +
                                                   sin(x*x*y*20.0*k) + 
                                                   sin(x * 20.0*k + 4.0) / 5.0 +
                                                   sin(y * 30.0*k) / 5.0 + 
                                                   sin(x) / 4.0;
          }

          void main() {
                  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                  uv.xy *= 2.;
                  uv.x += cos(u_time/WAVE_SPEED)/4. - 0.5;
                  uv.y += sin(u_time/WAVE_SPEED)*2. -0.5;
                  
                  float z = wave(uv.x, uv.y, 1./10.) + 2.0;
                  
                  z *= WAVE_AMPLITUDE * (sin(u_time/20.)+2.);
                  float d = fract(z);
                  if(mod(z, 2.0) > 1.) d = 1.-d;
                   
                  vec3 col = vec3(1.0);
                  for(float i=0.; i<3.; i++){
                                  col -= vec3(step(d/fwidth(z*3.), 
                                          LINE_WIDTH+(u_resolution.x+u_resolution.y)/LINE_SPACING - (i+1.)/3.)*((i+1.)/4.));
                  }
                  
                  col *= mix(COLOR_PRIMARY, COLOR_SECONDARY, fwidth(z*4.)+0.3);
                  gl_FragColor = vec4(col, 1.0);
          }
  `;
function ContourShader(props: { dither: boolean }) {
  return (
    <div style={{ height: 300, maxWidth: "100%", paddingBottom: 20 }}>
      <ShaderCanvas fragmentShader={props.dither ? dither : contour} />
    </div>
  );
}

export default ContourShader;

import { useEffect, useRef } from "react";
import { PixelRatio, View } from "react-native";
import { Canvas, type CanvasRef } from "react-native-webgpu";

const shader = /* wgsl */ `
  @vertex
  fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4f {
    var positions = array(
      vec2f(0.0, 0.6),
      vec2f(-0.6, -0.6),
      vec2f(0.6, -0.6),
    );
    return vec4f(positions[vertexIndex], 0.0, 1.0);
  }

  @fragment
  fn fragmentMain() -> @location(0) vec4f {
    return vec4f(0.38, 0.65, 0.98, 1.0);
  }
`;

export default function WebGPUTriangle() {
  const ref = useRef<CanvasRef>(null);

  useEffect(() => {
    let cancelled = false;
    let device: GPUDevice | undefined;

    void (async () => {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter || cancelled) return;
      device = await adapter.requestDevice();
      if (cancelled) {
        device.destroy();
        return;
      }

      const context = ref.current?.getContext("webgpu");
      if (!context || cancelled) return;
      const canvas = context.canvas as HTMLCanvasElement;
      canvas.width = canvas.clientWidth * PixelRatio.get();
      canvas.height = canvas.clientHeight * PixelRatio.get();

      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({ device, format, alphaMode: "opaque" });

      const module = device.createShaderModule({ code: shader });
      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module, entryPoint: "vertexMain" },
        fragment: {
          module,
          entryPoint: "fragmentMain",
          targets: [{ format }],
        },
        primitive: { topology: "triangle-list" },
      });

      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: context.getCurrentTexture().createView(),
            clearValue: [0.07, 0.09, 0.15, 1],
            loadOp: "clear",
            storeOp: "store",
          },
        ],
      });
      pass.setPipeline(pipeline);
      pass.draw(3);
      pass.end();
      device.queue.submit([encoder.finish()]);
      context.present();
    })();

    return () => {
      cancelled = true;
      device?.destroy();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Canvas ref={ref} style={{ flex: 1 }} />
    </View>
  );
}

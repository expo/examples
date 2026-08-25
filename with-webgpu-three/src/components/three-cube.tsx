import { useEffect, useRef } from "react";
import { View } from "react-native";
import { Canvas, type CanvasRef } from "react-native-webgpu";
import * as THREE from "three/webgpu";

import { makeWebGPURenderer } from "@/lib/make-webgpu-renderer";

export default function ThreeCube() {
  const ref = useRef<CanvasRef>(null);

  useEffect(() => {
    let cancelled = false;
    let renderer: THREE.WebGPURenderer | undefined;

    void (async () => {
      const context = ref.current?.getContext("webgpu");
      if (!context) return;

      const { width, height } = context.canvas;
      const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
      camera.position.z = 1;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#111827");
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.3),
        new THREE.MeshNormalMaterial(),
      );
      scene.add(mesh);

      renderer = makeWebGPURenderer(context);
      await renderer.init();
      if (cancelled) {
        renderer.dispose();
        return;
      }

      renderer.setAnimationLoop((time) => {
        mesh.rotation.x = time / 2_000;
        mesh.rotation.y = time / 1_000;
        renderer?.render(scene, camera);
        context.present();
      });
    })();

    return () => {
      cancelled = true;
      renderer?.setAnimationLoop(null);
      renderer?.dispose();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Canvas ref={ref} style={{ flex: 1 }} />
    </View>
  );
}

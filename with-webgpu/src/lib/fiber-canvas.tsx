// https://github.com/wcandillon/react-native-webgpu/blob/578ad989b4326724702b14245d5c82622849ee23/apps/example/src/ThreeJS/components/FiberCanvas.tsx#L1
import * as THREE from "three/webgpu";
import React, { useEffect, useRef } from "react";
import type { ReconcilerRoot, RootState } from "@react-three/fiber";
import {
  extend,
  createRoot,
  unmountComponentAtNode,
  events,
} from "@react-three/fiber";
import type { ViewProps } from "react-native";
import { PixelRatio } from "react-native";
import { Canvas, type CanvasRef } from "react-native-wgpu";

import { makeWebGPURenderer, ReactNativeCanvas } from "@/lib/make-webgpu-renderer";

interface FiberCanvasProps {
  children: React.ReactNode;
  style?: ViewProps["style"];
  camera?: THREE.PerspectiveCamera;
  scene?: THREE.Scene;
}

export const FiberCanvas = ({
  children,
  style,
  scene,
  camera,
}: FiberCanvasProps) => {
  const root = useRef<ReconcilerRoot<OffscreenCanvas>>(null!);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  React.useMemo(() => extend(THREE), []);
  const canvasRef = useRef<CanvasRef>(null);
  useEffect(() => {
    const context = canvasRef.current!.getContext("webgpu")!;
    const renderer = makeWebGPURenderer(context);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const canvas = new ReactNativeCanvas(context.canvas) as HTMLCanvasElement;
    canvas.width = canvas.clientWidth * PixelRatio.get();
    canvas.height = canvas.clientHeight * PixelRatio.get();
    const size = {
      top: 0,
      left: 0,
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };

    if (!root.current) {
      root.current = createRoot(canvas);
    }
    root.current.configure({
      size,
      events,
      scene,
      camera,
      gl: renderer,
      frameloop: "always",
      dpr: 1, //PixelRatio.get(),
      onCreated: async (state: RootState) => {
        await state.gl.init();
        const renderFrame = state.gl.render.bind(state.gl);
        state.gl.render = (s: THREE.Scene, c: THREE.Camera) => {
          renderFrame(s, c);
          context?.present();
        };
      },
    });
    root.current.render(children);
    return () => {
      if (canvas != null) {
        unmountComponentAtNode(canvas!);
      }
    };
  });

  return <Canvas ref={canvasRef} style={style} />;
};
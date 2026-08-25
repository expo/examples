import type { NativeCanvas } from "react-native-webgpu";
import * as THREE from "three/webgpu";

class ReactNativeCanvas {
  constructor(private canvas: NativeCanvas) {}

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  set width(width: number) {
    this.canvas.width = width;
  }

  set height(height: number) {
    this.canvas.height = height;
  }

  get clientWidth() {
    return this.canvas.width;
  }

  get clientHeight() {
    return this.canvas.height;
  }

  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {}
  setPointerCapture() {}
  releasePointerCapture() {}
}

export const makeWebGPURenderer = (context: GPUCanvasContext) =>
  new THREE.WebGPURenderer({
    antialias: true,
    // Three.js expects a DOM canvas; react-native-wgpu exposes the same size surface.
    canvas: new ReactNativeCanvas(
      context.canvas as unknown as NativeCanvas,
    ) as unknown as HTMLCanvasElement,
    context,
  });
